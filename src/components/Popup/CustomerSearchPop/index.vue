<template>
  <v-dialog width="auto" class="commonDialog">
    <v-card>
      <v-card-title>
        <h3>거래처 팝업</h3>
      </v-card-title>
      <v-card-text style="flex: 1 1 auto; padding: 0.75rem; position: relative">
        <div class="searchdata">
          <ul>
            <li>
              <div class="divide50"><span color="grey">⦁</span> 거래처명/코드</div>
              <div class="ip_textandbutton">
                <div>
                  <input
                    type="text"
                    name="cust"
                    disabled="false"
                    @change="handleChangeField"
                    @keydown="handleKeyDown"
                    class="ip1"
                    v-model="INITIAL_SEARCH_FIELDS.cust"
                  />
                </div>
                <div>
                  <button type="button" @click="searchCust" class="btn_ip">검색</button>
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
import { computed, onMounted, ref } from "vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";
import { useAxiosWithAuthorization } from "@/utils/api";
const props = defineProps([
  "callbackFunc",
  "isContainAll",
  "searchTxt",
  "autoSelect",
  "failCallbackFunc",
  "onResolve",
  "handleClose",
]);

const myGrid = ref();
const searchCnt = ref(1);

onMounted(async () => {
  await nextTick();
  const auiGrid = myGrid.value;
  auiGrid.resize("100%", "100%");
  auiGrid.bind("cellDoubleClick", function (event) {
    gridCellDBClick(event.item);
  });
  if (props.searchTxt !== undefined && props.searchTxt !== "") {
    searchCust();
  }
});

const gridCellDBClick = (item) => {
  // onResolve(true); //왠진 모르지만 이거 안해주면 에러남..
  props.callbackFunc(item);
  // setShow(false);
};

const INITIAL_SEARCH_FIELDS = ref({
  cust: props.searchTxt,
});

const handleChangeField = (event) => {
  const { name, value } = event.target;
  //INITIAL_SEARCH_FIELDS[name] = value;
  INITIAL_SEARCH_FIELDS.value = { ...INITIAL_SEARCH_FIELDS, [name]: value };
};

const SEARCH_CUST_URL = "/company/customer/searchCustomerList";
const { state, fetch } = useAxiosWithAuthorization(
  {
    url: SEARCH_CUST_URL,
    params: {
      cust: INITIAL_SEARCH_FIELDS.value.cust,
      all: props.isContainAll,
    },
  },
  { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
);

const searchCust = async () => {
  const auiGrid = myGrid.value;
  auiGrid.showAjaxLoader();
  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;

      // console.log("거래처 data: ", data);
      auiGrid.setGridData(data);

      if (data.length > 0) {
        const auiGrid = myGrid.value;
        auiGrid.setSelectionByIndex(0, 0);
      }
      searchCnt.value(searchCnt + 1);
      if (
        props.searchTxt !== undefined &&
        data.length === 1 &&
        autoSelect === true &&
        searchCnt.value === 1
      ) {
        handleClose();
      }
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
  auiGrid.removeAjaxLoader();
};

const handleKeyDown = (evt) => {
  if (evt.keyCode === 13) {
    // searchCust();
  }
};

const handleOk = (returnData) => {};
</script>
