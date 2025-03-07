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
      <h5>고철 긴급배차 정보</h5>
      <ul class="t_form">
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>등록일자</div>
          <div class="formbox">
            <input
              type="date"
              name="dt"
              @input="handleChangeField"
              :disabled="isFieldDisabled(state, 'dt', disabledFields, fieldValues.isForceDisable)"
              value="fieldValues.dt"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>국내/수입</div>
          <div class="formbox">
            <select
              mastCd="U_DISPATCH_TYPE"
              attr1="Y"
              name="category"
              topSelected="전체"
              :disabled="
                isFieldDisabled(state, 'category', disabledFields, fieldValues.isForceDisable)
              "
              @input="handleChangeField"
              v-model="fieldValues.category"
              class="ip2"
            />
          </div>
        </li>
        <li style="width: 50%">
          <div class="title"><span class="red">*</span>거래처</div>
          <div class="ip_sup2">
            <div>
              <input name="custCd" :disabled="true" v-model="fieldValues.custCd" class="ip1" />
            </div>
            <div>
              <input
                type="text"
                name="custNm"
                :disabled="
                  isFieldDisabled(state, 'custNm', disabledFields, fieldValues.isForceDisable)
                "
                v-model="fieldValues.custNm"
                @input="handleChangeField"
                @keypress="setCustTxt"
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
        <li style="width: 50%">
          <div class="title"><span class="red">*</span>제품명</div>
          <div class="ip_sup2">
            <div>
              <input
                type="text"
                name="prodCd1"
                :disabled="true"
                v-model="fieldValues.prodCd1"
                @input="handleChangeField"
                class="ip1"
              />
            </div>
            <div>
              <input
                name="prodNm"
                :disabled="
                  isFieldDisabled(state, 'prodNm', disabledFields, fieldValues.isForceDisable)
                "
                @input="handleChangeField"
                @keypress="setItemTxt"
                @blur="chkItemData"
                v-model="fieldValues.prodNm"
                class="ip2"
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
          <div class="title"><span class="red">*</span>차량번호</div>
          <div class="ip_textandbutton">
            <div>
              <input
                v-model="fieldValues.carNo"
                class="ip2"
                type="text"
                name="carNo"
                :disabled="
                  isFieldDisabled(state, 'carNo', disabledFields, fieldValues.isForceDisable)
                "
                @input="handleChangeField"
                @keypress="setCarNoTxt"
                @blur="chkCarNoData"
              />
            </div>
            <div>
              <button
                class="btn_ip"
                type="button"
                :disabled="
                  isFieldDisabled(state, 'carNo', disabledFields, fieldValues.isForceDisable)
                "
                @click="handleSearchCar"
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
          <div class="title"><span class="red">*</span>차량종류</div>
          <div class="formbox">
            <select
              v-model="fieldValues.carType"
              erpCode="true"
              mastCd="H003"
              name="carType"
              topSelected="선택"
              :disabled="
                isFieldDisabled(state, 'carType', disabledFields, fieldValues.isForceDisable)
              "
              class="ip2"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li style="width: 50%">
          <div class="title">
            <span :class="[fieldValues.category === '1' ? 'red' : '']">
              {{ fieldValues.category === "1" ? "*" : "" }}
            </span>
            납품지
          </div>
          <div class="ip_sup2">
            <div>
              <input
                v-model="fieldValues.areaCd"
                type="text"
                name="areaCd"
                :disabled="true"
                class="ip1"
                @input="handleChangeField"
              />
            </div>
            <div>
              <input
                name="areaNm"
                :disabled="
                  isFieldDisabled(state, 'areaNm', disabledFields, fieldValues.isForceDisable)
                "
                @input="handleChangeField"
                @keypress="setAreaTxt"
                @blur="chkAreaData"
                v-model="fieldValues.areaNm"
                class="ip2"
              />
            </div>
            <div>
              <button
                type="button"
                @click="handleSearchArea"
                :disabled="
                  isFieldDisabled(state, 'areaCd', disabledFields, fieldValues.isForceDisable)
                "
                class="btn_ip"
              >
                검색
              </button>
            </div>
          </div>
        </li>
        <li style="width: 50%">
          <div class="title">
            <span :class="[fieldValues.category === '1' ? 'red' : '']">
              {{ fieldValues.category === "1" ? "*" : "" }}
            </span>
            중상업체
          </div>
          <div class="ip_sup2">
            <div>
              <input
                type="text"
                name="vendorCd"
                :disabled="true"
                v-model="fieldValues.vendorCd"
                @input="handleChangeField"
                class="ip1"
              />
            </div>
            <div>
              <input
                name="vendorNm"
                :disabled="
                  isFieldDisabled(state, 'vendorNm', disabledFields, fieldValues.isForceDisable)
                "
                @input="handleChangeField"
                @keypress="setVendorTxt"
                @blur="chkVendorData"
                v-model="fieldValues.vendorNm"
                class="ip2"
              />
            </div>
            <div>
              <button
                type="button"
                @click="handleSearchMidVendor"
                :disabled="
                  isFieldDisabled(state, 'vendorCd', disabledFields, fieldValues.isForceDisable)
                "
                class="btn_ip"
              >
                검색
              </button>
            </div>
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">
            <span :class="[fieldValues.category === '1' ? 'red' : '']">
              {{ fieldValues.category === "1" ? "*" : "" }}
            </span>
            등급
          </div>
          <div class="formbox">
            <select
              erpCode="true"
              mastCd="SCRAP_GRADE"
              name="gradeNm"
              topSelected="선택"
              :disabled="
                isFieldDisabled(state, 'gradeNm', disabledFields, fieldValues.isForceDisable)
              "
              @input="handleChangeField"
              v-model="fieldValues.gradeNm"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">
            <span :class="[fieldValues.category === '1' ? 'red' : '']">
              {{ fieldValues.category === "1" ? "*" : "" }}
            </span>
            컨테이너번호
          </div>
          <div class="formbox">
            <input
              name="cotNum"
              :disabled="
                isFieldDisabled(state, 'cotNum', disabledFields, fieldValues.isForceDisable)
              "
              @input="handleChangeField"
              v-model="fieldValues.cotNum"
              class="ip2"
            />
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
  <CustomerSearchPop
    v-model="customerSearchPopup"
    :searchTxt="fieldValues.custNm"
    @callbackFunc="setCustInfo"
    @handleClose="handleSearchCustClose"
  ></CustomerSearchPop>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchBar from "./SearchBar.vue";
import {
  getGridValidateCheck,
  saveGridCheckData,
  isFieldDisabled,
} from "../../../utils/validators";
import ButtonBar from "@/components/ButtonBar/index.vue";
import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
import { columnLayout } from "./columnLayout";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import CustomerSearchPop from "@/components/Popup/CustomerSearchPop/index.vue";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";

const customerSearchPopup = ref(false);
const itemSearchPopup = ref(false);
// const UserReg = (props) => {
const menuInfo = ref({});

const appStore = useAppStore();
const { menuList, menuActionList, menuKey, userInfo } = storeToRefs(appStore);

const myGrid = ref();
const state = ref("normaled");

onMounted(async () => {
  await nextTick(); // DOM 업데이트를 보장
  appStore.$patch(); // store 업데이트 보장
  myGrid.value.resize("100%", "100%");
  // console.log("menuActionList 온마운트::  ", menuActionList.value);
  // console.log("menuKey.value 온마운트::  ", menuKey.value);
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      // console.log("element : ", element);
      menuInfo.value = element;
    }
  });
});
onBeforeMount(() => {
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      // console.log("element : ", element);
      menuInfo.value = element;
    }
  });
});
//   //추가, 수정일때 항목의 disabled 결정
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
  category: "", //등록화면. 0고철국내, 1고철수입 ... 이런식으로 일단 가보자
  categoryNm: "", //등록화면명
  turn: "", //배차순번
  ioGb: "1", //입출구분 1: 입고, 2: 출고
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
  prodGb: "", //계근구분
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
  carNoRedcolor: "", //차번호색 붉은색 표기
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
const SERARCH_USER_URL = "/urgentdispatch/scrap/searchScrapDispatchList";
//상차지 저장 URL
const SAVE_USER_URL = "/urgentdispatch/scrap/saveScrapDispatchList";
//ERP코드 조회 URL
const ERP_GRADE_CODE_URL = "/urgentdispatch/scrap/searchScrapERPGrade";

//   const [, fetchData] = useAxiosWithAuthorization(
//     {
//       url: SERARCH_USER_URL,
//     },
//     { manual: true }
//   );

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

// //코드 및 그리드 초기화 및 생성
// useEffect(() => {
//   const auiGrid = myGrid.current;
//   auiGrid.bind("cellClick", function (event) {
//     gridCellClick(event.item);
//   });
//   //console.log(columnLayout);
//   columnLayout[11].renderer.@click = (event) => {
//     // console.log(
//     //   event.type,
//     //   event.pid,
//     //   event.rowIndex,
//     //   event.columnIndex,
//     //   event.text,
//     //   event.item,
//     //   event.dataField
//     // );
//     //개발
//     let imgHost = "localhost";
//     let port = "28082";
//     if (window.location.host === "wss.ekosco.com") {
//       imgHost = "wssm.ekosco.com";
//       port = "28084";
//     } else if (window.location.host === "testwss.ekosco.com") {
//       imgHost = "testwssm.ekosco.com";
//       port = "28082";
//     }
//     let url =
//       window.location.protocol +
//       "//" +
//       //window.location.host +
//       imgHost +
//       ":" +
//       port +
//       "/file/getOrgAttachImage/" +
//       event.item.sg +
//       "/" +
//       event.item.dt.replace(/\-/g, "") +
//       "/" +
//       event.item.seq +
//       "/ATTC_01";
//     //alert(url);
//     ModalImgShowPop({
//       imgUrl: url,
//     });
//   };
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
  // //console.log(item);
  // //setFieldValues(item);
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
  // auiGrid.addRow(initData, "last");
  // setFieldValues(initData);
  // const items = auiGrid.getSelectedItems()[0];
  // gridCellClick(items.item);
};

const handleMasterDelete = () => {
  //   const auiGrid = myGrid.current;
  //   const items = auiGrid.getSelectedItems()[0];
  //   const item = items.item;
  //   if (item.saveGb === "1") {
  //     ModalConfirm({
  //       title: "삭제불가",
  //       description: "ECB에서 등록한 사전배차 데이터는 삭제 할 수 없습니다",
  //       type: "alert",
  //     });
  //     return;
  //   }
  //   if (item.statusCd !== "100") {
  //     ModalConfirm({
  //       title: "삭제불가",
  //       description: "배차 후 계근이 진행된 건은 삭제 할 수 없습니다",
  //       type: "alert",
  //     });
  //     return;
  //   }
  //   auiGrid.removeRow("selectedIndex");
};
const handleMasterSave = async () => {
  //   if (
  //     await ModalConfirm({
  //       title: "저장",
  //       description: "데이터를 저장하시겠습니까?",
  //     })
  //   ) {
  //     let validator = [];
  //     const auiGrid = myGrid.current;
  //     var items = auiGrid.getGridData();
  //     let fieldRules = "";
  //     switch (fieldValues.category) {
  //       case "1":
  //         fieldRules = INITIAL_FIELD_RULES1;
  //         break;
  //       case "2":
  //         fieldRules = INITIAL_FIELD_RULES2;
  //         break;
  //       default:
  //         fieldRules = INITIAL_FIELD_RULES1;
  //         break;
  //     }
  //     const result = getGridValidateCheck(auiGrid, items, fieldRules);
  //     if (result.isValidate) {
  //       //검색조건과 입력필드의 name이 동일할 경우가 있다
  //       if (document.getElementsByName(result.column).length > 1) {
  //         document.getElementsByName(result.column)[1].focus();
  //       } else {
  //         document.getElementsByName(result.column)[0].focus();
  //       }
  //       ModalConfirm({
  //         title: "필수항목체크",
  //         description: result.message,
  //         type: "alert",
  //       });
  //       auiGrid.setSelectionByIndex(result.rowIndex);
  //       gridCellClick(result.rowItem);
  //       return;
  //     }
  //     const addItems = auiGrid.getAddedRowItems();
  //     const editItems = auiGrid.getEditedRowItems();
  //     const removeItems = auiGrid.getRemovedItems();
  //     const menuId = menuKey;
  //     let param = saveGridCheckData(addItems, editItems, removeItems, menuId);
  //     if (param.length > 0) {
  //       const {
  //         data: { data },
  //       } = await fetchData({
  //         url: SAVE_USER_URL,
  //         data: param,
  //         method: "POST",
  //       });
  //       handleMasterSearch();
  //     } else {
  //       ModalConfirm({
  //         title: "필수항목체크",
  //         description: "저장할 항목이 없습니다. ",
  //         type: "alert",
  //       });
  //     }
  //   }
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
  //   let prodGb = "";
  //   if (name === "category") {
  //     if (value === "1") {
  //       //국내고철
  //       prodGb = "1";
  //     } else if (value === "2") {
  //       //수입고철
  //       prodGb = "2";
  //     } else {
  //       prodGb = fieldValues.prodGb;
  //     }
  //   } else {
  //     setFieldValues({ ...fieldValues, [name]: value });
  //   }
  //   if (event.target.tagName === "SELECT") {
  //     switch (name) {
  //       case "category": //국내/수입
  //         item["categoryNm"] =
  //           event.target.options[
  //             event.target.options.selectedIndex
  //           ].innerText;
  //         item["prodGb"] = prodGb;
  //         //국내/수입 변화에 따라입력된 제품을 초기화 시킨다
  //         setFieldValues({
  //           ...fieldValues,
  //           prodGb: prodGb,
  //           prodCd: "",
  //           prodCd1: "",
  //           prodNm: "",
  //           category: value,
  //         });
  //         break;
  //       case "carType":
  //         item["carTypeNm"] =
  //           event.target.options[
  //             event.target.options.selectedIndex
  //           ].innerText;
  //         if (value === "4") {
  //           document.getElementsByName("cotNum")[0].disabled = false;
  //           INITIAL_FIELD_RULES2.cotNum = {
  //             rules: [
  //               {
  //                 required: true,
  //                 message: "컨테이너 번호는 필수조건입니다.",
  //               },
  //             ],
  //           };
  //         } else {
  //           document.getElementsByName("cotNum")[0].disabled = true;
  //           delete INITIAL_FIELD_RULES2["cotNum"];
  //         }
  //         break;
  //       case "gradeNm":
  //         chkGradeData(fieldValues.prodCd1, value);
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
const setCustInfo = (custInfo) => {
  fieldValues.value = {
    ...fieldValues,
    custCd: custInfo.custCd,
    custNm: custInfo.custNm,
  };
  oldValues.value = {
    ...oldValues,
    custNm: custInfo.custNm,
  };
  // updateGridData("custCd", custInfo.custCd);
  // updateGridData("custNm", custInfo.custNm);
};
//거래처 팝업 처리
const handleSearchCustomer = () => {
  customerSearchPopup.value = true;
  //   ModalCustomerSearchPop({
  //     callbackFunc: setCustInfo,
  //     searchTxt: fieldValues.custNm,
  //   });
  // };
};
const handleSearchCustClose = () => {
  customerSearchPopup.value = false;
};

//품번 팝업처리
const handleSearchItem = () => {
  // //제품이 아니라 품목을 검색해야 한다 함
  // //ModalItemSearchPop({ itemType: "PROD_SCRAP", callbackFunc: setItemInfo });
  // //console.log(fieldValues.category);
  // if (fieldValues.category === undefined || fieldValues.category === "") {
  //   ModalConfirm({
  //     title: "팝업 필수 조건",
  //     description: "국내/수입 구분 선택을 먼저 해주세요",
  //     type: "alert",
  //   });
  //   return;
  // }
  // ModalItemTypeSearchPop({
  //   itemType: "PROD_TYPE",
  //   category: fieldValues.category,
  //   callbackFunc: setItemInfo,
  //   searchTxt: fieldValues.prodNm,
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
  // setFieldValues({
  //   ...fieldValues,
  //   prodNm: itemInfo.cdNmKor,
  //   prodCd1: itemInfo.detlCd,
  //   prodCd: prodCd,
  // });
  // setOldValues({
  //   ...oldValues,
  //   prodNm: itemInfo.cdNmKor,
  // });
  // updateGridData("prodNm", itemInfo.cdNmKor);
  // updateGridData("prodCd1", itemInfo.detlCd);
  // updateGridData("prodCd", prodCd);
  // console.log(
  //   "prodCd :",
  //   prodCd,
  //   "prodCd1 : ",
  //   itemInfo.detlcd,
  //   "prodNm : ",
  //   itemInfo.cdNmKor
  // );
  // chkGradeData(itemInfo.detlCd, fieldValues.gradeNm);
};

const updateGridData = (key, value) => {
  // const auiGrid = myGrid.current;
  // const items = auiGrid.getSelectedItems()[0];
  // const item = items.item;
  // item[key] = value;
  // auiGrid.updateRow(item, "selectedIndex");
};

//납품지 팝업처리
const handleSearchArea = () => {
  //   ModalAreaSearchPop({
  //     callbackFunc: setAreaInfo,
  //     searchTxt: fieldValues.areaNm,
  //   });
  // };
  // const setAreaInfo = (areaInfo) => {
  //   setFieldValues({
  //     ...fieldValues,
  //     areaCd: areaInfo.detlCd,
  //     areaNm: areaInfo.cdNmKor,
  //   });
  //   setOldValues({
  //     ...oldValues,
  //     areaNm: areaInfo.cdNmKor,
  //   });
  //   updateGridData("areaCd", areaInfo.detlCd);
  //   updateGridData("areaNm", areaInfo.cdNmKor);
};

//중상업체 팝업처리
const handleSearchMidVendor = () => {
  //   ModalMidVendorSearchPop({
  //     callbackFunc: setMidVendor,
  //     searchTxt: fieldValues.vendorNm,
  //   });
  // };
  // const setMidVendor = (midVendorInfo) => {
  //   setFieldValues({
  //     ...fieldValues,
  //     vendorCd: midVendorInfo.vendorCd,
  //     vendorNm: midVendorInfo.vendorNm,
  //   });
  //   setOldValues({
  //     ...oldValues,
  //     vendorNm: midVendorInfo.vendorNm,
  //   });
  //   updateGridData("vendorCd", midVendorInfo.vendorCd);
  //   updateGridData("vendorNm", midVendorInfo.vendorNm);
};

//차량 검색 팝업처리
const handleSearchCar = (carInfo) => {
  //   ModalCarSearchPop({ callbackFunc: setCar, searchTxt: fieldValues.carNo });
  // };
  // const setCar = (carInfo) => {
  //   const regex = /^[0-9\b -]{0,13}$/;
  //   if (regex.test(carInfo.drvTel)) {
  //     const regDrvTel = ajusta(carInfo.drvTel);
  //     carInfo.drvTel = regDrvTel;
  //   }
  //   setFieldValues({
  //     ...fieldValues,
  //     carNo: carInfo.carFullNo,
  //     carCd: carInfo.custCd,
  //     drvNm: carInfo.drvNm,
  //     drvTel: carInfo.drvTel,
  //   });
  //   setOldValues({
  //     ...oldValues,
  //     carNo: carInfo.carNo,
  //   });
  //   updateGridData("carNo", carInfo.carFullNo);
  //   updateGridData("carCd", carInfo.custCd);
  //   updateGridData("drvNm", carInfo.drvNm);
  //   updateGridData("drvTel", carInfo.drvTel);
};

// const [, fetchCodeData] = useAxiosWithAuthorization(
//   {
//     url: ERP_GRADE_CODE_URL,
//   },
//   { manual: true }
// );

const chkGradeData = async (prodCd1, gradeNm) => {
  // //console.log("prodCd1", prodCd1, ", gradeNm", gradeNm);
  // if (
  //   prodCd1 !== undefined &&
  //   gradeNm !== undefined &&
  //   prodCd1 !== "" &&
  //   gradeNm !== ""
  // ) {
  //   const {
  //     data: { data },
  //   } = await fetchCodeData({
  //     url: ERP_GRADE_CODE_URL,
  //     params: {
  //       prodCd1: prodCd1,
  //       gradeNm: gradeNm,
  //     },
  //   });
  //   if (data.length === 0) {
  //     ModalConfirm({
  //       title: "고철 등급 오류",
  //       description:
  //         gradeNm +
  //         "는 선택 가능한 등급이 아닙니다.\r\n등급을 다시 선택해주세요.",
  //       type: "alert",
  //     });
  //     setFieldValues({ ...fieldValues, gradeNm: "" });
  //   }
  // }
};

const setCustTxt = (evt) => {
  //console.log(evt.key, evt.code, evt.keyCode);
  // if (evt.keyCode === 13 || evt.keyCode === 9) {
  //   //enter key or tab key
  //   ModalCustomerSearchPop({
  //     callbackFunc: setCustInfo,
  //     searchTxt: evt.target.value,
  //     autoSelect: true,
  //     failCallbackFunc: restoreCustInfo,
  //   });
  // }
  if (evt.keyCode === 13) {
    evt.target.blur();
  }
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
  //     category: fieldValues.category,
  //     callbackFunc: setItemInfo,
  //     searchTxt: fieldValues.prodNm,
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

const chkItemData = (evt) => {
  // if (evt.target.value !== undefined && evt.target.value !== "") {
  //   if (fieldValues.category === undefined || fieldValues.category === "") {
  //     ModalConfirm({
  //       title: "팝업 필수 조건",
  //       description: "국내/수입 구분 선택을 먼저 해주세요",
  //       type: "alert",
  //     });
  //     return;
  //   }
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
  // if (evt.keyCode === 13) {
  //   evt.target.blur();
  // }
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

const setAreaTxt = (evt) => {
  // if (evt.keyCode === 13) {
  //   evt.target.blur();
  // }
};

const chkAreaData = (evt) => {
  // if (evt.target.value !== undefined && evt.target.value !== "") {
  //   ModalAreaSearchPop({
  //     callbackFunc: setAreaInfo,
  //     searchTxt: evt.target.value,
  //     autoSelect: true,
  //     failCallbackFunc: restoreAreaData,
  //   });
  // }
};

const restoreAreaData = () => {
  // setFieldValues({ ...fieldValues, areaNm: oldValues.areaNm });
};

const setVendorTxt = (evt) => {
  if (evt.keyCode === 13) {
    evt.target.blur();
  }
};

const chkVendorData = (evt) => {
  // if (evt.target.value !== undefined && evt.target.value !== "") {
  //   ModalMidVendorSearchPop({
  //     callbackFunc: setMidVendor,
  //     searchTxt: evt.target.value,
  //     autoSelect: true,
  //     failCallbackFunc: restoreMidVendorData,
  //   });
  // }
};

const restoreMidVendorData = () => {
  // setFieldValues({
  //   ...fieldValues,
  //   vendorNm: oldValues.vendorNm,
  // });
};
</script>
