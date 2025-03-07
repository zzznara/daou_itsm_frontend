export const INITIAL_FIELD_RULES = {
  dt: {
    rules: [
      {
        required: true,
        message: "입차예정일은 필수조건입니다.",
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
};
