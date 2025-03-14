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
            variant="outlined"
            density="compact"
            hide-details
            class="ip2"
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
});

const codeItems = ref({
  useYn: [
    { title: "전체", value: "" },
    { title: "사용", value: "Y" },
    { title: "미사용", value: "N" },
  ],
});

const initFields = ref({
  popupId: "",
  popupNm: "",
  popupTy: "",
  useYn: codeItems.value.useYn[0].value,
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
  .v-field {
    border-radius: 4px !important;
    border: 1px solid #ddd !important;
    background-color: white !important;
    height: 28px !important;
    min-height: 28px !important;
  }

  .v-field__input {
    min-height: 28px !important;
    padding: 0 8px !important;
    font-size: 13px !important;
  }

  .v-field__append-inner {
    padding-top: 2px !important;
  }

  .v-field--variant-outlined .v-field__outline {
    display: none !important;
  }

  .v-field__clearable {
    display: none !important;
  }
}

:deep(.v-select__content) {
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .v-list {
    padding: 4px !important;
    
    .v-list-item {
      min-height: 28px !important;
      padding: 0 8px !important;
      font-size: 13px !important;
      
      &--active {
        background-color: #edf2f7 !important;
        color: #333 !important;
      }
      
      &:hover {
        background-color: #f8f9fa !important;
      }
    }
  }
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
