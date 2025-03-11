<!-- 메뉴관리 -->
<template>
  <ButtonBar
    :menuInfo="menuInfo"
    :handleMasterSearch="handleMasterSearch"
    :handleMasterNew="handleMasterNew"
    :handleMasterDelete="handleMasterDelete"
    :handleMasterSave="handleMasterSave"
    :handleMasterExcel="handleMasterExcel"
  />
  <SearchBar :setSearchParameters="setSearchParameters" :systemCd="userInfo.systemCd" />

  <div class="grid_wrap">
    <AUIGrid
      ref="myGrid"
      :columnLayout="columnLayout"
      :gridProps="{
        ...defaultGridProps,
        // editable: true,
      }"
      style="height: 100% !important"
    />
  </div>

  <div class="data_wrap">
    <div class="subdatabox">
      <h5>메뉴상세정보</h5>
      <ul class="t_form">
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>메뉴아이디</div>
          <div class="formbox">
            <input
              id="menuId"
              v-model="fieldValues.menuId"
              name="menuId"
              class="ip2"
              :disabled="isFieldDisabled(state, 'menuId', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>메뉴명</div>
          <div class="formbox">
            <input
              id="menuNmKor"
              v-model="fieldValues.menuNmKor"
              name="menuNmKor"
              class="ip2"
              :disabled="isFieldDisabled(state, 'menuNmKor', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">영문메뉴명</div>
          <div class="formbox">
            <input
              id="menuNmEng"
              v-model="fieldValues.menuNmEng"
              name="menuNmEng"
              class="ip2"
              :disabled="isFieldDisabled(state, 'menuNmEng', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">메뉴URL</div>
          <div class="formbox">
            <input
              id="menuUrl"
              v-model="fieldValues.menuUrl"
              name="menuUrl"
              class="ip2"
              :disabled="isFieldDisabled(state, 'menuUrl', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">상위메뉴아이디</div>
          <div class="formbox">
            <input
              id="upperMenuId"
              v-model="fieldValues.upperMenuId"
              name="upperMenuId"
              class="ip2"
              :disabled="isFieldDisabled(state, 'upperMenuId', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>메뉴레벨</div>
          <div class="formbox">
            <select
              id="menuLvl"
              v-model="fieldValues.menuLvl"
              name="menuLvl"
              class="ip1"
              :disabled="isFieldDisabled(state, 'menuLvl', disabledFields)"
              @input="handleChangeField"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>정렬순서</div>
          <div class="formbox">
            <input
              id="sortSeq"
              v-model="fieldValues.sortSeq"
              name="sortSeq"
              class="ip1"
              min="1"
              max="100"
              type="number"
              :disabled="isFieldDisabled(state, 'sortSeq', disabledFields)"
              @input="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>사용여부</div>
          <div class="formbox">
            <SelectBox
              :mastCd="'USE_YN'"
              id="useYn"
              :name="'useYn'"
              :value="fieldValues.useYn"
              :topSelected="'전체'"
              :className="'ip2'"
              :disabled="isFieldDisabled(state, 'useYn', disabledFields)"
              :onChange="handleChangeField"
            />
          </div>
        </li>
        <li style="height: 75px">
          <div class="title">메뉴설명</div>
          <div class="formbox">
            <textarea
              v-model="fieldValues.menuDesc"
              rows="1"
              id="menuDesc"
              name="menuDesc"
              class="ip2"
              :disabled="isFieldDisabled(state, 'menuDesc', disabledFields)"
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
import { nextTick, onBeforeMount, onMounted, ref, watch } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import SearchBar from "./SearchBar.vue";
import moment from "moment";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
import { getGridValidateCheck, isFieldDisabled, saveGridCheckData } from "@/utils/validators";
import Swal from "sweetalert2";
import { swalConfirm, Toast } from "@/components/Confirm/swal";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { useAxiosWithAuthorization } from "@/utils/api";
import SelectBox from "@/components/SelectBox/index.vue";
import { INITIAL_FIELD_RULES } from "./validateFields";

const myGrid = ref();
const appStore = useAppStore();
const { menuList, menuActionList, menuKey, userInfo } = storeToRefs(appStore);

const state = ref("normaled");
//추가, 수정일때 항목의 disabled 결정
const disabledFields = {
  created: [],
  updated: ["menuId"],
};
const menuInfo = ref({});

const initItem = {
  menuId: "",
  upperMenuId: "",
  menuNmKor: "",
  menuNmEng: "",
  menuUrl: "",
  menuDesc: "",
  menuLvl: "1",
  sortSeq: "",
  useYn: "",
  status: "",
};

const fieldValues = ref(initItem);

const primaryParameters = ref({
  menuId: "",
  menuNmKor: "",
});

//메뉴정보 검색 URL
const SERARCH_MENU_URL = "/common/menu/searchMenuList";
//메뉴정보 저장 URL
const SAVE_MENU_URL = "/common/menu/saveMenuList";
//메뉴정보 삭제 URL
const DELETE_MENU_URL = "/common/menu/deleteMenuList";

onMounted(async () => {
  await nextTick(); // DOM 업데이트를 보장
  myGrid.value.resize("100%", "100%");

  myGrid.value.bind("cellClick", function (event) {
    gridCellClick(event.item);
  });
  appStore.$patch(); // store 업데이트 보장
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
    //
  } else {
    state.value = "updated";
  }

  fieldValues.value = item;
};

const handleChangeField = (event) => {
  const auiGrid = myGrid.value;
  const { name, value } = event.target;
  const items = auiGrid.getSelectedItems()[0];
  const item = items.item;
  item[name] = value;
  fieldValues.value = { ...fieldValues.value, [name]: value };
  auiGrid.updateRow(item, "selectedIndex");
};

const setSearchParameters = (values) => {
  primaryParameters.value = values;
};

const handleMasterSearch = async () => {
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_MENU_URL,
      params: primaryParameters.value,
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );

  const auiGrid = myGrid.value;

  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;

      if (data.length !== 0) {
        auiGrid.showAjaxLoader();
        auiGrid.setGridData(data);
        fieldValues.value = initItem;
        auiGrid.removeAjaxLoader();
      }

      auiGrid.setGridData(data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};
const handleMasterNew = () => {
  const auiGrid = myGrid.value;
  auiGrid.addRow(initItem, "last");
  fieldValues.value = initItem;
  const items = auiGrid.getSelectedItems()[0];
  gridCellClick(items.item);
};

const handleMasterDelete = () => {
  const auiGrid = myGrid.value;
  auiGrid.removeRow("selectedIndex");
};

const handleMasterSave = () => {
  let yn = {
    title: "저장",
    description: "데이터를 저장하시겠습니까?",
    okBtn: "확인",
    cancelBtn: "닫기",
    res: "저장되었습니다.",
  };
  const auiGrid = myGrid.value;
  var items = auiGrid.getGridData();

  const result = getGridValidateCheck(auiGrid, items, INITIAL_FIELD_RULES);
  if (result.isValidate) {
    document.getElementsByName(result.column)[0].focus();
    Toast.fire({
      icon: "warning",
      title: "필수항목체크",
      text: result.message,
    });
    auiGrid.setSelectionByIndex(result.rowIndex);
    gridCellClick(result.rowItem);
    return;
  }
  swalConfirm(yn, async () => {
    const addItems = auiGrid.getAddedRowItems();
    const editItems = auiGrid.getEditedRowItems();
    const removeItems = auiGrid.getRemovedItems();
    const menuId = menuKey.value;
    let param = saveGridCheckData(addItems, editItems, removeItems, menuId);
    if (param.length > 0) {
      const { state, fetch } = useAxiosWithAuthorization(
        {
          url: SAVE_MENU_URL,
          data: param,
          method: "POST",
        },
        { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
      );
      try {
        await fetch();

        if (state.value.data) {
          const data = state.value.data.data;

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
          icon: "warning",
          title: "필수항목체크",
          text: "저장할 항목이 없습니다.",
        });
        console.error("Error fetching menu list:", error);
      }
      handleMasterSearch();
    }
  });
};

const handleMasterExcel = () => {
  const auiGrid = myGrid.value;
  auiGrid.exportToXlsx({
    fileName: menuInfo.value.menuNmKor + " 리스트",
  });
};
</script>

<style scoped></style>
