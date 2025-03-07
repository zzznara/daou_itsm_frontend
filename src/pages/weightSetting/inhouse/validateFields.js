export const INITIAL_FIELD_RULES = {
  userId: {
    rules: [
      {
        required: true,
        message: "실공급업체는 필수조건입니다.",
      },
    ],
  },
  pwd: {
    rules: [
      {
        required: true,
        message: "암호는 필수조건입니다.",
      },
    ],
  },
  empNo: {
    rules: [
      {
        required: true,
        message: "사원번호는 필수조건입니다.",
      },
    ],
  },

  nmKor: {
    rules: [
      {
        required: true,
        message: "이름은 필수조건입니다.",
      },
    ],
  },
  email: {
    rules: [
      {
        required: true,
        message: "이메일주소 필수조건입니다.",
      },
    ],
  },
  mobileNo: {
    rules: [
      {
        required: true,
        message: "모바일번호 필수조건입니다.",
      },
    ],
  },

  useYn: {
    rules: [
      {
        required: true,
        message: "사용여부 필수조건입니다.",
      },
    ],
  },
};
