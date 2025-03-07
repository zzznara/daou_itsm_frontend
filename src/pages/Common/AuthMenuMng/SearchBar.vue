<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 권한아이디</div>
        <input
          type="text"
          class="datainput"
          name="schAuthId"
          @input="handleChangeField"
          v-model="initFields.schAuthId"
        />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 권한명</div>
        <input
          type="text"
          class="datainput"
          name="schAuthNm"
          @input="handleChangeField"
          v-model="initFields.schAuthNm"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["setSearchParameters"]);

const initFields = ref({
  schAuthId: "",
  schAuthNm: "",
});

const handleChangeField = (event) => {
  const { name, value } = event.target;
  initFields.value = { ...initFields.value, [name]: value };
  props.setSearchParameters({ ...initFields.value, [name]: value });
};
</script>
