<template>
  <v-card class="left_sidebox px-0" v-if="menuList">
    <div class="menulogo">
      <router-link class="link" to="#" @click="onMainClick">
        <img src="@/images/color_logo.png" />
        <span class="logo">무인계량시스템</span>
      </router-link>
    </div>
    <div class="myinfo">
      <div>
        <p>
          {{ userInfo.dptNm }}
          <!-- 개발팀 -->
          <span>
            <!-- 관리자님 -->
            {{ userInfo.nmKor }}님
          </span>
        </p>
      </div>
      <div class="btns">
        <button type="button" class="user" @click.stop="handleChangePassword">
          <img src="@/images/Licon1.png" />
        </button>
        <button type="button" class="btn_turnoff" @click="handleLogout">
          <img src="@/images/Licon2.png" />
        </button>
      </div>
    </div>
    <div class="thisMenu">
      <p>메뉴검색</p>
    </div>

    <div class="searchbox_menu">
      <input
        type="text"
        class="keyword_menu"
        placeholder="메뉴명을 입력하세요"
        @input="handleChange"
        @keypress="handleKeyPress"
        variant="outlined"
        v-model="searchValue"
      />
    </div>
    <div class="mgrid_menu" id="menuList">
      <!-- 모바일 -->
      <!-- <ul class="select_big" id="mMenuTabs" v-if="menuOriginList.data">
        <li class="on" :key="data.menuId" v-for="data in menuOriginList.data">
          <button v-if="data.menuLvl === 1" class="m_btnbig">{{ data.menuNmKor }}</button>
        </li>
      </ul> -->
      <div class="menu_box" id="mMenuContents">
        <template v-for="menu in menuOriginList.data" :key="menu.menuId">
          <div class="left_menubox on" v-if="menu.menuLvl === 1 && menu.menuId === topMenuKey">
            <div class="thisMenu">
              <p>현재메뉴</p>
            </div>
            <div class="left_menubox_title">
              <p>{{ menu.menuNmKor }}</p>
              <button class="btn_fav" @click="onFavoriteMenuList"></button>
            </div>

            <ul class="menu" v-if="menuList">
              <template v-for="childData in menuList.data" :key="childData.menuId">
                <li
                  :id="childData.menuId"
                  :class="[childData.menuId === menuKey ? 'link on' : 'link']"
                  v-if="
                    childData.upperMenuId !== null &&
                    childData.menuLvl === 2 &&
                    childData.upperMenuId === menu.menuId &&
                    childData.menuUrl !== null
                  "
                >
                  <div class="dept_1">
                    <span
                      key="childData.muenuId"
                      to="#"
                      @click="
                        (event) => {
                          handleClick(childData, menu.menuId);
                        }
                      "
                    >
                      {{ childData.menuNmKor }}
                    </span>
                    <!-- ???? url 없을때인데 뭔지 모르겠음  -->
                    <!-- <span
                  key="childData.muenuId"
                  @click="
                    (event) => selectClass(event.target.parentElement.parentElement, 'on', true)
                  "
                  to="#"
                >
                  {{ childData.menuNmKor }}
                </span> -->
                  </div>
                  <div class="submenu" v-if="childData.menuUrl === null">
                    <ul v-if="menuList">
                      <template v-for="subitemData in menuList.data" :key="subitemData.menuId">
                        <li
                          v-if="
                            subitemData.upperMenuId !== null &&
                            subitemData.menuLvl === 3 &&
                            subitemData.upperMenuId === childData.menuId
                          "
                        >
                          <span
                            key="subItemData.menuId"
                            to="#"
                            @click="(event) => handleClick(subItemData, menu.menuId)"
                          >
                            {{ subItemData.menuNmKor }}
                          </span>
                        </li>
                      </template>
                    </ul>
                  </div>
                </li>
              </template>
            </ul>
          </div></template
        >
      </div>
    </div>
  </v-card>
  <ModalChangePwdPop v-model="changePwdPopup" @handleClose="handleClose" />
  <MenuListPop
    v-model="menuListPopup"
    :title="'즐겨찾기'"
    :menuOriginList="menuOriginList"
    :menuList="favorMenuList"
    :onSelectMenu="onSelectMenu"
    :handleClose="handleMenuListClose"
  />
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import useEventsBus from "@/plugins/eventBus";
import ModalChangePwdPop from "@/components/Popup/ChangePwdPop/index.vue";
import MenuListPop from "@/components/Popup/MenuListPop/index.vue";
import { getStorageItem, setStorageItem } from "@/storage/useLocalStorage";
import Swal from "sweetalert2";
import { swalConfirm, Toast } from "../Confirm/swal";
import { useAppStore } from "@/stores/app";
import { logout } from "@/utils/auth";
import { storeToRefs } from "pinia";

const { emit } = useEventsBus();
const { bus } = useEventsBus();

const appStore = useAppStore();
const { userInfo, menuList, menuOriginList, menuKey, topMenuKey, menuActionList } =
  storeToRefs(appStore);

const router = useRouter();
const searchValue = ref("");
const changePwdPopup = ref(false);
const menuListPopup = ref(false);

watch(topMenuKey.value, (newValue, oldValue) => {
  // console.log("topMenuKey 변경감지 : ", newValue, " / " + oldValue);
});
watch(menuKey.value, (newValue, oldValue) => {
  // console.log("topMenuKey 변경감지 : ", newValue, " / " + oldValue);
});

onMounted(() => {
  changePwdPopup.value = false;
  menuListPopup.value = false;
});

const handleClose = () => {
  changePwdPopup.value = false;
};
const handleMenuListClose = () => {
  menuListPopup.value = false;
};

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    let searchList = { data: [] };
    menuOriginList.value.data.filter((menu) => {
      if (menu.menuNmKor.indexOf(searchValue.value) >= 0) {
        searchList.data.push({ ...menu });
      }
    });

    if (searchList !== undefined) {
      menuList.value = searchList;
    }
  }
};

const handleChange = (event) => {
  const { name, value } = event.target;
  searchValue.value = value;
};

const handleChangePassword = (e) => {
  changePwdPopup.value = true;
};
const handleLogout = (e) => {
  let yn = {
    title: "로그아웃",
    description: "로그아웃 하시겠습니까?",
    okBtn: "확인",
    cancelBtn: "닫기",
  };
  swalConfirm(yn, () => {
    appStore.logout();
    logout();
    Toast.fire({
      icon: "success",
      title: "로그아웃하였습니다.",
    });
    router.push("/login");
  });
};

const onMainClick = () => {
  window.location.reload(false);
};
const favorMenuList = ref(getStorageItem("favorites"));

const onFavoriteMenuList = () => {
  // console.log(favorMenuList.value);
  if (favorMenuList.value === undefined) {
    favorMenuList.value = [];
  }
  menuListPopup.value = true;
};

//주소항목에 데이터 넣기
const onSelectMenu = (menu) => {
  handleClick(menu, menu.upperMenuId);
};

const handleClick = (menu, topMenu) => {
  const foundMenu = menuActionList.value.find((element) => element.menuId === menu.menuId);

  if (foundMenu !== undefined || !menu.menuUrl) {
    appStore.setPreviousMenuKey(menuKey.value);
    appStore.setMenuKey(menu.menuId);
    appStore.setTopMenuKey(topMenu);
    emit("handleTabOpenClick", menu.menuUrl); // 활성화된 탭 반영
    if (router.currentRoute.value.path !== menu.menuUrl) {
      router.push(menu.menuUrl);
    }
    return;
  }
  menuActionList.value.push(menu);
  appStore.setMenu(menu);
  appStore.setMenuActionList(menuActionList.value);
  appStore.setPreviousMenuKey(menuKey.value);
  appStore.setMenuKey(menu.menuId);
  appStore.setTopMenuKey(topMenu);
  emit("handleTabOpenClick", menu.menuUrl); // 활성화된 탭 반영
  if (router.currentRoute.value.path !== menu.menuUrl) {
    router.push(menu.menuUrl);
  }
};
</script>

<style>
.link {
  display: flex;
  text-decoration: none;
  color: black;
}
a {
  text-decoration: none;
}
.v-list-item--density-compact.v-list-item--one-line {
  min-height: 38px !important;
}
</style>
