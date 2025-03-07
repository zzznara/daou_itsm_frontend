<template>
  <v-dialog width="auto" class="commonDialog">
    <v-card>
      <v-card-title>
        <h3>ERP품목 팝업</h3>
      </v-card-title>
      <v-card-text style="flex: 1 1 auto; padding: 0.75rem; position: relative">
        <div class="searchdata">
          <ul>
            <li>
              <div class="divide50"><span color="grey">⦁</span> 품목코드/명</div>
              <div class="ip_textandbutton">
                <div>
                  <input
                    type="text"
                    name="searchTxt"
                    disabled="false"
                    @change="handleChangeField"
                    class="ip1"
                    v-model="INITIAL_SEARCH_FIELDS.searchTxt"
                  />
                </div>
                <div>
                  <button type="button" @click="searchItem" class="btn_ip">검색</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div class="databox">
            <div style="width: 100%; height: 100%">
              <AUIGrid ref="myGrid" :columnLayout="columnLayout" :gridProps="defaultGridProps" />
            </div>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="modal-footer">
        <v-btn variant="tonal" class="button" @click="props.handleClose()"> 취소 </v-btn>
        <v-btn variant="tonal" class="button" color="#F8623A" @click="handleOk(true)"> 확인 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import { computed, nextTick, onMounted, ref } from "vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";
import { useAxiosWithAuthorization } from "@/utils/api";

const props = defineProps([
  "itemType",
  "category",
  "callbackFunc",
  "searchTxt",
  "autoSelect",
  "failCallbackFunc",
  "onResolve",
  "handleClose",
]);

const myGrid = ref();
const INITIAL_SEARCH_FIELDS = ref({
  mastCd: props.itemType, //팝업 파라메터로 받은것
  detlCd: props.category, //국내고철,수입고철,환경안전,구매,출하 구분
  searchTxt: props.searchTxt, //품번/품명 검색어
});

onMounted(async () => {
  await nextTick();
  const auiGrid = myGrid.value;
  auiGrid.resize("100%", "100%");

  auiGrid.bind("cellDoubleClick", function (event) {
    gridCellDBClick(event.item);
  });
  // console.log(props.category);
  if (props.category !== "1") {
    //국내고철빼고
    auiGrid.removeColumn(1);
  }
  searchItem();
});

const gridCellDBClick = (item) => {
  // onResolve(true); //왠진 모르지만 이거 안해주면 에러남..
  // callbackFunc(item);
  // setShow(false);
};

const searchCnt = ref(1);

const SEARCH_CUST_URL = "/common/code/searchERPCode";
const { state, fetch } = useAxiosWithAuthorization(
  {
    url: SEARCH_CUST_URL,
    params: {
      mastCd: INITIAL_SEARCH_FIELDS.value.mastCd,
      detlCd:
        INITIAL_SEARCH_FIELDS.value.detlCd === undefined ||
        INITIAL_SEARCH_FIELDS.value.detlCd === ""
          ? "0"
          : INITIAL_SEARCH_FIELDS.value.detlCd,
      searchTxt: INITIAL_SEARCH_FIELDS.value.searchTxt,
    },
  },
  { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
);

const handleChangeField = (event) => {
  const { name, value } = event.target;
  //INITIAL_SEARCH_FIELDS[name] = value;
  INITIAL_SEARCH_FIELDS.value = { ...INITIAL_SEARCH_FIELDS, [name]: value };
};

const searchItem = async () => {
  //console.log(INITIAL_SEARCH_FIELDS);

  const auiGrid = myGrid.value;
  auiGrid.showAjaxLoader();
  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;

      // console.log("제품타입명 data: ", data);
      auiGrid.setGridData(data);

      if (data.length > 0) {
        const auiGrid = myGrid.value;
        auiGrid.setSelectionByIndex(0, 0);
      }
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
  // auiGrid.removeAjaxLoader();

  searchCnt.value = searchCnt + 1;
  //console.log(searchCnt, autoSelect, data.length, searchTxt);
  if (
    props.searchTxt !== undefined &&
    data.length === 1 &&
    autoSelect === true &&
    searchCnt.value === 1
  ) {
    props.handleClose();
  }
};

const handleKeyDown = (evt) => {
  if (evt.keyCode === 13) {
    // searchItem();
  }
};

const handleOk = (returnData) => {};
</script>
