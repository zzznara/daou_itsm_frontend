import { Toast } from "@/components/Confirm/swal";
import router from "@/router";
import { useAppStore } from "@/stores/app";
import Axios from "axios";
import qs from "qs";
import { ref, watchEffect } from "vue";

// import useAppContext, { actions } from "./Reducers";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const API_HOST = "http://localhost:7080";
//const API_HOST = "http://tms.yksteel.co.kr:8080";

export const axiosInstance = Axios.create({
  // baseURL: SERVER_HOST,
  paramsSerializer: (parameters) => {
    const newParameters = Object.entries(parameters).reduce((accumulator, [key, value]) => {
      if (Array.isArray(value) && value.length >= 2) {
        accumulator[key + "__in"] = value;
      } else {
        accumulator[key] = value;
      }
      return accumulator;
    }, {});
    return qs.stringify(newParameters, { arrayFormat: "comma" });
  },
});
const source = Axios.CancelToken.source();

axiosInstance.interceptors.request.use(
  async (config) => {
    // if (config.method === 'get') {
    //   config.headers.common['X-Http-Method'] = 'GET';
    //   config.params = {
    //     ...config.params,
    //     _: Date.now(),
    //   };
    // } else if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method)) {
    //   config.headers.common['X-Http-Method'] = config.method;
    //   config.method = 'POST';
    // }

    config.cancelToken = source.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useAxiosWithAuthorization = (kwargs, options = {}) => {
  const appStore = useAppStore();
  const state = ref({ data: null, error: null, loading: false });

  const fetch = async () => {
    state.value.loading = true;
    state.value.error = null;
    try {
      const response = await axiosInstance(
        {
          ...kwargs,
          baseURL: API_HOST,
          headers: {
            Authorization: appStore.Authorization,
            "Access-Control-Allow-Credentials": true,
          },
        },
        // 강제로 cache를 끕니다.
        options ? { ...options, useCache: false } : { useCache: false }
      );
      state.value.data = response.data;
    } catch (error) {
      state.value.error = error;
      handleApiError(error);
    } finally {
      state.value.loading = false;
    }
  };

  function handleApiError(error) {
    if (!error.response) {
      Toast.fire("서버에 연결할 수 없습니다.");
    } else if (error.response.status >= 500) {
      Toast.fire("서버 오류가 발생했습니다. (500)");
    } else if (typeof error.response.data === "object") {
      const errorMessage =
        error.response.data.message_kor || "오류가 발생하였습니다. 관리자에게 문의하여 주세요";
      Toast.fire(`${errorMessage} (${error.response.data.code || ""})`);

      if (error.response.status > 400 && error.response.status < 500) {
        // appStore.logout();
        // router.replace("/login");
      }
    }
  }

  watchEffect(() => {
    if (options.autoFetch) {
      fetch();
    }
  });

  return { state, fetch };
};

// export const useAxiosWithAuthorization = (kwargs, options) => {
//   const appStore = useAppStore();
//   const [state, fetch] = makeUseAxios(
//     {
//       axios: axiosInstance,
//       headers: {
//         // NOTE: 사용자 인증
//         Authorization: appStore && appStore.Authorization,
//         "Access-Control-Allow-Credentials": true,
//       },
//       ...kwargs,
//     },
//     // 강제로 cache를 끕니다.
//     options ? { ...options, useCache: false } : { useCache: false }
//   );

//   const { error } = state;

//   if (error) {
//     console.log(error);
//     try {
//       if (!error.response) {
//         // showNotification({
//         //   type: 'error',
//         //   message: '서버 오류',
//         //   description: `서버에 연결할 수 없습니다.`,
//         // });
//         console.log(error.response);
//         //toast.error("서버에 연결할 수 없습니다.");
//         console.log("서버에 연결할 수 없습니다.");
//       } else if (error.response.status >= 500) {
//         // showNotification({
//         //   type: 'error',
//         //   message: '서버 오류',
//         //   description: `서버 오류가 발생했습니다. (500)`,
//         // });
//         console.log(error.response);
//         Toast.fire("서버 오류가 발생했습니다. (500)", { toastId: kwargs.url });
//         console.log("서버 오류가 발생했습니다. (500)");
//       } else if (typeof error.response === "object") {
//         // const {
//         //   data: { detail: errorMessage },
//         // } = error.response;
//         console.log(error.response);

//         if (error.response.data.message_kor === undefined) {
//           Toast.fire(
//             `오류가 발생하였습니다.
//               관리자에게 문의하여 주세요`,
//             {
//               toastId: kwargs.url,
//             }
//           );
//         } else {
//           Toast.fire(
//             error.response.data.message_kor +
//               " (" +
//               error.response.data.code +
//               ")",
//             { toastId: kwargs.url }
//           );
//         }

//         if ([404, 405].includes(error.response.status)) {
//         } else if (error.response.status > 400 && error.response.status < 500) {
//           // dispatch(actions.logout());
//           // navigate("/login", { replace: true });
//         }
//       }
//     } catch {
//       console.log("::Api Error::");
//     }
//   }

//   return [state, fetch];
// };
