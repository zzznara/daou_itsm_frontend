<template>
  <div class="searchdata">
    <ul>
      <li class="date">
        <div class="divide50"><span class="dot">⦁</span> 기록일자</div>
        <div class="flex50">
          <input
            type="date"
            name="startDt"
            @change="handleChangeField"
            class="datainput"
            v-model="searchValues.startDt"
          />
          &nbsp;~&nbsp;
          <input
            type="date"
            name="endDt"
            @change="handleChangeField"
            class="datainput"
            v-model="searchValues.endDt"
          />
        </div>
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 사용자 ID</div>
        <input
          type="text"
          class="datainput"
          name="userId"
          @change="handleChangeField"
        />
      </li>
      <li>
        <div class="divide50"><span class="dot">⦁</span> 로그내용</div>
        <input
          type="text"
          class="datainput"
          name="useHisCntn"
          @change="handleChangeField"
        />
      </li>
    </ul>
  </div>
</template>
<script setup>
import moment from "moment";
import { ref } from "vue";

// SerachBar 기본 필드
const searchValues = ref({
  userId: "",
  useHisCntn: "",
  startDt: moment().format("YYYY-MM-DD"),
  endDt: moment().format("YYYY-MM-DD"),
});

const handleChangeField = (event) => {
  // const { name, value } = event.target;
  // let copyMap = searchValues;
  // copyMap[name] = value;
  // setSearchValues(copyMap);
  // props.setSearchParameters(searchValues);
};
</script>
