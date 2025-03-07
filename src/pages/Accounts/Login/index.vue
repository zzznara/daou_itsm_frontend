<template>
  <div class="Form100">
    <div class="LoginBox">
      <p style="text-align: center">
        <img :src="loginLogo" alt="LOGO" />
      </p>
      <div class="MiddleTitle">무인계량시스템</div>
      <div class="InputBox" style="margin-top: 58px">
        <input
          v-model="userId"
          class="LoginId"
          type="text"
          @change="(event) => (userId.value = event.target.value)"
        />
        <div class="Tag">아이디</div>
        <!-- <v-text-field
          v-model="userId"
          variant="outlined"
          prepend-inner-icon="mdi-account-outline"
          :readonly="loading"
          :rules="[idRequired]"
          label="아이디"
          clearable
          bg-color="#E8F0FE"
        /> -->
      </div>
      <div class="InputBox" style="margin-top: 22px">
        <input
          class="LoginPw"
          v-model="password"
          type="password"
          @change="(event) => (password = event.target.value)"
          @keypress="onKeyPress"
          style="font-family: 'Courier New', Courier, monospace !important"
        />
        <div class="Tag">비밀번호</div>
        <!-- <v-text-field
          v-model="password"
          type="password"
          variant="outlined"
          prepend-inner-icon="mdi-lock-outline"
          :readonly="loading"
          :rules="[pwRequired]"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          clearable
          bg-color="#E8F0FE"
          style="font-family: 'Courier New', Courier, monospace !important"
          @keydown.enter="submit"
        /> -->
      </div>
      <button class="BtnLogin" type="button" @click="submit">로그인</button>
      <div style="margin-top: 20px">
        <input
          id="id_save"
          v-model="saveIDFlag"
          class="SaveAccount"
          type="checkbox"
          checked="saveIDFlag"
          @change="handleSaveIDFlag"
        />
        <button class="SaveAccountText" htmlFor="id_save" style="margin-right: 15px">
          ID/PW 저장
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useNavigate } from "react-router-dom";
// import useAppContext, { actions } from "../../../utils/Reducers";
// import useFieldValues from "../../../utils/useFieldValues";
// import axios from "axios";
// import { useAxiosWithAuthorization } from "../../../utils/api";
// import { ModalConfirm } from "../../../components/Confirm";
import loginLogo from "@/images/login_logo.png";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Idcon from "@/images/icon_id.png";
import Pwcon from "@/images/icon_pw.png";
import { login } from "@/utils/auth";
import { apiInstance } from "../../../api/index";
import { axiosInstance, useAxiosWithAuthorization } from "../../../utils/api";
import { getStorageItem, setStorageItem } from "@/storage/useLocalStorage";
import useFieldValues from "@/utils/useFieldValues";
import Swal from "sweetalert2";
import { useAppStore } from "@/stores/app";
import { Toast } from "@/components/Confirm/swal";

// import styled from "styled-components";
// import Idcon from "../../../images/icon_id.png";
// import Pwcon from "../../../images/icon_pw.png";
// import { Input } from "postcss";
// const Login = () => {
const appStore = useAppStore();
const router = useRouter();
const userId = ref("");
const password = ref("");

const LS_KEY_ID = "LS_KEY_ID";
const LS_KEY_PW = "LS_KEY_PW";
const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG";
const saveIDFlag = ref(false);

const loading = ref(false);
const INITIAL_LOGIN_FIELDS = {
  userId: "",
  password: "",
};

const api = apiInstance();

const idRequired = (v) => {
  return !!v || "아이디를 입력해주세요.";
};
const pwRequired = (v) => {
  return !!v || "비밀번호를 입력해주세요.";
};
const [loginFields] = useFieldValues(INITIAL_LOGIN_FIELDS);
const LOGIN_APP_URL = "/accounts/login";

onMounted(() => {
  let idFlag = JSON.parse(getStorageItem(LS_KEY_SAVE_ID_FLAG));
  // console.log("idFlag : ", idFlag);
  if (idFlag !== null) saveIDFlag.value = idFlag;
  if (idFlag === false) {
    setStorageItem(LS_KEY_ID, "");
    setStorageItem(LS_KEY_PW, "");
  }
  let dataId = getStorageItem(LS_KEY_ID);
  let dataPw = getStorageItem(LS_KEY_PW);
  // console.log("dataId : ", dataId + " / " + " dataPw : ", dataPw);
  if (dataId !== null) userId.value = dataId;
  if (dataPw !== null) password.value = dataPw;
});

// const [, fetchData] = useAxiosWithAuthorization(
//   {
//     url: LOGIN_APP_URL,
//   },
//   { manual: true }
// );

const INITIAL_FIELD_RULES = {
  username: {
    rules: [
      {
        max_length: 30,
        message: "최대 30글자까지 입력 가능합니다.",
      },
    ],
  },
  password: {
    rules: [
      {
        max_length: 50,
        message: "최대 50글자까지 입력 가능합니다.",
      },
    ],
  },
};

const submit = async () => {
  loginFields["userId"] = userId;
  loginFields["password"] = password;

  if (userId.value === "") {
    alert("아이디를 입력하세요");
    return;
  }

  if (password.value === "") {
    alert("패스워드를 입력하세요");
    return;
  }
  // login("tokentokentokentokentoken");

  // router.push("/main");
  try {
    // const response = await axiosInstance.post(LOGIN_APP_URL, loginFields);
    // console.log("response : ", response);
    // const {
    //   data: { token, userInfo, code, result },
    // } = response;

    /**
     *
     * api
     */
    await api
      .post(LOGIN_APP_URL, {
        userId: userId.value,
        password: password.value,
      })
      .then((res) => {
        // console.log("Login res : ", res);
        // console.log("code : ", res.data.code);
        // console.log("result : ", res.data.result);

        if (res.data.code === "400") {
          Toast.fire({
            icon: "error",
            title: "로그인 실패하였습니다.",
          });
          // alert(res.data.result);
          return;
        } else {
          Toast.fire({
            icon: "success",
            title: "로그인되었습니다.",
          });
          // console.log("login res : ", res.data);
          // console.log("res.data.token :", res.data.token);
          setStorageItem("userToken", res.data.token);
          setStorageItem("userInfo", res.data.userInfo);
          appStore.setToken(res.data.token);
          appStore.setUserInfo(res.data.userInfo);

          if (true /* login success */) {
            if (saveIDFlag.value) setStorageItem(LS_KEY_ID, userId.value);
            if (saveIDFlag.value) setStorageItem(LS_KEY_PW, password.value);
          }
          setTimeout(() => {
            router.push("/main", { replace: true });
          }, 1000);
        }
      })
      .catch((err) => {
        // console.log("Err : ", err);
      });
  } catch (error) {
    if (error.response) {
      const { data: errors } = error.response;
      const _responseErrors = [];
      errors.messages &&
        errors.messages.map(({ message }) => {
          Object.entries(message).map(([key, errorMessage]) => {
            _responseErrors.push(errorMessage);
          });
        });

      for (const _responseError of _responseErrors.reverse()) {
        // eslint-disable-next-line no-restricted-globals
        confirm(_responseError);
        return;
      }
    }
  }
};

const onKeyPress = (event) => {
  if (event.key === "Enter") {
    submit();
  }
};

const handleSaveIDFlag = (event) => {
  // console.log("handleSaveIDFlag : ", event);
  if (event.target.checked) {
    setStorageItem(LS_KEY_SAVE_ID_FLAG, true);
    saveIDFlag.value = true;
  } else {
    setStorageItem(LS_KEY_SAVE_ID_FLAG, false);
    saveIDFlag.value = false;
  }
};
</script>

<style scoped>
.Form100 {
  background: #f2f5fb;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.LoginBox {
  background: #ffffff;
  width: 461px;
  height: 608px;
  box-shadow: 10px 10px 20px rgba(109, 153, 162, 0.1);
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  padding: 84px 32px 0px 32px;
}
.MiddleTitle {
  margin-top: 12px;
  text-align: center;
  font-size: 35px;
  font-weight: 700;
  color: #2e2e2e;
}
.InputBox {
  width: 100%;
  position: relative;
  height: 63px;
}

.Tag {
  position: absolute;
  top: 18px;
  left: 55px;
  font-size: 16px;
  font-weight: 600;
  color: #a1a1a1;
  width: 70px;
  height: 30px;
  border-right: 1px solid rgba(191, 191, 191, 0.44);
}
.LoginId {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
  padding-left: 150px;
  font-size: 16px;
  font-weight: 600;
  background: url("../../../images/icon_id.png") 15px center no-repeat;
  &:focus {
    border: 2px solid #96bcf2;
  }
  $:focus-visible {
    border: 0;
  }
}
.LoginPw {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
  padding-left: 150px;
  font-size: 16px;
  font-weight: 600;
  background: url("../../../images/icon_pw.png") 15px center no-repeat;
  &:focus {
    border: 2px solid #96bcf2;
  }
  $:focus-visible {
    border: 0;
  }
}
.BtnLogin {
  margin-top: 30px;
  width: 100%;
  height: 63px;
  border-radius: 5px;
  border: 0;
  background: #f8623a;
  font-size: 22px;
  font-weight: 700;
  color: white;
  box-shadow: 6px 6px 6px rgba(193, 80, 30, 0.16);
}
.SaveAccount {
  margin-left: 0;
  width: 25px;
  height: 25px;
  vertical-align: middle;
  margin-right: 9px;
}
.SaveAccountText {
  position: relative;
  font-size: 18px;
  vertical-align: middle;
}
</style>
