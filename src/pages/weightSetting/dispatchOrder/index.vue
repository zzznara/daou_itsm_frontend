<!-- 차량계량설정-배차순서설정 -->
<template>
  <ButtonBar
    :menuInfo="menuInfo"
    :handleMasterSearch="handleMasterSearch"
    :handleMasterSave="handleMasterSave"
    :handleMasterExcel="handleMasterExcel"
  />
  <SearchBar :setSearchParameters="setSearchParameters" :systemCd="userInfo.systemCd" />
  <div style="text-align: right; padding-bottom: 10px">
    <button @click="toUp" class="btn_ip" style="width: 100px">위로▲</button>
    <span>&nbsp;&nbsp;</span>
    <button @click="toDown" class="btn_ip" style="width: 100px">아래로▼</button>
  </div>
  <div class="grid_wrap col_2">
    <div class="half">
      <AUIGrid ref="myGrid" :columnLayout="columnLayout" :gridProps="defaultGridProps" />
    </div>
    <div class="half">
      <AUIGrid ref="myGrid1" :columnLayout="detailColumnlayout" :gridProps="defaultGridProps" />
    </div>
  </div>
</template>
<script setup>
import ButtonBar from "@/components/ButtonBar/index.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import SearchBar from "./SearchBar.vue";
import { onMounted, ref } from "vue";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";
import { columnLayout } from "./columnLayout";
import { columnLayout as detailColumnlayout } from "./detailColumnLayout";

// import React, {
//   useState,
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
// import { useAxiosWithAuthorization } from "../../../utils/api";
// import { ModalConfirm } from "../../../components/Confirm";
// import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
// import { columnLayout } from "./conlumnLayout";
// import { columnLayout as detailColumnlayout } from "./detailConlumnLayout";
// import { INITIAL_FIELD_RULES } from "./validateFields";
// import osq from "../../../images/osq.png";
// import SelectBox from "../../../components/SelectBox";
// import useAppContext from "../../../utils/Reducers";
// import { ajusta } from "../../../utils/validators";
// import AUIGrid from "../../../lib/AuiGrid/AUIGridReact";
// import { alignPropType } from "react-bootstrap/esm/types";
// import SearchBar from "./SearchBar.vue";
// import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
// //import PhoneInput from "react-phone-number-input/input";

const menuInfo = ref({
  menuNmKor: "배차순서설정",
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
const myGrid1 = ref();

const state = ref("normaled");

const userInfo = ref({
  userId: "",
  systemCd: "",
});

// onMounted(() => {
//   const auiGrid = myGrid.current;
//   auiGrid.resize("100%", "100%");

//   const auiGrid1 = myGrid1.current;
//   auiGrid1.resize("100%", "100%");
// }, [menuKey]);

//추가, 수정일때 항목의 disabled 결정
const disabledFields = {
  created: [],
  updated: ["systemCd", "userId"],
};

const initCarItem = {
  dt: "",
  carNo: "",
  drvNm: "",
  drvTel: "",
};
const fieldValues = ref(initCarItem);

//차량 검색 URL
const SERARCH_CAR_URL = "/weightsetting/dispatchOrder/SearchCarList";
//차량 배차 검색 URL
const SERARCH_CAR_DISPATCH_URL = "/weightsetting/dispatchOrder/SearchCarDispatchOrderList";
const CHK_CAR_RECORD_URL = "/weightsetting/dispatchOrder/chkRecord";

//저장 URL
const SAVE_USER_URL = "/weightsetting/dispatchOrder/SaveCarDispatchOrderList";

// const [, fetchData] = useAxiosWithAuthorization(
//   {
//     url: SERARCH_CAR_URL,
//   },
//   { manual: true }
// );

// const [, fetchData2] = useAxiosWithAuthorization(
//   {
//     url: SERARCH_CAR_DISPATCH_URL,
//   },
//   { manual: true }
// );

// const [, fetchChkData] = useAxiosWithAuthorization(
//   {
//     url: CHK_CAR_RECORD_URL,
//   },
//   { manual: true }
// );

const primaryParameters = ref({
  dt: "",
  carNo: "",
});

//검색조건
const setSearchParameters = (values) => {
  primaryParameters.value = values;
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
  // setFieldValues(item);
  // handleDetailSearch(item.dt, item.carNo);
};

const handleDetailSearch = async (dt, carNo) => {
  // const auiGrid = myGrid1.current;
  // auiGrid.showAjaxLoader();
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SERARCH_CAR_DISPATCH_URL,
  //   params: { dt: dt, carNo: carNo },
  // });
  // auiGrid.setGridData(data);
  // //setFieldValues(initCarItem);
  // auiGrid.removeAjaxLoader();
};

const handleMasterSearch = async () => {
  // const auiGrid = myGrid.current;
  // auiGrid.showAjaxLoader();
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SERARCH_CAR_URL,
  //   params: primaryParameters,
  // });
  // auiGrid.setGridData(data);
  // //setFieldValues(initCarItem);
  // auiGrid.removeAjaxLoader();
  // if (data != undefined && data.length > 0) {
  //   let item = data[0];
  //   handleDetailSearch(item.dt, item.carNo);
  // }
};

const handleMasterSave = async () => {
  // if (
  //   await ModalConfirm({
  //     title: "저장",
  //     description: "데이터를 저장하시겠습니까?",
  //   })
  // ) {
  //   let validator = [];
  //   const auiGrid = myGrid1.current;
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
  //   const menuId = menuKey;
  //   let param = saveGridCheckData(addItems, editItems, removeItems, menuId);
  //   console.log(param);
  //   if (param.length > 0) {
  //     const {
  //       data: { data },
  //     } = await fetchData({
  //       url: SAVE_USER_URL,
  //       data: param,
  //       method: "POST",
  //     });
  //     let item = auiGrid.getSelectedItems()[0].item;
  //     handleDetailSearch(item.dt, item.carNo);
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
  //   const auiGrid = myGrid.current;
  //   const { name, value } = event.target;
  //   const items = auiGrid.getSelectedItems()[0];
  //   const item = items.item;
  //   console.log("name === " + name + " || value === " + value);
  //   if (name === "telNo" || name === "mobileNo") {
  //     //전화번호 관련 함수 정의
  //     const regex = /^[0-9\b -]{0,13}$/;
  //     if (regex.test(value)) {
  //       const phone = ajusta(value);
  //       item[name] = phone;
  //       setFieldValues({ ...fieldValues, [name]: phone });
  //     }
  //   } else {
  //     item[name] = value;
  //     setFieldValues({ ...fieldValues, [name]: value });
  //   }
  //   auiGrid.updateRow(item, "selectedIndex");
};

const handleMasterExcel = () => {
  // const auiGrid = myGrid.current;
  // auiGrid.exportToXlsx({
  //   fileName: props.menuInfo.menuNmKor + " 리스트",
  // });
};

const toUp = async () => {
  // const auiGrid = myGrid1.current;
  // if (auiGrid.getRowCount() === 1) {
  //   return;
  // }
  // let [rowIdx, colIdx] = auiGrid.getSelectedIndex();
  // if (rowIdx === 0) {
  //   return;
  // }
  // let item = auiGrid.getSelectedItems(myGrid1)[0].item;
  // const {
  //   data: { data },
  // } = await fetchChkData({
  //   url: CHK_CAR_RECORD_URL,
  //   params: { sg: item.sg, dt: item.dt, seq: item.seq },
  // });
  // //console.log(data, data[0].cnt);
  // if (data.length > 0 && data[0].cnt !== 0) {
  //   alert("입차 된 차량은 변경할 수 없습니다");
  //   return;
  // }
  // //계산이 귀찮으니 그리드의 전체 turn을 모두 가져온다
  // let gridData = auiGrid.getGridData();
  // let turnArr = [];
  // for (let i = 0; i < gridData.length; i++) {
  //   turnArr.push(gridData[i].turn);
  // }
  // if (auiGrid.getSelectedItems().length > 0) {
  //   if (auiGrid.getSelectedItems()[0].item.mixCd !== undefined) {
  //     //움직이려는 Row가 혼적인경우
  //     let targetArr = auiGrid.getRowsByValue(
  //       "mixCd",
  //       auiGrid.getSelectedItems()[0].item.mixCd
  //     );
  //     //혼적 최초idx
  //     let firstMixCarIdx = auiGrid.getRowIndexesByValue(
  //       "turn",
  //       targetArr[0].turn
  //     )[0];
  //     //다음ROW 계산
  //     let lastMixCarTurn = targetArr[targetArr.length - 1].turn;
  //     let lastMixCarIdx = auiGrid.getRowIndexesByValue(
  //       "turn",
  //       lastMixCarTurn
  //     )[0];
  //     let nextIdx = Number(firstMixCarIdx) - 1;
  //     if (auiGrid.getCellValue(nextIdx, "mixCd") !== undefined) {
  //       //대상 ROW가 혼적인 경우
  //       //움직이려는 합차분을 제외하고 대상 컬럼이 또 합차인 경우
  //       //다음 혼적 시작 ~ 마지막 개수 체크
  //       let nextRowArr = auiGrid.getRowsByValue(
  //         "mixCd",
  //         auiGrid.getCellValue(nextIdx, "mixCd")
  //       );
  //       //console.log(nextRowArr);
  //       auiGrid.setSelectionMode("multipleRows");
  //       for (let i = 0; i < nextRowArr.length; i++) {
  //         //console.log(Number(firstMixCarIdx) - i, Number(lastMixCarIdx) - i);
  //         auiGrid.setSelectionBlock(
  //           Number(firstMixCarIdx) - i,
  //           Number(lastMixCarIdx) - i,
  //           1,
  //           1
  //         );
  //         auiGrid.moveRowsToUp();
  //       }
  //       auiGrid.setSelectionMode("singleRow");
  //       auiGrid.setSelectionByIndex(rowIdx - nextRowArr.length);
  //       //turn 재설정
  //       for (let i = 0; i < gridData.length; i++) {
  //         auiGrid.updateRow({ turn: turnArr[i] }, i);
  //       }
  //       setState("updated");
  //     } else {
  //       //대상 ROW가 혼적이 아닌 경우
  //       //합차분 뭉텡이로 올리기
  //       auiGrid.setSelectionMode("multipleRows");
  //       console.log("block ", firstMixCarIdx[0], lastMixCarIdx);
  //       auiGrid.setSelectionBlock(firstMixCarIdx, lastMixCarIdx, 1, 1);
  //       auiGrid.moveRowsToUp();
  //       auiGrid.setSelectionMode("singleRow");
  //       auiGrid.setSelectionByIndex(rowIdx - 1);
  //       //turn 재설정
  //       for (let i = 0; i < gridData.length; i++) {
  //         auiGrid.updateRow({ turn: turnArr[i] }, i);
  //       }
  //       setState("updated");
  //     }
  //   } else {
  //     //움직이려는 Row가 혼적이 아닌 경우
  //     let fromIdx = auiGrid.getSelectedIndex()[0];
  //     let nextIdx = auiGrid.getSelectedIndex()[0] - 1;
  //     if (auiGrid.getCellValue(nextIdx, "mixCd") !== undefined) {
  //       //대상ROW가 혼적인 경우
  //       let targetArr = auiGrid.getRowsByValue(
  //         "mixCd",
  //         auiGrid.getCellValue(nextIdx, "mixCd")
  //       );
  //       //혼적 최초idx
  //       let firstMixCarIdx = auiGrid.getRowIndexesByValue(
  //         "turn",
  //         targetArr[0].turn
  //       )[0];
  //       //다음ROW 계산
  //       let lastMixCarTurn = targetArr[targetArr.length - 1].turn;
  //       let lastMixCarIdx = auiGrid.getRowIndexesByValue(
  //         "turn",
  //         lastMixCarTurn
  //       )[0];
  //       auiGrid.setSelectionMode("multipleRows");
  //       console.log("block ", firstMixCarIdx[0], lastMixCarIdx);
  //       auiGrid.setSelectionBlock(firstMixCarIdx, lastMixCarIdx, 1, 1);
  //       auiGrid.moveRowsToDown();
  //       auiGrid.setSelectionMode("singleRow");
  //       auiGrid.setSelectionByIndex(rowIdx - targetArr.length);
  //       //turn 재설정
  //       for (let i = 0; i < gridData.length; i++) {
  //         auiGrid.updateRow({ turn: turnArr[i] }, i);
  //       }
  //       setState("updated");
  //     } else {
  //       //대상ROW가 혼적이 아닌 경우
  //       //alert("다음꺼 합차 아님!");
  //       auiGrid.moveRowsToUp();
  //       // let curTurn = auiGrid.getSelectedItems(myGrid1)[0].item.turn;
  //       // let chgTurn = auiGrid.getSelectedItems(myGrid1)[0].item.turn - 1;
  //       // console.log(curTurn, chgTurn);
  //       // auiGrid.updateRow({ turn: chgTurn }, rowIdx - 1);
  //       // auiGrid.updateRow({ turn: curTurn }, rowIdx);
  //       //turn 재설정
  //       for (let i = 0; i < gridData.length; i++) {
  //         auiGrid.updateRow({ turn: turnArr[i] }, i);
  //       }
  //       setState("updated");
  //     }
  //   }
  // }
  // // auiGrid.moveRowsToUp();
  // // let curTurn = auiGrid.getSelectedItems(myGrid1)[0].item.turn;
  // // let chgTurn = auiGrid.getSelectedItems(myGrid1)[0].item.turn - 1;
  // // console.log(curTurn, chgTurn);
  // // auiGrid.updateRow({ turn: chgTurn }, rowIdx - 1);
  // // auiGrid.updateRow({ turn: curTurn }, rowIdx);
  // setState("updated");
  // //console.log(auiGrid.getEditedRowItems());
};

const toDown = async () => {
  // const auiGrid = myGrid1.current;
  // if (auiGrid.getRowCount() === 1) {
  //   return;
  // }
  // let [rowIdx, colIdx] = auiGrid.getSelectedIndex();
  // if (rowIdx === auiGrid.getRowCount() - 1) {
  //   return;
  // }
  // let item = auiGrid.getSelectedItems(myGrid1)[0].item;
  // const {
  //   data: { data },
  // } = await fetchChkData({
  //   url: CHK_CAR_RECORD_URL,
  //   params: { sg: item.sg, dt: item.dt, seq: item.seq },
  // });
  // //console.log(data, data[0].cnt);
  // if (data.length > 0 && data[0].cnt !== 0) {
  //   alert("입차 된 차량은 변경할 수 없습니다");
  //   return;
  // }
  // //계산이 귀찮으니 그리드의 전체 turn을 모두 가져온다
  // let gridData = auiGrid.getGridData();
  // let turnArr = [];
  // for (let i = 0; i < gridData.length; i++) {
  //   turnArr.push(gridData[i].turn);
  // }
  // if (auiGrid.getSelectedItems().length > 0) {
  //   if (auiGrid.getSelectedItems()[0].item.mixCd !== undefined) {
  //     //움직이려는 Row가 혼적인경우
  //     // alert(
  //     //   "합!차! 혼!적! 뭉텡이로 뭅뭅!! : " +
  //     //     auiGrid.getSelectedItems()[0].item.mixCd
  //     // );
  //     let targetArr = auiGrid.getRowsByValue(
  //       "mixCd",
  //       auiGrid.getSelectedItems()[0].item.mixCd
  //     );
  //     //혼적 최초idx
  //     let firstMixCarIdx = auiGrid.getRowIndexesByValue(
  //       "turn",
  //       targetArr[0].turn
  //     )[0];
  //     //다음ROW 계산
  //     let lastMixCarTurn = targetArr[targetArr.length - 1].turn;
  //     let lastMixCarIdx = auiGrid.getRowIndexesByValue(
  //       "turn",
  //       lastMixCarTurn
  //     )[0];
  //     let nextIdx = Number(lastMixCarIdx) + 1;
  //     if (auiGrid.getCellValue(nextIdx, "mixCd") !== undefined) {
  //       //움직이려는 합차분을 제외하고 대상 컬럼이 또 합차인 경우
  //       //alert("혼적인데 다음것도 혼적 - 수정중...");
  //       //다음 혼적 시작 ~ 마지막 개수 체크
  //       let nextRowArr = auiGrid.getRowsByValue(
  //         "mixCd",
  //         auiGrid.getCellValue(nextIdx, "mixCd")
  //       );
  //       //console.log(nextRowArr);
  //       auiGrid.setSelectionMode("multipleRows");
  //       for (let i = 0; i < nextRowArr.length; i++) {
  //         //console.log(Number(firstMixCarIdx) + i, Number(lastMixCarIdx) + i);
  //         auiGrid.setSelectionBlock(
  //           Number(firstMixCarIdx) + i,
  //           Number(lastMixCarIdx) + i,
  //           1,
  //           1
  //         );
  //         auiGrid.moveRowsToDown();
  //       }
  //       auiGrid.setSelectionMode("singleRow");
  //       auiGrid.setSelectionByIndex(rowIdx + nextRowArr.length);
  //       //turn 재설정
  //       for (let i = 0; i < gridData.length; i++) {
  //         auiGrid.updateRow({ turn: turnArr[i] }, i);
  //       }
  //       setState("updated");
  //     } else {
  //       //alert("혼적이지만 다음꺼 혼적 아님 - 수정중...");
  //       //합차분 뭉텡이로 내리기
  //       auiGrid.setSelectionMode("multipleRows");
  //       auiGrid.setSelectionBlock(firstMixCarIdx, lastMixCarIdx, 1, 1);
  //       auiGrid.moveRowsToDown();
  //       auiGrid.setSelectionMode("singleRow");
  //       auiGrid.setSelectionByIndex(rowIdx + 1);
  //       //turn 재설정
  //       for (let i = 0; i < gridData.length; i++) {
  //         auiGrid.updateRow({ turn: turnArr[i] }, i);
  //       }
  //       setState("updated");
  //     }
  //   } else {
  //     //움직이려는 ROW가 합차가 아닌 경우
  //     let fromIdx = auiGrid.getSelectedIndex()[0];
  //     let nextIdx = auiGrid.getSelectedIndex()[0] + 1;
  //     //다음ROW가 합차인경우
  //     if (auiGrid.getCellValue(nextIdx, "mixCd") !== undefined) {
  //       //alert("나는 아니지만 다음께 혼적! - 수정중...");
  //       let targetArr = auiGrid.getRowsByValue(
  //         "mixCd",
  //         auiGrid.getCellValue(nextIdx, "mixCd")
  //       );
  //       //혼적 최초idx
  //       let firstMixCarIdx = auiGrid.getRowIndexesByValue(
  //         "turn",
  //         targetArr[0].turn
  //       )[0];
  //       //다음ROW 계산
  //       let lastMixCarTurn = targetArr[targetArr.length - 1].turn;
  //       let lastMixCarIdx = auiGrid.getRowIndexesByValue(
  //         "turn",
  //         lastMixCarTurn
  //       )[0];
  //       auiGrid.setSelectionMode("multipleRows");
  //       auiGrid.setSelectionBlock(firstMixCarIdx, lastMixCarIdx, 1, 1);
  //       auiGrid.moveRowsToUp();
  //       auiGrid.setSelectionMode("singleRow");
  //       auiGrid.setSelectionByIndex(fromIdx + targetArr.length);
  //       //turn 재설정
  //       for (let i = 0; i < gridData.length; i++) {
  //         auiGrid.updateRow({ turn: turnArr[i] }, i);
  //       }
  //       setState("updated");
  //     } else {
  //       //alert("다음꺼 합차 아님!");
  //       auiGrid.moveRowsToDown();
  //       // let curTurn = auiGrid.getSelectedItems(myGrid1)[0].item.turn;
  //       // let chgTurn = auiGrid.getSelectedItems(myGrid1)[0].item.turn + 1;
  //       // console.log(curTurn, chgTurn);
  //       // auiGrid.updateRow({ turn: curTurn }, rowIdx);
  //       // auiGrid.updateRow({ turn: chgTurn }, rowIdx + 1);
  //       //turn 재설정
  //       for (let i = 0; i < gridData.length; i++) {
  //         auiGrid.updateRow({ turn: turnArr[i] }, i);
  //       }
  //       setState("updated");
  //     }
  //   }
  // }
  // //바꿀 대상의 Row가 혼적인 경우
  // // for (let i = 0; i < auiGrid.getRowCount(); i++) {
  // //   auiGrid.getGridData();
  // // }
  // //console.log(auiGrid.getEditedRowItems());
};
</script>
