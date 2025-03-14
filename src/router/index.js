/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
// import { routes } from "vue-router/auto-routes";
import { components } from "vuetify/dist/vuetify-labs.js";
import LoginLayout from "@/layouts/login.vue";
import MainLayout from "@/layouts/main.vue";
import { isAuthenticated } from "@/utils/auth";

const routes = [
  {
    path: "/",
    component: LoginLayout,
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/Accounts/Login/index.vue"),
      },
    ],
  },
  {
    path: "/",
    component: MainLayout,
    redirect: "/main",
    children: [
      {
        path: "/main",
        name: "Main",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/MainPage/index.vue"),
      },
      //기준정보관리
      {
        path: "Common/CodeMng",
        name: "CodeMng",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Common/CodeMng/index.vue"),
      },
      //개발파일자동생성
      {
        path: "Common/AutoCreate",
        name: "AutoCreate",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Common/AutoCreate/index.vue"),
      },
      {
        path: "Common/MenuMng",
        name: "MenuMng",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Common/MenuMng/index.vue"),
      },
      {
        path: "/Common/UserMng",
        name: "UserMng",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Common/UserMng/index.vue"),
      },
      {
        path: "/Common/AuthMng",
        name: "AuthMng",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Common/AuthMng/index.vue"),
      },
      {
        path: "/Common/AuthMenuMng",
        name: "AuthMenuMng",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Common/AuthMenuMng/index.vue"),
      },
      {
        path: "/Common/AuthGroupMng",
        name: "AuthGroupMng",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Common/AuthGroupMng/index.vue"),
      },
      {
        path: "/Common/GroupMng",
        name: "GroupMng",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Common/GroupMng/index.vue"),
      },
      {
        path: "/Common/GroupUserMng",
        name: "GroupUserMng",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Common/GroupUserMng/index.vue"),
      },
      // 긴급배차
      {
        path: "/urgentDispatch/scrap",
        name: "scrap",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/urgentDispatch/scrap/index.vue"),
      },
      {
        path: "/urgentDispatch/safety",
        name: "safety",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/urgentDispatch/safety/index.vue"),
      },
      {
        path: "/urgentDispatch/purchase",
        name: "purchase",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/urgentDispatch/purchase/index.vue"),
      },
      {
        path: "/urgentDispatch/shipmentAndEtc",
        name: "shipmentAndEtc",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/urgentDispatch/shipmentAndEtc/index.vue"),
      },
      {
        path: "/urgentDispatch/scrap",
        name: "AllUrgent",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/urgentDispatch/all/index.vue"),
      },
      //차량계량설정
      {
        path: "/weightSetting/dispatchOrder",
        name: "dispatchOrder",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/weightSetting/dispatchOrder/index.vue"),
      },
      {
        path: "/weightSetting/inhouseSetting",
        name: "inhouseSetting",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/weightSetting/inhouseSetting/index.vue"),
      },
      {
        path: "/weightSetting/inhouse",
        name: "inhouse",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/weightSetting/inhouse/index.vue"),
      },
      {
        path: "/weightSetting/reduce",
        name: "reduce",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/weightSetting/reduce/index.vue"),
      },
      {
        path: "/weightSetting/wssSetting",
        name: "wssSetting",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/weightSetting/wssSetting/index.vue"),
      },
      // 계근결과조회
      {
        path: "/resultInquery/result",
        name: "result",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/resultInquery/result/index.vue"),
      },
      {
        path: "/resultInquery/useHistory",
        name: "useHistory",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/resultInquery/useHistory/index.vue"),
      },
      {
        path: "/resultInquery/resend",
        name: "resend",
        meta: { requiresAuth: true }, // 로그인이 필요한 경로
        component: () => import("@/pages/Error.vue"),
        // component: () => import("@/pages/resultInquery/resend/index.vue"),
      },
      // 에러
      {
        path: "*",
        redirect: "/error",
        name: "Error",
        component: () => import("@/pages/Error.vue"),
      },
      // 다른 보호된 페이지 추가
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // routes: setupLayouts(routes),
  // routes: [
  //   {
  //     path: "/login"
  //     components: () => import('../pages/Login.vue'),
  //     name: Login,
  //   },
  // ],
});

// router.addRoute({path:})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      // console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

// 🛑 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // 로그인이 필요하지만, 인증되지 않음 -> 로그인 페이지로 이동
    next("/login");
  } else {
    if (to.path !== from.path) {
      // 접근 허용
      next();
    }
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

// Save previous page
router.beforeEach((_to, from, next) => {
  router.from = from;
  next();
});

export default router;
