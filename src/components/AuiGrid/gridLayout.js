export const defaultGridProps = {
  // 수정할 때 사용자가 입력한 빈 값("")을 명시적인 null 로 처리할지 여부를 지정합니다.
  // 기본적으로 사용자가 빈 값을 입력하면 "" 로 수정 완료 처리됩니다.
  // true 인 경우 빈 값을 null 로 false 인 경우 빈 값을 "" 로 적용 시킵니다.
  // 기본값(default) : false.
  blankToNullOnEditing: false,

  // 칼럼의 가로 사이즈(width) 기본(default)값을 지정합니다.
  // 기본값은 칼럼 레이아웃에서 width 속성을 지정하지 않은 칼럼에게 적용됩니다.
  // 기본값(default) : 80.
  defaultColumnWidth: 120,

  // 편집 수정 가능 여부를 지정합니다.
  // 기본값(default) : false.
  editable: false,

  // 그리드 데이터 복사하기(Ctrl+C), 붙여넣기(Ctrl+V) 활성화 여부를 지정합니다.
  // 기본값(default) : true.
  enableClipboard: true,

  // 셀 선택모드를 지정합니다. 유효 속성값은 다음과 같습니다.
  // singleCell, singleRow, multipleCells, multipleRows, none
  selectionMode: "singleRow",

  // 헤더 출력 여부를 지정합니다.
  // 기본값(default) : true.
  showHeader: true,

  // 페이징을 사용하는 경우 출력되는 페이지의 버턴 개수를 지정합니다.
  // 지정할 수 있는 최대값은 20입니다.
  // 기본값(default) : 10.
  showPageButtonCount: 10,

  // 엑스트라 행 체크박스(showRowCheckColumn=true)를 설정한 경우, 헤더 부분에 전체 선택 체크박스를 표시할지 여부를 지정합니다.
  // 기본값(default) : true.
  showRowAllCheckBox: false,

  // 엑스트라 행 체크박스 출력 여부를 지정합니다.
  // 이 속성 값이 true 이면 최좌측에 체크박스 칼럼이 생성됩니다.
  // 기본값(default) : false.
  showRowCheckColumn: false,

  // 그리드 좌측에 행의 상태를 나타내는 칼럼 출력 여부를 결정합니다.
  // editable 을 true 로 설정한 경우 삭제, 수정, 추가 행에 대한 정보가 이 칼럼에 아이콘을 출력됩니다.
  // 만약 editable 을 false 로 설정한 경우 showStateColumn = true 를 설정하면 선택행에 대한 정보가 아이콘으로 출력됩니다.
  // 기본값(default) : false.
  showStateColumn: true,

  // 그리드 툴팁 표시 여부를 지정합니다.
  // 기본값(default) : false.
  showTooltip: false,

  // 수정 가능한 상태(editable = true) 인 경우 행을 삭제하면 그리드에서 바로 제거하지 않고, 삭제된 표시를 하고 남겨 둘 지 여부를 나타냅니다.
  // 삭제된 표시는 기본적으로 가운데 줄이 그어지는 형태입니다.
  // softRemoveRowMode=true 인 경우, 삭제된 행은 복구(삭제 취소) 할 수 있습니다.(restoreSoftRows 메소드 참고)
  // 속성 dropToOthers 을 true 로 설정한 경우 softRemoveRowMode 는 강제적으로 false 입니다.
  // Also See : dropToOthers
  // 기본값(default) : true.
  softRemoveRowMode: true,

  // BUG: true로 지정하는 경우 그리드 로드할 때 ... is not a function 에러 발생
  // // 페이징을 사용 여부를 지정합니다.
  // // 기본값(default) : false.
  // usePaging: true,

  // 그리드의 가로 사이즈를 픽셀 단위로 지정합니다. 이 가로 사이즈를 지정하지 않으면 부모 DIV 의 width 만큼 할당됩니다.(즉, 부모 width의 100%)
  // 기본값(default) : NaN.
  // width: NaN,

  //   그리드에 키보드 포커스 설정을 할지 여부를 지정합니다.
  //   만약, enableFocus 를 false 로 지정하면 키포드 포커싱을 받지 못하기 때문에 키보드로 바로 셀 값 수정 및 화살표 키로 이동 등 키보드 이용을 사용할 수 없습니다.
  enableFocus: true,

  // 엔터키 눌렀을 때 제자리 멈춤
  onlyEnterKeyEditEnd: true,

  // 그룹핑 후 셀 병함 실행
  enableCellMerge: false,

  // enableCellMerge 할 때 실제로 rowspan 적용 시킬지 여부
  // 만약 false 설정하면 실제 병합은 하지 않고 데이터 값만 같은 데이터 출력 시키지 않음. (기본값 : true)
  cellMergeRowSpan: true,

  // 브랜치에 해당되는 행을 출력 여부
  showBranchOnGrouping: true,

  // 컬럼 필드 필터링 기능 활성화 여부
  enableFilter: true,

  // 컬럼 헤더를 드래그앤드롭으로 자리를 옮기는 기능 활성화 여부
  enableMovingColumn: true,

  //셀단위 Ctrl + C 허용
  copySingleCellOnRowMode: true,

  // 그리드 ROW 스타일 함수 정의
  rowStyleFunction: function (rowIndex, item) {
    if (item._$isGroupSumField) {
      // 그룹핑으로 만들어진 합계 필드인지 여부

      // 그룹핑을 더 많은 필드로 하여 depth 가 많아진 경우는 그에 맞게 스타일을 정의하십시오.
      // 현재 3개의 스타일이 기본으로 정의됨.(AUIGrid_style.css)
      switch (
        item._$depth // 계층형의 depth 비교 연산
      ) {
        case 2:
          return "aui-grid-row-depth1-style";
        case 3:
          return "aui-grid-row-depth2-style";
        case 4:
          return "aui-grid-row-depth3-style";
        default:
          return "aui-grid-row-depth-default-style";
      }
    }
    return null;
  },

  noDataMessage: "",

  // 그리드 상단 Grouping 영역 추가
  useGroupingPanel: false,

  // 트리를 처음에 전체 펼쳐서 보여줄지 여부
  displayTreeOpen: true,

  // 그룹핑 메시지
  groupingMessage: "그룹정렬을 하시고자 하는 컬럼헤더를 여기에 Drag & Drop 하십시오.",
};
