export const INITIAL_FIELD_RULES = {
  carNo: {
    rules: [
      {
        required: true,
        message: "차량번호는 필수조건입니다.",
      },
    ],
  },
  wbrdgCd: {
    rules: [
      {
        required: true,
        message: "계근대 방향은 필수조건입니다.",
      },
    ],
  },
  appWeighUseYn: {
    rules: [
      {
        required: true,
        message: "활성화 유무는 필수조건입니다.",
      },
    ],
  },
};
