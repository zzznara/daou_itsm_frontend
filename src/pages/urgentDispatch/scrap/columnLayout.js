export const columnLayout = [
  {
    dataField: "dt",
    headerText: "입차예정일",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "category",
    headerText: "국내/수입",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "categoryNm",
    headerText: "국내/수입",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "custNm",
    headerText: "거래처명",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodNm",
    headerText: "제품명",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "gradeNm",
    headerText: "등급",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "carNo",
    headerText: "차량번호",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
    styleFunction: function (
      rowIndex,
      columnIndex,
      value,
      headerText,
      item,
      dataField
    ) {
      //console.log(rowIndex, columnIndex, value, headerText, item, dataField);
      //alert(1);
      if (item.carNoRedcolor === "Y") {
        //console.log("나는 빨갱이");
        return "aui-grid-bg-red";
      } else {
        //console.log("나는 퍼랭이");
        //return "aui-grid-blue-text";
        return null;
      }
    },
  },
  {
    dataField: "drvNm",
    headerText: "기사명",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "drvTel",
    headerText: "전화번호",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "areaNm",
    headerText: "납품지",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "fileYn",
    headerText: "파일첨부",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "fileUri",
    headerText: "파일첨부",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
    renderer: {
      type: "ButtonRenderer",
      labelText: "보기",
      visibleFunction: function (
        rowIndex,
        columnIndex,
        value,
        item,
        dataField
      ) {
        if (item.category === "1" || item.category === "3") {
          //if (item.statusCd === "900") {
          if (item.fileId !== undefined && item.statusCd === "900") {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
    },
  },
  {
    dataField: "vendorNm",
    headerText: "중상업체",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "carType",
    headerText: "차량종류",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "carTypeNm",
    headerText: "차량종류",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "statusCd",
    headerText: "상태",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "status",
    headerText: "상태",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "bigo",
    headerText: "비고",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "inGb",
    headerText: "inGb",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "inGbNm",
    headerText: "등록구분",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "saveGB",
    headerText: "등록구분",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "turn",
    headerText: "계량순번",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "inWeight",
    headerText: "입차중량",
    formatString: "#,##0",
    dataType: "numeric",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "outWeight",
    headerText: "출차중량",
    formatString: "#,##0",
    dataType: "numeric",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "realWeight",
    headerText: "실중량",
    formatString: "#,##0",
    dataType: "numeric",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "mwgt",
    headerText: "감량",
    formatString: "#,##0",
    dataType: "numeric",
    visible: true,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },

  ///
  {
    dataField: "sg",
    headerText: "사업장",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "seq",
    headerText: "채번",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "ioGb",
    headerText: "입출구분",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "stGb",
    headerText: "안정화구분",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "etm",
    headerText: "입차시간",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "otm",
    headerText: "출차시간",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "carCd",
    headerText: "사전배차등록업체",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "custCd",
    headerText: "업체코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodCd",
    headerText: "제품코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "salDt",
    headerText: "판매일자",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "salJno",
    headerText: "판매전표",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodGb",
    headerText: "계근구분",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodCd",
    headerText: "고철품목코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodCd1",
    headerText: "고철코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "grade",
    headerText: "고철등급",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "areaCd",
    headerText: "납품지",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "vendorCd",
    headerText: "중상업체",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "decreaseCode",
    headerText: "부자재감량코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "decreaseWgt",
    headerText: "부자재감량수량",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "addCd",
    headerText: "합차코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "mixCd",
    headerText: "혼적코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "ptCount",
    headerText: "출력COUNT",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "banpumYn",
    headerText: "반품유무",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "refSg",
    headerText: "계근사업장",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "refDt",
    headerText: "계근일자",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "refSeq",
    headerText: "계근SEQ",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "isNo",
    headerText: "등록자",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "isDt",
    headerText: "등록일시",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "upNo",
    headerText: "수정자",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "upDt",
    headerText: "수정일시",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
];

/*
//DB 테이블 컬럼 순서대로. 복사해서 화면에 맞게 수정하자
export const columnLayout = [
  {
    dataField: "sg",
    headerText: "사업장",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "Dt",
    headerText: "등록일자",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "seq",
    headerText: "채번",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "category",
    headerText: "국내/수입",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "turn",
    headerText: "배차순번",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "ioGb",
    headerText: "입출구분",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "stGb",
    headerText: "안정화구분",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "etm",
    headerText: "입차시간",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "otm",
    headerText: "출차시간",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "carNo",
    headerText: "차량번호",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "carCd",
    headerText: "사전배차등록업체",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "custCd",
    headerText: "업체코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "custNm",
    headerText: "업체명",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "drvNm",
    headerText: "기사명",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "drvTel",
    headerText: "기사번호",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodNm",
    headerText: "제품명",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "salDt",
    headerText: "판매일자",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "salJno",
    headerText: "판매전표",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodGb",
    headerText: "계근구분",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodCd",
    headerText: "고철품목코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodCd1",
    headerText: "고철코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "grade",
    headerText: "고철등급",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "gradeNm",
    headerText: "고철등급명",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "areaCd",
    headerText: "납품지",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "vendorCd",
    headerText: "중상업체",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "decreaseCode",
    headerText: "부자재감량코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "decreaseWgt",
    headerText: "부자재감량수량",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "mwgt",
    headerText: "감량중량",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "carType",
    headerText: "차량종류",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "addCd",
    headerText: "합차코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "mixCd",
    headerText: "혼적코드",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "ptCount",
    headerText: "출력COUNT",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "banpumYn",
    headerText: "반품유무",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "refSg",
    headerText: "계근사업장",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "refDt",
    headerText: "계근일자",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "refSeq",
    headerText: "계근SEQ",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "bigo",
    headerText: "비고",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "isNo",
    headerText: "등록자",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "isDt",
    headerText: "등록일시",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "upNo",
    headerText: "수정자",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "upDt",
    headerText: "수정일시",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },

  // 콤보박스 참고용
  // {
  //   dataField: "gender",
  //   headerText: "성별",
  //   filter: {
  //     showIcon: true,
  //     useExMenu: true,
  //   },
  //   editRenderer: {
  //     type: "ComboBoxRenderer",
  //     autoCompleteMode: true, // 자동완성 모드 설정
  //     matchFromFirst: false, // 처음부터 매치가 아닌 단순 포함되는 자동완성
  //     list: [
  //       { code: "M", value: "남자" },
  //       { code: "F", value: "여자" },
  //     ], //key-value Object 로 구성된 리스트
  //     keyField: "code", // key 에 해당되는 필드명
  //     valueField: "value", // value 에 해당되는 필드명
  //   },
  // },
];
*/
