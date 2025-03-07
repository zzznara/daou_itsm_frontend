/**
 * 데이터가 있는지 없는지를 체크
 * @param validationMessages
 * @returns
 */
export const checkData = (datas) => {
  for (var data in datas) {
    if (datas[data] === null) {
      datas[data] = "";
    }
  }
  return datas;
};

export const checkValidatorsWithValue = (rules, value) => {
  return rules
    .map((rule) => {
      if (rule.required && value === "") {
        return rule.message;
      }

      if (rule.max_length !== null && typeof value === "string" && value.length > rule.max_length) {
        return rule.message;
      }

      if (rule.min_length !== null && typeof value === "string" && value.length < rule.min_length) {
        return rule.message;
      }

      if (rule.max_value !== null && value > rule.max_value) {
        return rule.message;
      }

      if (rule.min_value !== null && value < rule.min_value) {
        return rule.message;
      }

      if (rule.regexp && value.length > 0) {
        const pattern = new RegExp(rule.regexp, "g");
        if (!pattern.test(value)) return rule.message;
      }

      if (rule.type === "email") {
        const pattern =
          /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/;
        if (!pattern.test(value)) return rule.message;
      }
    })
    .filter((message) => !!message);
};

export const saveGridCheckData = (addItems, editItems, removeItems, menuId) => {
  let param = [];
  if (addItems && addItems.length > 0) {
    for (var i = 0, len = addItems.length; i < len; i++) {
      var rowItem = addItems[i]; // 행아이템
      rowItem.status = "C";
      rowItem.sysMenuId = menuId;
      param.push(rowItem);
    }
  }

  if (editItems && editItems.length > 0) {
    for (i = 0, len = editItems.length; i < len; i++) {
      rowItem = editItems[i]; // 행아이템
      rowItem.status = "U";
      rowItem.sysMenuId = menuId;
      param.push(rowItem);
    }
  }
  if (removeItems && removeItems.length > 0) {
    for (i = 0, len = removeItems.length; i < len; i++) {
      rowItem = removeItems[i]; // 행아이템
      rowItem.status = "D";
      rowItem.sysMenuId = menuId;
      param.push(rowItem);
    }
  }
  return param;
};

export const getGridValidateCheck = (auiGrid, items, rules) => {
  let validator = [];
  for (var i = 0; i < items.length; i++) {
    var rowItem = items[i];
    if (auiGrid.isAddedById(rowItem._$uid) || auiGrid.isEditedById(rowItem._$uid)) {
      Object.keys(rules).map((column) => {
        const message = checkValidatorsWithValue(rules[column].rules, rowItem[column])[0];
        console.log(message);

        if (message !== undefined) {
          validator.push({ column: column, message: message });
        }
      });

      if (validator.length > 0) {
        return {
          isValidate: true,
          message: validator[0].message,
          column: validator[0].column,
          rowIndex: i,
          rowItem: rowItem,
        };
      }
    }
  }
  return {
    isValidate: false,
    message: "",
    column: "",
    rowIndex: -1,
    rowItem: {},
  };
};

export const ajusta = (v) => {
  const digitos = !v ? "" : v.replace(/[^\d]/g, "");
  console.log(digitos);
  if (!digitos || digitos.length < 10) return v;
  const corte = digitos.length === 10 ? 6 : 7;
  const max = digitos.length > 11 ? 11 : digitos.length;
  return `${digitos.substring(0, 3)}-${digitos.substring(3, corte)}-${digitos.substring(
    corte,
    max
  )}`;
};

//CRUD에 따른 항목 사용가능 한 필드 구분
export const isFieldDisabled = (state, fieldNm, disabledFields, isForceDisable) => {
  var i = 0;
  if (state === "created") {
    for (var j = 0; j < disabledFields.created.length; j++) {
      let field = disabledFields.created[j];
      //console.log("field === " + field + " || fieldNm === " + fieldNm);
      if (fieldNm === field) {
        return true;
      }
    }
  } else if (state === "updated") {
    for (j = 0; j < disabledFields.updated.length; j++) {
      let field = disabledFields.updated[j];
      //console.log("field === " + field + " || fieldNm === " + fieldNm);
      if (fieldNm === field) {
        return true;
      }
    }
  } else if (state === "normaled" || state === "deleted") {
    //console.log("여기에 찍히나?");
    return true;
  }
  if (isForceDisable !== undefined && isForceDisable === true) {
    //강제처리
    //console.log("isForceDisable", isForceDisable);
    return true;
  }
  return false;
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export function setCookie(name, value, expiredays) {
  var today = new Date();

  console.log(today.getDate());

  today.setDate(today.getDate() + expiredays); // 현재시간에 하루를 더함

  document.cookie = name + "=" + escape(value) + "; expires=" + today.toGMTString();
}

export function getCookie(name) {
  var cookie = document.cookie;

  if (document.cookie != "") {
    var cookie_array = cookie.split("; ");
    console.log(cookie_array);
    for (var index in cookie_array) {
      var cookie_name = cookie_array[index].split("=");
      if (cookie_name[0].indexOf(name) >= 0) {
        return cookie_name[1];
      }
    }
  }
  return;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
