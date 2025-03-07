<template>
  <select
    @input="props.onChange"
    :name="props.name"
    v-model="props.value"
    :disabled="props.disabled"
    :class="props.className"
  >
    <option value="" v-if="props.topSelected !== undefined">{{ props.topSelected }}</option>
    <!-- ) : ( "" ) codeData && codeData.map((code) => ( < -->
    <option
      v-for="code in codeData"
      :key="code.detlCd"
      :data-value="code.attr1"
      :value="code.detlCd"
    >
      {{
        props.label === "" || props.label === undefined
          ? code.cdNmKor
          : props.label === "attr1"
          ? code.attr1
          : props.label === "attr2"
          ? code.attr2
          : props.label === "attr3"
          ? code.attr3
          : props.label === "attr4"
          ? code.attr4
          : props.label === "attr5"
          ? code.attr5
          : props.label === "attr6"
          ? code.attr6
          : props.label === "attr7"
          ? code.attr7
          : props.label === "attr8"
          ? code.attr8
          : props.label === "attr9"
          ? code.attr9
          : props.label === "attr10"
          ? code.attr10
          : ""
      }}
    </option>
  </select>
</template>
<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useAxiosWithAuthorization } from "../../utils/api";

const props = defineProps([
  "mastCd",
  "name",
  "disabled",
  "onChange",
  "topSelected",
  "className",
  "erpCode",
  "label",
  "value",
  "attr1",
  "attr2",
  "attr3",
  "attr4",
  "attr5",
  "attr6",
  "attr7",
  "attr8",
  "attr9",
  "attr10",
]);
//공통코드 검색 URL
// console.log("SelectBox props : ", props);
const codeData = ref([]);

const getCodeUrl = () => {
  let _codeUrl = "/common/code/searchDetailCode";
  if (props.erpCode) {
    _codeUrl = "/common/code/searchERPCode";
  }
  //console.log("_codeUrl : " + _codeUrl);
  return _codeUrl;
};

const SEARCH_CODE_URL = getCodeUrl();

const { state, fetch } = useAxiosWithAuthorization(
  {
    url: SEARCH_CODE_URL,
    params: {
      mastCd: props.mastCd,
      detlCd: props.detlCd,
      useYn: "Y",
      attr1: props.attr1 ? props.attr1 : "",
      attr2: props.attr2 ? props.attr2 : "",
      attr3: props.attr3 ? props.attr3 : "",
      attr4: props.attr4 ? props.attr4 : "",
      attr5: props.attr5 ? props.attr5 : "",
      attr6: props.attr6 ? props.attr6 : "",
      attr7: props.attr7 ? props.attr7 : "",
      attr8: props.attr8 ? props.attr8 : "",
      attr9: props.attr9 ? props.attr9 : "",
      attr10: props.attr10 ? props.attr10 : "",
    },
  },
  { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
);

const codeSearch = async () => {
  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;

      // console.log("Selectbox code data: ", data);
      // console.log("searchMenuAuthInfo data[0]: ", data[0]);
      codeData.value = data;
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

onBeforeMount(() => {
  codeSearch();
});
onMounted(() => {
  codeSearch();
});
</script>
