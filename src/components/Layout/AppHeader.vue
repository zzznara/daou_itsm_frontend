<template>
  <v-app-bar v-model="drawer" class="fixed-bar" color="deep-orange" height="43" :elevation="0">
    <div className="box_bigmenu">
      <ul class="select_big" id="pcMenuTabs" v-if="menuOriginList.data">
        <li
          v-for="menu in menuOriginList.data.filter((topMenu) => topMenu.menuLvl === 1)"
          :key="menu.menuId"
          :class="[menu.menuId === topMenuKey ? 'on' : '']"
          @click="handleClick(menu.menuId)"
        >
          <p v-if="menu.menuLvl === 1">{{ menu.menuNmKor }}</p>
        </li>
      </ul>

      <ul class="select_user">
        <li>
          <div class="select_big_controller">
            <div class="left">&#10094;</div>
            <div class="right">&#10095;</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- <v-toolbar-title class="d-flex">
      <v-btn
        v-for="menu in menuStore.menu"
        :key="menu.id"
        @click="menuClick(menu.id)"
      >
        {{ menu.title }}
      </v-btn>
    </v-toolbar-title> -->
  </v-app-bar>
  <div id="content">
    <div class="box_greytap">
      <div class="ham">
        <img src="@/images/LeftArrow.png" @click="openSideBar" />
      </div>

      <!-- 탭 헤더 영역 -->
      <div class="tab-container" ref="tabScrollContainerRef">
        <div class="tab-menus" ref="tabMenusRef">
          <div
            :class="['tab-menu', { active: activeTab === '/main' }]"
            @click="handleMainTabOpenClick(dashboard)"
          >
            대시보드
          </div>
          <div
            v-for="menu in menuActionList"
            :key="menu.menuId"
            :class="['tab-menu', { active: activeTab === menu.menuUrl }]"
            @click="handleTabOpenClick(menu)"
          >
            {{ menu.menuNmKor }}
            <span class="x" @click.stop="handleTabCloseClick(menu.menuId, $event)">
              <v-icon size="small" icon="mdi-close-circle" />
            </span>
          </div>
        </div>
      </div>

      <button class="scroll-button left" @click="scrollTabs('left')">
        <!-- 버튼 내용 -->
      </button>
      <button class="scroll-button right" @click="scrollTabs('right')">
        <!-- 버튼 내용 -->
      </button>
    </div>
  </div>
</template>

<script setup>
import useEventsBus from "@/plugins/eventBus";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { bus } = useEventsBus();
const { emit } = useEventsBus();
const props = defineProps(["sideBar"]);
const emits = defineEmits(["openSideBar"]);
const router = useRouter();
const appStore = useAppStore();
const {
  userInfo,
  previousMenuKey,
  isAuthenticated,
  menuList,
  menuOriginList,
  menuKey,
  topMenuKey,
  menuActionList,
} = storeToRefs(appStore);

// watch(menuActionList.value, (newValue, oldValue) => {
// console.log("menuActionList 변경감지 : ", newValue, " / " + oldValue);
// });

if (topMenuKey === undefined) {
  appStore.setTopMenuKey("0000000100");
}

const drawer = ref();

onMounted(() => {
  drawer.value = props.sideBar;
});

const openSideBar = () => {
  drawer.value = !drawer.value;
  emits("openSideBar", drawer.value);
};
const dashboard = "/main";
const activeTab = ref(dashboard);

const handleClick = (menuId) => {
  appStore.setTopMenuKey(menuId);
  // console.log("topMenuKey : ", topMenuKey.value);
};

watch(
  () => bus.value.get("handleTabOpenClick"),
  (item) => {
    // console.log("watch handleTabOpenClick :", item[0]);
    // onActiveTab(item[0].path);
    activeTab.value = item[0];
  }
);

const handleMainTabOpenClick = (tabKey) => {
  activeTab.value = tabKey; // 클릭된 탭을 활성화된 탭으로 설정
  // console.log(tabKey);
  const foundMenu = menuActionList.value.find((element) => element.menuId === tabKey);
  // ANCHOR: 열려질 Tab
  // ANCHOR: 이전 Tab 기억

  appStore.setPreviousMenuKey(menuKey);
  appStore.setMenuKey(tabKey);
  if (foundMenu) {
    appStore.setTopMenuKey(foundMenu.rootMenuId);
  }
  router.push(tabKey);
};

const handleTabOpenClick = (menu) => {
  activeTab.value = menu.menuUrl; // 클릭된 탭을 활성화된 탭으로 설정
  // console.log(menu.menuUrl);
  const foundMenu = menuActionList.value.find((element) => element.menuUrl === menu.menuUrl);
  // ANCHOR: 열려질 Tab
  // ANCHOR: 이전 Tab 기억
  appStore.$patch();
  appStore.setPreviousMenuKey(menuKey.value);
  appStore.setMenuKey(menu.menuId);
  if (foundMenu) {
    appStore.setTopMenuKey(foundMenu.rootMenuId);
  }
  router.push(menu.menuUrl);
};

// ANCHOR: 메뉴 한개씩 닫기
const handleTabCloseClick = (tabKey, event) => {
  // menuListStore.deleteItem(itemId);

  appStore.setMenuActionList(
    menuActionList.value
      .map((data) => data.menuId !== tabKey && data)
      .filter((data) => data !== false)
  );
  const found = menuActionList.value.findIndex((element) => element.menuId === menuKey.value);
  const found_prev = menuActionList.value.findIndex(
    (element) => element.menuId === previousMenuKey.value
  );
  // console.log(tabKey, menuKey.value, previousMenuKey.value);

  if (menuActionList.value && menuActionList.value.length > 0) {
    if (found >= 0) {
      // NOTE: 현재 Focusing된 page가 열려있다면 현상 유지
      if (tabKey === menuKey.value) {
        if (found_prev >= 0 && tabKey !== previousMenuKey.value) {
          appStore.setMenuKey(previousMenuKey.value);
        } else {
          appStore.setMenuKey(menuActionList[menuActionList.value.length - 2].menuId);
        }
      } else {
        appStore.setMenuKey(menuKey.value);
      }
    } else {
      if (found_prev >= 0) {
        menuActionList.value.map((menu) => {
          if (menu.menuId == previousMenuKey.value) {
            router.push(menu.menuUrl);
            activeTab.value = menu.menuUrl;
          }
        });
        appStore.setMenuKey(previousMenuKey.value);
      } else {
        menuActionList.value.map((menu) => {
          if (menu.menuId == menuActionList.value[menuActionList.value.length - 1].menuId) {
            router.push(menu.menuUrl);
            activeTab.value = menu.menuUrl;
          }
        });
        appStore.setMenuKey(menuActionList.value[menuActionList.value.length - 1].menuId);
      }
    }
  } else {
    // NOTE: 모든 Tab이 닫혔을 경우 dashBoard로 이동
    activeTab.value = dashboard;
    router.push(dashboard);
  }
};

const tabMenusRef = ref(null); // tab-menus 컨테이너용 ref
const tabScrollContainerRef = ref(null); // 탭 스크롤 컨테이너용 ref
// 탭을 좌우로 스크롤
const scrollTabs = (direction) => {
  // console.log("tabScrollContainerRef : ", tabScrollContainerRef.value.scrollLeft);
  // console.log("tabMenusRef : ", tabMenusRef.value);
  if (tabScrollContainerRef.value && tabMenusRef.value) {
    const scrollLeft = tabScrollContainerRef.value.scrollLeft;
    const visibleTabs = Array.from(tabMenusRef.value.children);
    // 현재 보이는 첫 번째 탭 찾기
    const firstVisibleTab = visibleTabs.find((tab) => tab.offsetLeft >= scrollLeft);
    // 현재 보이는 첫 번째 탭의 너비
    const scrollDistance = firstVisibleTab ? firstVisibleTab.offsetWidth : 0;
    // 스크롤 가능한 남은 거리 계산
    const maxScrollableDistance =
      direction === "left"
        ? scrollLeft
        : tabScrollContainerRef.value.scrollWidth -
          tabScrollContainerRef.value.clientWidth -
          scrollLeft;
    // 남은 스크롤 거리와 현재 탭의 너비 비교
    const finalScrollDistance =
      Math.abs(maxScrollableDistance) < scrollDistance ? maxScrollableDistance : scrollDistance;
    // 최종적으로 계산된 거리만큼 스크롤
    tabScrollContainerRef.value.scrollBy({
      left: direction === "left" ? -finalScrollDistance : finalScrollDistance,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
.historyBar {
  background-color: #f2f5fb;
  height: 34px;
  display: flex;
}
.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 6em;
  z-index: 2;
}
</style>
