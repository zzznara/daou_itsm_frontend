export const INITIAL_FIELD_RULES = {
  reduceCd: {
    rules: [
      {
        required: true,
        message: "감량코드는 필수조건입니다.",
      },
    ],
  },
  unitWeight: {
    rules: [
      {
        required: true,
        message: "단위수량별 감량은 필수조건입니다.",
      },
    ],
  },
  custNm: {
    rules: [
      {
        required: true,
        message: "거래처는 필수조건입니다.",
      },
    ],
  },
};
