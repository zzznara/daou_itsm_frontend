<template>
  <v-dialog width="auto" class="commonDialog">
    <v-card title="부서 검색 팝업">
      <v-card-text style="flex: 1 1 auto; padding: 0.75rem; position: relative">
        <div class="searchdata">
          <ul>
            <li>
              <div class="divide50"><span color="grey">⦁</span> 검색어</div>
              <div class="ip_textandbutton">
                <div>
                  <input
                    type="text"
                    :name="props.searchTxt"
                    disabled="false"
                    @change="handleChangeField"
                    class="ip1"
                    v-model="INITIAL_SEARCH_FIELDS.searchTxt"
                    @keydown="handleKeyDown"
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
  "handleClose",
  "callbackFunc",
  "searchTxt",
  "autoSelect",
  "failCallbackFunc",
  "onResolve",
]);

const myGrid = ref(null);

onMounted(async () => {
  await nextTick();
  const auiGrid = myGrid.value;
  auiGrid.resize("100%", "100%");

  auiGrid.bind("cellDoubleClick", function (event) {
    gridCellDBClick(event.item);
  });

  if (props.searchTxt !== undefined && props.searchTxt !== "") {
    searchItem();
  }
});

const gridCellDBClick = (item) => {
  // onResolve(true); //왠진 모르지만 이거 안해주면 에러남..
  props.callbackFunc(item);
  props.handleClose();
  // setShow(false);
};

const searchCnt = ref(1);

const SEARCH_CUST_URL = "/common/code/searchERPCode";

const INITIAL_SEARCH_FIELDS = ref({
  mastCd: "DEPT", //팝업 파라메터로 받은것
  searchTxt: props.searchTxt, //품번/품명 검색어
});

const handleChangeField = (event) => {
  const { name, value } = event.target;
  //INITIAL_SEARCH_FIELDS[name] = value;
  INITIAL_SEARCH_FIELDS.value = { ...INITIAL_SEARCH_FIELDS.value, [name]: value };
};

const searchItem = async () => {
  const auiGrid = myGrid.value;
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SEARCH_CUST_URL,
      params: {
        mastCd: INITIAL_SEARCH_FIELDS.value.mastCd,
        searchTxt: INITIAL_SEARCH_FIELDS.value.searchTxt,
      },
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );
  auiGrid.showAjaxLoader();
  try {
    await fetch();
    // console.log("부서 검색 팝업 데이터 : ", state);

    if (state.value.data) {
      const data = state.value.data.data;
      auiGrid.setGridData(data);
      //setFieldValues(initItem);
      auiGrid.removeAjaxLoader();
      if (data.length > 0) {
        const auiGrid = myGrid.value;
        auiGrid.setSelectionByIndex(0, 0);
      }
      searchCnt.value = searchCnt + 1;
      if (
        props.searchTxt !== undefined &&
        data.length === 1 &&
        autoSelect === true &&
        searchCnt.value === 1
      ) {
        props.handleClose();
      }
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

const handleKeyDown = (evt) => {
  if (evt.keyCode === 13) {
    // searchItem();
  }
};

const handleOk = (returnData) => {};
</script>
