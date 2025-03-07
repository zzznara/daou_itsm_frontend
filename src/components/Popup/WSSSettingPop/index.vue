<template>
  <v-dialog width="auto" class="modal-header">
    <v-card title="설정변경사유">
      <v-card-text style="flex: 1 1 auto; padding: 0.75rem; position: relative">
        <div class="searchdata">
          <ul class="displays" style="height: 120px">
            <li class="percent100">
              <div class="divide50"><span color="grey">⦁</span> 설정코드명</div>
              <div style="width: 350px">{{ fieldValues.cdNm }}</div>
            </li>
            <li class="percent100">
              <div class="divide50"><span color="grey">⦁</span> 설정변경사유</div>
              <div style="width: 350px">
                <textarea
                  rows="1"
                  type="text"
                  id="chgCntn"
                  name="chgCntn"
                  class="ip2"
                  style="height: 64px; vertical-align;: middle"
                  @change="handleChangeField"
                  v-model="fieldValues.chgCntn"
                />
              </div>
            </li>
          </ul>
        </div>
      </v-card-text>
      <template v-slot:actions>
        <v-btn variant="tonal" @click="$emit('handleClose')"> 취소 </v-btn>
        <v-btn variant="tonal" color="#F8623A" @click="handleOk(true)"> 확인 </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
<script setup>
import "./index.css";
import { computed, ref } from "vue";
const props = defineProps(["cd", "cdNm", "value", "onChangeValue"]);

const show = ref(true);

const handleClose = (returnData) => {
  // setShow(false);
  openDialog.value = false;
};
// 차량 검색 URL
//공통코드 검색 URL
const SAVE_SETTTING_URL = "/company/setting/saveSetting.do";

const [, fetchData] = useAxiosWithAuthorization(
  {
    url: SAVE_SETTTING_URL,
  },
  { manual: true }
);

const initItem = {
  detlCd: props.cd,
  cdNm: props.cdNm,
  chgValue: props.value,
  chgCntn: "",
};

const fieldValues = ref(initItem);

const handleOk = async (returnData) => {
  // if (fieldValues.chgCntn === "") {
  //   ModalConfirm({
  //     title: "필수항목체크",
  //     description: "변경사유를 입력하지 않았습니다. ",
  //     type: "alert",
  //   });
  //   return;
  // }
  // const {
  //   data: { data },
  // } = await fetchData({
  //   url: SAVE_SETTTING_URL,
  //   data: fieldValues,
  //   method: "POST",
  // });
  // if (data === "success") {
  //   alert(fieldValues.cdNm + "값을 변경했습니다. ");
  // }
  // onChangeValue();
  // setShow(false);
};

const handleChangeField = (event) => {
  // const { name, value } = event.target;
  // setFieldValues({
  //   ...fieldValues,
  //   [name]: value,
  // });
};
</script>

<style scoped>
.v-dialog {
  position: absolute;
  bottom: 350px;
}
</style>
