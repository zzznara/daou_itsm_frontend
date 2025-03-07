<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span color="grey">⦁</span> 입차예정일</div>
        <input type="date" name="dt" class="datainput" @input="handleChangeField" />
      </li>
      <li>
        <div class="divide50"><span color="grey">⦁</span> 국내/수입</div>
        <select
          v-model="searchValues.category"
          mastCd="U_DISPATCH_TYPE"
          attr1="Y"
          name="category"
          topSelected="전체"
          class="datainput"
          @input="handleChangeField"
        />
      </li>
      <li>
        <div class="divide50"><span color="grey">⦁</span> 거래처</div>
        <div class="ip_textandbutton">
          <div>
            <input
              v-model="searchValues.custNm"
              type="text"
              name="custNm"
              :disabled="false"
              class="ip1"
              @input="handleChangeField"
              @keydown="setCustTxt"
            />
          </div>
          <div>
            <button type="button" @click="handleSearchCust" class="btn_ip">검색</button>
          </div>
        </div>
      </li>
      <li>
        <div class="divide50"><span color="grey">⦁</span> 제품명</div>
        <div class="ip_textandbutton">
          <div>
            <input
              type="text"
              name="prodNm"
              :disabled="false"
              @input="handleChangeField"
              class="ip1"
              v-model="searchValues.prodNm"
              @keydown="setItemTxt"
            />
          </div>
          <div>
            <button type="button" @click="handleSearchItem" class="btn_ip">검색</button>
          </div>
        </div>
      </li>
      <li>
        <div class="divide50"><span color="grey">⦁</span> 상태</div>
        <select
          mastCd="TRANS_STATUS_CD"
          name="status"
          topSelected="전체"
          class="datainput"
          @input="handleChangeField"
        />
      </li>
      <li>
        <div class="divide50"><span color="grey">⦁</span> 차량번호</div>
        <input type="text" class="datainput" name="carNo" @input="handleChangeField" />
      </li>
      <li>
        <div class="divide50"><span color="grey">⦁</span> 등록구분</div>
        <select
          mastCd="ODR_TYPE"
          name="saveGB"
          attr10="Y"
          topSelected="전체"
          class="datainput"
          @input="handleChangeField"
        />
      </li>
    </ul>
  </div>
  <CustomerSearchPop
    v-model="customerSearchPopup"
    :searchTxt="searchValues.custNm"
    @handleClose="handleSearchCustClose"
  ></CustomerSearchPop>
  <ItemSearchPop
    v-model="itemSearchPopup"
    :searchTxt="searchValues.prodNm"
    :category="searchValues.category"
    @callbackFunc="setItemInfo"
    @handleClose="handleSearchItemClose"
  ></ItemSearchPop>
</template>
<script setup>
import { ref } from "vue";
import CustomerSearchPop from "@/components/Popup/CustomerSearchPop/index.vue";
import ItemSearchPop from "@/components/Popup/ItemSearchPop/index.vue";

// import React, { useCallback, useState } from "react";
// import useAppContext from "../../../utils/Reducers";
// import { ModalItemSearchPop } from "../../Popup/ItemSearchPop";
// import { ModalItemTypeSearchPop } from "../../Popup/ItemTypeSearchPop";
// import { INITIAL_FIELD_RULES } from "./validateFields1";

const customerSearchPopup = ref(false);
const itemSearchPopup = ref(false);
const itemTypeSearchPopup = ref(false);
// SerachBar 기본 필드
const searchValues = ref({
  category: "", //국내수입
  custCd: "", //거래처 코드
  custNm: "", //거래처 명
  prodCd1: "", //품목코드
  prodNm: "", //제품명
  status: "", //상태
  carNo: "", //차량번호
  dt: "", //입차예정일
  saveGB: "", //등록구분
});

const handleChangeField = (event) => {
  // const { name, value } = event.target;
  // let copyMap = searchValues;
  // copyMap[name] = value;
  // setSearchValues(copyMap);
  // props.setSearchParameters(searchValues);
};

const handleSearchCust = () => {
  customerSearchPopup.value = true;
};

const handleSearchCustClose = () => {
  customerSearchPopup.value = false;
};

const setCustInfo = (custInfo) => {
  // //setItemInfo 랑 다르게 시도해봄. Copy 방식
  // //복사 떠서 하면 로그 찍었을때 바로 반영됨
  // let copyMap = searchValues;
  // copyMap.custNm = custInfo.custNm;
  // copyMap.custCd = custInfo.custCd;
  // setSearchValues(copyMap);
  // props.setSearchParameters(searchValues);
};

const handleSearchItem = () => {
  itemSearchPopup.value = true;
  // //ModalItemSearchPop({ itemType: "PROD_SCRAP", callbackFunc: setItemInfo });
  // ModalItemTypeSearchPop({
  //   itemType: "PROD_TYPE",
  //   category: searchValues.category,
  //   callbackFunc: setItemInfo,
  //   searchTxt: searchValues.prodNm,
  // });
};

const handleSearchItemClose = () => {
  itemSearchPopup.value = false;
};

const setItemInfo = (itemInfo) => {
  // // setCustInfo랑 다르게 시도해봄. 기존꺼 우려먹기 방식
  // // let copyMap = searchValues;
  // // copyMap.prodNm = itemInfo.cdNmKor;
  // // copyMap.prodCd = itemInfo.detlCd;
  // //setSearchValues(copyMap);
  // //이렇게 하면 로그찍었을때 바로 적용이 안되고 뭔가 한박자 느린 것 같다...
  // setSearchValues({
  //   ...searchValues,
  //   prodNm: itemInfo.cdNmKor,
  //   prodCd1: itemInfo.detlCd,
  // });
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
  //     category: searchValues.category,
  //     callbackFunc: setItemInfo,
  //     searchTxt: searchValues.prodNm,
  //   });
  // }
};
</script>
