// import { ModalConfirm } from "../../../components/Confirm";

export const columnLayout = (onRowButtonClick, popWeigtingCertificate) => {
  const gridColumnLayOut = [
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
      headerText: "입고계량",
      dataType: "numeric",
      formatString: "#,##0",
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },
    {
      dataField: "outWeight",
      headerText: "출고계량",
      dataType: "numeric",
      formatString: "#,##0",
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },
    {
      dataField: "wgt",
      dataType: "numeric",
      formatString: "#,##0",
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
      dataField: "inYn",
      headerText: "입차 I/F 결과",
      width: 100,
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },
    {
      dataField: "inSendDt",
      headerText: "입차 I/F 시각",
      width: 200,
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },
    {
      dataField: "outYn",
      headerText: "출차 I/F 결과",
      width: 100,
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },
    {
      dataField: "outSendDt",
      headerText: "출차 I/F 시각",
      width: 200,
      filter: {
        showIcon: true,
        useExMenu: true,
      },
    },
    // {
    //   dataField: "ifResend", // 임의의 고유값
    //   headerText: "계량 재전송",
    //   filter: {
    //     showIcon: true,
    //     useExMenu: true,
    //   },
    //   headerTooltip: {
    //     show: true,
    //     tooltipHtml: "입/출차 모두 전송 이전인 경우 버튼 표시 없음",
    //   },
    //   renderer: {
    //     type: "ButtonRenderer",
    //     labelText: "재전송",
    //     @click: onRowButtonClick,
    //     visibleFunction: function (
    //       rowIndex,
    //       columnIndex,
    //       value,
    //       item,
    //       dataField
    //     ) {
    //       // 행 아이템의 ifResend 이 "N" 이라면 버튼 표시 하지 않음
    //       if (item.ifResend == "Y") {
    //         return true;
    //       }
    //       return false;
    //     },
    //   },
    // },
  ];
  return gridColumnLayOut;
};
