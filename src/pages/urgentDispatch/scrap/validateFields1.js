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

  prodCd1: {
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

  areaCd: {
    rules: [
      {
        required: true,
        message: "납품지는 필수조건입니다.",
      },
    ],
  },

  vendorCd: {
    rules: [
      {
        required: true,
        message: "중상업체는 필수조건입니다.",
      },
    ],
  },

  gradeNm: {
    rules: [
      {
        required: true,
        message: "등급은 필수조건입니다.",
      },
    ],
  },
};
