<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer v-model="sidebar" :width="294" :disable-resize-watcher="true" permanent>
      <AppMenu />
    </v-navigation-drawer>
    <v-main>
      <AppHeader :sideBar="sidebar" @openSideBar="onOpenSideBar" />
      <v-container class="tab-content">
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import AppHeader from "@/components/Layout/AppHeader.vue";
import AppMenu from "@/components/Layout/AppMenu.vue";
import { useAppStore } from "@/stores/app";
import { nextTick, onBeforeMount, onMounted, ref } from "vue";
import { useAxiosWithAuthorization } from "@/utils/api";
import { useRouter } from "vue-router";
// 엑셀, PDF 다운로드를 브라우저에서 처리하기 위한 file-saver
import "file-saver";

const dashBoard = "/main";
const appStore = useAppStore();
const menuData = ref(null);
//사용자메뉴정보 검색 URL
const SERARCH_USER_MENU_URL = "/common/menu/searchUserMenuList";
const router = useRouter();

const { state, fetch } = useAxiosWithAuthorization(
  {
    url: SERARCH_USER_MENU_URL,
    params: { userId: appStore.userInfo.userId },
  },
  { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
);

// 메뉴 목록을 가져오는 함수
const getMenuList = async () => {
  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data;

      appStore.setMenuList(data);
      appStore.setMenuOriginList(data);
      // console.log("getMenuList 데이터 : ", data);
      // 로컬 상태에 데이터 설정
      menuData.value = data;
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

onMounted(async () => {
  sidebar.value = true;
  await nextTick();
  getMenuList();

  appStore.setMenuKey(dashBoard);
  appStore.setTopMenuKey("0000001000");
  if (router.currentRoute.value.path !== dashBoard) {
    router.push(dashBoard);
  }
});

const sidebar = ref();

const onOpenSideBar = (e) => {
  sidebar.value = e;
};
</script>

<style></style>
