export function createAuthColumnData() {
  const auth_columns = [
    {
      dataField: "authId",
      headerText: "권한아이디",
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },
    {
      dataField: "authNm",
      headerText: "권한명",
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },
    {
      dataField: "authVldtStrtDt",
      headerText: "권한유효시작일시",
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },
    {
      dataField: "authVldtEndDt",
      headerText: "권한유효종료일시",
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },

    {
      dataField: "authDesc",
      headerText: "권한설명",
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
  return auth_columns;
}

export function createAuthGroupColumnData() {
  const menu_auth_columns = [
    {
      dataField: "groupId",
      headerText: "그룹아이디",
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },
    {
      dataField: "authId",
      headerText: "권한아이디",
      visible: false,
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
  ];
  return menu_auth_columns;
}

export function createGroupColumnData() {
  const columnLayout = [
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
  return columnLayout;
}
