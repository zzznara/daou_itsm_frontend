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
          ref="myGridMenuAuth"
          :columnLayout="createMenuAuthColumnData()"
          :gridProps="defaultGridProps"
        />
        <div class="searchdata" style="margin-top: 10px">
          <ul class="displays">
            <li style="width: 180px">
              <div style="width: 80px">
                <span class="dot">⦁</span>
                메뉴아이디
              </div>
              <input
                type="text"
                class="datainput"
                name="menuId"
                style="width: 100px"
                @change="handleMenuChangeField"
              />
            </li>
            <li style="width: 160px">
              <div style="width: 60px"><span class="dot">⦁</span> 메뉴명</div>
              <input
                type="text"
                class="datainput"
                name="menuNmKor"
                style="width: 100px"
                @change="handleMenuChangeField"
              />
            </li>
            <li style="width: auto; float: right; padding-left: 0px !important">
              <button type="button" class="btn_greystyle" @click="handleMenuSearch">검색</button>
              <button
                type="button"
                class="btn_greystyle"
                @click="handleMenuAuthAdd"
                style="margin-left: 5px"
              >
                추가
              </button>
            </li>
          </ul>
        </div>
        <AUIGrid
          ref="myGridMenu"
          :columnLayout="createMenuColumnData()"
          :gridProps="defaultGridProps"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import SearchBar from "./SearchBar.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import {
  createAuthColumnData,
  createMenuColumnData,
  createMenuAuthColumnData,
} from "./columnLayout";
import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
import { getGridValidateCheck, isFieldDisabled, saveGridCheckData } from "@/utils/validators";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { useAxiosWithAuthorization } from "@/utils/api";
import { INITIAL_FIELD_RULES } from "./validateFields";
import { swalConfirm, Toast } from "@/components/Confirm/swal";

const menuInfo = ref();

const myGrid = ref();
const myGridMenuAuth = ref();
const myGridMenu = ref();

const appStore = useAppStore();
const { menuList, menuActionList, menuKey, userInfo } = storeToRefs(appStore);

const primaryParameters = ref({
  schAuthId: "",
  schAuthNm: "",
});

const menuFieldValues = ref({
  menuId: "",
  menuNmKor: "",
});
//권한정보 검색 URL
const SERARCH_AUTH_URL = "/common/auth/searchAuthList";
//권한별메뉴정보 검색 URL
const SERARCH_AUTH_MENU_URL = "/common/auth/searchAuthMenuList";
//권한별메뉴정보 저장 URL
const SAVE_AUTH_MENU_URL = "/common/auth/saveAuthMenuList";
//권한별메뉴정보 삭제 URL
const DELETE_AUTH_MENU_URL = "/common/auth/deleteAuthMenuList";
//메뉴정보 검색 URL
const SERARCH_MENU_URL = "/common/menu/searchMenuList";

//그리드 초기 설정
onMounted(async () => {
  await nextTick(); // DOM 업데이트를 보장
  const auiAuthGrid = myGrid.value;
  const auiMenuAuthGrid = myGridMenuAuth.value;
  const auiMenuGrid = myGridMenu.value;

  auiAuthGrid.resize("100%", "100%");
  auiMenuAuthGrid.resize("100%", 300);
  auiMenuGrid.resize("100%", 300);

  auiAuthGrid.bind("cellClick", function (event) {
    searchAuthMenuList(event.item.authId);
  });
  // 에디팅 시작 이벤트 바인딩
  auiMenuAuthGrid.bind("cellEditBegin", function (event) {
    // 추가된 행 아이템들(배열)은 수정이 가능해야
    if (auiMenuAuthGrid.isAddedById(event.item._$uid)) {
      return true;
    }
    // 디테일 그리드의 디테일코드 편집 불가능
    if (event.menuId === "menuId" || event.menuNmKor === "menuNmKor") {
      return false;
    }
  });

  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      // console.log("element : ", element);
      menuInfo.value = element;
    }
  });
  handleMenuSearch();
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
  // console.log("setSearchParameters : ", values);
  primaryParameters.value = values;
};
const handleMasterNew = () => {};
const handleMasterExcel = () => {};

const handleMasterSearch = async () => {
  // console.log("handleMasterSearch  : ", primaryParameters.value);
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_AUTH_URL,
      params: primaryParameters.value,
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );

  const auiAuthGrid = myGrid.value;

  try {
    await fetch();
    // console.log("state : ", state);

    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("auiMasterGrid 데이터: ", data);
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
const handleMenuSearch = async () => {
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_MENU_URL,
      params: menuFieldValues.value,
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );

  const auiMenuGrid = myGridMenu.value;

  try {
    await fetch();
    // console.log("state : ", state);

    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("auiMasterGrid 데이터: ", data);
      if (data.length !== 0) {
        auiMenuGrid.showAjaxLoader();
        auiMenuGrid.setGridData(data);
        auiMenuGrid.removeAjaxLoader();
      }

      auiMenuGrid.setGridData(data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

const searchAuthMenuList = async (authId) => {
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_AUTH_MENU_URL,
      params: { schAuthId: authId },
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );

  const auiMenuAuthGrid = myGridMenuAuth.value;

  try {
    await fetch();
    // console.log("state : ", state);

    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("auiMasterGrid 데이터: ", data);
      if (data.length !== 0) {
        auiMenuAuthGrid.showAjaxLoader();
        auiMenuAuthGrid.setGridData(data);
        auiMenuAuthGrid.removeAjaxLoader();
      }

      auiMenuAuthGrid.setGridData(data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

const handleMasterDelete = async () => {
  const auiMenuAuthGrid = myGridMenuAuth.value;
  auiMenuAuthGrid.removeRow("selectedIndex");
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
    const auiMenuAuthGrid = myGridMenuAuth.value;

    const addItems = auiMenuAuthGrid.getAddedRowItems();
    const editItems = auiMenuAuthGrid.getEditedRowItems();
    const removeItems = auiMenuAuthGrid.getRemovedItems();
    const menuId = menuKey.value;
    let param = saveGridCheckData(addItems, editItems, removeItems, menuId);

    if (param.length > 0) {
      const { state, fetch } = useAxiosWithAuthorization(
        {
          url: SAVE_AUTH_MENU_URL,
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

//권한별메뉴 그리드에 검색한 메뉴 추가
const handleMenuAuthAdd = () => {
  const auiAuthGrid = myGrid.value;
  const auiMenuAuthGrid = myGridMenuAuth.value;
  const auiMenuGrid = myGridMenu.value;

  const menuItem = auiMenuGrid.getSelectedItems()[0].item;
  // console.log(menuItem);
  const authItem = auiAuthGrid.getSelectedItems()[0].item;
  // console.log(authItem);
  var rows = auiMenuAuthGrid.getRowsByValue("menuId", menuItem.menuId);
  // console.log(rows);
  if (rows.length > 0) {
    // ModalConfirm({
    //   title: "메뉴존재",
    //   description:
    //     "선택한 메뉴는 그리드에 있습니다. 다시 선택하시기 바랍니다. ",
    //   type: "alert",
    // });
    Toast.fire({
      icon: "warning",
      title: "메뉴존재",
      text: "선택한 메뉴는 그리드에 있습니다. 다시 선택하시기 바랍니다.",
    });
  } else {
    const newData = {
      menuId: menuItem.menuId,
      authId: authItem.authId,
      menuNmKor: menuItem.menuNmKor,
      searchAuthYn: "N",
      saveAuthYn: "N",
      newAuthYn: "N",
      delAuthYn: "N",
      printAuthYn: "N",
      excelAuthYn: "N",
    };
    // console.log(newData);
    auiMenuAuthGrid.addRow(newData, "last");
  }
};

//메뉴검색 항목이 변경될때 사용되는 함수
const handleMenuChangeField = (event) => {
  const { name, value } = event.target;

  menuFieldValues.value = { ...menuFieldValues, [name]: value };
};
</script>

<style scoped></style>
