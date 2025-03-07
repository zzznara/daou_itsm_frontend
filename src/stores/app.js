import { defineStore } from "pinia";
import { getStorageItem, setStorageItem } from "../storage/useLocalStorage";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    isAuthenticated: getStorageItem("jwtToken", "").length > 0,
    Authorization:
      getStorageItem("jwtToken", "").length > 0 ? `Bearer ${getStorageItem("jwtToken", "")}` : "",
    userInfo: getStorageItem("userInfo", {}),
    menuKey: "",
    topMenuKey: "",
    previousMenuKey: "",
    menuList: [],
    menuActionList: [],
    menuOriginList: [],
    menuPath: "",
    menuInfo: {},
    tabSize: 0,
    themeMode: getStorageItem("theme", "type01"),
  }),
  actions: {
    setToken(jwtToken) {
      this.Authorization = `Bearer ${jwtToken}`;
      this.isAuthenticated = true;
      setStorageItem("jwtToken", jwtToken);
    },
    deleteToken() {
      this.Authorization = "";
      this.isAuthenticated = false;
      setStorageItem("jwtToken", "");
    },
    setMenuKey(menuKey) {
      this.menuKey = menuKey;
    },
    setTopMenuKey(topMenuKey) {
      this.topMenuKey = topMenuKey;
    },
    setPreviousMenuKey(previousMenuKey) {
      this.previousMenuKey = previousMenuKey;
    },
    setMenu(menuInfo) {
      this.menuInfo = menuInfo;
    },
    setMenuPath(menuPath) {
      this.menuPath = menuPath;
    },
    setMenuList(menuList) {
      this.menuList = menuList;
    },
    setMenuOriginList(menuOriginList) {
      this.menuOriginList = menuOriginList;
    },
    setMenuActionList(menuActionList) {
      this.menuActionList = menuActionList;
    },
    setTabSize(tabSize) {
      this.tabSize = tabSize;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      setStorageItem("userInfo", userInfo);
    },
    logout() {
      this.isAuthenticated = false;
      this.Authorization = "";
      this.userInfo = {};
      this.menuKey = "";
      this.topMenuKey = "";
      this.previousMenuKey = "";
      this.menuList = [];
      this.menuActionList = [];
      this.menuOriginList = [];
      this.menuPath = "";
      this.menuInfo = {};
      setStorageItem("jwtToken", "");
      setStorageItem("userInfo", "");
    },
    setTheme(themeMode) {
      this.themeMode = themeMode;
      setStorageItem("theme", themeMode);
    },
  },
  persist: [
    {
      // paths: [
      //   "isAuthenticated",
      //   "Authorization",
      //   "userInfo",
      //   "menuKey",
      //   "topMenuKey",
      //   "previousMenuKey",
      //   "menuList",
      //   "menuActionList",
      //   "menuOriginList",
      //   "menuPath",
      //   "menuInfo",
      //   "tabSize",
      //   "themeMode",
      // ],
      storage: localStorage,
    },
  ],
});
