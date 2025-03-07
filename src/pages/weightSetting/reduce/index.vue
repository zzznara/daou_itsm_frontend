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
        <img :src="osq" /> &nbsp;감량코드설정 &nbsp;
        <br />
      </h5>
      <ul class="t_form">
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>감량코드</div>
          <div class="formbox">
            <input
              type="text"
              name="reduceCd"
              :disabled="isFieldDisabled(state, 'reduceCd', disabledFields)"
              v-model="fieldValues.reduceCd"
              @change="handleChangeField"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">비고설명</div>
          <div class="formbox">
            <input
              type="text"
              name="reduceDesc"
              :disabled="isFieldDisabled(state, 'reduceDesc', disabledFields)"
              @change="handleChangeField"
              v-model="fieldValues.reduceDesc"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>단위수량별 감량기준</div>
          <div class="formbox">
            <input
              type="text"
              name="unitWeight"
              :disabled="isFieldDisabled(state, 'unitWeight', disabledFields)"
              @change="handleChangeField"
              v-model="fieldValues.unitWeight"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">제품명</div>
          <div class="ip_textandbutton">
            <div>
              <input
                type="text"
                name="prodNm"
                :disabled="
                  isFieldDisabled(state, 'prodNm', disabledFields, fieldValues.isForceDisable)
                "
                v-model="fieldValues.prodNm"
                @change="handleChangeField"
                @keydown="setItemTxt"
                @blur="chkItemData"
                class="ip1"
              />
            </div>
            <div>
              <button
                type="button"
                :disabled="
                  isFieldDisabled(state, 'prodNm', disabledFields, fieldValues.isForceDisable)
                "
                @click="handleSearchItem"
                class="btn_ip"
              >
                검색
              </button>
            </div>
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>거래처</div>
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
                @change="handleChangeField"
                class="ip1"
              />
            </div>
            <div>
              <button
                type="button"
                :disabled="
                  isFieldDisabled(state, 'custCd', disabledFields, fieldValues.isForceDisable)
                "
                @click="handleSearchCustomer"
                class="btn_ip"
              >
                검색
              </button>
            </div>
          </div>
        </li>
        <li class="doublehalf"></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import osq from "@/images/osq.png";
import SearchBar from "./SearchBar.vue";
import { isFieldDisabled } from "@/utils/validators";
import { onMounted, ref } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";

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
// import { useAxiosWithAuthorization } from "../../../utils/api";
// import { ModalConfirm } from "../../../components/Confirm";
// import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
// import { INITIAL_FIELD_RULES } from "./validateFields";
// import useAppContext from "../../../utils/Reducers";
// import AUIGrid from "../../../lib/AuiGrid/AUIGridReact";
// import { ModalCustomerSearchPop } from "../../Popup/CustomerSearchPop";
// import { ModalItemTypeSearchPop } from "../../Popup/ItemTypeSearchPop";
// //import PhoneInput from "react-phone-number-input/input";

const menuInfo = ref({
  menuNmKor: "감량설정",
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
const oldValues = ref({
  custNm: "",
  prodNm: "",
});

// onMounted(() => {
//   const auiGrid = myGrid.current;
//   auiGrid.resize("100%", "100%");
// }, [menuKey]);

//추가, 수정일때 항목의 disabled 결정
const disabledFields = {
  created: [],
  updated: ["reduceCd", "custCd"],
};

const initItem = {
  reduceCd: "",
  reduceDesc: "",
  unitWeight: "",
  custCd: "",
  custNm: "",
  inptDt: "",
  prodNm: "",
};
const fieldValues = ref(initItem);

//상차지 검색 URL
const SERARCH_REDUCE_URL = "/weightsetting/reduce/searchReduceList";
//상차지 저장 URL
const SAVE_REDUCE_URL = "/weightsetting/reduce/saveReduceList";

// const [, fetchData] = useAxiosWithAuthorization(
//   {
//     url: SERARCH_REDUCE_URL,
//   },
//   { manual: true }
// );

const primaryParameters = ref({
  reduceCd: "",
  custNm: "",
});

//검색조건
const setSearchParameters = (values) => {
  primaryParameters.value = {
    ...primaryParameters,
    reduceCd: values.reduceCd,
    custNm: values.custNm,
  };
};

//코드 및 그리드 초기화 및 생성
// onMounted(() => {
//   const auiGrid = myGrid.current;
//   auiGrid.bind("cellClick", function (event) {
//     gridCellClick(event.item);
//   });
// });

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
  // console.log(item);
  // setFieldValues(item);
};
const handleMasterSearch = async () => {
  // const auiGrid = myGrid.current;
  // auiGrid.showAjaxLoader();
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SERARCH_REDUCE_URL,
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
  // const custNm = items.map((item) => item.custNm);
  // const reduceCd = items.map((item) => item.reduceCd);
  // const custNmDuplicates = custNm.filter(
  //   (name, index) => custNm.indexOf(name) !== index
  // );
  // const reduceCdDuplicates = reduceCd.filter(
  //   (code, index) => reduceCd.indexOf(code) !== index
  // );
  // if (custNmDuplicates.length > 0 || reduceCdDuplicates.length > 0) {
  //   return {
  //     custNmDuplicates,
  //     reduceCdDuplicates,
  //   };
  // }
  // return null;
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
  //   // reduceCd와 custNm 중복 체크
  //   const duplicates = checkDuplicate(items);
  //   if (duplicates.length > 0) {
  //     ModalConfirm({
  //       title: "중복된 항목",
  //       description: `중복된 항목이 있습니다: ${duplicates.join(", ")}`,
  //       type: "alert",
  //     });
  //     const duplicateRowIndex = items.findIndex(
  //       (item) =>
  //         item.reduceCd === duplicates[0].reduceCd &&
  //         item.custNm === duplicates[0].custNm
  //     );
  //     if (duplicateRowIndex !== -1) {
  //       auiGrid.setSelectionByIndex(duplicateRowIndex);
  //       auiGrid.setFocusedCell(duplicateRowIndex, "reduceCd");
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
  //       url: SAVE_REDUCE_URL,
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
  // console.log("name === " + name + " || value === " + value);
  // item[name] = value;
  // setFieldValues({ ...fieldValues, [name]: value });
  // auiGrid.updateRow(item, "selectedIndex");
};

const setCustTxt = (evt) => {
  // console.log(evt.key, evt.code, evt.keyCode);
  // if (evt.keyCode === 8 || evt.keyCode === 46) {
  //   setFieldValues({
  //     ...fieldValues,
  //     custCd: "",
  //     custNm: "",
  //   });
  //   updateGridData("custCd", "");
  //   updateGridData("custNm", "");
  // }
};

const handleMasterExcel = () => {
  // const auiGrid = myGrid.current;
  // auiGrid.exportToXlsx({
  //   fileName: props.menuInfo.menuNmKor + " 리스트",
  // });
};

const handleSearchCustomer = () => {
  // ModalCustomerSearchPop({
  //   callbackFunc: setCustInfo,
  //   isContainAll: "Y",
  // });
};

const setCustInfo = (custInfo) => {
  // setFieldValues({
  //   ...fieldValues,
  //   custCd: custInfo.custCd,
  //   custNm: custInfo.custNm,
  // });
  // updateGridData("custCd", custInfo.custCd);
  // updateGridData("custNm", custInfo.custNm);
};

const updateGridData = (key, value) => {
  // const auiGrid = myGrid.current;
  // const items = auiGrid.getSelectedItems()[0];
  // const item = items.item;
  // item[key] = value;
  // auiGrid.updateRow(item, "selectedIndex");
};

//품번 팝업처리
const handleSearchItem = () => {
  // ModalItemTypeSearchPop({
  //   itemType: "PROD_TYPE",
  //   category: "",
  //   searchTxt: fieldValues.prodNm,
  //   callbackFunc: setItemInfo,
  // });
};

const setItemTxt = (evt) => {
  // if (evt.keyCode === 13 || evt.keyCode === 9) {
  //   //enter key or tab key
  //   ModalItemTypeSearchPop({
  //     itemType: "PROD_TYPE",
  //     category: "4", //구매용만 조회
  //     callbackFunc: setItemInfo,
  //     searchTxt: fieldValues.prodNm,
  //   });
  // }

  if (evt.keyCode === 13) {
    evt.target.blur();
  }
};

const chkItemData = (evt) => {
  // if (evt.target.value !== undefined && evt.target.value !== "") {
  //   ModalItemTypeSearchPop({
  //     itemType: "PROD_TYPE",
  //     category: fieldValues.category,
  //     callbackFunc: setItemInfo,
  //     searchTxt: fieldValues.prodNm,
  //     autoSelect: true,
  //     failCallbackFunc: restoreItemInfo,
  //   });
  // }
};

const setItemInfo = (itemInfo) => {
  //   setFieldValues({
  //     ...fieldValues,
  //     prodNm: itemInfo.cdNmKor,
  //   });
  //   setOldValues({ ...oldValues, prodNm: itemInfo.cdNmKor });
  //   updateGridData("prodNm", itemInfo.cdNmKor);
};

const restoreItemInfo = () => {
  // setFieldValues({
  //   ...fieldValues,
  //   prodNm: oldValues.prodNm,
  // });
};
</script>
