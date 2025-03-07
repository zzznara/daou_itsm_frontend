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

export function createMenuAuthColumnData() {
  const menu_auth_columns = [
    {
      dataField: "menuId",
      headerText: "메뉴아이디",
    },
    {
      dataField: "authId",
      headerText: "권한아이디",
      visible: false,
    },
    {
      dataField: "menuNmKor",
      headerText: "메뉴명_국문",
    },
    {
      dataField: "searchAuthYn",
      headerText: "검색권한여부",
      renderer: {
        type: "CheckBoxEditRenderer",
        //showLabel: true, // 참, 거짓 텍스트 출력여부( 기본값 false )
        editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
        checkValue: "Y", // true, false 인 경우가 기본
        unCheckValue: "N",
      },
    },
    {
      dataField: "saveAuthYn",
      headerText: "저장권한여부",
      renderer: {
        type: "CheckBoxEditRenderer",
        //showLabel: true, // 참, 거짓 텍스트 출력여부( 기본값 false )
        editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
        checkValue: "Y", // true, false 인 경우가 기본
        unCheckValue: "N",
      },
    },
    {
      dataField: "newAuthYn",
      headerText: "신규권한여부",
      renderer: {
        type: "CheckBoxEditRenderer",
        // showLabel: true, // 참, 거짓 텍스트 출력여부( 기본값 false )
        editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
        checkValue: "Y", // true, false 인 경우가 기본
        unCheckValue: "N",
      },
    },
    {
      dataField: "delAuthYn",
      headerText: "삭제권한여부",
      renderer: {
        type: "CheckBoxEditRenderer",
        //showLabel: true, // 참, 거짓 텍스트 출력여부( 기본값 false )
        editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
        checkValue: "Y", // true, false 인 경우가 기본
        unCheckValue: "N",
      },
    },
    {
      dataField: "printAuthYn",
      headerText: "출력권한여부",
      renderer: {
        type: "CheckBoxEditRenderer",
        //showLabel: true, // 참, 거짓 텍스트 출력여부( 기본값 false )
        editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
        checkValue: "Y", // true, false 인 경우가 기본
        unCheckValue: "N",
      },
    },
    {
      dataField: "excelAuthYn",
      headerText: "엑셀권한여부",
      renderer: {
        type: "CheckBoxEditRenderer",
        // showLabel: true, // 참, 거짓 텍스트 출력여부( 기본값 false )
        editable: true, // 체크박스 편집 활성화 여부(기본값 : false)
        checkValue: "Y", // true, false 인 경우가 기본
        unCheckValue: "N",
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

export function createMenuColumnData() {
  const columnLayout = [
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
  return columnLayout;
}
