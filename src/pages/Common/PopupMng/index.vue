<template>
  <ButtonBar
    :menuInfo="menuInfo"
    :handleMasterSearch="handleMasterSearch"
    :handleMasterNew="handleMasterNew"
    :handleMasterDelete="handleMasterDelete"
    :handleMasterSave="handleMasterSave"
    :handleMasterExcel="handleMasterExcel"
  />
  <SearchBar :setSearchParameters="setSearchParameters" />

  <div class="grid_wrap">
    <AUIGrid
      ref="myGrid"
      :columnLayout="columnLayout"
      :gridProps="{
        ...defaultGridProps,
      }"
      style="height: 100% !important"
    />
  </div>

  <div class="data_wrap">
    <div class="subdatabox">
      <h5>팝업상세정보</h5>
      <ul class="t_form">
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>팝업아이디</div>
          <div class="formbox">
            <input
              id="popupId"
              v-model="fieldValues.popupId"
              name="popupId"
              class="ip2"
              :disabled="state === 'created'"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>팝업명</div>
          <div class="formbox">
            <input
              id="popupNm"
              v-model="fieldValues.popupNm"
              name="popupNm"
              class="ip2"
              :disabled="isFieldDisabled(state, 'popupNm', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>팝업유형</div>
          <div class="formbox">
            <select
              id="popupTy"
              v-model="fieldValues.popupTy"
              name="popupTy"
              class="ip2"
              :disabled="isFieldDisabled(state, 'popupTy', disabledFields)"
              @change="handleChangeField"
            >
              <option value="">선택</option>
              <option value="layer">레이어</option>
              <option value="window">윈도우</option>
            </select>
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">팝업URL</div>
          <div class="formbox">
            <input
              id="popupUrl"
              v-model="fieldValues.popupUrl"
              name="popupUrl"
              class="ip2"
              :disabled="isFieldDisabled(state, 'popupUrl', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">가로크기</div>
          <div class="formbox">
            <input
              id="width"
              v-model="fieldValues.width"
              name="width"
              class="ip2"
              type="number"
              :disabled="isFieldDisabled(state, 'width', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">세로크기</div>
          <div class="formbox">
            <input
              id="height"
              v-model="fieldValues.height"
              name="height"
              class="ip2"
              type="number"
              :disabled="isFieldDisabled(state, 'height', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">X좌표</div>
          <div class="formbox">
            <input
              id="positionX"
              v-model="fieldValues.positionX"
              name="positionX"
              class="ip2"
              type="number"
              :disabled="isFieldDisabled(state, 'positionX', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">Y좌표</div>
          <div class="formbox">
            <input
              id="positionY"
              v-model="fieldValues.positionY"
              name="positionY"
              class="ip2"
              type="number"
              :disabled="isFieldDisabled(state, 'positionY', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>사용여부</div>
          <div class="formbox">
            <select
              id="useYn"
              v-model="fieldValues.useYn"
              name="useYn"
              class="ip2"
              :disabled="isFieldDisabled(state, 'useYn', disabledFields)"
              @change="handleChangeField"
            >
              <option value="">선택</option>
              <option value="Y">사용</option>
              <option value="N">미사용</option>
            </select>
          </div>
        </li>
        <li style="height: 75px">
          <div class="title">팝업내용</div>
          <div class="formbox">
            <textarea
              id="popupCn"
              v-model="fieldValues.popupCn"
              name="popupCn"
              class="ip2"
              :disabled="isFieldDisabled(state, 'popupCn', disabledFields)"
              style="height: 64px; vertical-align: middle; resize: none"
              @input="handleChangeField"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onBeforeMount, onMounted, ref } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import SearchBar from "./SearchBar.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
import { isFieldDisabled } from "@/utils/validators";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { useAxiosWithAuthorization } from "@/utils/api";
import { swalConfirm, Toast } from "@/components/Confirm/swal";

const myGrid = ref();
const appStore = useAppStore();
const { menuActionList, menuKey } = storeToRefs(appStore);

const state = ref("normaled");
const disabledFields = {
  created: ['popupId'],
  updated: ['popupId'],
};
const menuInfo = ref({});

const initItem = {
  popupId: "",
  popupNm: "",
  popupTy: "",
  popupTyNm: "",
  popupUrl: "",
  width: "400",
  height: "400",
  positionX: "0",
  positionY: "0",
  useYn: "",
  useYnNm: "",
  popupCn: "",
};

const fieldValues = ref({ ...initItem });
const searchParameters = ref({
  popupId: "",
  popupNm: "",
});
const selectedRowIndex = ref();

//팝업정보 검색 URL
const SEARCH_POPUP_URL = "/common/popup/list";
//팝업정보 저장 URL
const SAVE_POPUP_URL = "/common/popup";
//팝업정보 삭제 URL
const DELETE_POPUP_URL = "/common/popup";

onMounted(async () => {
  await nextTick();
  myGrid.value.resize("100%", "100%");

  myGrid.value.bind("cellClick", function (event) {
    gridCellClick(event.item);
  });
  appStore.$patch();
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      menuInfo.value = element;
    }
  });
});

onBeforeMount(() => {
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      menuInfo.value = element;
    }
  });
});

const gridCellClick = (item) => {
  if (!item) return;
  
  const auiGrid = myGrid.value;
  if (auiGrid.isAddedById(item._$uid)) {
    state.value = "created";
  } else if (auiGrid.isEditedById(item._$uid)) {
    state.value = "updated";
  } else {
    state.value = "normaled";
  }

  fieldValues.value = { ...item };
};

const handleChangeField = (e) => {
  const field = e?.target?.name;
  const value = e?.target?.value || e;

  if (!field) return;

  if (field === 'useYn') {
    fieldValues.value = {
      ...fieldValues.value,
      useYn: value,
      useYnNm: value === 'Y' ? '사용' : value === 'N' ? '미사용' : ''
    };
  } else if (field === 'popupTy') {
    fieldValues.value = {
      ...fieldValues.value,
      popupTy: value,
      popupTyNm: value === 'layer' ? '레이어' : value === 'window' ? '윈도우' : ''
    };
  } else {
    fieldValues.value[field] = value;
  }

  const auiGrid = myGrid.value;
  const selectedItems = auiGrid.getSelectedItems();
  
  if (selectedItems.length > 0) {
    const rowIndex = selectedItems[0].rowIndex;
    auiGrid.updateRow(fieldValues.value, rowIndex);
  }

  if (state.value === "normaled") {
    state.value = "updated";
  }
};

const setSearchParameters = (values) => {
  searchParameters.value = values;
};

const handleMasterSearch = async () => {
  try {
    const { data } = await useAxiosWithAuthorization({
      url: SEARCH_POPUP_URL,
      method: "GET",
      params: searchParameters.value,
    });

    if (data?.result === "success") {
      myGrid.value?.setGridData(data.data);
    }
  } catch (error) {
    console.error("팝업 목록 조회 중 오류 발생:", error);
    Toast.fire({
      icon: "error",
      title: "팝업 목록을 가져오는데 실패했습니다.",
    });
  }
};

const handleMasterNew = () => {
  const auiGrid = myGrid.value;
  state.value = "created";
  fieldValues.value = { ...initItem };
  auiGrid.clearGridData();
  auiGrid.addRow(initItem, "first");
  auiGrid.setSelectionByIndex(0, 0);
  selectedRowIndex.value = 0;
};

const handleMasterDelete = async () => {
  if (!fieldValues.value.popupId) {
    Toast.fire({
      icon: "warning",
      title: "삭제할 팝업을 선택해주세요.",
    });
    return;
  }

  const result = await swalConfirm("삭제하시겠습니까?");
  if (result.isConfirmed) {
    try {
      const auiGrid = myGrid.value;
      if (auiGrid.isAddedById(fieldValues.value._$uid)) {
        auiGrid.removeRow("selectedIndex");
        fieldValues.value = { ...initItem };
        state.value = "normaled";
        Toast.fire({
          icon: "success",
          title: "삭제되었습니다.",
        });
        return;
      }

      const { data } = await useAxiosWithAuthorization({
        url: `${DELETE_POPUP_URL}/${fieldValues.value.popupId}`,
        method: "DELETE",
      });

      if (data?.success) {
        auiGrid.removeRow("selectedIndex");
        fieldValues.value = { ...initItem };
        state.value = "normaled";
        Toast.fire({
          icon: "success",
          title: "삭제되었습니다.",
        });
      }
    } catch (error) {
      console.error("팝업 삭제 중 오류 발생:", error);
      Toast.fire({
        icon: "error",
        title: "팝업 삭제에 실패했습니다.",
      });
    }
  }
};

const handleMasterSave = async () => {
  try {
    const auiGrid = myGrid.value;
    const selectedItems = auiGrid.getSelectedItems();

    if (selectedItems.length === 0) {
      Toast.fire({
        icon: "warning",
        title: "저장할 팝업을 선택해주세요.",
      });
      return;
    }

    const requiredFields = ["popupNm", "popupTy", "useYn"];
    const emptyFields = requiredFields.filter((field) => !fieldValues.value[field]);

    if (emptyFields.length > 0) {
      Toast.fire({
        icon: "warning",
        title: "필수 입력값을 확인해주세요.",
      });
      return;
    }

    const result = await swalConfirm("저장하시겠습니까?");
    if (!result.isConfirmed) return;

    if (state.value === "created") {
      const { data: idData } = await useAxiosWithAuthorization({
        url: "/common/popup/generateId",
        method: "GET",
      });

      if (idData?.data) {
        fieldValues.value.popupId = idData.data;
      } else {
        throw new Error("팝업 ID 생성에 실패했습니다.");
      }
    }

    const { data } = await useAxiosWithAuthorization({
      url: "/common/popup/save",
      method: state.value === "created" ? "POST" : "PUT",
      data: fieldValues.value,
    });

    if (data?.success) {
      state.value = "normaled";
      Toast.fire({
        icon: "success",
        title: "저장되었습니다.",
      });
      handleMasterSearch();
    }
  } catch (error) {
    console.error("팝업 저장 중 오류 발생:", error);
    Toast.fire({
      icon: "error",
      title: error.message || "팝업 저장에 실패했습니다.",
    });
  }
};

const handleMasterExcel = () => {
  myGrid.value?.exportToXlsx("팝업목록");
};
</script>

<style scoped>
</style>
