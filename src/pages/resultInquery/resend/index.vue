<template>
  <ButtonBar
    :menuInfo="menuInfo"
    :handleMasterSearch="handleMasterSearch"
    :handleMasterSave="handleMasterSave"
    :handleMasterExcel="handleMasterExcel"
  />
  <SearchBar :setSearchParameters="setSearchParameters" :systemCd="userInfo.systemCd" />

  <div className="grid_wrap">
    <AUIGrid
      ref="myGrid"
      :columnLayout="columnLayout(onRowButtonClick)"
      :gridProps="defaultGridProps"
    />
  </div>
</template>

<script setup>
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
// import { columnLayout } from "./columnLayout";
// import { INITIAL_FIELD_RULES } from "./validateFields";
// import useAppContext from "../../../utils/Reducers";
// import AUIGrid from "../../../lib/AuiGrid/AUIGridReact";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import moment from "moment";
import { onMounted, ref } from "vue";
import SearchBar from "./SearchBar.vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";

//전송버튼을 클릭했을경우 함수가 외부에서 호출하여 primaryParameters 아무값도 들어가 있지 않음
//그래서 플래그를 두어 sendCnt값이 변경되면 useEffect에서 검색버튼의 함수를 실행시킴
let sendCnt = 0;
const menuInfo = ref({
  menuNmKor: "인터페이스 결과조회",
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

const research = ref(0);

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
  wgt: "",
  decreaseWgt: "",
  totalWeight: "",
  inYn: "",
  outYn: "",
  inSendDt: "",
  outSendDt: "",
  isDt: "",
  ifResend: "",
};
const fieldValues = ref(initItem);

//상차지 검색 URL
const SERARCH_RESEND_URL = "/resultinquery/resend/searchResendList";
//상차지 저장 URL
const SAVE_RESEND_URL = "/resultinquery/resend/saveResendList";

// const [, fetchData] = useAxiosWithAuthorization(
//   {
//     url: SERARCH_RESEND_URL,
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
  ifYn: "",
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
    ifYn: values.ifYn,
    startDt: values.startDt,
    endDt: values.endDt,
  };
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
  // console.log(item);
  // setFieldValues(item);
};
const handleMasterSearch = async () => {
  // const auiGrid = myGrid.current;
  // auiGrid.showAjaxLoader();
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SERARCH_RESEND_URL,
  //   params: primaryParameters,
  // });
  // auiGrid.setGridData(data);
  // setFieldValues(initItem);
  // auiGrid.removeAjaxLoader();
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
  //   const addItems = auiGrid.getAddedRowItems();
  //   const editItems = auiGrid.getEditedRowItems();
  //   const removeItems = auiGrid.getRemovedItems();
  //   let param = saveGridCheckData(addItems, editItems, removeItems);
  //   if (param.length > 0) {
  //     const {
  //       data: { data },
  //     } = await fetchData({
  //       url: SAVE_RESEND_URL,
  //       data: param,
  //       method: "POST",
  //     });
  //     handleMasterSearch();
  //   } else {
  //     ModalConfirm({
  //       title: "필수항목체크",
  //       description: "저장할 항목이 없습니다. ",
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

const handleMasterExcel = () => {
  // let exceptColumnFields = [];
  // for (let idx in columnLayout) {
  //   if (columnLayout[idx].visible === false) {
  //     exceptColumnFields.push(columnLayout[idx].dataField);
  //   }
  // }
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
  // });
};

const onRowButtonClick = async (event) => {
  // if (event.item.tmsOdrNo !== "") {
  //   if (
  //     await ModalConfirm({
  //       title: "메시지전송",
  //       description: "인터페이스를 재전송 하겠습니까?",
  //     })
  //   ) {
  //     const {
  //       data: { data },
  //     } = await fetchData({
  //       url: SAVE_RESEND_URL,
  //       data: {
  //         systemCd: event.item.systemCd,
  //         tmsOdrNo: event.item.tmsOdrNo,
  //         transStatusCd: "T",
  //       },
  //       method: "POST",
  //     });
  //     //외부에서 함수를 호출시 검색조건이 초기화되어 검색을 할 수 없음
  //     //그래서 sendCnt값을 setResearch에 넣어 변경을 시킨후 useEffect에서
  //     //research값이 변경되는 것을 체크하여 검색버튼 함수를 실행시킴
  //     sendCnt = sendCnt + 1;
  //     console.log(sendCnt);
  //     setResearch(sendCnt);
  //   }
  // }
};
</script>
