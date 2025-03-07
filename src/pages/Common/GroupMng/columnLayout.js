export const columnLayout = [
  {
    dataField: "groupId",
    headerText: "그룹아이디",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "groupNm",
    headerText: "그룹명",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "groupDesc",
    headerText: "그룹설명",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },

  {
    dataField: "rmks",
    headerText: "비고",
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
