import { defineStore } from "pinia";

export const useMenuActionListStore = defineStore("menulist", {
  state: () => ({ menuActionList: [] }),
  getters: {
    getMenuList() {
      return this.menuActionList;
    },
  },
  actions: {
    pushItems(item) {
      this.menuActionList.push(item);
    },
    removeDuplicaiton() {
      return [...new Set(...this.menuActionList)];
    },
    deleteItem(itemId) {
      const idx = this.menuActionList.findIndex((list) => list.id === itemId);
      if (idx > -1) {
        this.menuActionList.splice(idx, 1);
      }
    },
  },
});

export const usegridDataStore = defineStore("gridData", {
  state: () => ({
    gridData1: [
      {
        id: 1,
        name: "Moon",
        age: 25,
        address: "Bangalore",
      },
      {
        id: 2,
        name: "Sun",
        age: 30,
        address: "Mysore",
      },
      {
        id: 3,
        name: "Star",
        age: 35,
        address: "Chennai",
      },
    ],
    gridData2: [
      {
        name: "Speedster",
        speed: 35,
        length: 22,
        price: 300000,
        year: 2021,
      },
      {
        name: "OceanMaster",
        speed: 25,
        length: 35,
        price: 500000,
        year: 2020,
      },
      {
        name: "Voyager",
        speed: 20,
        length: 45,
        price: 700000,
        year: 2019,
      },
      {
        name: "WaveRunner",
        speed: 40,
        length: 19,
        price: 250000,
        year: 2022,
      },
      {
        name: "SeaBreeze",
        speed: 28,
        length: 31,
        price: 450000,
        year: 2018,
      },
      {
        name: "HarborGuard",
        speed: 18,
        length: 50,
        price: 800000,
        year: 2017,
      },
      {
        name: "SlickFin",
        speed: 33,
        length: 24,
        price: 350000,
        year: 2021,
      },
      {
        name: "StormBreaker",
        speed: 22,
        length: 38,
        price: 600000,
        year: 2020,
      },
      {
        name: "WindSail",
        speed: 15,
        length: 55,
        price: 900000,
        year: 2019,
      },
      {
        name: "FastTide",
        speed: 37,
        length: 20,
        price: 280000,
        year: 2022,
      },
    ],
  }),
  getters: {
    getList() {
      return this.gridData;
    },
  },
});

export const useMenuStore = defineStore("counter", {
  state: () => ({
    menu: [
      {
        title: "기준정보관리",
        id: 0,
        items: [
          {
            title: "공통코드관리",
            id: 0,
            path: "/codemng",
          },
          {
            title: "메뉴관리",
            id: 1,
            path: "/menumng",
          },
          {
            title: "사용자관리",
            id: 2,
            path: "/usermng",
          },
          {
            title: "권한관리",
            id: 3,
            path: "/authmng",
          },
          {
            title: "권한별메뉴관리",
            id: 4,
            path: "/authmenumng",
          },
          {
            title: "권한별그룹관리",
            id: 5,
            path: "/AuthGroupMng",
          },
          {
            title: "그룹관리",
            id: 6,
            path: "groupmng",
          },
          {
            title: "그룹별사용자관리",
            id: 7,
            path: "groupusermng",
          },
        ],
      },
      {
        title: "긴급배차",
        id: 1,
        items: [
          {
            title: "고철 긴급배차",
            id: 0,
            path: "/scrapurgent",
          },
          {
            title: "환경안전 긴급배차",
            id: 1,
            path: "/safetyurgent",
          },
          {
            title: "구매 긴급배차",
            id: 2,
            path: "/purchaseurgent",
          },
          {
            title: "출하 및 기타 긴급배차",
            id: 3,
            path: "/shipmentandetcurgent",
          },
          {
            title: "국내 BILLIET",
            id: 4,
            path: "/error",
          },
          {
            title: "긴급배차(전체)",
            id: 5,
            path: "/allurgent",
          },
        ],
      },
      //차량계량설정
      {
        title: "차량계량설정",
        id: 2,
        items: [
          {
            title: "배차순서설정",
            id: 0,
            path: "/dispatchorder",
          },
          {
            title: "사내이송차량설정",
            id: 1,
            path: "/inhousesetting",
          },
          {
            title: "구내차량 조회",
            id: 2,
            path: "/inhouse",
          },
          {
            title: "감량설정",
            id: 3,
            path: "/reduce",
          },
          {
            title: "계근대설정",
            id: 4,
            path: "/wsssetting",
          },
        ],
      },
      {
        title: "계근결과조회",
        id: 3,
        items: [
          {
            title: "계근결과조회",
            id: 0,
            path: "/result",
          },
          {
            title: "사용기록조회",
            id: 1,
            path: "/usehistory",
          },
          {
            title: "인터페이스 결과조회",
            id: 2,
            path: "/resend",
          },
        ],
      },
    ],
  }),
  getters: {
    getMenu() {
      return this.menu;
    },
  },
  actions: {
    getTitle(id) {
      return this.menu[id].title;
    },
    getItems(id) {
      return this.menu[id].items;
    },
  },
});
