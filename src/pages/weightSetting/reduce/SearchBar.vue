<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 거래처</div>
        <div class="ip_textandbutton">
          <div>
            <input
              type="text"
              name="custNm"
              class="ip1"
              @input="handleChangeField"
              @keydown="setCustTxt"
              v-model="searchValues.custNm"
            />
          </div>
          <div>
            <button type="button" @click="handleSearchCust" class="btn_ip">검색</button>
          </div>
        </div>
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 감량코드</div>
        <input type="text" class="datainput" name="reduceCd" @input="handleChangeField" />
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";

// import React, { useCallback, useState } from "react";
// import { ModalCustomerSearchPop } from "../../Popup/CustomerSearchPop";

// SerachBar 기본 필드
const searchValues = ref({
  reduceCd: "",
  custNm: "",
});

const handleChangeField = (event) => {
  const { name, value } = event.target;
  let copyMap = searchValues;
  copyMap[name] = value;
  setSearchValues(copyMap);
  props.setSearchParameters(searchValues);
};

const handleSearchCust = () => {
  // ModalCustomerSearchPop({
  //   callbackFunc: setCustInfo,
  //   isContainAll: "Y",
  // });
};

const setCustInfo = (custInfo) => {
  // let copyMap = searchValues;
  // copyMap.custNm = custInfo.custNm;
  // copyMap.custCd = custInfo.custCd;
  // setSearchValues(copyMap);
  // props.setSearchParameters(searchValues);
};

const setCustTxt = (evt) => {
  // if (evt.keyCode === 8 || evt.keyCode === 46) {
  //   setSearchValues({
  //     ...searchValues,
  //     custCd: "",
  //     custNm: "",
  //   });
  // } else if (evt.keyCode === 13 || evt.keyCode == 9) {
  //   //enter key or tab key
  //   ModalCustomerSearchPop({
  //     callbackFunc: setCustInfo,
  //     searchTxt: searchValues.custNm,
  //   });
  // }
};
</script>
