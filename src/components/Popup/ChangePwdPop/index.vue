<template>
  <v-dialog width="auto" class="commonDialog">
    <v-card title="비밀번호 변경">
      <v-card-text style="flex: 1 1 auto; padding: 0.75rem; position: relative">
        <div class="searchdata">
          <ul style="display: flex; flex-direction: column">
            <li style="width: 300px">
              <div class="divide50"><span class="dot">⦁</span> 아이디</div>
              <!-- <v-input
                v-model="userInfo.userId"
                :disabled="true"
                style="border: 1px solid black; border-radius: 3px"
              /> -->
              <input
                type="text"
                name="userId"
                class="fill"
                :disabled="true"
                v-model="userInfo.userId"
                style="border: 1px solid black; border-radius: 3px"
              />
            </li>
            <li style="width: 300px">
              <div class="divide50"><span class="dot">⦁</span> 변경비밀번호</div>
              <input
                type="password"
                name="password"
                class="fill"
                @input="handleChangeField"
                v-model="password"
                style="border: 1px solid black; border-radius: 3px"
              />
            </li>
          </ul>
        </div>
      </v-card-text>

      <v-card-actions class="modal-footer">
        <v-btn variant="tonal" class="button" @click="$emit('handleClose')"> 취소 </v-btn>
        <v-btn variant="tonal" class="button" color="#F8623A" @click="handleOk(true)"> 확인 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { useAppStore } from "@/stores/app";
import { useAxiosWithAuthorization } from "@/utils/api";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
const props = defineProps(["handleClose"]);

const password = ref("");

const appStore = useAppStore();
const { userInfo } = storeToRefs(appStore);

const CHANGE_USER_PASSWORD_URL = "/common/user/changePwd";

const handleOk = (returnData) => {
  changePassword();
};

const handleChangeField = (event) => {
  const { name, value } = event.target;

  password.value = value;
};

const changePassword = async () => {
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: CHANGE_USER_PASSWORD_URL,
      data: { userId: userInfo.value.userId, userPwd: password },
      method: "POST",
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );
  try {
    await fetch();

    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("data : ", data);

      if (data === "success") {
        alert("비밀번호 변경했습니다. ");
        props.handleClose();
      } else {
        alert(data);
      }
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};
</script>
