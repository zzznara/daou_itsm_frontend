export function createMasterColumnData() {
  const masterColumnLayout = [
    {
      dataField: "mastCd",
      headerText: "마스터코드",
    },
    {
      dataField: "cdNmKor",
      headerText: "코드명_국문",
    },
    {
      dataField: "cdNmEng",
      headerText: "코드명_영문",
    },
    {
      dataField: "cdDesc",
      headerText: "코드설명",
    },
    {
      dataField: "useYn",
      headerText: "사용여부",
    },
  ];
  return masterColumnLayout;
}

export function createDetailColumnData() {
  const detailColumnLayout = [
    {
      dataField: "mastCd",
      headerText: "마스터코드",
    },
    {
      dataField: "detlCd",
      headerText: "상세코드",
    },
    {
      dataField: "cdNmKor",
      headerText: "코드명_국문",
    },
    {
      dataField: "cdNmEng",
      headerText: "코드명_영문",
    },
    {
      dataField: "attr1",
      headerText: "속성1",
    },
    {
      dataField: "attr2",
      headerText: "속성2",
    },
    {
      dataField: "attr3",
      headerText: "속성3",
    },
    {
      dataField: "attr4",
      headerText: "속성4",
    },
    {
      dataField: "attr5",
      headerText: "속성5",
    },
    {
      dataField: "attr6",
      headerText: "속성6",
    },
    {
      dataField: "attr7",
      headerText: "속성7",
    },
    {
      dataField: "attr8",
      headerText: "속성8",
    },
    {
      dataField: "attr9",
      headerText: "속성9",
    },
    {
      dataField: "attr10",
      headerText: "속성10",
    },
    {
      dataField: "cdDesc",
      headerText: "코드설명",
    },
    {
      dataField: "sortSeq",
      headerText: "정렬순서",
    },
    {
      dataField: "useYn",
      headerText: "사용여부",
    },
  ];
  return detailColumnLayout;
}
