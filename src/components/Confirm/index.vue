<template>
  <v-dialog
    v-model="confirmDialog"
    class="commonDialog"
    style="width: calc(100dvh - 300px)"
  >
    <v-card>
      <v-card-title class="cardTitle">
        {{ yn.title }} <v-spacer></v-spacer>
        <v-btn variant="text" icon @click="$emit('handleClose')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <hr />
      <v-card-text class="modal-body">
        <div class="msg_modal_content">
          <span v-for="line in yn.description" :key="line">{{ line }}</span>
        </div>
      </v-card-text>
      <v-card-actions class="dialogFooter">
        <v-btn variant="tonal" class="button" @click="$emit('handleClose')">
          닫기
        </v-btn>
        <v-btn
          variant="tonal"
          class="button"
          color="#F8623A"
          @click="handleOk(true)"
        >
          확인
        </v-btn>
      </v-card-actions>
      <!-- <template v-slot:actions>
        <div>
        </div>
      </template> -->
    </v-card>
  </v-dialog>
</template>
<script setup>
import { computed, ref } from "vue";
const props = defineProps(["confirmDialog", "onResolve"]);

let yn = {
  title: "저장",
  description: "로그아웃 하시겠습니까?",
};
const confirmDialog = computed({
  get: () => {
    return props.confirmDialog;
  },
});
// const descriptions = computed({
//   get: () => {
//     return props.description.split("\n");
//   },
// });

const show = ref(true);

const handleClose = (returnData) => {
  // onResolve(returnData);
  // setShow(false);
  confirmDialog.value = false;
};
</script>

<style scoped>
.cardTitle {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
