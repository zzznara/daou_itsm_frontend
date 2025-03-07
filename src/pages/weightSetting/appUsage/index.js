import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from "react";
import SearchBar from "./SearchBar";
import {
  getGridValidateCheck,
  saveGridCheckData,
  isFieldDisabled,
} from "../../../utils/validators";
import ButtonBar from "../../../components/Layout/ButtonBar";
import { useAxiosWithAuthorization } from "../../../utils/api";
import { ModalConfirm } from "../../../components/Confirm";
import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
import { columnLayout } from "./conlumnLayout";
import { INITIAL_FIELD_RULES } from "./validateFields";
import osq from "../../../images/osq.png";
import SelectBox from "../../../components/SelectBox/index.vue";
import useAppContext from "../../../utils/Reducers";
import { ajusta } from "../../../utils/validators";
import AUIGrid from "../../../lib/AuiGrid/AUIGridReact";
//import PhoneInput from "react-phone-number-input/input";

const UserReg = (props) => {
  const myGrid = useRef();

  const [state, setState] = useState("normaled");

  const {
    store: { userInfo, menuKey },
  } = useAppContext();

  useEffect(() => {
    const auiGrid = myGrid.current;
    auiGrid.resize("100%", "100%");
  }, [menuKey]);

  //추가, 수정일때 항목의 disabled 결정
  const disabledFields = {
    created: [],
    updated: ["systemCd", "userId"],
  };

  const initItem = {
    carNo: "",
    appWeighUseYn: "",
    carWeight: "",
    carWeightRDt: "",
    custCd: "",
    prodCd: "",
    inptDt: "",
    // inptId: "",
    // inptIp: "",
    // updtDt: "",
    // updtId: "",
    // updtIp: "",
  };
  const [fieldValues, setFieldValues] = useState(initItem);

  //상차지 검색 URL
  const SERARCH_INHOUSESETTING_URL = "/weightsetting/inhousesetting/searchInhouseSettingList";
  //상차지 저장 URL
  const SAVE_INHOUSESETTING_URL = "/weightsetting/inhousesetting/saveInhouseSettingList";

  const [, fetchData] = useAxiosWithAuthorization(
    {
      url: SERARCH_INHOUSESETTING_URL,
    },
    { manual: true }
  );

  const [primaryParameters, setPrimaryParameters] = useState({
    userId: "",
    nmKor: "",
  });

  //검색조건
  const setSearchParameters = (values) => {
    setPrimaryParameters(values);
  };

  //코드 및 그리드 초기화 및 생성
  useEffect(() => {
    const auiGrid = myGrid.current;
    auiGrid.bind("cellClick", function (event) {
      gridCellClick(event.item);
    });

    //
  }, []);

  const gridCellClick = (item) => {
    // 추가 : editable, 수정 : edtiable, 삭제 : readonly
    //read
    //setFieldsEnabled(auiGrid, item, disabledFields);
    const auiGrid = myGrid.current;
    if (auiGrid.isAddedById(item._$uid)) {
      setState("created");
    } else if (auiGrid.isEditedById(item._$uid)) {
      setState("updated");
    } else if (auiGrid.isRemovedById(item._$uid)) {
      setState("deleted");
    } else {
      setState("updated");
    }

    // console.log(item);
    setFieldValues(item);
  };
  const handleMasterSearch = async () => {
    const auiGrid = myGrid.current;
    auiGrid.showAjaxLoader();
    const {
      data: { data },
    } = await fetchData({
      url: SERARCH_INHOUSESETTING_URL,
      params: primaryParameters,
    });
    auiGrid.setGridData(data);
    setFieldValues(initItem);
    auiGrid.removeAjaxLoader();
  };

  const handleMasterNew = () => {
    const auiGrid = myGrid.current;
    auiGrid.addRow(initItem, "last");
    setFieldValues(initItem);
    const items = auiGrid.getSelectedItems()[0];

    gridCellClick(items.item);
  };

  const handleMasterDelete = () => {
    const auiGrid = myGrid.current;
    auiGrid.removeRow("selectedIndex");
  };
  const handleMasterSave = async () => {
    if (
      await ModalConfirm({
        title: "저장",
        description: "데이터를 저장하시겠습니까?",
      })
    ) {
      let validator = [];
      const auiGrid = myGrid.current;
      var items = auiGrid.getGridData();

      const result = getGridValidateCheck(auiGrid, items, INITIAL_FIELD_RULES);
      if (result.isValidate) {
        document.getElementsByName(result.column)[0].focus();
        ModalConfirm({
          title: "필수항목체크",
          description: result.message,
          type: "alert",
        });
        auiGrid.setSelectionByIndex(result.rowIndex);
        gridCellClick(result.rowItem);
        return;
      }
      const addItems = auiGrid.getAddedRowItems();
      const editItems = auiGrid.getEditedRowItems();
      const removeItems = auiGrid.getRemovedItems();
      const menuId = menuKey;
      let param = saveGridCheckData(addItems, editItems, removeItems, menuId);
      if (param.length > 0) {
        const {
          data: { data },
        } = await fetchData({
          url: SAVE_INHOUSESETTING_URL,
          data: param,
          method: "POST",
        });

        handleMasterSearch();
      } else {
        ModalConfirm({
          title: "필수항목체크",
          description: "저장할 항목이 없습니다. ",
          type: "alert",
        });
      }
    }
  };

  const handleChangeField = useCallback((event) => {
    const auiGrid = myGrid.current;
    const { name, value } = event.target;
    const items = auiGrid.getSelectedItems()[0];
    const item = items.item;
    // console.log("name === " + name + " || value === " + value);

    if (name === "telNo" || name === "mobileNo") {
      //전화번호 관련 함수 정의
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(value)) {
        const phone = ajusta(value);
        item[name] = phone;
        setFieldValues({ ...fieldValues, [name]: phone });
      }
    } else {
      item[name] = value;
      setFieldValues({ ...fieldValues, [name]: value });
    }
    auiGrid.updateRow(item, "selectedIndex");
  });

  const handleMasterExcel = useCallback(() => {
    const auiGrid = myGrid.current;
    auiGrid.exportToXlsx({
      fileName: props.menuInfo.menuNmKor + " 리스트",
    });
  });

  return (
    <>
      <ButtonBar
        menuInfo={props.menuInfo}
        handleMasterSearch={handleMasterSearch}
        handleMasterNew={handleMasterNew}
        handleMasterDelete={handleMasterDelete}
        handleMasterSave={handleMasterSave}
        handleMasterExcel={handleMasterExcel}
      />
      <SearchBar setSearchParameters={setSearchParameters} systemCd={userInfo.systemCd} />

      <div className="flexible_contents_box">
        <div className="databox">
          <div style={{ width: "100%", height: "100%" }}>
            <AUIGrid
              ref={myGrid}
              columnLayout={columnLayout}
              gridProps={defaultGridProps}
              height="100%"
              width="100%"
            />
          </div>
        </div>
        <div className="databox">
          <div className="subdatabox">
            <h5>
              <img src={osq} /> &nbsp;사용자정보 &nbsp;
              <br />
            </h5>
            <ul className="t_form">
              <li className="doublehalf">
                <div className="title">
                  <span className="red">*</span>회사구분
                </div>
                <div className="formbox">
                  <SelectBox
                    mastCd="SYSTEM_CD"
                    id="systemCd"
                    name="systemCd"
                    topSelected="선택"
                    disabled={isFieldDisabled(state, "systemCd", disabledFields)}
                    onChange={handleChangeField}
                    value={fieldValues.systemCd}
                    className="ip2"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReg;
