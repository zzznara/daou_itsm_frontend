<template>
  <div class="search_wrap">
    <ul>
      <li>
        <div class="title">팝업아이디</div>
        <div class="formbox">
          <input
            type="text"
            v-model="initFields.popupId"
            class="ip2"
            @input="handleChangeField"
          />
        </div>
      </li>
      <li>
        <div class="title">팝업명</div>
        <div class="formbox">
          <input
            type="text"
            v-model="initFields.popupNm"
            class="ip2"
            @input="handleChangeField"
          />
        </div>
      </li>
      <li>
        <div class="title">팝업유형</div>
        <div class="formbox">
          <input
            type="text"
            v-model="initFields.popupTy"
            class="ip2"
            @input="handleChangeField"
          />
        </div>
      </li>
      <li>
        <div class="title">사용여부</div>
        <div class="formbox">
          <v-select
            v-model="initFields.useYn"
            :items="codeItems.useYn"
            item-title="title"
            item-value="value"
            class="ip2"
            clearable
            placeholder="전체"
            @update:modelValue="handleChangeField"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  setSearchParameters: {
    type: Function,
    required: true,
  },
  codeItems: {
    type: Object,
    required: true,
    default: () => ({
      useYn: [
        { title: '사용', value: 'Y' },
        { title: '미사용', value: 'N' }
      ]
    })
  }
});

const initFields = ref({
  popupId: "",
  popupNm: "",
  popupTy: "",
  useYn: ""
});

const handleChangeField = () => {
  props.setSearchParameters(initFields.value);
};
</script>

<style scoped>
.search_wrap {
  margin-bottom: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px 20px;
}

.search_wrap ul {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.search_wrap li {
  display: flex;
  align-items: center;
  gap: 5px;
}

.title {
  min-width: 80px;
  font-weight: 500;
}

.formbox {
  flex: 1;
}

:deep(.v-select) {
  width: 150px;
}

:deep(.v-field) {
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white !important;
}

:deep(.v-field--variant-filled .v-field__overlay) {
  display: none;
}

:deep(.v-field__input) {
  padding: 8px !important;
  min-height: unset !important;
}

:deep(.v-select__content) {
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ip2 {
  width: 100%;
  height: 28px;
  padding: 0 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  font-size: 13px;
}
</style>
