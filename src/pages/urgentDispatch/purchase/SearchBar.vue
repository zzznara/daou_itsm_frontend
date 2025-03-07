<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 입차예정일</div>
        <input type="date" name="dt" @input="handleChangeField" class="datainput" />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 매입/매출</div>
        <select
          mastCd="BIZ_TYPE"
          name="ioGb"
          topSelected="전체"
          @input="handleChangeField"
          class="datainput"
          v-model="searchValues.ioGb"
        />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 제품명</div>
        <div class="ip_textandbutton">
          <div>
            <input
              type="text"
              name="prodNm"
              disabled="false"
              @input="handleChangeField"
              @keydown="setItemTxt"
              class="ip1"
              v-model="searchValues.prodNm"
            />
          </div>
          <div>
            <button type="button" @click="handleSearchItem" class="btn_ip">검색</button>
          </div>
        </div>
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 차량번호</div>
        <input type="text" class="datainput" name="carNo" @input="handleChangeField" />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 상태</div>
        <select
          mastCd="TRANS_STATUS_CD"
          name="status"
          topSelected="전체"
          @input="handleChangeField"
          class="datainput"
        />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 등록구분</div>
        <select
          mastCd="ODR_TYPE"
          name="saveGB"
          attr10="Y"
          topSelected="전체"
          @input="handleChangeField"
          class="datainput"
        />
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";

// import React, { useCallback, ref } from "react";
// import SelectBox from "../../../components/SelectBox";
// import useAppContext from "../../../utils/Reducers";
// import { ModalItemTypeSearchPop } from "../../Popup/ItemTypeSearchPop";

// SerachBar 기본 필드
const searchValues = ref({
  category: "4", //화면구분
  dt: "", //입차예정일
  ioGb: "", //매입/매출
  prodNm: "", //제품명
  carNo: "", //차량번호
  status: "", //상태
  inGb: "", //등록구분
});

const handleChangeField = (event) => {
  // const { name, value } = event.target;
  // let copyMap = searchValues;
  // copyMap[name] = value;
  // setSearchValues(copyMap);
  // props.setSearchParameters(searchValues);
};

const handleSearchItem = () => {
  // //ModalItemSearchPop({ itemType: "PROD_SCRAP", callbackFunc: setItemInfo });
  // ModalItemTypeSearchPop({
  //   itemType: "PROD_TYPE",
  //   category: "4",
  //   searchTxt: searchValues.prodNm,
  //   callbackFunc: setItemInfo,
  // });
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
  //     category: "4",
  //     callbackFunc: setItemInfo,
  //     searchTxt: searchValues.prodNm,
  //   });
  // }
};
</script>
