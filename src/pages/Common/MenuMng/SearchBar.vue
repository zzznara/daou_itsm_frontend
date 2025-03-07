<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 메뉴아이디</div>
        <input
          type="text"
          class="datainput"
          name="menuId"
          @input="handleChangeField"
          v-model="initFields.menuId"
        />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 메뉴명</div>
        <input
          type="text"
          class="datainput"
          name="menuNmKor"
          @input="handleChangeField"
          v-model="initFields.menuNmKor"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["setSearchParameters"]);

const initFields = ref({
  menuId: "",
  menuNmKor: "",
});

const handleChangeField = (event) => {
  const { name, value } = event.target;

  initFields.value[name] = value;
  props.setSearchParameters(initFields.value);
};
</script>
