<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 공통코드</div>
        <input
          type="text"
          class="datainput"
          name="mastCd"
          v-model="INITIAL_SEARCH_FIELDS.mastCd"
          @input="handleChangeField"
        />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 공통코드명</div>
        <input
          type="text"
          class="datainput"
          name="cdNmKor"
          v-model="INITIAL_SEARCH_FIELDS.cdNmKor"
          @input="handleChangeField"
        />
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps(["setSearchParameters"]);
// SerachBar 기본 필드
const INITIAL_SEARCH_FIELDS = {
  mastCd: "",
  cdNmKor: "",
};

// SearchField Validate Rules
const INITIAL_FIELD_RULES = {
  mastCd: {
    rules: [
      {
        max_length: 4,
        message: "공통코드는 최대 10글자까지 입력 가능합니다.",
      },
    ],
  },
  cdNmKor: {
    rules: [
      {
        max_length: 100,
        message: "코드명는 최대 50글자까지 입력 가능합니다.",
      },
    ],
  },
};
const handleChangeField = (event) => {
  const { name, value } = event.target;

  INITIAL_SEARCH_FIELDS[name] = value;
  props.setSearchParameters(INITIAL_SEARCH_FIELDS);
};
</script>
