<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 업무구분</div>
        <SelectBox
          :mastCd="`CATEGORY_GBN_CD`"
          id="category"
          :name="`category`"
          :attr2="''"
          :topSelected="`전체`"
          :className="`datainput`"
          :onChange="handleChangeField"
        />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 거래처</div>
        <div class="ip_textandbutton">
          <div>
            <input
              v-model="searchValues.custNm"
              type="text"
              name="custNm"
              class="ip1"
              @change="handleChangeField"
              @keydown="setCustTxt"
            />
          </div>
          <div>
            <button type="button" @click="handleSearchCust" class="btn_ip">검색</button>
          </div>
        </div>
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 제품명</div>
        <div class="ip_textandbutton">
          <div>
            <input
              v-model="searchValues.prodNm"
              type="text"
              name="prodNm"
              class="ip1"
              @change="handleChangeField"
              @keydown="setItemTxt"
            />
          </div>
          <div>
            <button type="button" @click="handleSearchItemType" class="btn_ip">검색</button>
          </div>
        </div>
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 차량번호</div>
        <input type="text" name="carNo" class="datainput" @change="handleChangeField" />
      </li>
      <li class="date">
        <div class="divide50"><span class="dot">⦁</span> 계량일자</div>
        <div class="flex50">
          <input
            type="date"
            name="startDt"
            @change="handleChangeField"
            class="datainput"
            v-model="searchValues.startDt"
          />
          &nbsp;~&nbsp;
          <input
            type="date"
            name="endDt"
            @change="handleChangeField"
            class="datainput"
            v-model="searchValues.endDt"
          />
        </div>
      </li>
    </ul>
  </div>
  <CustomerSearchPop
    v-model="customerSearchPopup"
    :callbackFunc="setCustInfo"
    :handleClose="handleSearchCustClose"
  ></CustomerSearchPop>
  <ItemTypeSearchPop
    v-model="itemTypeSearchPopup"
    :itemType="`PROD_TYPE`"
    :category="''"
    :callbackFunc="setItemInfo"
    :handleClose="handleSearchItemTypeClose"
  ></ItemTypeSearchPop>
</template>

<script setup>
import moment from "moment";
import { ref } from "vue";
import SelectBox from "@/components/SelectBox/index.vue";
import CustomerSearchPop from "@/components/Popup/CustomerSearchPop/index.vue";
import ItemTypeSearchPop from "@/components/Popup/ItemTypeSearchPop/index.vue";
const props = defineProps(["setSearchParameters"]);

const customerSearchPopup = ref(false);
const itemTypeSearchPopup = ref(false);

const searchValues = ref({
  category: "",
  custCd: "", //거래처 코드
  custNm: "", //거래처 명
  prodCd1: "", //품목코드
  prodNm: "", //제품명
  carNo: "",
  startDt: moment().format("YYYY-MM-DD"),
  endDt: moment().format("YYYY-MM-DD"),
});

const handleChangeField = (event) => {
  const { name, value } = event.target;
  let copyMap = searchValues;
  copyMap[name] = value;
  searchValues.value = copyMap;
  props.setSearchParameters(searchValues);
};

const handleSearchCust = () => {
  customerSearchPopup.value = true;
};
const handleSearchCustClose = () => {
  customerSearchPopup.value = false;
};

const setCustInfo = (custInfo) => {
  let copyMap = searchValues;
  copyMap.custNm = custInfo.custNm;
  copyMap.custCd = custInfo.custCd;

  searchValues.value = copyMap;

  props.setSearchParameters(searchValues);
};

const setItemInfo = (itemInfo) => {
  let copyMap = searchValues;
  copyMap.prodNm = itemInfo.cdNmKor;
  copyMap.prodCd1 = itemInfo.detlCd;

  searchValues.value = copyMap;
  props.setSearchParameters(searchValues);
};

const handleSearchItemType = () => {
  itemTypeSearchPopup.value = true;

  // ModalItemTypeSearchPop({
  //   itemType: "PROD_TYPE",
  //   category: " ",
  //   callbackFunc: setItemInfo,
  // });
};

const handleSearchItemTypeClose = () => {
  itemTypeSearchPopup.value = false;
};

const setCustTxt = (evt) => {
  //console.log(evt.key, evt.code, evt.keyCode);
  if (evt.keyCode === 8 || evt.keyCode === 46) {
    searchValues.value = {
      ...searchValues,
      custCd: "",
      custNm: "",
    };
  } else if (evt.keyCode === 13 || evt.keyCode == 9) {
    //enter key or tab key
    // ModalCustomerSearchPop({
    //   callbackFunc: setCustInfo,
    //   searchTxt: searchValues.custNm,
    // });
  }
};

const setItemTxt = (evt) => {
  //console.log(evt.key, evt.code, evt.keyCode);
  if (evt.keyCode === 8 || evt.keyCode === 46) {
    searchValues.value = {
      ...searchValues,
      prodCd1: "",
      prodNm: "",
    };
  } else if (evt.keyCode === 13 || evt.keyCode == 9) {
    //enter key or tab key
    // ModalItemTypeSearchPop({
    //   itemType: "PROD_TYPE",
    //   category: "1",
    //   callbackFunc: setItemInfo,
    //   searchTxt: searchValues.prodNm,
    // });
  }
};
</script>
