<!-- 그룹별사용자관리 -->
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

  <div class="grid_wrap col_2">
    <div class="half">
      <AUIGrid
        ref="authGrid"
        :columnLayout="createGroupColumnData()"
        :gridProps="defaultGridProps"
        height="600"
        width="100%"
      />
    </div>
    <div class="half">
      <div class="row_2">
        <AUIGrid
          ref="authGroupGrid"
          :columnLayout="createGroupUserColumnData()"
          :gridProps="defaultGridProps"
        />
        <div class="searchdata" style="margin-top: 10px">
          <ul class="displays">
            <li style="width: 200px">
              <div style="width: 100px">
                <span class="dot">⦁</span>
                사용자아이디
              </div>
              <input
                type="text"
                class="datainput"
                name="schUserId"
                style="width: 100px"
                @input="handleUserChangeField"
                v-model="userFieldValues.schUserId"
              />
            </li>
            <li style="width: 170px">
              <div style="width: 70px"><span class="dot">⦁</span> 사용자명</div>
              <input
                type="text"
                class="datainput"
                name="schUserNmKor"
                style="width: 100px"
                @input="handleUserChangeField"
                v-model="userFieldValues.schUserNmKor"
              />
            </li>
            <li class="px-0" style="width: auto; float: right; padding-right: 10px !important">
              <button type="button" class="btn_greystyle" @click="handleUserSearch">검색</button>
              <button
                type="button"
                class="btn_greystyle"
                @click="handleGroupUserAdd"
                style="margin-left: 5px"
              >
                추가
              </button>
            </li>
          </ul>
        </div>

        <AUIGrid
          ref="groupGrid"
          :columnLayout="createUserColumnData()"
          :gridProps="defaultGridProps"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import SearchBar from "./SearchBar.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import {
  createGroupColumnData,
  createGroupUserColumnData,
  createUserColumnData,
} from "./columnLayout";
import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
import { isFieldDisabled, saveGridCheckData } from "@/utils/validators";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { useAxiosWithAuthorization } from "@/utils/api";
import { swalConfirm, Toast } from "@/components/Confirm/swal";

const menuInfo = ref({});

const appStore = useAppStore();
const { menuList, menuActionList, menuKey, userInfo } = storeToRefs(appStore);

const authGrid = ref();
const authGroupGrid = ref();
const groupGrid = ref();

const fieldValues = ref({
  systemCd: "",
  userId: "",
  empNo: "",
  nmKor: "",
  nmEng: "",
  nmChn: "",
  email: "",
  dptCd: "",
  dptNm: "",
  telNo: "",
  mobileNo: "",
  rsofCd: "",
  rsofNm: "",
  plbsCd: "",
  pwd: "",
  pwdChngDt: "",
  gender: "",
  etcoDt: "",
  useYn: "",
});

const primaryParameters = ref({
  menuId: "",
  menuNmKor: "",
});

const userFieldValues = ref({
  schUserId: "",
  schUserNm: "",
  schUserNmKor: "",
});

//그룹정보 검색 URL
const SERARCH_GROUP_URL = "/common/group/searchGroupList";
//그룹별사용자정보 검색 URL
const SERARCH_GROUP_USER_URL = "/common/group/searchGroupUserList";
//그룹별사용자정보 저장 URL
const SAVE_GROUP_USER_URL = "/common/group/saveGroupUserList";
//그룹별사용자정보 삭제 URL
const DELETE_GROUP_USER_URL = "/common/group/deleteGroupUserList";
//사용자정보 검색 URL
const SERARCH_USER_URL = "/common/group/searchUserList";

onMounted(async () => {
  await nextTick(); // DOM 업데이트를 보장
  const auiGroupGrid = authGrid.value;
  const auiGroupUserGrid = authGroupGrid.value;
  const auiUserGrid = groupGrid.value;

  auiGroupGrid.resize("100%", "100%");
  auiGroupUserGrid.resize("100%", 300);
  auiUserGrid.resize("100%", 300);

  auiGroupGrid.bind("cellClick", function (event) {
    searchGroupUserList(event.item.groupId);
  });
  // hidden 컬럼 정의
  auiGroupUserGrid.hideColumnByDataField("mastCd");
  // 에디팅 시작 이벤트 바인딩
  auiGroupGrid.bind("cellEditBegin", function (event) {
    // 추가된 행 아이템들(배열)은 수정이 가능해야

    if (auiGroupGrid.isAddedById(event.item._$uid)) {
      return true;
    }
    // 마스터 그리드의 마스터코드 편집 불가능
    if (event.dataField === "mastCd") {
      return false;
    }
  });

  // 에디팅 시작 이벤트 바인딩
  auiGroupUserGrid.bind("cellEditBegin", function (event) {
    // 추가된 행 아이템들(배열)은 수정이 가능해야
    if (auiGroupUserGrid.isAddedById(event.item._$uid)) {
      return true;
    }
    // 디테일 그리드의 디테일코드 편집 불가능
    if (event.dataField === "detailCd") {
      return false;
    }
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

const setSearchParameters = (values) => {
  primaryParameters.value = values;
};

const handleUserSearch = async () => {
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_USER_URL,
      params: userFieldValues.value,
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );

  const auiUserGrid = groupGrid.value;

  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;

      if (data.length !== 0) {
        auiUserGrid.showAjaxLoader();
        auiUserGrid.setGridData(data);
        // fieldValues.value = initItem;
        auiUserGrid.removeAjaxLoader();
      }

      auiUserGrid.setGridData(data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

const handleMasterSearch = async () => {
  const auiGroupGrid = authGrid.value;
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_GROUP_URL,
      params: primaryParameters.value,
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );
  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;

      if (data.length !== 0) {
        auiGroupGrid.showAjaxLoader();
        auiGroupGrid.setGridData(data);
        // fieldValues.value = initItem;
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

const searchGroupUserList = async (groupId) => {
  const auiGroupUserGrid = authGroupGrid.value;
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_GROUP_USER_URL,
      params: { schGroupId: groupId },
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );
  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;

      if (data.length !== 0) {
        auiGroupUserGrid.showAjaxLoader();
        auiGroupUserGrid.setGridData(data);
        // fieldValues.value = initItem;
        auiGroupUserGrid.removeAjaxLoader();
      }

      auiGroupUserGrid.setGridData(data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

const handleMasterNew = () => {};

const handleMasterDelete = () => {
  const auiGroupUserGrid = authGroupGrid.value;

  auiGroupUserGrid.removeRow("selectedIndex");
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
    const auiGroupGrid = authGrid.value;
    const auiGroupUserGrid = authGroupGrid.value;

    const addItems = auiGroupUserGrid.getAddedRowItems();
    const editItems = auiGroupUserGrid.getEditedRowItems();
    const removeItems = auiGroupUserGrid.getRemovedItems();
    const menuId = menuKey.value;
    let param = saveGridCheckData(addItems, editItems, removeItems, menuId);

    if (param.length > 0) {
      const { state, fetch } = useAxiosWithAuthorization(
        {
          url: SAVE_GROUP_USER_URL,
          data: param,
          method: "POST",
        },
        { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
      );
      try {
        await fetch();
        if (state.value.data) {
          const data = state.value.data.data;

          Toast.fire({
            icon: "success",
            title: "저장되었습니다.",
          });

          const authItem = auiGroupGrid.getSelectedItems()[0].item;

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
          icon: "warning",
          title: "필수항목체크",
          text: "저장할 항목이 없습니다.",
        });
        console.error("Error fetching menu list:", error);
      }
    }
  });
};

//권한별메뉴 그리드에 검색한 메뉴 추가
const handleGroupUserAdd = () => {
  const auiGroupGrid = authGrid.value;
  const auiGroupUserGrid = authGroupGrid.value;
  const auiUserGrid = groupGrid.value;
  const userItem = auiUserGrid.getSelectedItems()[0].item;
  const groupItem = auiGroupGrid.getSelectedItems()[0].item;

  var rows = auiGroupUserGrid.getRowsByValue("userId", userItem.userId);
  if (rows.length > 0) {
    Toast.fire({
      icon: "warning",
      title: "사용자존재",
      text: "선택한 사용자는 그리드에 있습니다. 다시 선택하시기 바랍니다.",
    });
  } else {
    userItem.groupId = groupItem.groupId;
    auiGroupUserGrid.addRow(userItem, "last");
  }
};

const handleMasterExcel = () => {};
</script>

<style scoped></style>
