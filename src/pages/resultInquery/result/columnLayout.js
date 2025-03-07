export const columnLayout = [
  {
    dataField: "categoryNm",
    headerText: "업무구분",
    visible: false,
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "categoryNm",
    headerText: "업무구분",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "ioGbNm",
    headerText: "매입/매출",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "custNm",
    headerText: "거래처",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "prodNm",
    headerText: "품목",
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
    dataField: "drvNm",
    headerText: "기사명",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "drvTel",
    headerText: "전화번호",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "inWeight",
    dataType: "numeric",
    formatString: "#,##0",
    headerText: "입고계량",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "outWeight",
    dataType: "numeric",
    formatString: "#,##0",
    headerText: "출고계량",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "wgt",
    dataType: "numeric",
    formatString: "#,###",
    headerText: "계근량",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "decreaseWgt",
    dataType: "numeric",
    formatString: "#,###",
    headerText: "감량",
    filter: {
      showIcon: true,
      useExMenu: true,
    },
  },
  {
    dataField: "isDt",
    headerText: "계량일자",
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
    // tooltip: {
    //   tooltipFunction: function (
    //     rowIndex,
    //     columnIndex,
    //     value,
    //     headerText,
    //     item,
    //     dataField
    //   ) {
    //     //
    //     let tooltipStr = "";
    //     return tooltipStr;
    //   },
    // },
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
        // console.log(
        //   "rowIndex",
        //   rowIndex,
        //   "columnIndex",
        //   columnIndex,
        //   "value",
        //   value,
        //   "item",
        //   item,
        //   "dataField",
        //   dataField
        // );

        if (item.category === "1" || item.category === "3") {
          //if (item.statusCd === "900") {
          //if (item.fileId !== undefined && item.statusCd === "900") {
          if (item.fileId !== undefined) {
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
];
