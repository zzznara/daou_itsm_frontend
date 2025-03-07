<template>
  <ButtonBar
    :menuInfo="menuInfo"
    :handleMasterSearch="handleMasterSearch"
    :handleMasterNew="handleMasterNew"
    :handleMasterDelete="handleMasterDelete"
    :handleMasterSave="handleMasterSave"
    :handleMasterExcel="handleMasterExcel"
  />
  <SearchBar :setSearchParameters="setSearchParameters" :systemCd="userInfo.systemCd" />

  <div class="grid_wrap">
    <AUIGrid ref="myGrid" :columnLayout="columnLayout" :gridProps="defaultGridProps" />
  </div>
  <div class="data_wrap">
    <div class="subdatabox">
      <h5>
        <img :src="osq" /> &nbsp;차량번호등록 &nbsp;
        <br />
      </h5>
      <ul class="t_form">
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>차량번호</div>
          <div class="ip_sup2">
            <div>
              <input
                type="text"
                name="carNo"
                :disabled="true"
                v-model="fieldValues.carNo"
                @input="handleChangeField"
                class="ip2"
              />
            </div>
            <div>
              <button
                type="button"
                @click="handleSearchCar"
                :disabled="isFieldDisabled(state, 'carNo', disabledFields)"
                class="btn_ip"
              >
                검색
              </button>
              <div></div>
              <div></div>
            </div>
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">사내이송설정 업체</div>
          <div class="ip_sup2">
            <div>
              <input name="custCd" :disabled="true" v-model="fieldValues.custCd" class="ip1" />
            </div>
            <div>
              <input
                type="text"
                name="custNm"
                :disabled="true"
                v-model="fieldValues.custNm"
                @input="handleChangeField"
                class="ip1"
              />
            </div>
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>계근대 방향1</div>
          <div class="formbox">
            <select
              mastCd="W_PLC_NODE_CD"
              name="wbrdgCd"
              topSelected="선택"
              :disabled="isFieldDisabled(state, 'wbrdgCd', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.wbrdgCd"
              class="ip1"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>계근대 방향2</div>
          <div class="formbox">
            <select
              mastCd="W_PLC_NODE_CD"
              name="wbrdgCd2"
              topSelected="선택"
              :disabled="isFieldDisabled(state, 'wbrdgCd2', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.wbrdgCd2"
              class="ip1"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>활성화 여부</div>
          <div class="formbox">
            <select
              mastCd="INHOUSE_ENABLE_YN"
              name="appWeighUseYn"
              topSelected="선택"
              :disabled="isFieldDisabled(state, 'appWeighUseYn', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.appWeighUseYn"
              class="ip1"
            />
          </div>
        </li>
        <li class="doublehalf"></li>
        <li class="doublehalf"></li>
        <li class="doublehalf"></li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import SearchBar from "./SearchBar.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import osq from "@/images/osq.png";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";
import { isFieldDisabled } from "@/utils/validators";

// import React, {
//   useState,
//   useCallback,
//   useEffect,
//   useRef,
//   useLayoutEffect,
// } from "react";
// import SearchBar from "./SearchBar";
// import {
//   getGridValidateCheck,
//   saveGridCheckData,
//   isFieldDisabled,
// } from "../../../utils/validators";
// import ButtonBar from "../../../components/Layout/ButtonBar";
// import { useAxiosWithAuthorization } from "../../../utils/api";
// import { ModalConfirm } from "../../../components/Confirm";
// import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
// import { columnLayout } from "./conlumnLayout";
// import { INITIAL_FIELD_RULES } from "./validateFields";
// import useAppContext from "../../../utils/Reducers";
// import AUIGrid from "../../../lib/AuiGrid/AUIGridReact";
// import { ModalCarSearchPop } from "../../Popup/CarSearchPop";
// import SelectBox from "../../../components/SelectBox";

const menuInfo = ref({
  menuNmKor: "사내이송차량설정",
  menuAuth: {
    searchAuthYn: "Y",
    newAuthYn: "Y",
    delAuthYn: "Y",
    saveAuthYn: "Y",
    excelAuthYn: "Y",
    printAuthYn: "N",
  },
});

const myGrid = ref();

const state = ref("normaled");

const userInfo = ref({
  userId: "",
  systemCd: "",
});

// onMounted(() => {
//   const auiGrid = myGrid.current;
//   auiGrid.resize("100%", "200%");
// }, [menuKey]);

//추가, 수정일때 항목의 disabled 결정
const disabledFields = {
  created: [],
  updated: ["carNo"],
};

const initItem = {
  carNo: "",
  carWeight: "",
  carWeightRDt: "",
  custCd: "",
  custNm: "",
  prodCd: "",
  prodNm: "",
  inptDt: "",
  wbrdgCd: "",
  wbrdgCd2: "",
  wbrdgNm: "",
  wbrdg2Nm: "",
  appWeighUseYn: "",
};
const fieldValues = ref(initItem);

//검색 URL
const SERARCH_INHOUSESETTING_URL = "/weightsetting/inhousesetting/searchInhouseSettingList";
//저장 URL
const SAVE_INHOUSESETTING_URL = "/weightsetting/inhousesetting/saveInhouseSettingList";

// const [, fetchData] = useAxiosWithAuthorization(
//   {
//     url: SERARCH_INHOUSESETTING_URL,
//   },
//   { manual: true }
// );

// 검색조건 필드
const primaryParameters = ref({
  category: "",
  custCd: "",
  custNm: "", //거래처 명
  prodCd1: "", //제품코드
  prodNm: "", //제품명
  carNo: "",
});

//검색조건
const setSearchParameters = (values) => {
  primaryParameters.value = { ...primaryParameters, carNo: values.carNo };
};

//코드 및 그리드 초기화 및 생성
onMounted(() => {
  // const auiGrid = myGrid.current;
  // auiGrid.bind("cellClick", function (event) {
  //   gridCellClick(event.item);
  // });
}, []);

const gridCellClick = (item) => {
  // // 추가 : editable, 수정 : edtiable, 삭제 : readonly
  // //read
  // //setFieldsEnabled(auiGrid, item, disabledFields);
  // const auiGrid = myGrid.current;
  // if (auiGrid.isAddedById(item._$uid)) {
  //   setState("created");
  // } else if (auiGrid.isEditedById(item._$uid)) {
  //   setState("updated");
  // } else if (auiGrid.isRemovedById(item._$uid)) {
  //   setState("deleted");
  //
  // } else {
  //   setState("updated");
  // }
  // let initMap = {};
  // for (var name in initItem) {
  //   initMap[name] = item[name];
  //   if (item[name] === undefined) {
  //     initMap[name] = "";
  //   }
  // }
  // setFieldValues(initMap);
};

const handleMasterSearch = async () => {
  // const auiGrid = myGrid.current;
  // auiGrid.showAjaxLoader();
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SERARCH_INHOUSESETTING_URL,
  //   params: primaryParameters,
  // });
  // auiGrid.setGridData(data);
  // setFieldValues(initItem);
  // auiGrid.removeAjaxLoader();
};

const handleMasterNew = () => {
  // const auiGrid = myGrid.current;
  // auiGrid.addRow(initItem, "last");
  // setFieldValues(initItem);
  // const items = auiGrid.getSelectedItems()[0];
  // gridCellClick(items.item);
};

const handleMasterDelete = () => {
  // const auiGrid = myGrid.current;
  // auiGrid.removeRow("selectedIndex");
};

const checkDuplicate = (items) => {
  // const carNo = items.map((item) => item.carNo);
  // const duplicates = carNo.filter(
  //   (number, index) => carNo.indexOf(number) !== index
  // );
  // return duplicates.length > 0 ? duplicates : null;
};

const handleMasterSave = async () => {
  // if (
  //   await ModalConfirm({
  //     title: "저장",
  //     description: "데이터를 저장하시겠습니까?",
  //   })
  // ) {
  //   let validator = [];
  //   const auiGrid = myGrid.current;
  //   var items = auiGrid.getGridData();
  //   const result = getGridValidateCheck(auiGrid, items, INITIAL_FIELD_RULES);
  //   if (result.isValidate) {
  //     document.getElementsByName(result.column)[0].focus();
  //     ModalConfirm({
  //       title: "필수항목체크",
  //       description: result.message,
  //       type: "alert",
  //     });
  //     auiGrid.setSelectionByIndex(result.rowIndex);
  //     gridCellClick(result.rowItem);
  //     return;
  //   }
  //   const duplicates = checkDuplicate(items);
  //   if (duplicates !== null && duplicates.length > 0) {
  //     ModalConfirm({
  //       title: "중복된 차량번호",
  //       description: `중복된 차량번호가 있습니다: ${duplicates.join(", ")}`,
  //       type: "alert",
  //     });
  //     const duplicateRowIndex = items.findIndex(
  //       (item) => item.carNo === duplicates[0]
  //     );
  //     if (duplicateRowIndex !== -1) {
  //       auiGrid.setSelectionByIndex(duplicateRowIndex);
  //       auiGrid.setFocusedCell(duplicateRowIndex, "carNo");
  //     }
  //     return;
  //   }
  //   const addItems = auiGrid.getAddedRowItems();
  //   const editItems = auiGrid.getEditedRowItems();
  //   const removeItems = auiGrid.getRemovedItems();
  //   const menuId = menuKey;
  //   let param = saveGridCheckData(addItems, editItems, removeItems, menuId);
  //   if (param.length > 0) {
  //     const {
  //       data: { data },
  //     } = await fetchData({
  //       url: SAVE_INHOUSESETTING_URL,
  //       data: param,
  //       method: "POST",
  //     });
  //     handleMasterSearch();
  //   } else {
  //     ModalConfirm({
  //       title: "필수항목체크",
  //       description: "저장할 항목이 없습니다.",
  //       type: "alert",
  //     });
  //   }
  // }
};

const handleChangeField = (event) => {
  // const auiGrid = myGrid.current;
  // const { name, value } = event.target;
  // const items = auiGrid.getSelectedItems()[0];
  // const item = items.item;
  // //console.log("name === " + name + " || value === " + value);
  // if (name === "wbrdgCd") {
  //   let val = fieldValues.wbrdgCd2;
  //   if (value === val) {
  //     ModalConfirm({
  //       title: "경고",
  //       description: "계근대 방향1과 방향2가 동일합니다",
  //       type: "alert",
  //     });
  //   }
  // } else if (name === "wbrdgCd2") {
  //   let val = fieldValues.wbrdgCd;
  //   if (value === val) {
  //     ModalConfirm({
  //       title: "경고",
  //       description: "계근대 방향1과 방향2가 동일합니다",
  //       type: "alert",
  //     });
  //   }
  // }
  // item[name] = value;
  // setFieldValues({ ...fieldValues, [name]: value });
  // auiGrid.updateRow(item, "selectedIndex");
};

const handleMasterExcel = () => {
  // const auiGrid = myGrid.current;
  // auiGrid.exportToXlsx({
  //   fileName: props.menuInfo.menuNmKor + " 리스트",
  // });
};

//차량 검색 팝업처리
const handleSearchCar = (carInfo) => {
  // ModalCarSearchPop({ callbackFunc: setCar });
};

const updateGridData = (key, value) => {
  // const auiGrid = myGrid.current;
  // const items = auiGrid.getSelectedItems()[0];
  // const item = items.item;
  // item[key] = value;
  // auiGrid.updateRow(item, "selectedIndex");
};

const setCar = (carInfo) => {
  // setFieldValues({
  //   ...fieldValues,
  //   carNo: carInfo.carFullNo,
  //   drvNm: carInfo.drvNm,
  //   drvTel: carInfo.drvTel,
  //   custCd: carInfo.custCd,
  //   custNm: carInfo.custNm,
  // });
  // updateGridData("carNo", carInfo.carFullNo);
  // updateGridData("drvNm", carInfo.drvNm);
  // updateGridData("drvTel", carInfo.drvTel);
  // updateGridData("custCd", carInfo.custCd);
  // updateGridData("custNm", carInfo.custNm);
};
</script>
