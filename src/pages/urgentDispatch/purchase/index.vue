
<template>
<ButtonBar
        :menuInfo="menuInfo"
        :handleMasterSearch="handleMasterSearch"
        :handleMasterNew="handleMasterNew"
        :handleMasterDelete="handleMasterDelete"
        :handleMasterSave="handleMasterSave"
        :handleMasterExcel="handleMasterExcel"
      />
      <SearchBar
        :setSearchParameters="setSearchParameters"
        :systemCd="userInfo.systemCd"
      />

      <div class="grid_wrap">
        <AUIGrid
          ref="myGrid"
          :columnLayout="columnLayout"
          :gridProps="defaultGridProps"
        />
      </div>
      <div class="data_wrap">
        <div class="subdatabox">
          <h5>구매 긴급배차 정보</h5>
          <ul class="t_form">
            <li class="doublehalf">
              <div class="title">
                <span class="red">*</span>입차예정일
              </div>
              <div class="formbox">
                <input
                  type="date"
                  name="dt"
                  @change="handleChangeField"
                  :disabled="isFieldDisabled(
                    state,
                    'dt',
                    disabledFields,
                    fieldValues.isForceDisable
                  )"
                  v-model="fieldValues.dt"
                  class="ip2"
                />
              </div>
            </li>
            <li class="doublehalf">
              <div class="title">
                <span class="red">*</span>매입/매출
              </div>
              <div class="formbox">
                <select
                  mastCd="BIZ_TYPE"
                  name="ioGb"
                  topSelected="전체"
                  :disabled="isFieldDisabled(
                    state,
                    'ioGb',
                    disabledFields,
                    fieldValues.isForceDisable
                  )"
                  @change="handleChangeField"
                  v-model="fieldValues.ioGb"
                  class="ip2"
                />
              </div>
            </li>
            <li class="doublehalf">
              <div class="title">
                <span class="red">*</span>거래처
              </div>
              <div class="ip_textandbutton">
                <!-- <div>
                    <input
                      name="custCd"
                      :disabled="true"
                      v-model="fieldValues.custCd"
                      class="ip1"
                    />
                  </div>  -->
                <div>
                  <input
                    type="text"
                    name="custNm"
                    :disabled="isFieldDisabled(
                      state,
                      'custNm',
                      disabledFields,
                      fieldValues.isForceDisable
                    )"
                    v-model="fieldValues.custNm"
                    @change="handleChangeField"
                    @keydown="setCustTxt"
                    @blur="chkCustData"
                    class="ip1"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    :disabled="isFieldDisabled(
                      state,
                      'custCd',
                      disabledFields,
                      fieldValues.isForceDisable
                    )"
                    @click="handleSearchCustomer"
                    class="btn_ip"
                  >
                    검색
                  </button>
                </div>
              </div>
            </li>
            <li class="doublehalf">
              <div class="title">
                <span class="red">*</span>제품명
              </div>
              <div class="ip_textandbutton">
                  <!-- <div>
                    <input
                      type="text"
                      name="prodCd1"
                      :disabled="true"
                      v-model="fieldValues.prodCd1"
                      @change="handleChangeField"
                      class="ip1"
                    />
                  </div> -->

                <div>
                  <input
                    name="prodNm"
                    :disabled="isFieldDisabled(
                      state,
                      'prodNm',
                      disabledFields,
                      fieldValues.isForceDisable
                    )"
                    @change="handleChangeField"
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
                    :disabled="isFieldDisabled(
                      state,
                      'prodNm',
                      disabledFields,
                      fieldValues.isForceDisable
                    )"
                    class="btn_ip"
                  >
                    검색
                  </button>
                </div>
              </div>
            </li>
            <li class="doublehalf">
              <div class="title">
                <span class="red">*</span>차량번호
              </div>
              <div class="ip_textandbutton">
                <div>
                  <input
                    type="text"
                    name="carNo"
                    :disabled="isFieldDisabled(
                      state,
                      'carNo',
                      disabledFields,
                      fieldValues.isForceDisable
                    )"
                    v-model="fieldValues.carNo"
                    @change="handleChangeField"
                    @keydown="setCarNoTxt"
                    @blur="chkCarNoData"
                    class="ip2"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    @click="handleSearchCar"
                    :disabled="isFieldDisabled(
                      state,
                      'carNo',
                      disabledFields,
                      fieldValues.isForceDisable
                    )"
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
                  @change="handleChangeField"
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
                  @change="handleChangeField"
                  v-model="fieldValues.drvTel"
                  class="ip2"
                />
              </div>
            </li>
            <li class="doublehalf">
              <div class="title">감량코드</div>
              <div class="formbox">
                <select
                  name="decreaseCode"
                  topSelected="선택"
                  :disabled="isFieldDisabled(
                    state,
                    'decreaseCode',
                    disabledFields,
                    fieldValues.isForceDisable
                  )"
                  @change="handleChangeField"
                  v-model="fieldValues.decreaseCode"
                  class="ip2"
                  custNm="fieldValues.custNm"
                  prodNm="fieldValues.prodNm.replace('(반품)', '')"
                />
              </div>
            </li>
            <li class="doublehalf">
              <div class="title">감량수량</div>
              <div class="formbox">
                <input
                  name="decreaseWgt"
                  :disabled="isFieldDisabled(
                    state,
                    'decreaseWgt',
                    disabledFields,
                    fieldValues.isForceDisable
                  )"
                  @change="handleChangeField"
                  v-model="fieldValues.decreaseWgt"
                  class="ip2"
                />
              </div>
            </li>
            <li class="doublehalf">
              <div class="title">혼적코드</div>
              <div class="formbox">
                <select
                  mastCd="MIX_CARRY_CD"
                  name="mixCd"
                  topSelected="선택"
                  :disabled="isFieldDisabled(
                    state,
                    'mixCd',
                    disabledFields,
                    fieldValues.isForceDisable
                  )"
                  @change="handleChangeField"
                  v-model="fieldValues.mixCd"
                  class="ip2"
                />
              </div>
            </li>
            <li class="doublehalf">
              <div class="title">반품</div>
              <div class="formbox">
                <input
                  type="checkbox"
                  name="banpumChk"
                  :disabled="isFieldDisabled(
                    state,
                    'banpumChk',
                    disabledFields,
                    fieldValues.isForceDisable
                  )"
                  @change="handleChangeField"
                  :checked="fieldValues.banpumChk"
                ></input>
              </div>
            </li>
            <li class="doublehalf"></li>
            <li style="height: 75px">
              <div class="title">비고</div>
              <div class="formbox">
                <textarea
                  name="bigo"
                  rows="1"
                  type="text"
                  :disabled="isFieldDisabled(
                    state,
                    'bigo',
                    disabledFields,
                    fieldValues.isForceDisable
                  )"
                  @change="handleChangeField"
                  v-model="fieldValues.bigo"
                  class="ip2"
                  style="
                    height: 66px;
                    vertical-align: middle"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import SearchBar from './SearchBar.vue';
import AUIGrid from '@/static/AUIGrid-Vue.js/AUIGrid.vue';
import ButtonBar from "@/components/ButtonBar/index.vue";
import { isFieldDisabled } from '@/utils/validators';
import { columnLayout } from './columnLayout';
import { defaultGridProps } from '@/components/AuiGrid/gridLayout';


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
// import WgtReduceselect from "../../../components/WgtReduceselect";
const menuInfo = ref({
  menuNmKor: "구매 긴급배차 ",
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
  //   const auiGrid = myGrid.value.current;
  //   auiGrid.resize("100%", "100%");
  // });

  //추가, 수정일때 항목의 :disabled 결정
  const disabledFields = {
    created: [],
    updated: ["systemCd", "userId"],
  };

  //긴급배차 필드들
  const initItem = {
    sg: "4", //사업장
    dt: "", //일자
    orgDt: "", //변경전 일자
    seq: "", //채번
    category: "4", //등록화면. 1,2 고철, 3 물류, 4 구매, 5 환경안전, 이외 기간계에서 처리
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
    prodGb: "4", //계근구분
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
  });

  //상차지 검색 URL
  const SERARCH_USER_URL =
    "/urgentdispatch/purchase/searchPurchaseDispatchList";
  //상차지 저장 URL
  const SAVE_USER_URL = "/urgentdispatch/purchase/savePurchaseDispatchList";

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
    ioGb: "",
  });

  //검색조건
  const setSearchParameters = (values) => {
    //setPrimaryParameters({ ...primaryParameters, values });
    primaryParameters.value = ({
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
      ioGb: values.ioGb,
    });
  };

  //코드 및 그리드 초기화 및 생성
  // onMounted(() => {
  //   const auiGrid = myGrid.value.current;
  //   auiGrid.bind("cellClick", function (event) {
  //     gridCellClick(event.item);
  //   });
  // }, []);

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

    // if (initMap.decreaseCode !== undefined && initMap.decreaseCode !== "") {
    //   let optionObj = document.getElementsByName("decreaseCode")[0].options;
    //   let dupCnt = 0;
    //   for (let i = 0; i < optionObj.length; i++) {
    //     if (optionObj[i].value === initMap.decreaseCode) {
    //       dupCnt++;
    //     }
    //   }

    //   if (dupCnt > 1) {
    //     for (let i = 0; i < optionObj.length; i++) {
    //       if (
    //         optionObj[i].value === initMap.decreaseCode &&
    //         optionObj[i].getAttribute("custnm-value") === initMap.custNm
    //       ) {
    //         document.getElementsByName("decreaseCode")[0].selectedIndex = i;
    //       }
    //     }
    //   }
    // }
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
    //     ioGb: primaryParameters.ioGb,
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

    // auiGrid.addRow(initData, "last");
    // setFieldValues(initData);
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

    //   if (
    //     event.target.tagName === "INPUT" &&
    //     event.target.type === "checkbox"
    //   ) {
    //     if (name === "banpumChk") {
    //       if (event.target.checked) {
    //         item["banpumYn"] = "Y";
    //         item["banpumChk"] = true;
    //         if (item["prodNm"] !== undefined && item["prodNm"] !== "") {
    //           item["prodNm"] = item["prodNm"] + "(반품)";
    //         }

    //         //checkbox 이벤트랑 공통 처리랑 같이 넣으니 꼬임. 분리한다
    //         setFieldValues({
    //           ...fieldValues,
    //           banpumYn: item["banpumYn"],
    //           banpumChk: item["banpumChk"],
    //           prodNm: item["prodNm"],
    //         });
    //       } else {
    //         item["banpumYn"] = "N";
    //         item["banpumChk"] = false;
    //         if (item["prodNm"] !== undefined) {
    //           item["prodNm"] = item["prodNm"].replace("(반품)", "");
    //         }

    //         //checkbox 이벤트랑 공통 처리랑 같이 넣으니 꼬임. 분리한다
    //         setFieldValues({
    //           ...fieldValues,
    //           banpumYn: item["banpumYn"],
    //           banpumChk: item["banpumChk"],
    //           prodNm: item["prodNm"],
    //         });
    //       }
    //     }
    //   } else {
    //     //일반적인 경우
    //     //checkbox 이벤트랑 공통 처리랑 같이 넣으니 꼬임. 분리한다

    //     if (name === "custNm" || name === "prodNm") {
    //       //거래처 또는 제품명 변경시 감량코드 값 초기화
    //       item["decreaseCode"] = "";
    //       setFieldValues({ ...fieldValues, [name]: value, decreaseCode: "" });
    //     } else {
    //       setFieldValues({ ...fieldValues, [name]: value });
    //     }
    //   }

    //   if (event.target.tagName === "SELECT") {
    //     switch (name) {
    //       case "category": //국내/수입
    //         item["categoryNm"] =
    //           event.target.options[
    //             event.target.options.selectedIndex
    //           ].innerText;
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
    //           event.target.options[
    //             event.target.options.selectedIndex
    //           ].innerText;
    //         break;
    //       case "ioGb":
    //         item["ioGbNm"] =
    //           event.target.options[
    //             event.target.options.selectedIndex
    //           ].innerText;
    //         break;
    //       case "decreaseCode":
    //         console.log("decreaseCode");
    //         item["reduceDesc"] =
    //           event.target.options[
    //             event.target.options.selectedIndex
    //           ].innerText;
    //         // item["decreaseWgt"] =
    //         //   event.target.options[
    //         //     event.target.options.selectedIndex
    //         //   ].getAttribute("wgt-value");
    //         // setFieldValues({
    //         //   ...fieldValues,
    //         //   decreaseWgt:
    //         //     event.target.options[
    //         //       event.target.options.selectedIndex
    //         //     ].getAttribute("wgt-value"),
    //         // });
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
    //   category: "4", //구매용만 조회
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

    // if (fieldValues.banpumYn === "Y") {
    //   itemInfo.cdNmKor = itemInfo.cdNmKor + "(반품)";
    // }

    // setFieldValues({
    //   ...fieldValues,
    //   prodNm: itemInfo.cdNmKor,
    //   prodCd1: itemInfo.detlCd,
    //   prodCd: prodCd,
    // });

    // setOldValues({ ...oldValues, prodNm: itemInfo.cdNmKor });

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

    // setOldValues({ ...fieldValues, carNo: carInfo.carFullNo });

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

</script>