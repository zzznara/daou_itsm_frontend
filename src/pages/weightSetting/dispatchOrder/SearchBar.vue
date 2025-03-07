<template>
  <div class="searchdata">
    <ul>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 입차예정일</div>
        <input
          type="date"
          name="dt"
          @input="handleChangeField"
          class="datainput"
          v-model="searchValues.dt"
        />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 차량번호</div>
        <input type="text" class="datainput" name="carNo" @input="handleChangeField" />
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";

const getTodayStr = () => {
  // let today = new Date();
  // let todayStr = today.getFullYear();
  // todayStr +=
  //   today.getMonth() + 1 < 10
  //     ? "-0" + (today.getMonth() + 1)
  //     : "-" + (today.getMonth() + 1);
  // todayStr +=
  //   today.getDate() + 1 < 10 ? "-0" + today.getDate() : "-" + today.getDate();
  // return todayStr;
};

// SerachBar 기본 필드
const searchValues = ref({
  dt: getTodayStr(), //입차예정일
  carNo: "", //차량번호
});

const handleChangeField = (event) => {
  // const { name, value } = event.target;
  // console.log(name, value);
  // let copyMap = searchValues;
  // copyMap[name] = value;
  // setSearchValues(copyMap);
  // setSearchValues({ ...searchValues, [name]: value });
  // props.setSearchParameters(searchValues);
  // //console.log(searchValues);
};
</script>
