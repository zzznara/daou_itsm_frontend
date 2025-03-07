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

  <div class="grid_wrap col_2">
    <div class="half">
      <AUIGrid ref="myGrid" :columnLayout="createAuthColumnData()" :gridProps="defaultGridProps" />
    </div>
    <div class="half">
      <div class="row_2">
        <AUIGrid
          ref="myGridAuthGroup"
          :columnLayout="createGroupColumnData()"
          :gridProps="defaultGridProps"
        />
        <div class="searchdata" style="margin-top: 10px">
          <ul class="displays">
            <li style="width: 180px">
              <div style="width: 80px">
                <span class="dot">⦁</span>
                그룹아이디
              </div>
              <input
                type="text"
                class="datainput"
                name="schGroupId"
                style="width: 100px"
                @input="handleGroupChangeField"
              />
            </li>
            <li style="width: 160px">
              <div style="width: 60px"><span class="dot">⦁</span> 그룹명</div>
              <input
                type="text"
                class="datainput"
                name="schGroupNm"
                style="width: 100px"
                @input="handleGroupChangeField"
              />
            </li>
            <li style="width: auto; float: right; padding-left: 0px !important">
              <button type="button" class="btn_greystyle" @click="handleGroupSearch">검색</button>
              <button
                type="button"
                class="btn_greystyle"
                @click="handleGroupAuthAdd"
                style="margin-left: 5px"
              >
                추가
              </button>
            </li>
          </ul>
        </div>
        <AUIGrid
          ref="myGridGroup"
          :columnLayout="createAuthGroupColumnData()"
          :gridProps="defaultGridProps"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import SearchBar from "./SearchBar.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import {
  createAuthColumnData,
  createGroupColumnData,
  createAuthGroupColumnData,
} from "./columnLayout";
import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
import { getGridValidateCheck, isFieldDisabled, saveGridCheckData } from "@/utils/validators";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { useAxiosWithAuthorization } from "@/utils/api";
import { swalConfirm, Toast } from "@/components/Confirm/swal";

const menuInfo = ref({});

const myGrid = ref();
const myGridAuthGroup = ref();
const myGridGroup = ref();
const appStore = useAppStore();
const { menuList, menuActionList, menuKey, userInfo } = storeToRefs(appStore);

const primaryParameters = ref({
  menuId: "",
  menuNmKor: "",
});

const groupFieldValues = ref({
  schGroupId: "",
  schGroupNm: "",
});
//권한정보 검색 URL
const SERARCH_AUTH_URL = "/common/auth/searchAuthList";
//권한별메뉴정보 검색 URL
const SERARCH_AUTH_GROUP_URL = "/common/auth/searchAuthGroupList";
//권한별메뉴정보 저장 URL
const SAVE_AUTH_GROUP_URL = "/common/auth/saveAuthGroupList";
//권한별메뉴정보 삭제 URL
const DELETE_AUTH_GROUP_URL = "/common/auth/deleteAuthGroupList";
//메뉴정보 검색 URL
const SERARCH_GROUP_URL = "/common/group/searchGroupList";

onMounted(async () => {
  await nextTick(); // DOM 업데이트를 보장
  const auiAuthGrid = myGrid.value;
  const auiAuthGroupGrid = myGridAuthGroup.value;
  const auiGroupGrid = myGridGroup.value;

  auiAuthGrid.resize("100%", "100%");
  auiAuthGroupGrid.resize("100%", 300);
  auiGroupGrid.resize("100%", 300);

  auiAuthGrid.bind("cellClick", function (event) {
    searchAuthMenuList(event.item.authId);
  });
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      // console.log("element : ", element);
      menuInfo.value = element;
    }
  });
  handleGroupSearch();
});

onBeforeMount(() => {
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      // console.log("element : ", element);
      menuInfo.value = element;
    }
  });
});

const setSearchParameters = (values) => {
  // console.log(values);
  primaryParameters.value = values;
};

//메뉴검색 항목이 변경될때 사용되는 함수
const handleGroupChangeField = (event) => {
  const { name, value } = event.target;

  groupFieldValues.value = { ...groupFieldValues.value, [name]: value };
};

const handleMasterSearch = async () => {
  const auiAuthGrid = myGrid.value;

  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_AUTH_URL,
      params: primaryParameters.value,
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );

  try {
    await fetch();
    // console.log("state : ", state);

    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("auiAuthGrid 데이터: ", data);
      if (data.length !== 0) {
        auiAuthGrid.showAjaxLoader();
        auiAuthGrid.setGridData(data);
        auiAuthGrid.removeAjaxLoader();
      }

      auiAuthGrid.setGridData(data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

const searchAuthMenuList = async (authId) => {
  const auiAuthGroupGrid = myGridAuthGroup.value;

  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_AUTH_GROUP_URL,
      params: { schAuthId: authId },
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );

  try {
    await fetch();
    // console.log("state : ", state);

    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("auiAuthGroupGrid 데이터: ", data);
      if (data.length !== 0) {
        auiAuthGroupGrid.showAjaxLoader();
        auiAuthGroupGrid.setGridData(data);
        auiAuthGroupGrid.removeAjaxLoader();
      }

      auiAuthGroupGrid.setGridData(data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

const handleGroupSearch = async () => {
  const auiGroupGrid = myGridGroup.value;

  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_GROUP_URL,
      params: groupFieldValues.value,
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );

  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("auiGroupGrid  데이터: ", data);
      if (data.length !== 0) {
        auiGroupGrid.showAjaxLoader();
        auiGroupGrid.setGridData(data);
        auiGroupGrid.removeAjaxLoader();
      }

      auiGroupGrid.setGridData(data);
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
  setFieldValues(initItem);
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
    // res: "저장되었습니다.",
  };

  swalConfirm(yn, async () => {
    const auiAuthGrid = myGrid.value;
    const auiAuthGroupGrid = myGridAuthGroup.value;

    const addItems = auiAuthGroupGrid.getAddedRowItems();
    const editItems = auiAuthGroupGrid.getEditedRowItems();
    const removeItems = auiAuthGroupGrid.getRemovedItems();
    const menuId = menuKey.value;
    let param = saveGridCheckData(addItems, editItems, removeItems, menuId);
    if (param.length > 0) {
      const { state, fetch } = useAxiosWithAuthorization(
        {
          url: SAVE_AUTH_GROUP_URL,
          data: param,
          method: "POST",
        },
        { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
      );
      try {
        await fetch();
        if (state.value.data) {
          const data = state.value.data.data;
          // console.log("권한별 메뉴 데이터 저장 : ", data);

          Toast.fire({
            icon: "success",
            title: "저장되었습니다.",
          });

          const authItem = auiAuthGrid.getSelectedItems()[0].item;

          searchAuthMenuList(authItem.authId);
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
    }
  });
};
//권한별그룹 그리드에 검색한 메뉴 추가
const handleGroupAuthAdd = () => {
  const auiAuthGrid = myGrid.value;
  const auiAuthGroupGrid = myGridAuthGroup.value;
  const auiGroupGrid = myGridGroup.value;
  const groupItem = auiGroupGrid.getSelectedItems()[0].item;
  // console.log(groupItem);
  const authItem = auiAuthGrid.getSelectedItems()[0].item;
  // console.log(authItem);

  var rows = auiAuthGroupGrid.getRowsByValue("groupId", groupItem.groupId);
  // console.log(rows);
  if (rows.length > 0) {
    // ModalConfirm({
    //   title: "그룹존재",
    //   description: "선택한 그룹은 그리드에 있습니다. 다시 선택하시기 바랍니다. ",
    //   type: "alert",
    // });
    Toast.fire({
      icon: "warning",
      title: "그룹존재",
      text: "선택한 그룹은 그리드에 있습니다. 다시 선택하시기 바랍니다.",
    });
  } else {
    groupItem.authId = authItem.authId;
    auiAuthGroupGrid.addRow(groupItem, "last");
  }
};

const handleMasterExcel = () => {
  const auiGrid = myGrid.value;
  auiGrid.exportToXlsx({
    fileName: menuInfo.menuNmKor + " 리스트",
  });
};
</script>

<style scoped></style>
