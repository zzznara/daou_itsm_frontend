<template>
  <ButtonBar
    :menuInfo="menuInfo"
    :handleMasterSearch="handleMasterSearch"
    :handleMasterExcel="handleMasterExcel"
  />
  <!-- handleMasterNew="handleMasterNew"
        handleMasterDelete="handleMasterDelete"
        handleMasterSave="handleMasterSave" -->
  <SearchBar
    :setSearchParameters="setSearchParameters"
    :systemCd="userInfo.systemCd"
  />

  <div className="grid_wrap">
    <AUIGrid
      ref="myGrid"
      :columnLayout="columnLayout"
      :gridProps="defaultGridProps"
    />
  </div>
</template>
<script setup>
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import moment from "moment";
import { onMounted, ref } from "vue";
import { columnLayout } from "./columnLayout";
import SearchBar from "./SearchBar.vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";

// import React, {
//   useState,
//   useCallback,
//   useEffect,
//   useRef,
//   useLayoutEffect,
// } from "react";
// import SearchBar from "./SearchBar.vue";
// import { useAxiosWithAuthorization } from "../../../utils/api";
// import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
// import { columnLayout } from "./conlumnLayout";
// import useAppContext from "../../../utils/Reducers";
// import AUIGrid from "../../../lib/AuiGrid/AUIGridReact";
// import moment from "moment";
// //import PhoneInput from "react-phone-number-input/input";

const menuInfo = ref({
  menuNmKor: "구내차량 조회",
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
// onMounted(() => {
//   const auiGrid = myGrid.current;
//   auiGrid.resize("100%", "100%");
// }, [menuKey]);

//추가, 수정일때 항목의 disabled 결정
const disabledFields = {
  created: [],
  updated: ["systemCd", "userId"],
};

const initItem = {
  categoryNm: "",
  ioGbNm: "",
  custCd: "", //업체 코드
  custNm: "",
  prodCd: "", //고철품목코드
  prodCd1: "", //고철코드
  prodNm: "",
  carNo: "",
  drvNm: "",
  drvTel: "",
  refSeq: "",
  inWeight: "",
  dt: "",
};
const fieldValues = ref(initItem);

//상차지 검색 URL
const SERARCH_INHOUSE_URL = "/weightsetting/inhouse/searchInHouseList";

// const [, fetchData] = useAxiosWithAuthorization(
//   {
//     url: SERARCH_INHOUSE_URL,
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
  dt: moment().format("YYYY-MM-DD"),
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
    carNo: values.carNo,
    dt: values.dt,
  };
};

//코드 및 그리드 초기화 및 생성
onMounted(() => {
  // const auiGrid = myGrid.current;
  // auiGrid.bind("cellClick", function (event) {
  //   gridCellClick(event.item);
  // });
});

const gridCellClick = (item) => {
  // console.log(item);
  // setFieldValues(item);
};

const handleMasterSearch = async () => {
  // const auiGrid = myGrid.current;
  // auiGrid.showAjaxLoader();
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SERARCH_INHOUSE_URL,
  //   params: primaryParameters,
  // });
  // auiGrid.setGridData(data);
  // setFieldValues(initItem);
  // auiGrid.removeAjaxLoader();
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
</script>
