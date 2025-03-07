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
    <AUIGrid ref="myGrid" :columnLayout="columnLayout" :gridProps="defaultGridProps" />
  </div>
  <div class="data_wrap">
    <div class="subdatabox">
      <h5>그룹상세정보</h5>
      <ul class="t_form">
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>그룹아이디</div>
          <div class="formbox">
            <input
              id="groupId"
              name="groupId"
              :disabled="isFieldDisabled(state, 'groupId', disabledFields)"
              v-model="fieldValues.groupId"
              @input="handleChangeField"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>그룹명</div>
          <div class="formbox">
            <input
              type="text"
              id="groupNm"
              name="groupNm"
              style="width: 108px"
              :disabled="isFieldDisabled(state, 'groupNm', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.groupNm"
              class="ip2"
            />
          </div>
        </li>
        <li style="height: 75px">
          <div class="title">설명</div>
          <div class="formbox">
            <textarea
              rows="1"
              type="text"
              id="groupDesc"
              name="groupDesc"
              :disabled="isFieldDisabled(state, 'groupDesc', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.groupDesc"
              class="ip2"
              style="height: 64px; vertical-align: middle"
            />
          </div>
        </li>
        <li style="height: 75px">
          <div class="title">비고</div>
          <div class="formbox">
            <textarea
              rows="1"
              type="text"
              id="rmks"
              name="rmks"
              :disabled="isFieldDisabled(state, 'rmks', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.rmks"
              class="ip2"
              style="height: 64px; vertical-align: middle"
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
              :topSelected="'전체'"
              :disabled="isFieldDisabled(state, 'useYn', disabledFields)"
              :onChange="handleChangeField"
              :value="fieldValues.useYn"
              :className="'ip2'"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import SearchBar from "./SearchBar.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
import { getGridValidateCheck, isFieldDisabled, saveGridCheckData } from "@/utils/validators";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import SelectBox from "@/components/SelectBox/index.vue";
import { useAxiosWithAuthorization } from "@/utils/api";
import { INITIAL_FIELD_RULES } from "./validateFields";
import { swalConfirm, Toast } from "@/components/Confirm/swal";

const menuInfo = ref({});
const appStore = useAppStore();
const { menuList, menuActionList, menuKey, userInfo } = storeToRefs(appStore);

const state = ref("normaled");
const myGrid = ref();
//추가, 수정일때 항목의 disabled 결정
const disabledFields = {
  created: [],
  updated: ["groupId"],
};

const initItem = {
  groupId: "",
  groupNm: "",
  groupDesc: "",
  rmks: "",
  useYn: "",
  status: "",
};
const fieldValues = ref(initItem);

const primaryParameters = ref({
  menuId: "",
  menuNmKor: "",
});

//그룹정보 검색 URL
const SERARCH_GROUP_URL = "/common/group/searchGroupList";
//그룹정보 저장 URL
const SAVE_GROUP_URL = "/common/group/saveGroupList";
//그룹정보 삭제 URL
const DELETE_GROUP_URL = "/common/group/deleteGroupList";

onMounted(async () => {
  await nextTick(); // DOM 업데이트를 보장
  appStore.$patch(); // store 업데이트 보장
  myGrid.value.resize("100%", "100%");
  myGrid.value.bind("cellClick", function (event) {
    gridCellClick(event.item);
  });
  // console.log("menuActionList 온마운트::  ", menuActionList.value);
  // console.log("menuKey.value 온마운트::  ", menuKey.value);
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      // console.log("element : ", element);
      menuInfo.value = element;
    }
  });
});
onBeforeMount(() => {
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      // console.log("element : ", element);
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
  } else {
    state.value = "updated";
  }

  // console.log(item);
  fieldValues.value = item;
};
const setSearchParameters = (values) => {
  // console.log(values);
  primaryParameters.value = values;
};

const handleChangeField = (event) => {
  const auiGrid = myGrid.value;
  // console.log(event);
  const { name, value } = event.target;
  const items = auiGrid.getSelectedItems()[0];
  const item = items.item;
  // console.log("name === " + name + " || value === " + value);

  item[name] = value;
  fieldValues.value = { ...fieldValues.value, [name]: value };

  auiGrid.updateRow(item, "selectedIndex");
};

const handleMasterSearch = async () => {
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_GROUP_URL,
      params: primaryParameters.value,
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );

  const auiGrid = myGrid.value;

  try {
    await fetch();
    // console.log("state : ", state);

    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("auiMasterGrid 데이터: ", data);
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
const handleMasterSave = async () => {
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
  // console.log("result ??? ", result.isValidate);
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
          url: SAVE_GROUP_URL,
          data: param,
          method: "POST",
        },
        { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
      );
      try {
        await fetch();
        if (state.value.data) {
          const data = state.value.data.data;
          // console.log("메뉴 데이터 저장 : ", data);

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
  const auiGrid = myGrid.current;
  auiGrid.exportToXlsx({
    fileName: menuInfo.menuNmKor + " 리스트",
  });
};
</script>

<style scoped></style>
