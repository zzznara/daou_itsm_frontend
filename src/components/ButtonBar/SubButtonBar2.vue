<template>
  <div class="flexible_button_box pr0 pt0">
    <div class="title"></div>
    <div class="btnbox sub">
      <ul class="select_db" v-if="menuAuth">
        <li v-if="menuAuth.newAuthYn === 'Y'">
          <button type="button" class="btn_greystyle add" @click="props.handleMasterNew">
            추가
          </button>
        </li>
        <li v-if="menuAuth.delAuthYn === 'Y'">
          <button type="button" class="btn_greystyle del" @click="props.handleMasterDelete">
            삭제
          </button>
        </li>
        <li v-if="menuAuth.saveAuthYn === 'Y'">
          <button type="button" class="btn_greystyle save" @click="props.handleMasterSave">
            저장
          </button>
        </li>
        <li v-if="menuAuth.excelAuthYn === 'Y'">
          <button type="button" class="btn_greystyle" @click="props.handleMasterExcel">엑셀</button>
        </li>
        <li v-if="menuAuth.printAuthYn === 'Y'">
          <button type="button" class="btn_greystyle" @click="props.handleMasterPrint">출력</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { useAxiosWithAuthorization } from "@/utils/api";
import { storeToRefs } from "pinia";
import { nextTick, ref } from "vue";

const props = defineProps([
  "menuInfo",
  "handleMasterNew",
  "handleMasterDelete",
  "handleMasterSave",
  "handleMasterExcel",
  "handleMasterPrint",
]);
const title = "[" + props.menuInfo.menuNmEng + "] " + props.menuInfo.menuNmKor;

const appStore = useAppStore();
const { userInfo } = storeToRefs(appStore);

const menuAuth = ref({});

watch(menuAuth, (newValue) => {
  // console.log("", newValue);
});
onMounted(async () => {
  await nextTick();
  searchMenuAuthInfo();
});
//사용자메뉴정보 검색 URL
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
  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;

      // console.log("searchMenuAuthInfo data: ", data[0]);
      menuAuth.value = data[0];
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};
</script>
