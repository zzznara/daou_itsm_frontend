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

  <div className="grid_wrap">
    <AUIGrid ref="myGrid" :columnLayout="columnLayout" :gridProps="defaultGridProps" />
  </div>
</template>
<script setup>
import moment from "moment";
import { onMounted, ref } from "vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";
import SearchBar from "./SearchBar.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import ButtonBar from "@/components/ButtonBar/index.vue";

// import React, {
//   ref,
//   useCallback,
//   useEffect,
//   ref,
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
// import osq from "../../../images/osq.png";
// import SelectBox from "../../../components/SelectBox";
// import useAppContext from "../../../utils/Reducers";
// import { ajusta } from "../../../utils/validators";
// import AUIGrid from "../../../lib/AuiGrid/AUIGridReact";
// import moment from "moment";
// //import PhoneInput from "react-phone-number-input/input";
// import { ModalImgShowPop } from "../../Popup/ImgShowPop";

const menuInfo = ref({
  menuNmKor: "계근결과조회",
  menuAuth: {
    searchAuthYn: "Y",
    newAuthYn: "N",
    delAuthYn: "N",
    saveAuthYn: "N",
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
// useEffect(() => {
//   const auiGrid = myGrid.current;
//   auiGrid.resize("100%", "100%");
// }, [menuKey]);

//추가, 수정일때 항목의 disabled 결정
const disabledFields = {
  created: [],
  updated: ["systemCd", "userId"],
};

const initItem = {
  categoryNm: "", // 업무 구분
  ioGbNm: "", // 매입매출 구분
  custCd: "", //업체 코드
  custNm: "",
  prodCd: "", //고철품목코드
  prodCd1: "", //고철코드
  prodNm: "",
  carNo: "",
  drvNm: "",
  drvTel: "",
  wssSeq: "",
  inWeight: "",
  outWeight: "",
  decreaseWgt: "",
  wgt: "",
  isDt: "", // 계량일자
};
const fieldValues = ref(initItem);

//상차지 검색 URL
const SERARCH_RESULT_URL = "/resultinquery/result/searchResultList";

// const [, fetchData] = useAxiosWithAuthorization(
//   {
//     url: SERARCH_RESULT_URL,
//   },
//   { manual: true }
// );

const primaryParameters = ref({
  category: "",
  custCd: "",
  custNm: "", //거래처명
  prodCd1: "", //제품코드
  prodNm: "", //제품명
  carNo: "",
  startDt: moment().format("YYYY-MM-DD"),
  endDt: moment().format("YYYY-MM-DD"),
});

//검색조건
const setSearchParameters = (values) => {
  // console.log(values);
  primaryParameters.value = {
    ...primaryParameters,
    category: values.category,
    custCd: values.custCd,
    custNm: values.custNm,
    prodCd1: values.prodCd1,
    prodNm: values.prodNm,
    carNo: values.carNo,
    startDt: values.startDt,
    endDt: values.endDt,
  };
};

//코드 및 그리드 초기화 및 생성
onMounted(() => {
  // columnLayout[14].renderer.@click = (event) => {
  //   console.log(
  //   //   event.type,
  //   //   event.pid,
  //   //   event.rowIndex,
  //   //   event.columnIndex,
  //   //   event.text,
  //   //   event.item,
  //   //   event.dataField
  //   // );
  //   //개발
  //   let imgHost = "localhost";
  //   let port = "28082";
  //   if (window.location.host === "wss.ekosco.com") {
  //     imgHost = "wssm.ekosco.com";
  //     port = "28084";
  //   } else if (window.location.host === "testwss.ekosco.com") {
  //     imgHost = "testwssm.ekosco.com";
  //     port = "28082";
  //   }
  //   let url =
  //     window.location.protocol +
  //     "//" +
  //     //window.location.host +
  //     imgHost +
  //     ":" +
  //     port +
  //     "/file/getOrgAttachImage/" +
  //     event.item.sg011 +
  //     "/" +
  //     event.item.dt011.replace(/\-/g, "") +
  //     "/" +
  //     event.item.seq011 +
  //     "/ATTC_01";
  //   //alert(url);
  //   ModalImgShowPop({
  //     imgUrl: url,
  //   });
  // };
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
  // console.log(item);
  // setFieldValues(item);
};

const handleMasterSearch = async () => {
  // const auiGrid = myGrid.current;
  // auiGrid.showAjaxLoader();
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SERARCH_RESULT_URL,
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
  //   // const addItems = auiGrid.getAddedRowItems();
  //   // const editItems = auiGrid.getEditedRowItems();
  //   // const removeItems = auiGrid.getRemovedItems();
  //   // let param = saveGridCheckData(addItems, editItems, removeItems);
  //   // if (param.length > 0) {
  //   //   const {
  //   //     data: { data },
  //   //   } = await fetchData({
  //   //     url: SAVE_USER_URL,
  //   //     data: param,
  //   //     method: "POST",
  //   //   });
  //   //   handleMasterSearch();
  //   // } else {
  //   //   ModalConfirm({
  //   //     title: "필수항목체크",
  //   //     description: "저장할 항목이 없습니다. ",
  //   //     type: "alert",
  //   //   });
  //   // }
  // }
};

const handleChangeField = (event) => {
  // const auiGrid = myGrid.current;
  // const { name, value } = event.target;
  // const items = auiGrid.getSelectedItems()[0];
  // const item = items.item;
  // console.log("name === " + name + " || value === " + value);
  // if (name === "telNo" || name === "mobileNo") {
  //   //전화번호 관련 함수 정의
  //   const regex = /^[0-9\b -]{0,13}$/;
  //   if (regex.test(value)) {
  //     const phone = ajusta(value);
  //     item[name] = phone;
  //     setFieldValues({ ...fieldValues, [name]: phone });
  //   }
  // } else {
  //   item[name] = value;
  //   setFieldValues({ ...fieldValues, [name]: value });
  // }
  // auiGrid.updateRow(item, "selectedIndex");
};

const handleMasterExcel = () => {
  // let exceptColumnFields = [];
  // for (let idx in columnLayout) {
  //   if (
  //     columnLayout[idx].visible === false &&
  //     columnLayout[idx].dataField !== "fileYn"
  //   ) {
  //     exceptColumnFields.push(columnLayout[idx].dataField);
  //   }
  // }
  // exceptColumnFields.push("fileUri");
  // let today = new Date();
  // let todayStr = today.getFullYear();
  // todayStr +=
  //   today.getMonth() + 1 < 10
  //     ? "0" + (today.getMonth() + 1)
  //     : "" + (today.getMonth() + 1);
  // todayStr +=
  //   today.getDate() + 1 < 10 ? "0" + today.getDate() : "" + today.getDate();
  // const auiGrid = myGrid.current;
  // auiGrid.exportToXlsx({
  //   fileName: props.menuInfo.menuNmKor + " 리스트_" + todayStr,
  //   exceptColumnFields: exceptColumnFields,
  //   beforeRequestCallback: function () {
  //     auiGrid.showColumnByDataField("fileYn");
  //     auiGrid.hideColumnByDataField("fileUri");
  //   },
  //   afterRequestCallback: function () {
  //     auiGrid.hideColumnByDataField("fileYn");
  //     auiGrid.showColumnByDataField("fileUri");
  //   },
  // });
};
</script>
