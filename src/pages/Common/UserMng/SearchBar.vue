<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 사용자아이디</div>
        <input
          type="text"
          class="datainput"
          name="userId"
          @input="handleChangeField"
          v-model="INITIAL_SEARCH_FIELDS.userId"
        />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 사용자명</div>
        <input
          type="text"
          class="datainput"
          name="nmKor"
          @input="handleChangeField"
          v-model="INITIAL_SEARCH_FIELDS.nmKor"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["setSearchParameters"]);
// SerachBar 기본 필드
const INITIAL_SEARCH_FIELDS = ref({
  userId: "",
  nmKor: "",
});

const handleChangeField = (event) => {
  const { name, value } = event.target;

  INITIAL_SEARCH_FIELDS.value[name] = value;
  props.setSearchParameters(INITIAL_SEARCH_FIELDS.value);
};
</script>
