<template>
  <div class="flexible_button_box">
    <div class="title">
      <h2>
        {{ props.menuInfo.menuNmKor }}
        <button :class="[`page_favorite ${favorite}`]" @click="onClickFavorite"></button>
        <!-- class="btn_fav" -->
      </h2>
    </div>
    <div class="btnbox">
      <ul class="select_db" v-if="menuAuth">
        <li v-if="props.add2AuthYn === true">
          <button
            type="button"
            :class="[props.add2AuthBtnNm === '배차취소' ? 'btn_greystyle1' : 'btn_greystyle']"
            @click="props.handleMasterAdd2"
          >
            {{ props.add2AuthBtnNm }}
          </button>
        </li>
        <li v-if="props.add1AuthYn === true">
          <button
            type="button"
            :class="[props.add1AuthBtnNm === '배차취소' ? 'btn_greystyle1' : 'btn_greystyle']"
            @click="props.handleMasterAdd1"
          >
            {{ props.add1AuthBtnNm }}
          </button>
        </li>
        <li v-if="props.isInitButton === true">
          <button type="button" class="btn_greystyle refresh" @click="props.handleMasterInit">
            초기화
          </button>
        </li>

        <div v-if="menuAuth.searchAuthYn === 'Y'">
          <li v-if="props.handleMasterSearch !== undefined">
            <button type="button" class="btn_greystyle sch" @click="props.handleMasterSearch">
              검색
            </button>
          </li>
        </div>
        <div v-if="menuAuth.newAuthYn === 'Y'">
          <li v-if="props.handleMasterNew !== undefined">
            <button type="button" class="btn_greystyle add" @click="props.handleMasterNew">
              추가
            </button>
          </li>
        </div>
        <div v-if="menuAuth.delAuthYn === 'Y'">
          <li v-if="props.handleMasterDelete !== undefined">
            <button type="button" class="btn_greystyle del" @click="props.handleMasterDelete">
              삭제
            </button>
          </li>
        </div>
        <div v-if="menuAuth.saveAuthYn === 'Y'">
          <li v-if="props.handleMasterSave !== undefined">
            <button type="button" class="btn_greystyle save" @click="props.handleMasterSave">
              저장
            </button>
          </li>
        </div>
        <div v-if="menuAuth.excelAuthYn === 'Y'">
          <li v-if="props.handleMasterExcel !== undefined">
            <button type="button" class="btn_greystyle" @click="props.handleMasterExcel">
              엑셀
            </button>
          </li>
        </div>
        <div v-if="menuAuth.printAuthYn === 'Y'">
          <li v-if="props.handleMasterPrint !== undefined">
            <button type="button" class="btn_greystyle" @click="props.handleMasterPrint">
              출력
            </button>
          </li>
        </div>
        <li v-if="props.isGridSort === true">
          <button type="button" class="btn_greystyle" @click="props.handleGridSorting">
            화면정렬저장
          </button>
        </li>
        <li v-if="props.isGridSort === true">
          <button type="button" class="btn_greystyle" @click="props.handleGridSortingCancel">
            화면정렬취소
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { getStorageItem, setStorageItem } from "@/storage/useLocalStorage";
import { useAppStore } from "@/stores/app";
import { useAxiosWithAuthorization } from "@/utils/api";
import { storeToRefs } from "pinia";
import { nextTick, onBeforeMount, onMounted, ref, watch } from "vue";

const props = defineProps([
  "menuInfo",
  "handleMasterSearch",
  "handleMasterNew",
  "handleMasterDelete",
  "handleMasterSave",
  "handleMasterExcel",
]);

const appStore = useAppStore();
const { userInfo } = storeToRefs(appStore);
const favorite = ref("");

const menuAuth = ref({});

watch(menuAuth, (newValue) => {
  // console.log("menuAuth 업데이트 :", newValue);
});
onBeforeMount(async () => {
  // console.log("버튼바 props.menuInfo :: ", props.menuInfo);
  // console.log("버튼바 userInfo.value :: ", userInfo.value);
  // await nextTick();
  searchMenuAuthInfo();

  //초기 Local Storage에 저장되어 있는 즐겨찾기 메뉴중 현재 메뉴가 있는지 체크
  let favorList = getStorageItem("favorites");
  if (favorList !== undefined) {
    const foundMenu = favorList.find((element) => element.menuId === props.menuInfo.menuId);

    //현재 메뉴가 있으면 즐겨찾기 상태를 on
    if (foundMenu !== undefined) {
      favorite.value = "on";
    }
  }
});

const onClickFavorite = () => {
  let favorMenuList = getStorageItem("favorites");
  // console.log(favorMenuList);
  if (favorMenuList === undefined) {
    favorMenuList = [];
  }

  if (favorite.value === "") {
    favorite.value = "on";
    favorMenuList.push(props.menuInfo);
    setStorageItem("favorites", favorMenuList);
  } else {
    let menuList = favorMenuList.filter((element) => element.menuId !== props.menuInfo.menuId);
    favorite.value = "";
    setStorageItem("favorites", menuList);
  }
};
const SERARCH_MENU_AUTH_URL = "/common/menu/searchMenuAuthInfo";

const { state, fetch } = useAxiosWithAuthorization(
  {
    url: SERARCH_MENU_AUTH_URL,
    params: {
      userId: userInfo.value.userId,
      menuId: props.menuInfo.menuId,
    },
  },
  { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
);
const searchMenuAuthInfo = async () => {
  // console.log("start searchMenuAuthInfo");

  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;

      // console.log("버튼바 menuAuth: ", data[0]);
      menuAuth.value = data[0];
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};
</script>
