export const INITIAL_FIELD_RULES = {
  dt: {
    rules: [
      {
        required: true,
        message: "등록일자는 필수조건입니다.",
      },
    ],
  },
  category: {
    rules: [
      {
        required: true,
        message: "국내/수입 구분은 필수조건입니다.",
      },
    ],
  },
  custCd: {
    rules: [
      {
        required: true,
        message: "거래처는 필수조건입니다.",
      },
    ],
  },

  prodNm: {
    rules: [
      {
        required: true,
        message: "제품명은 필수조건입니다.",
      },
    ],
  },
  carNo: {
    rules: [
      {
        required: true,
        message: "차량번호는 필수조건입니다.",
      },
    ],
  },
  carType: {
    rules: [
      {
        required: true,
        message: "차량종류는 필수조건입니다.",
      },
    ],
  },

  cotNum: {
    rules: [
      {
        required: true,
        message: "컨테이너 번호는 필수조건입니다.",
      },
    ],
  },
};
