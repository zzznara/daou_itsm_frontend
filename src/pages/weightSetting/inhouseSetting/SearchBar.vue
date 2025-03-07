<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 차량번호</div>
        <input
          type="text"
          name="carNo"
          class="ip1"
          @change="handleChangeField"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
// SerachBar 기본 필드
const INITIAL_SEARCH_FIELDS = {
  carNo: "",
};

const handleChangeField = (event) => {
  // const { name, value } = event.target;
  // INITIAL_SEARCH_FIELDS[name] = value;
  // console.log(INITIAL_SEARCH_FIELDS);
  // props.setSearchParameters(INITIAL_SEARCH_FIELDS);
};
</script>
