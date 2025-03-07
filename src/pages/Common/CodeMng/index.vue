<template>
  <div class="flexible_button_box">
    <div class="title">
      <h2>
        {{ menuInfo.menuNmKor }}
        <button type="button" :class="[`page_favorite ${favorite}`]" @click="onClickFavorite">
          즐겨찾기
        </button>
      </h2>
    </div>
  </div>
  <SearchBar :setSearchParameters="setSearchParameters" />
  <div class="grid_wrap col_2" style="height: calc(100dvh - 250px) !important">
    <div class="half">
      <SubButtonBar1
        :menuInfo="menuInfo"
        :handleMasterSearch="handleMasterSearch"
        :handleMasterNew="handleMasterNew"
        :handleMasterDelete="handleMasterDelete"
        :handleMasterSave="handleMasterSave"
        :handleMasterExcel="handleMasterExcel"
      />
      <div class="custom-auigrid-class">
        <AUIGrid
          ref="masterGrid"
          :columnLayout="auiMasterGrid"
          :gridProps="{
            ...defaultGridProps,
            editable: true,
          }"
          style="height: 100% !important"
        />
      </div>
    </div>
    <div class="half">
      <SubButtonBar2
        :menuInfo="menuInfo"
        :handleMasterNew="handleDetailNew"
        :handleMasterDelete="handleDetailDelete"
        :handleMasterSave="handleDetailSave"
        :handleMasterExcel="handleDetailExcel"
      />

      <div class="custom-auigrid-class">
        <AUIGrid
          ref="detailGrid"
          :columnLayout="auiDetailGrid"
          :gridProps="{
            ...defaultGridProps,
            editable: true,
          }"
          style="height: 100% !important"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchBar from "./SearchBar.vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import { createMasterColumnData, createDetailColumnData } from "./columnLayout";
import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import SubButtonBar1 from "@/components/ButtonBar/SubButtonBar1.vue";
import SubButtonBar2 from "@/components/ButtonBar/SubButtonBar2.vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/app";
import { useAxiosWithAuthorization } from "@/utils/api";
import { getStorageItem, setStorageItem } from "@/storage/useLocalStorage";
import { swalConfirm, Toast } from "@/components/Confirm/swal";
import { saveGridCheckData } from "@/utils/validators";

const menuInfo = ref({});

const appStore = useAppStore();
const { menuList, menuActionList, menuKey, userInfo } = storeToRefs(appStore);

const masterGrid = ref();
const detailGrid = ref();

const favorite = ref("");

let primaryParameters = ref({
  mastCd: "",
  cdNmKor: "",
  useYn: "",
});
const codeFieldValues = ref({
  mastCd: "",
  cdNmKor: "",
});

//공통코드 검색 URL
const SEARCH_MASTER_CODE_URL = "/common/code/searchMasterCode";
//공통코드 저장 URL
const SAVE_MASTER_CODE_URL = "/common/code/saveMasterCode";
//공통세부코드 URL
const SEARCH_DETAIL_CODE_URL = "/common/code/searchDetailCode";
//공통세부코드 저장 URL
const SAVE_DETAIL_CODE_URL = "/common/code/saveDetailCode";
// watch(menuKey, (newValue, oldValue) => {
//   console.log("newValue : ", newValue, "oldValue : ", oldValue);
//   menuActionList.value.find((element) => {
//     if (element.menuId === newValue) {
//       console.log("공통코드관리 watch : ", element);
//       menuInfo.value = element;
//     }
//   });
// });

let auiMasterGrid = createMasterColumnData();
let auiDetailGrid = createDetailColumnData();

onBeforeMount(() => {
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      // console.log("onBeforeMount : ", element);
      menuInfo.value = element;
    }
  });
});
onMounted(async () => {
  await nextTick(); // DOM 업데이트를 보장
  masterGrid.value.resize("100%", "100%");
  detailGrid.value.resize("100%", "100%");
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      // console.log("onMounted : ", element);
      menuInfo.value = element;
    }
  });

  // auiMasterGrid.create(createMasterColumnData(), {
  //   ...defaultGridProps,
  //   editable: true,
  // });
  // auiDetailGrid.create(createDetailColumnData(), {
  //   ...defaultGridProps,
  //   editable: true,
  // });

  // const masterGridElement = document.getElementById(masterGrid);
  // const detailGridElement = document.getElementById(detailGrid);
  // if (masterGrid.value) {
  //   masterGrid.value.classList.add("custom-auigrid-class");
  // }

  // if (detailGrid.value) {
  //   detailGrid.value.classList.add("custom-auigrid-class");
  // }

  // 리사이즈 이벤트 리스너 추가
  window.addEventListener("resize", handleResize);

  masterGrid.value.bind("cellClick", function (event) {
    // console.log("event.item.mastCd : ", event.item.mastCd);
    searchDetailList(event.item.mastCd);
  });
  // hidden 컬럼 정의
  detailGrid.value.hideColumnByDataField("mastCd");
  // 에디팅 시작 이벤트 바인딩
  detailGrid.value.bind("cellEditBegin", function (event) {
    // 추가된 행 아이템들(배열)은 수정이 가능해야

    if (detailGrid.value.isAddedById(event.item._$uid)) {
      return true;
    }
    // 마스터 그리드의 마스터코드 편집 불가능
    if (event.dataField === "mastCd") {
      return false;
    }
  });

  // 에디팅 시작 이벤트 바인딩
  detailGrid.value.bind("cellEditBegin", function (event) {
    // 추가된 행 아이템들(배열)은 수정이 가능해야
    if (detailGrid.value.isAddedById(event.item._$uid)) {
      return true;
    }
    // 디테일 그리드의 디테일코드 편집 불가능
    if (event.dataField === "detailCd") {
      return false;
    }
  });
  //초기 Local Storage에 저장되어 있는 즐겨찾기 메뉴중 현재 메뉴가 있는지 체크
  let favorList = getStorageItem("favorites");
  if (favorList !== undefined) {
    const foundMenu = favorList.find((element) => element.menuId === menuInfo.value.menuId);

    //현재 메뉴가 있으면 즐겨찾기 상태를 on
    if (foundMenu !== undefined) {
      favorite.value = "on";
    }
  }
});

const onClickFavorite = () => {
  let favorMenuList = getStorageItem("favorites");
  //console.log(favorMenuList);
  if (favorMenuList === undefined) {
    favorMenuList = [];
  }

  if (favorite.value === "") {
    favorite.value = "on";
    favorMenuList.push(menuInfo.value);
    setStorageItem("favorites", favorMenuList);
  } else {
    let menuList = favorMenuList.filter((element) => element.menuId !== menuInfo.value.menuId);
    favorite.value = "";
    setStorageItem("favorites", menuList);
  }
};
// 리사이즈 이벤트 핸들러 정의
const handleResize = () => {
  masterGrid.value.resize("100%", "100%");
  detailGrid.value.resize("100%", "100%");
};

const setSearchParameters = (values) => {
  // console.log("setSearchParameters 서치바:: ", values);
  primaryParameters.value = values;
};
const handleMasterSearch = async () => {
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SEARCH_MASTER_CODE_URL,
      params: primaryParameters.value,
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );
  try {
    await fetch();
    // console.log("state : ", state);
    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("auiMasterGrid 데이터: ", data);
      masterGrid.value.setGridData(data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

const searchDetailList = async (mastCd) => {
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SEARCH_DETAIL_CODE_URL,
      params: { mastCd: mastCd },
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );
  try {
    await fetch();
    // console.log("state : ", state);
    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("auiDetailGrid 데이터: ", data);

      detailGrid.value.setGridData(data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

const handleMasterNew = () => {
  const item = new Object();
  masterGrid.value.addRow(item, "last");
};

const handleMasterDelete = async () => {
  masterGrid.value.removeRow("selectedIndex");
};

const handleMasterSave = async () => {
  let yn = {
    title: "저장",
    description: "데이터를 저장하시겠습니까?",
    okBtn: "확인",
    cancelBtn: "닫기",
    res: "저장되었습니다.",
  };
  swalConfirm(yn, async () => {
    const addItems = masterGrid.value.getAddedRowItems();
    const editItems = masterGrid.value.getEditedRowItems();
    const removeItems = masterGrid.value.getRemovedItems();
    const menuId = menuKey.value;
    let param = saveGridCheckData(addItems, editItems, removeItems, menuId);

    const { state, fetch } = useAxiosWithAuthorization(
      {
        url: SAVE_MASTER_CODE_URL,
        data: param,
        method: "POST",
      },
      { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
    );
    try {
      await fetch();
      if (state.value.data) {
        const data = state.value.data.data;
        // console.log("masterGrid 저장 데이터: ", data);

        handleMasterSearch();

        Toast.fire({
          icon: "success",
          title: "저장되었습니다.",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "저장오류",
          text: "저장오류",
        });
        console.error("No data received");
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "필수항목체크",
        text: "저장할 항목이 없습니다.",
      });
      console.error("Error fetching menu list:", error);
    }
  });
};

const handleDetailNew = () => {
  const item = new Object();
  const items = masterGrid.value.getSelectedItems();
  for (var i = 0; i < items.length; i++) {
    var rowItem = items[i];
    item.mastCd = rowItem.item.mastCd;
  }
  detailGrid.value.addRow(item, "last");
};

const handleDetailDelete = async () => {
  detailGrid.value.removeRow("selectedIndex");
};

const handleDetailSave = async () => {
  let yn = {
    title: "저장",
    description: "데이터를 저장하시겠습니까?",
    okBtn: "확인",
    cancelBtn: "닫기",
    res: "저장되었습니다.",
  };
  swalConfirm(yn, async () => {
    const addItems = detailGrid.value.getAddedRowItems();
    const editItems = detailGrid.value.getEditedRowItems();
    const removeItems = detailGrid.value.getRemovedItems();
    const menuId = menuKey.value;
    let param = saveGridCheckData(addItems, editItems, removeItems, menuId);
    const { state, fetch } = useAxiosWithAuthorization(
      {
        url: SAVE_DETAIL_CODE_URL,
        data: param,
        method: "POST",
      },
      { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
    );
    try {
      await fetch();

      if (state.value.data) {
        const data = state.value.data.data;
        // console.log("masterGrid 저장 데이터: ", data);

        const items = masterGrid.value.getSelectedItems()[0];
        const item = items.item;
        searchDetailList(item.mastCd);

        Toast.fire({
          icon: "success",
          title: "저장되었습니다.",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "저장오류",
          text: "저장오류",
        });
        console.error("No data received");
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "필수항목체크",
        text: "저장할 항목이 없습니다.",
      });
      console.error("Error fetching menu list:", error);
    }
  });
};

const handleMasterExcel = () => {
  // console.log("handleMasterExcel : ", masterGrid.value);
  masterGrid.value.exportToXlsx({
    fileName: menuInfo.value.menuNmKor + " 리스트",
  });
};

const handleDetailExcel = () => {
  detailGrid.value.exportToXlsx({
    fileName: menuInfo.value.menuNmKor + " 상세코드 리스트",
  });
};
</script>

<style scoped></style>
