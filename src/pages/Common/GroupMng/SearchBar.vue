<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 그룹명</div>
        <input
          type="text"
          class="datainput"
          name="schGroupNm"
          @input="handleChangeField"
          v-model="initFields.schGroupNm"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["setSearchParameters"]);

const initFields = ref({
  schGroupNm: "",
});

const handleChangeField = (event) => {
  const { name, value } = event.target;

  initFields.value = { ...initFields.value, [name]: value };
  props.setSearchParameters({ ...initFields.value, [name]: value });
};
</script>
