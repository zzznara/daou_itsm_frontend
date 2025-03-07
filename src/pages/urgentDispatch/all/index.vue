<template>
  <ButtonBar
    :menuInfo="menuInfo"
    :handleMasterSearch="handleMasterSearch"
    :handleMasterExcel="handleMasterExcel"
  />
  <SearchBar :setSearchParameters="setSearchParameters" :systemCd="userInfo.systemCd" />
  <!--  -->

  <div class="grid_wrap">
    <AUIGrid ref="{myGrid}" :columnLayout="columnLayout" :gridProps="defaultGridProps" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import SearchBar from "./SearchBar.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";

const menuInfo = ref({
  menuNmKor: "긴급배차(전체)",
  menuAuth: {
    searchAuthYn: "Y",
    newAuthYn: "N",
    delAuthYn: "N",
    saveAuthYn: "N",
    excelAuthYn: "Y",
    printAuthYn: "N",
  },
});
const userInfo = ref({
  userId: "",
  systemCd: "",
});
//긴급배차 필드들
const initItem = {
  sg: userInfo.plbsCd, //사업장
  dt: "", //일자
  seq: "", //채번
  category: "", //등록화면. 1,2 고철, 3 물류, 4 구매, 5 환경안전, 이외 기간계에서 처리
  categoryNm: "", //등록화면명
  turn: "", //배차순번
  ioGb: "", //입출구분 1: 입고, 2: 출고
  stGb: "", //안정화구분 1: 안정, 2:불안정
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
  banpumChk: "", //반품 유무 체크
  refSg: "", //계근 사업장
  refDt: "", //계근 일자
  refSeq: "", //계근 SEQ
  bigo: "", //비고
  inGb: "", //등록구분
  inGbNm: "", //등록구분
  isNo: userInfo.userId, //작성자
  isDt: "", //작성일시
  upNo: userInfo.userId, //수정자
  upDt: "", //수정일시
  cotNum: "", //컨테이너 번호
};
const fieldValues = ref(initItem);

//검색 URL
const SERARCH_USER_URL = "/urgentdispatch/all/searchAllDispatchList";

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
  ioGb: "", //매입/매출
});
//검색조건
const setSearchParameters = (values) => {
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
    ioGb: values.ioGb,
  };
};

//코드 및 그리드 초기화 및 생성
onMounted(() => {
  // //const auiGrid = myGrid.current;
  // // auiGrid.bind("cellClick", function (event) {
  // //   gridCellClick(event);
  // // });
  // // console.log("----------");
  // // console.log(columnLayout[56]);
  // // console.log("----------");
  // //console.log(columnLayout[56].renderer.@click);
  // columnLayout[13].renderer.@click = (event) => {
  //   // console.log(
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
}, []);

//const gridCellClick = (event) => {
// 추가 : editable, 수정 : edtiable, 삭제 : readonly
//read
//setFieldsEnabled(auiGrid, item, disabledFields);
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
//console.log(item);
//setFieldValues(item);
//};
const handleMasterSearch = async () => {
  // const auiGrid = myGrid.current;
  // auiGrid.showAjaxLoader();
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SERARCH_USER_URL,
  //   params: primaryParameters,
  // });
  // auiGrid.setGridData(data);
  // setFieldValues(initItem);
  // auiGrid.removeAjaxLoader();
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

<style scoped></style>
