<!-- 대시보드(계근결과조회) -->
<template>
  <!-- <ButtonBar
    :menuInfo="menuInfo"
    :handleMasterSearch="handleMasterSearch"
    :handleMasterNew="handleMasterNew"
    :handleMasterDelete="handleMasterDelete"
    :handleMasterSave="handleMasterSave"
    :handleMasterExcel="handleMasterExcel"
  /> -->

  <!-- 첫화면 대시보드에서 buttonBar 메뉴 명 가져오지못하는 오류떄문에 임시 -->
  <div class="flexible_button_box">
    <div class="title">
      <h2>
        계근결과조회
        <button type="button" :class="[`page_favorite ${favorite}`]" @click="onClickFavorite">
          즐겨찾기
        </button>
      </h2>
    </div>
  </div>
  <SearchBar :setSearchParameters="setSearchParameters" />

  <div class="grid_wrap" style="height: calc(100dvh - 800px) !important">
    <AUIGrid ref="myGrid" :columnLayout="columnLayout" :gridProps="defaultGridProps" />
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeMount, onMounted, ref, watch } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import SearchBar from "./SearchBar.vue";
import moment from "moment";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "../../components/AuiGrid/gridLayout";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { useAxiosWithAuthorization } from "@/utils/api";

const myGrid = ref();
const appStore = useAppStore();
const { menuList, userInfo } = storeToRefs(appStore);

const menuInfo = ref({});

const state = ref("normaled");

const initItem = {
  categoryNm: "", // 업무 구분
  ioGbNm: "", // 매입매출 구분
  custCd: "", //업체 코드
  custNm: "",
  prodCd: "", //고철품목코드
  prodCd1: "", //고철코드
  prodNm: "",
  carNo: "",
  drvNm: "",
  drvTel: "",
  wssSeq: "",
  inWeight: "",
  outWeight: "",
  decreaseWgt: "",
  wgt: "",
  isDt: "", // 계량일자
};
const fieldValues = ref(initItem);

const primaryParameters = ref({
  category: "",
  custCd: "",
  custNm: "", //거래처명
  prodCd1: "", //제품코드
  prodNm: "", //제품명
  carNo: "",
  startDt: moment().format("YYYY-MM-DD"),
  endDt: moment().format("YYYY-MM-DD"),
});

const setSearchParameters = (values) => {
  primaryParameters.value = {
    ...primaryParameters,
    category: values.category,
    custCd: values.custCd,
    custNm: values.custNm,
    prodCd1: values.prodCd1,
    prodNm: values.prodNm,
    carNo: values.carNo,
    startDt: values.startDt,
    endDt: values.endDt,
  };
};

onBeforeMount(() => {
  if (menuList.value.data) {
    menuList.value.data.find((element) => {
      if (element.menuId === "0000004010") {
        menuInfo.value = element;
      }
    });
  }
});

onMounted(async () => {
  await nextTick();
  myGrid.value.resize("100%", "100%");
  appStore.$patch(); // store 업데이트 보장
  await nextTick();
  if (menuList.value.data) {
    menuList.value.data.find((element) => {
      if (element.menuId === "0000004010") {
        menuInfo.value = element;
      }
    });
  }
});

const gridCellClick = (item) => {
  // 추가 : editable, 수정 : edtiable, 삭제 : readonly
  //read
  //setFieldsEnabled(auiGrid, item, disabledFields);
  const auiGrid = myGrid.value;
  if (auiGrid.isAddedById(item._$uid)) {
    state.value = "created";
  } else if (auiGrid.isEditedById(item._$uid)) {
    state.value = "updated";
  } else if (auiGrid.isRemovedById(item._$uid)) {
    state.value = "deleted";
  } else {
    state.value = "updated";
  }

  fieldValues.value = item;
};

//상차지 검색 URL
const SERARCH_RESULT_URL = "/resultinquery/result/searchResultList";

const { fetchData, fetch } = useAxiosWithAuthorization(
  {
    url: SERARCH_RESULT_URL,
    params: primaryParameters.value,
  },
  { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
);
const handleMasterSearch = async () => {
  const auiGrid = myGrid.value;
  auiGrid.showAjaxLoader();

  try {
    await fetch();
    // console.log("fetchData : ", fetchData);
    if (fetchData.value.data) {
      const data = fetchData.value.data.data;

      auiGrid.setGridData(data);
      // console.log("auiGrid 데이터: ", data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }

  fieldValues.value = initItem;
  auiGrid.removeAjaxLoader();
};

const handleMasterNew = () => {
  const auiGrid = myGrid.value;
  auiGrid.addRow(initItem, "last");
  fieldValues.value = initItem;
  const items = auiGrid.getSelectedItems()[0];
  gridCellClick(items.item);
};

const handleMasterDelete = () => {};

const handleMasterSave = async () => {};

const handleMasterExcel = () => {};
</script>

<style scoped></style>
