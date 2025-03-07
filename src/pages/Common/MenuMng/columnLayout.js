export const columnLayout = [
  {
    dataField: "menuId",
    headerText: "메뉴아이디",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "upperMenuId",
    headerText: "상위메뉴아이디",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "menuNmKor",
    headerText: "메뉴명_국문",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },

  {
    dataField: "menuNmEng",
    headerText: "메뉴명_영문",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },

  {
    dataField: "menuUrl",
    headerText: "메뉴경로",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },

  {
    dataField: "menuDesc",
    headerText: "메뉴설명",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },

  {
    dataField: "menuLvl",
    headerText: "메뉴레벨",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "sortSeq",
    headerText: "정렬순서",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },

  {
    dataField: "useYn",
    headerText: "사용여부",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
    editRenderer: {
      type: "ComboBoxRenderer",
      autoCompleteMode: true, // 자동완성 모드 설정
      matchFromFirst: false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
      list: [
        { code: "Y", value: "사용" },
        { code: "N", value: "미사용" },
      ], //key-value Object 로 구성된 리스트
      keyField: "code", // key 에 해당되는 필드명
      valueField: "value", // value 에 해당되는 필드명
    },
  },
];
