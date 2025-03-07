<template>
  <ButtonBar
    :menuInfo="menuInfo"
    :handleMasterSearch="handleMasterSearch"
    :handleMasterExcel="handleMasterExcel"
  />
  <!-- // handleMasterNew="handleMasterNew"
        // handleMasterDelete="handleMasterDelete"
        // handleMasterSave="handleMasterSave" -->
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
  <ul class="t_form">
    <li style="height: 128px">
      <div class="title">로그내용</div>
      <div class="formbox">
        <textarea
          rows="1"
          type="text"
          id="useHisCntn"
          name="useHisCntn"
          value="fieldValues.useHisCntn"
          @change="handleChangeField"
          :disabled="true"
          class="ip2"
          style="height: 100px; vertical-align: middle"
        />
      </div>
    </li>
  </ul>
</template>
<script setup>
// import React, { useState, useCallback, useEffect, useRef } from "react";
// import SearchBar from "./SearchBar";
// import ButtonBar from "../../../components/Layout/ButtonBar";
// import { useAxiosWithAuthorization } from "../../../utils/api";
// import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
// import { columnLayout } from "./columnLayout";
// import useAppContext from "menuInfo../../../utils/Reducers";
// import AUIGrid from "../../../lib/AuiGrid/AUIGridReact";
import moment from "moment";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import { onMounted, ref } from "vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";
import SearchBar from "./SearchBar.vue";

const menuInfo = ref({
  menuNmKor: "사용기록조회",
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

const initItem = {
  logSeq: "",
  userId: "",
  nmKor: "",
  menuId: "",
  menuNmKor: "",
  useHisCntn: "",
  inptDt: "",
};
const fieldValues = ref(initItem);

//상차지 검색 URL
const SERARCH_USEHISTORY_URL = "/resultinquery/usehistory/searchUseHistoryList";

// const [, fetchData] = useAxiosWithAuthorization(
//   {
//     url: SERARCH_USEHISTORY_URL,
//   },
//   { manual: true }
// );

const primaryParameters = ref({
  userId: "",
  useHisCntn: "",
  startDt: moment().format("YYYY-MM-DD"),
  endDt: moment().format("YYYY-MM-DD"),
});

//검색조건
const setSearchParameters = (values) => {
  console.log(values.schSwgtDt);
  primaryParameters.value = {
    ...primaryParameters,
    userId: values.userId,
    useHisCntn: values.useHisCntn,
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
  // // read
  // // setFieldsEnabled(auiGrid, item, disabledFields);
  // console.log(item);
  // setFieldValues(item);
};

const handleMasterSearch = async () => {
  // const auiGrid = myGrid.current;
  // auiGrid.showAjaxLoader();
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SERARCH_USEHISTORY_URL,
  //   params: primaryParameters,
  // });
  // auiGrid.setGridData(data);
  // setFieldValues(initItem);
  // auiGrid.removeAjaxLoader();
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
</script>
