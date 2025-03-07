<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 업무구분</div>
        <select
          mastCd="CATEGORY_GBN_CD"
          id="category"
          name="category"
          attr2=""
          topSelected="전체"
          @change="handleChangeField"
          class="datainput"
        />
        <!-- // erpCode="true" -->
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 입차예정일</div>
        <input
          type="date"
          name="dt"
          @change="handleChangeField"
          class="datainput"
          v-model="searchValues.dt"
        />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 거래처</div>
        <div class="ip_textandbutton">
          <div>
            <input
              type="text"
              name="custNm"
              class="ip1"
              @change="handleChangeField"
              @keydown="setCustTxt"
              v-model="searchValues.custNm"
            />
          </div>
          <div>
            <button type="button" @click="handleSearchCust" class="btn_ip">
              검색
            </button>
          </div>
        </div>
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 제품명</div>
        <div class="ip_textandbutton">
          <div>
            <input
              type="text"
              name="prodNm"
              @change="handleChangeField"
              @keydown="setItemTxt"
              class="ip1"
              v-model="searchValues.prodNm"
            />
          </div>
          <div>
            <button type="button" @click="handleSearchItem" class="btn_ip">
              검색
            </button>
          </div>
        </div>
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 차량번호</div>
        <input
          type="text"
          name="carNo"
          class="datainput"
          @change="handleChangeField"
        />
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";

// React, { useCallback, useState } from "react";
// import select from "../../../components/select";
// import useAppContext from "../../../utils/Reducers";
// import { ModalCustomerSearchPop } from "../../Popup/CustomerSearchPop";
// import { ModalItemTypeSearchPop } from "../../Popup/ItemTypeSearchPop";
import moment from "moment";

// SerachBar 기본 필드
const searchValues = ref({
  category: "",
  custCd: "", //거래처 코드
  custNm: "", //거래처 명
  prodCd1: "", //품목코드
  prodNm: "", //제품명
  carNo: "",
  dt: moment().format("YYYY-MM-DD"),
});

const handleChangeField = (event) => {
  // const { name, value } = event.target;
  // let copyMap = searchValues;
  // copyMap[name] = value;
  // setSearchValues(copyMap);
  // props.setSearchParameters(searchValues);
};

const handleSearchCust = () => {
  // ModalCustomerSearchPop({
  //   callbackFunc: setCustInfo,
  // });
};

const handleSearchItem = () => {
  // //ModalItemSearchPop({ itemType: "PROD_SCRAP", callbackFunc: setItemInfo });
  // ModalItemTypeSearchPop({
  //   itemType: "PROD_TYPE",
  //   category: " ",
  //   callbackFunc: setItemInfo,
  // });
};

const setCustInfo = (custInfo) => {
  // let copyMap = searchValues;
  // copyMap.custNm = custInfo.custNm;
  // copyMap.custCd = custInfo.custCd;
  // setSearchValues(copyMap);
  // props.setSearchParameters(searchValues);
};

const setItemInfo = (itemInfo) => {
  // let copyMap = searchValues;
  // copyMap.prodNm = itemInfo.cdNmKor;
  // copyMap.prodCd1 = itemInfo.detlCd;
  // setSearchValues(copyMap);
  // props.setSearchParameters(searchValues);
};

const setCustTxt = (evt) => {
  // if (evt.keyCode === 8 || evt.keyCode === 46) {
  //   let copyMap = searchValues;
  //   copyMap.custNm = "";
  //   copyMap.custCd = "";
  //   setSearchValues(copyMap);
  //   props.setSearchParameters(searchValues);
  // } else if (evt.keyCode === 13 || evt.keyCode == 9) {
  //   //enter key or tab key
  //   ModalCustomerSearchPop({
  //     callbackFunc: setCustInfo,
  //     searchTxt: searchValues.custNm,
  //   });
  // }
};

const setItemTxt = (evt) => {
  // if (evt.keyCode === 8 || evt.keyCode === 46) {
  //   let copyMap = searchValues;
  //   copyMap.prodNm = "";
  //   copyMap.prodCd1 = "";
  //   setSearchValues(copyMap);
  //   props.setSearchParameters(searchValues);
  // } else if (evt.keyCode === 13 || evt.keyCode == 9) {
  //   //enter key or tab key
  //   ModalItemTypeSearchPop({
  //     itemType: "PROD_TYPE",
  //     category: " ",
  //     callbackFunc: setItemInfo,
  //     searchTxt: searchValues.prodNm,
  //   });
  // }
};
</script>
