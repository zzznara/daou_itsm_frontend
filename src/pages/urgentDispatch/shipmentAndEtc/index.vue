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
      <h5>출하 및 기타 긴급배차 정보</h5>
      <ul class="t_form">
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>입차예정일</div>
          <div class="formbox">
            <input
              type="date"
              name="dt"
              @input="handleChangeField"
              :disabled="isFieldDisabled(state, 'dt', disabledFields, fieldValues.isForceDisable)"
              v-model="fieldValues.dt"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>매입/매출</div>
          <div class="formbox">
            <select
              mastCd="BIZ_TYPE"
              name="ioGb"
              topSelected="전체"
              :disabled="isFieldDisabled(state, 'ioGb', disabledFields, fieldValues.isForceDisable)"
              @input="handleChangeField"
              v-model="fieldValues.ioGb"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>거래처</div>
          <div class="ip_textandbutton">
            <!--  <div>
                    <input
                      name="custCd"
                      :disabled="true"
                      v-model="fieldValues.custCd"
                      class="ip1"
                    />
                  </div> -->
            <div>
              <input
                type="text"
                name="custNm"
                :disabled="
                  isFieldDisabled(state, 'custNm', disabledFields, fieldValues.isForceDisable)
                "
                v-model="fieldValues.custNm"
                @input="handleChangeField"
                @keydown="setCustTxt"
                @blur="chkCustData"
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
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>제품명</div>
          <div class="ip_textandbutton">
            <!-- <div>
              <input
                type="text"
                name="prodCd1"
                :disabled="true"
                v-model="fieldValues.prodCd1"
                @input="handleChangeField"
                class="ip1"
              />
            </div> -->
            <div>
              <input
                name="prodNm"
                :disabled="
                  isFieldDisabled(state, 'prodNm', disabledFields, fieldValues.isForceDisable)
                "
                @input="handleChangeField"
                @keydown="setItemTxt"
                @blur="chkItemData"
                v-model="fieldValues.prodNm"
                class="ip2"
              />
            </div>
            <div>
              <button
                type="button"
                @click="handleSearchItem"
                :disabled="
                  isFieldDisabled(state, 'prodNm', disabledFields, fieldValues.isForceDisable)
                "
                class="btn_ip"
              >
                검색
              </button>
            </div>
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>차량번호</div>
          <div class="ip_textandbutton">
            <div>
              <input
                type="text"
                name="carNo"
                :disabled="
                  isFieldDisabled(state, 'carNo', disabledFields, fieldValues.isForceDisable)
                "
                v-model="fieldValues.carNo"
                @input="handleChangeField"
                @keydown="setCarNoTxt"
                @blur="chkCarNoData"
                class="ip2"
              />
            </div>
            <div>
              <button
                type="button"
                @click="handleSearchCar"
                :disabled="
                  isFieldDisabled(state, 'carNo', disabledFields, fieldValues.isForceDisable)
                "
                class="btn_ip"
              >
                검색
              </button>
            </div>
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">기사명</div>
          <div class="formbox">
            <input
              name="drvNm"
              :disabled="true"
              @input="handleChangeField"
              v-model="fieldValues.drvNm"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">전화번호</div>
          <div class="formbox">
            <input
              name="drvTel"
              :disabled="true"
              @input="handleChangeField"
              v-model="fieldValues.drvTel"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">수주번호</div>
          <div class="ip_textandbutton">
            <div class="doubleinput">
              <input
                name="salDt"
                :disabled="
                  isFieldDisabled(state, 'salDt', disabledFields, fieldValues.isForceDisable)
                "
                v-model="fieldValues.salDt"
                class="ip2"
              />
              <input
                class="ip2"
                :disabled="
                  isFieldDisabled(state, 'salJno', disabledFields, fieldValues.isForceDisable)
                "
                name="salJno"
                v-model="fieldValues.salJno"
                @keydown="setSalJnoTxt"
                @blur="chkSalJnoData"
                @input="handleChangeField"
              />
            </div>
            <div>
              <button @click="searchSales" class="btn_ip">검색</button>
            </div>
          </div>
        </li>
        <li style="height: 75px">
          <div class="title">비고</div>
          <div class="formbox">
            <textarea
              name="bigo"
              rows="1"
              type="text"
              :disabled="isFieldDisabled(state, 'bigo', disabledFields, fieldValues.isForceDisable)"
              @input="handleChangeField"
              v-model="fieldValues.bigo"
              class="ip2"
              style="height: 66px; vertical-align: middle"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import { onMounted, ref, watch } from "vue";
import SearchBar from "./SearchBar.vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import { isFieldDisabled } from "@/utils/validators";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";

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
// import select from "../../../components/select";
// import useAppContext from "../../../utils/Reducers";
// import { ajusta } from "../../../utils/validators";
// import AUIGrid from "../../../lib/AuiGrid/AUIGridReact";
// //import PhoneInput from "react-phone-number-input/input";
// import { ModalCustomerSearchPop } from "../../Popup/CustomerSearchPop";
// import { ModalItemSearchPop } from "../../Popup/ItemSearchPop";
// import { ModalItemTypeSearchPop } from "../../Popup/ItemTypeSearchPop";
// import { ModalAreaSearchPop } from "../../Popup/AreaSearchPop";
// import { ModalMidVendorSearchPop } from "../../Popup/MidVendorSearchPop";
// import { ModalCarSearchPop } from "../../Popup/CarSearchPop";
// import WgtReduceSelectBox from "../../../components/WgtReduceSelectBox";
// import { ModalSalesSearchPop } from "../../Popup/SalesPop";
// import { ModalImgShowPop } from "../../Popup/ImgShowPop";

const menuInfo = ref({
  menuNmKor: "출하 및 기타 긴급배차 ",
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

// watch(() => {
//   const auiGrid = myGrid.value.current;
//   auiGrid.resize("100%", "100%");
// }, menuKey);

//추가, 수정일때 항목의 disabled 결정
const disabledFields = {
  created: [],
  updated: ["systemCd", "userId"],
};

//긴급배차 필드들
const initItem = {
  sg: "4", //사업장
  sgNew: "",
  dt: "", //일자
  orgDt: "", //변경전 일자
  seq: "", //채번
  category: "3", //등록화면. 1,2 고철, 3 물류, 4 구매, 5 환경안전, 이외 기간계에서 처리
  categoryNm: "", //등록화면명
  turn: "", //배차순번
  ioGb: "", //입출구분 1: 입고, 2: 출고
  stGb: "1", //안정화구분 1: 안정, 2:불안정
  etm: "", //입차시간
  otm: "", //출차시간
  carNo: "", //차량번호
  carCd: "", //사전배차 등록 업체
  custCd: "", //업체 코드
  custNm: "", //업체명
  drvNm: "", //기사명
  drvTel: "", //기사번호
  prodCd: "", //제품코드
  prodNm: "", //제품명
  salDt: "", //판매일자
  salJno: "", //판매전표
  prodGb: "6", //계근구분
  prodCd: "", //고철품목코드
  prodCd1: "", //고철코드
  grade: "", //고철등급
  gradeNm: "", //고철등급명
  areaCd: "", //납품지
  areaNm: "", //납품지명
  vendorNm: "", //중상업체명
  vendorCd: "", //중상업체
  decreaseCode: "", //부자재감량코드
  decreaseWgt: "", //부자재감량수량
  carType: "", //차량 종류
  carTypeNm: "", //차량 종류
  addCd: "", //합차코드
  mixCd: "", //혼적코드
  ptCount: "", //출력 COUNT
  banpumYn: "", //반품 유무
  banpumChk: "", //반품 유무 체크
  refSg: "", //계근 사업장
  refDt: "", //계근 일자
  refSeq: "", //계근 SEQ
  bigo: "", //비고
  inGb: "", //등록구분
  inGbNm: "", //등록구분
  isNo: userInfo.value.userId, //작성자
  isDt: "", //작성일시
  upNo: userInfo.value.userId, //수정자
  upDt: "", //수정일시
  cotNum: "", //컨테이너 번호
  statusCd: "100",
  isForceDisable: true,
};
const fieldValues = ref(initItem);

const oldValues = ref({
  custNm: "",
  prodNm: "",
  carNo: "",
  areaNm: "",
  vendorNm: "",
  salJno: "",
});

//상차지 검색 URL
const SERARCH_USER_URL = "/urgentdispatch/shipmentAndEtc/searchShipmentAndEtcDispatchList";
//상차지 저장 URL
const SAVE_USER_URL = "/urgentdispatch/shipmentAndEtc/saveShipmentAndEtcDispatchList";

// const [, fetchData] = useAxiosWithAuthorization(
//   {
//     url: SERARCH_USER_URL,
//   },
//   { manual: true }
// );

//검색조건 필드들
const primaryParameters = ref({
  category: "", //국내수입
  custCd: "", //거래처 코드
  custNm: "", //거래처 명
  prodCd1: "", //제품코드
  prodNm: "", //제품명
  status: "", //상태
  carNo: "", //차량번호
  dt: "", //입차예정일
  saveGB: "", //등록구분
});

//검색조건
const setSearchParameters = (values) => {
  //setPrimaryParameters({ ...primaryParameters, values });
  primaryParameters.value = {
    ...primaryParameters,
    category: values.category,
    custCd: values.custCd,
    custNm: values.custNm,
    prodCd1: values.prodCd1,
    prodNm: values.prodNm,
    status: values.status,
    carNo: values.carNo,
    dt: values.dt,
    saveGB: values.saveGB,
  };
};

//코드 및 그리드 초기화 및 생성
onMounted(() => {
  // const auiGrid = myGrid.value.current;
  // auiGrid.bind("cellClick", function (event) {
  //   gridCellClick(event.item);
  // });
  // //console.log(columnLayout);
  // //
  // columnLayout[11].renderer.@click = (event) => {
  //   // console.log(
  //   //   event.type,
  //   //   event.pid,
  //   //   event.rowIndex,
  //   //   event.columnIndex,
  //   //   event.text,
  //   //   event.item,
  //   //   event.dataField
  //   // );
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
  //     event.item.sg +
  //     "/" +
  //     event.item.dt.replace(/\-/g, "") +
  //     "/" +
  //     event.item.seq +
  //     "/ATTC_01";
  //   //alert(url);
  //   ModalImgShowPop({
  //     imgUrl: url,
  //   });
  // };
});

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
  // if (initMap["banpumYn"] === "Y") {
  //   initMap["banpumChk"] = true;
  // } else {
  //   initMap["banpumChk"] = false;
  // }
  // if (item["statusCd"] === "100") {
  //   initMap.isForceDisable = undefined;
  //   if (item["saveGb"] === "1" || item["inGb"] === "1") {
  //     //긴급배차만 입력/수정가능하게
  //     initMap.isForceDisable = true;
  //   } else {
  //     initMap.isForceDisable = undefined;
  //   }
  // } else {
  //   initMap.isForceDisable = true;
  // }
  // setFieldValues(initMap);
};
const handleMasterSearch = async () => {
  // const auiGrid = myGrid.current;
  // auiGrid.showAjaxLoader();
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SERARCH_USER_URL,
  //   params: {
  //     category: primaryParameters.category,
  //     custCd: primaryParameters.custCd,
  //     custNm: primaryParameters.custNm,
  //     prodCd1: primaryParameters.prodCd1,
  //     prodNm: primaryParameters.prodNm,
  //     status: primaryParameters.status,
  //     carNo: primaryParameters.carNo,
  //     dt: primaryParameters.dt,
  //     saveGB: primaryParameters.saveGB,
  //   },
  // });
  // auiGrid.setGridData(data);
  // setFieldValues(initItem);
  // auiGrid.removeAjaxLoader();
};

const handleMasterNew = () => {
  // const auiGrid = myGrid.current;
  // const addItems = auiGrid.getAddedRowItems();
  // if (addItems[0] !== undefined) {
  //   return;
  // }
  // let initData = initItem;
  // let today = new Date();
  // let todayStr = today.getFullYear();
  // todayStr +=
  //   today.getMonth() + 1 < 10
  //     ? "-0" + (today.getMonth() + 1)
  //     : "-" + (today.getMonth() + 1);
  // todayStr +=
  //   today.getDate() + 1 < 10 ? "-0" + today.getDate() : "-" + today.getDate();
  // initData.dt = todayStr;
  // auiGrid.addRow(initItem, "last");
  // setFieldValues(initItem);
  // const items = auiGrid.getSelectedItems()[0];
  // gridCellClick(items.item);
};

const handleMasterDelete = () => {
  // const auiGrid = myGrid.current;
  // const items = auiGrid.getSelectedItems()[0];
  // const item = items.item;
  // if (item.saveGb === "1") {
  //   ModalConfirm({
  //     title: "삭제불가",
  //     description: "ECB에서 등록한 사전배차 데이터는 삭제 할 수 없습니다",
  //     type: "alert",
  //   });
  //   return;
  // }
  // if (item.statusCd !== "100") {
  //   ModalConfirm({
  //     title: "삭제불가",
  //     description: "배차 후 계근이 진행된 건은 삭제 할 수 없습니다",
  //     type: "alert",
  //   });
  //   return;
  // }
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
  //   if (fieldValues.prodNm === "승강기레일") {
  //     if (
  //       fieldValues.salJno === undefined ||
  //       fieldValues.salDt === undefined ||
  //       fieldValues.salJno === "" ||
  //       fieldValues.salDt === ""
  //     ) {
  //       if (document.getElementsByName("salJno").length > 1) {
  //         document.getElementsByName("salJno")[1].focus();
  //       } else {
  //         document.getElementsByName("salJno")[0].focus();
  //       }
  //       ModalConfirm({
  //         title: "필수항목체크",
  //         description: "승강기레일 제품인 경우 수주정보는 필수입니다",
  //         type: "alert",
  //       });
  //       return;
  //     }
  //   }
  //   const result = getGridValidateCheck(auiGrid, items, INITIAL_FIELD_RULES);
  //   if (result.isValidate) {
  //     //검색조건과 입력필드의 name이 동일할 경우가 있다
  //     if (document.getElementsByName(result.column).length > 1) {
  //       document.getElementsByName(result.column)[1].focus();
  //     } else {
  //       document.getElementsByName(result.column)[0].focus();
  //     }
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
  //   if (param.length > 0) {
  //     const {
  //       data: { data },
  //     } = await fetchData({
  //       url: SAVE_USER_URL,
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
  // //console.log("name === " + name + " || value === " + value);
  // if (name === "drvTel") {
  //   //전화번호 관련 함수 정의
  //   const regex = /^[0-9\b -]{0,13}$/;
  //   if (regex.test(value)) {
  //     const phone = ajusta(value);
  //     item[name] = phone;
  //     setFieldValues({ ...fieldValues, [name]: phone });
  //   }
  // } else {
  //   item[name] = value;
  //   if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
  //     if (name === "banpumChk") {
  //       if (event.target.checked) {
  //         item["banpumYn"] = "Y";
  //         item["banpumChk"] = true;
  //       } else {
  //         item["banpumYn"] = "N";
  //         item["banpumChk"] = false;
  //       }
  //       //checkbox 이벤트랑 공통 처리랑 같이 넣으니 꼬임. 분리한다
  //       setFieldValues({
  //         ...fieldValues,
  //         banpumYn: item["banpumYn"],
  //         banpumChk: item["banpumChk"],
  //       });
  //     }
  //   } else {
  //     //일반적인 경우
  //     //checkbox 이벤트랑 공통 처리랑 같이 넣으니 꼬임. 분리한다
  //     setFieldValues({ ...fieldValues, [name]: value });
  //   }
  //   if (event.target.tagName === "SELECT") {
  //     switch (name) {
  //       case "category": //국내/수입
  //         item["categoryNm"] =
  //           event.target.options[event.target.options.selectedIndex].innerText;
  //         //국내/수입 변화에 따라입력된 제품을 초기화 시킨다
  //         setFieldValues({
  //           ...fieldValues,
  //           prodCd: "",
  //           prodCd1: "",
  //           prodNm: "",
  //         });
  //         break;
  //       case "carType":
  //         item["carTypeNm"] =
  //           event.target.options[event.target.options.selectedIndex].innerText;
  //         break;
  //       case "ioGb":
  //         item["ioGbNm"] =
  //           event.target.options[event.target.options.selectedIndex].innerText;
  //         break;
  //       case "decreaseCode":
  //         item["reduceDesc"] =
  //           event.target.options[event.target.options.selectedIndex].innerText;
  //         item["decreaseWgt"] =
  //           event.target.options[
  //             event.target.options.selectedIndex
  //           ].getAttribute("wgt-value");
  //         setFieldValues({
  //           ...fieldValues,
  //           decreaseWgt:
  //             event.target.options[
  //               event.target.options.selectedIndex
  //             ].getAttribute("wgt-value"),
  //         });
  //         break;
  //       default:
  //         break;
  //     }
  //   }
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

//거래처 팝업 처리
const handleSearchCustomer = () => {
  // ModalCustomerSearchPop({
  //   searchTxt: fieldValues.custNm,
  //   callbackFunc: setCustInfo,
  // });
};

const setCustInfo = (custInfo) => {
  // setFieldValues({
  //   ...fieldValues,
  //   custCd: custInfo.custCd,
  //   custNm: custInfo.custNm,
  // });
  // setOldValues({ ...oldValues, custNm: custInfo.custNm });
  // updateGridData("custCd", custInfo.custCd);
  // updateGridData("custNm", custInfo.custNm);
};

//품번 팝업처리
const handleSearchItem = () => {
  // //제품이 아니라 품목을 검색해야 한다 함
  // //ModalItemSearchPop({ itemType: "PROD_SCRAP", callbackFunc: setItemInfo });
  // console.log(fieldValues.category);
  // ModalItemTypeSearchPop({
  //   itemType: "PROD_TYPE",
  //   category: "3", //물류용만 조회
  //   searchTxt: fieldValues.prodNm,
  //   callbackFunc: setItemInfo,
  // });
};

const setItemInfo = (itemInfo) => {
  // let prodCd = "";
  // switch (itemInfo.detlCd) {
  //   case "A11":
  //     prodCd = "9SCA11";
  //     break;
  //   case "B11":
  //     prodCd = "9SCB11";
  //     break;
  //   case "B12":
  //     prodCd = "9SCB12";
  //     break;
  //   case "B13":
  //     prodCd = "9SCB13";
  //     break;
  //   case "B14":
  //     prodCd = "9SCB14";
  //     break;
  //   case "B15":
  //     prodCd = "9SCB15";
  //     break;
  //   case "C11":
  //     prodCd = "9SCC11";
  //     break;
  //   case "D11":
  //     prodCd = "9SCD11";
  //     break;
  //   case "E11":
  //     prodCd = "9SCE11";
  //     break;
  //   case "E12":
  //     prodCd = "9SCE12";
  //     break;
  //   default:
  //     break;
  // }
  // let sgNew = ""; //칠서
  // if (itemInfo.cdNmKor === "승강기레일") {
  //   sgNew = "3"; //녹산
  //   updateGridData("sgNew", sgNew);
  // } else {
  //   if (fieldValues.sg === "3" && itemInfo.cdNmKor !== "승강기레일") {
  //     sgNew = "4";
  //     updateGridData("sgNew", sgNew);
  //   }
  // }
  // setFieldValues({
  //   ...fieldValues,
  //   sgNew: sgNew,
  //   prodNm: itemInfo.cdNmKor,
  //   prodCd1: itemInfo.detlCd,
  //   prodCd: prodCd,
  // });
  // updateGridData("prodNm", itemInfo.cdNmKor);
  // updateGridData("prodCd1", itemInfo.detlCd);
  // updateGridData("prodCd", prodCd);
};

const updateGridData = (key, value) => {
  // const auiGrid = myGrid.current;
  // const items = auiGrid.getSelectedItems()[0];
  // const item = items.item;
  // item[key] = value;
  // auiGrid.updateRow(item, "selectedIndex");
};

//차량 검색 팝업처리
const handleSearchCar = (carInfo) => {
  // ModalCarSearchPop({ callbackFunc: setCar, searchTxt: fieldValues.carNo });
};

const setCar = (carInfo) => {
  // const regex = /^[0-9\b -]{0,13}$/;
  // if (regex.test(carInfo.drvTel)) {
  //   const regDrvTel = ajusta(carInfo.drvTel);
  //   carInfo.drvTel = regDrvTel;
  // }
  // setFieldValues({
  //   ...fieldValues,
  //   carNo: carInfo.carFullNo,
  //   carCd: carInfo.custCd,
  //   drvNm: carInfo.drvNm,
  //   drvTel: carInfo.drvTel,
  // });
  // setOldValues({ ...oldValues, carNo: carInfo.carFullNo });
  // updateGridData("carNo", carInfo.carFullNo);
  // updateGridData("carCd", carInfo.custCd);
  // updateGridData("drvNm", carInfo.drvNm);
  // updateGridData("drvTel", carInfo.drvTel);
};

const setCustTxt = (evt) => {
  //console.log(evt.key, evt.code, evt.keyCode);
  // if (evt.keyCode === 13 || evt.keyCode === 9) {
  //   //enter key or tab key
  //   ModalCustomerSearchPop({
  //     callbackFunc: setCustInfo,
  //     searchTxt: evt.target.value,
  //   });
  // }

  if (evt.keyCode === 13) {
    evt.target.blur();
  }
};

const chkCustData = (evt) => {
  // if (evt.target.value !== undefined && evt.target.value !== "") {
  //   ModalCustomerSearchPop({
  //     callbackFunc: setCustInfo,
  //     searchTxt: evt.target.value,
  //     autoSelect: true,
  //     failCallbackFunc: restoreCustInfo,
  //   });
  // }
};

const restoreCustInfo = () => {
  // setFieldValues({
  //   ...fieldValues,
  //   custNm: oldValues.custNm,
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

const restoreItemInfo = () => {
  // setFieldValues({
  //   ...fieldValues,
  //   prodNm: oldValues.prodNm,
  // });
};

const setCarNoTxt = (evt) => {
  if (evt.keyCode === 13) {
    evt.target.blur();
  }
};

const chkCarNoData = (evt) => {
  // if (evt.target.value !== undefined && evt.target.value !== "") {
  //   ModalCarSearchPop({
  //     callbackFunc: setCar,
  //     searchTxt: evt.target.value,
  //     autoSelect: true,
  //     failCallbackFunc: restoreCarNoData,
  //   });
  // }
};

const restoreCarNoData = () => {
  // setFieldValues({ ...fieldValues, carNo: oldValues.carNo });
};

const searchSales = () => {
  // if (fieldValues.custNm === undefined || fieldValues.custNm === "") {
  //   ModalConfirm({
  //     title: "거래처 확인",
  //     description: "수주번호를 선택하기전에 거래처를 선택하여 주세요",
  //     type: "alert",
  //   });
  //   return;
  // }
  // if (fieldValues.prodNm !== "승강기레일") {
  //   ModalConfirm({
  //     title: "품명 확인",
  //     description: "품명이 '승강기레일'인 경우에만 수주번호 선택이 가능합니다",
  //     type: "alert",
  //   });
  //   return;
  // }
  // ModalSalesSearchPop({
  //   callbackFunc: setSalesData,
  //   searchTxt: fieldValues.salJno,
  //   searchCust: fieldValues.custNm,
  // });
};

const setSalesData = (salData) => {
  // //console.log(salData);
  // setFieldValues({
  //   ...fieldValues,
  //   salDt: salData.salDt,
  //   salJno: salData.salJno,
  // });
  // setOldValues({ ...oldValues, salJno: salData.salJno });
  // updateGridData("salDt", salData.salDt);
  // updateGridData("salJno", salData.salJno);
};

const restoreSalesData = () => {
  // setFieldValues({ ...fieldValues, salJno: oldValues.salJno });
};

const setSalJnoTxt = (evt) => {
  if (evt.keyCode === 13) {
    evt.target.blur();
  }
};

const chkSalJnoData = (evt) => {
  // if (fieldValues.salJno === undefined || fieldValues.salJno === "") {
  //   return;
  // }
  // if (fieldValues.custNm === undefined || fieldValues.custNm === "") {
  //   ModalConfirm({
  //     title: "거래처 확인",
  //     description: "수주번호를 선택하기전에 거래처를 선택하여 주세요",
  //     type: "alert",
  //   });
  //   setFieldValues({
  //     ...fieldValues,
  //     salDt: "",
  //     salJno: "",
  //   });
  //   updateGridData("salDt", "");
  //   updateGridData("salJno", "");
  //   return;
  // }
  // if (fieldValues.prodNm !== "승강기레일") {
  //   ModalConfirm({
  //     title: "품명 확인",
  //     description: "품명이 '승강기레일'인 경우에만 수주번호 선택이 가능합니다",
  //     type: "alert",
  //   });
  //   setFieldValues({
  //     ...fieldValues,
  //     sg: "4",
  //     salDt: "",
  //     salJno: "",
  //   });
  //   updateGridData("salDt", "");
  //   updateGridData("salJno", "");
  //   return;
  // }
  // ModalSalesSearchPop({
  //   callbackFunc: setSalesData,
  //   searchTxt: evt.target.value,
  //   autoSelect: true,
  //   searchCust: fieldValues.custNm,
  //   failCallbackFunc: restoreSalesData,
  // });
};
</script>
