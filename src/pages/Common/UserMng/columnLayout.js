export const columnLayout = [
  {
    dataField: "systemCd",
    headerText: "회사구분",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "userId",
    headerText: "사용자아이디",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "pwd",
    headerText: "암호",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "empNo",
    headerText: "사원번호",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "nmKor",
    headerText: "성명_한글",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "groupNm",
    headerText: "사용자그룹",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "nmEng",
    headerText: "성명_영문",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "nmChn",
    headerText: "성명_한자",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "email",
    headerText: "이메일주소",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "dptCd",
    headerText: "부서코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "dptNm",
    headerText: "부서명",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "telNo",
    headerText: "전화번호",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "mobileNo",
    headerText: "모바일번호",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "rsofCd",
    headerText: "직책코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "rsofNm",
    headerText: "직책명",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "plbsCd",
    headerText: "사업장코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },

  {
    dataField: "pwdChngDt",
    headerText: "암호변경일",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "gender",
    headerText: "성별",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
    editRenderer: {
      type: "ComboBoxRenderer",
      autoCompleteMode: true, // 자동완성 모드 설정
      matchFromFirst: false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
      list: [
        { code: "M", value: "남자" },
        { code: "F", value: "여자" },
      ], //key-value Object 로 구성된 리스트
      keyField: "code", // key 에 해당되는 필드명
      valueField: "value", // value 에 해당되는 필드명
    },
  },
  {
    dataField: "etcoDt",
    headerText: "입사일",
    visible: false,
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
  },
];
