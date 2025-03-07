export const columnLayout = [
  {
    dataField: "carNo",
    headerText: "차량번호",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "custNm",
    headerText: "사내이송설정 업체",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "custCd",
    headerText: "사내이송설정 업체코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodCd",
    headerText: "사내이송설정 품목",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "wbrdgNm",
    headerText: "계근대 방향",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "wbrdg2Nm",
    headerText: "계근대 방향2",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "carWeight",
    dataType: "numeric",
    formatString: "#,###",
    headerText: "공차중량",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "carWeightRDt",
    headerText: "공차갱신일",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "appWeighUseYn",
    headerText: "활성화유무",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "bucketCd",
    headerText: "직접입력 통무게",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "bucketNm",
    headerText: "직접입력 통무게",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "inptDt",
    headerText: "등록일자",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
];
