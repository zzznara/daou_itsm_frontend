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
                    @input="handleChangeField"
                    class="ip1"
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
import { computed, onMounted, ref } from "vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "@/components/AuiGrid/gridLayout";
const props = defineProps([
  "itemSearchPopup",
  "itemType",
  "category",
  "callbackFunc",
  "handleClose",
]);

const INITIAL_SEARCH_FIELDS = ref({
  cust: props.searchTxt,
});

const show = ref(true);
const myGrid = ref();

onMounted(() => {
  myGrid.value.resize("100%", "100%");
  myGrid.value.bind("cellDoubleClick", function (event) {
    gridCellDBClick(event.item);
  });
  if (searchTxt !== undefined && searchTxt !== "") {
    searchItem();
  }
});

const gridCellDBClick = (item) => {
  // onResolve(true); //왠진 모르지만 이거 안해주면 에러남..
  props.callbackFunc(item);
  show.value = false;
};

const searchCnt = ref(1);

const handleClose = (returnData) => {
  // if (returnData) {
  //   const auiGrid = myGrid.value;
  //   let selItem = auiGrid.getSelectedItems()[0];
  //   if (selItem) {
  //     onResolve(returnData); //왠진 모르지만 이거 안해주면 에러남..
  //     callbackFunc(selItem.item);
  //   }
  // } else {
  //   onResolve(returnData);
  //   if (failCallbackFunc !== undefined) {
  //     failCallbackFunc();
  //   }
  // }
};

const SEARCH_CUST_URL = "/common/code/searchERPCode";
// const [, fetchCustData] = useAxiosWithAuthorization(
//   {
//     url: SEARCH_CUST_URL,
//   },
//   { manual: true }
// );

const { state, fetch } = useAxiosWithAuthorization(
  {
    url: SEARCH_CUST_URL,
    params: {
      cust: INITIAL_SEARCH_FIELDS.value.cust,
      all: isContainAll,
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
  const auiGrid = myGrid.value;
  auiGrid.showAjaxLoader();
  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;

      // console.log("code data: ", data);
      auiGrid.setGridData(data);
      //setFieldValues(initItem);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
  auiGrid.removeAjaxLoader();
  if (data.length > 0) {
    const auiGrid = myGrid.current;
    auiGrid.setSelectionByIndex(0, 0);
  }
  searchCnt.value = searchCnt + 1;
  if (searchTxt !== undefined && data.length === 1 && autoSelect === true && searchCnt === 1) {
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
