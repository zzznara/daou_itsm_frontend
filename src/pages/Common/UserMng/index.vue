<!-- 사용자관리 -->
<template>
  <ButtonBar
    :menuInfo="menuInfo"
    :handleMasterSearch="handleMasterSearch"
    :handleMasterNew="handleMasterNew"
    :handleMasterDelete="handleMasterDelete"
    :handleMasterSave="handleMasterSave"
    :handleMasterExcel="handleMasterExcel"
  />
  <SearchBar :setSearchParameters="setSearchParameters" :systemCd="userInfo.systemCd" />

  <div class="grid_wrap">
    <AUIGrid
      ref="myGrid"
      :columnLayout="columnLayout"
      :gridProps="{
        ...defaultGridProps,
        // editable: true,
      }"
    />
  </div>

  <div class="data_wrap">
    <div class="subdatabox">
      <h5>사용자정보</h5>
      <ul class="t_form">
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>회사구분</div>
          <div class="formbox">
            <SelectBox
              id="systemCd"
              :value="fieldValues.systemCd"
              :name="'systemCd'"
              :mastCd="'SYSTEM_CD'"
              :topSelected="'선택'"
              :className="'ip2'"
              :disabled="isFieldDisabled(state, 'systemCd', disabledFields)"
              @onChage="handleChangeField"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>사용자아이디</div>
          <div class="formbox">
            <input
              id="userId"
              name="userId"
              :disabled="isFieldDisabled(state, 'userId', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.userId"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>암호</div>
          <div class="formbox">
            <input
              id="pwd"
              name="pwd"
              :disabled="isFieldDisabled(state, 'pwd', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.pwd"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>사원번호</div>
          <div class="formbox">
            <input
              id="empNo"
              name="empNo"
              :disabled="isFieldDisabled(state, 'empNo', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.empNo"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>성명_한글</div>
          <div class="formbox">
            <input
              id="nmKor"
              name="nmKor"
              :disabled="isFieldDisabled(state, 'nmKor', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.nmKor"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">성명_영문</div>
          <div class="formbox">
            <input
              id="nmEng"
              name="nmEng"
              :disabled="isFieldDisabled(state, 'nmEng', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.nmEng"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">성명_한자</div>
          <div class="formbox">
            <input
              id="nmChn"
              name="nmChn"
              :disabled="isFieldDisabled(state, 'nmChn', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.nmChn"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">이메일주소</div>
          <div class="formbox">
            <input
              id="email"
              name="email"
              :disabled="isFieldDisabled(state, 'email', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.email"
              class="ip2"
            />
          </div>
        </li>
        <li style="width: 50%">
          <div class="title">부서</div>
          <div class="ip_sup2">
            <div>
              <input
                id="dptCd"
                name="dptCd"
                disabled
                @input="handleChangeField"
                v-model="fieldValues.dptCd"
                class="ip2"
              />
            </div>
            <div>
              <input
                id="dptNm"
                name="dptNm"
                :disabled="isFieldDisabled(state, 'dptNm', disabledFields)"
                @input="handleChangeField"
                @keydown="setDeptInfoTxt"
                @blur="chkDeptData"
                v-model="fieldValues.dptNm"
                class="ip2"
              />
            </div>
            <div>
              <button
                type="button"
                :disabled="
                  isFieldDisabled(state, 'dptCd', disabledFields, fieldValues.isForceDisable)
                "
                @click="handleSearchDept"
                class="btn_ip"
              >
                검색
              </button>
            </div>
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">전화번호</div>
          <div class="formbox">
            <input
              id="telNo"
              name="telNo"
              :disabled="isFieldDisabled(state, 'telNo', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.telNo"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">모바일번호</div>
          <div class="formbox">
            <input
              id="mobileNo"
              name="mobileNo"
              :disabled="isFieldDisabled(state, 'mobileNo', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.mobileNo"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">직책코드</div>
          <div class="formbox">
            <input
              id="rsofCd"
              name="rsofCd"
              :disabled="isFieldDisabled(state, 'rsofCd', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.rsofCd"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">직책명</div>
          <div class="formbox">
            <input
              id="rsofNm"
              name="rsofNm"
              :disabled="isFieldDisabled(state, 'rsofNm', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.rsofNm"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">사업장코드</div>
          <div class="formbox">
            <input
              id="plbsCd"
              name="plbsCd"
              :disabled="isFieldDisabled(state, 'plbsCd', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.plbsCd"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">암호변경일</div>
          <div class="formbox">
            <input
              id="pwdChngDt"
              name="pwdChngDt"
              :disabled="true"
              @input="handleChangeField"
              v-model="fieldValues.pwdChngDt"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">성별</div>
          <div class="formbox">
            <SelectBox
              :mastCd="'GENDER'"
              id="gender"
              :name="'gender'"
              :topSelected="'전체'"
              :disabled="isFieldDisabled(state, 'gender', disabledFields)"
              :onChange="handleChangeField"
              :value="fieldValues.gender"
              :className="'ip2'"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title">입사일</div>
          <div class="formbox">
            <input
              type="date"
              id="etcoDt"
              name="etcoDt"
              :disabled="isFieldDisabled(state, 'etcoDt', disabledFields)"
              @input="handleChangeField"
              v-model="fieldValues.etcoDt"
              class="ip2"
            />
          </div>
        </li>
        <li class="doublehalf">
          <div class="title"><span class="red">*</span>사용여부</div>
          <div class="formbox">
            <SelectBox
              :mastCd="'USE_YN'"
              id="useYn"
              :name="'useYn'"
              :topSelected="'전체'"
              :disabled="isFieldDisabled(state, 'useYn', disabledFields)"
              :onChange="handleChangeField"
              :value="fieldValues.useYn"
              :className="'ip2'"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
  <DeptPopup
    v-model="deptPopup"
    :searchTxt="fieldValues.dptNm"
    :callbackFunc="setDeptInfo"
    :autoSelect="autoSelect"
    :failCallbackFunc="restoreDeptData"
    :handleClose="handleDeptPopupClose"
  ></DeptPopup>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";
import SearchBar from "./SearchBar.vue";
import AUIGrid from "@/static/AUIGrid-Vue.js/AUIGrid.vue";
import { columnLayout } from "./columnLayout";
import { defaultGridProps } from "../../../components/AuiGrid/gridLayout";
import {
  ajusta,
  getGridValidateCheck,
  isFieldDisabled,
  saveGridCheckData,
} from "@/utils/validators";
import DeptPopup from "@/components/Popup/DeptPop/index.vue";
import { useAppStore } from "@/stores/app";
import { storeToRefs } from "pinia";
import SelectBox from "@/components/SelectBox/index.vue";
import { useAxiosWithAuthorization } from "@/utils/api";
import { swalConfirm, Toast } from "@/components/Confirm/swal";
import { INITIAL_FIELD_RULES } from "./validateFields";

const deptPopup = ref(false);

const myGrid = ref();

const appStore = useAppStore();
const { menuList, menuActionList, menuKey, userInfo } = storeToRefs(appStore);

const menuInfo = ref({});

const state = ref("normaled");

//추가, 수정일때 항목의 disabled 결정
const disabledFields = {
  created: [],
  updated: ["systemCd", "userId"],
};
const autoSelect = ref(false);

const initItem = {
  systemCd: "",
  userId: "",
  empNo: "",
  nmKor: "",
  nmEng: "",
  nmChn: "",
  email: "",
  dptCd: "",
  dptNm: "",
  telNo: "",
  mobileNo: "",
  rsofCd: "",
  rsofNm: "",
  plbsCd: "",
  pwd: "",
  pwdChngDt: "",
  gender: "",
  etcoDt: "",
  useYn: "",
};

const fieldValues = ref(initItem);

const oldValues = ref({
  dptNm: "",
});

const primaryParameters = ref({
  menuId: "",
  menuNmKor: "",
});

const setSearchParameters = (values) => {
  primaryParameters.value = values;
};

//상차지 검색 URL
const SERARCH_USER_URL = "/common/user/searchUserList";
//상차지 저장 URL
const SAVE_USER_URL = "/common/user/saveUserList";

onMounted(async () => {
  await nextTick(); // DOM 업데이트를 보장
  const auiGrid = myGrid.value;
  auiGrid.resize("100%", "100%");

  auiGrid.bind("cellClick", function (event) {
    gridCellClick(event.item);
  });
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      menuInfo.value = element;
    }
  });
});

onBeforeMount(() => {
  menuActionList.value.find((element) => {
    if (element.menuId === menuKey.value) {
      menuInfo.value = element;
    }
  });
});

const updateGridData = (key, value) => {
  const auiGrid = myGrid.value;
  const items = auiGrid.getSelectedItems()[0];
  const item = items.item;
  item[key] = value;
  auiGrid.updateRow(item, "selectedIndex");
};

const gridCellClick = (item) => {
  // 추가 : editable, 수정 : edtiable, 삭제 : readonly
  //read
  //setFieldsEnabled(auiGrid, item, disabledFields);
  const auiGrid = myGrid.value;
  if (auiGrid.isAddedById(item._$uid)) {
    state.value = "created";
  } else if (auiGrid.isEditedById(item._$uid)) {
    state.value = "updated";
  } else if (auiGrid.isRemovedById(item._$uid)) {
    state.value = "deleted";
    //
  } else {
    state.value = "updated";
  }

  let initMap = {};
  for (var name in initItem) {
    initMap[name] = item[name];

    if (item[name] === undefined) {
      initMap[name] = "";
    }
  }

  fieldValues.value = initMap;
};
const handleMasterSearch = async () => {
  const { state, fetch } = useAxiosWithAuthorization(
    {
      url: SERARCH_USER_URL,
      params: primaryParameters.value,
    },
    { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
  );

  const auiGrid = myGrid.value;

  try {
    await fetch();
    if (state.value.data) {
      const data = state.value.data.data;
      // console.log("사용자관리 데이터: ", data);
      if (data.length !== 0) {
        auiGrid.showAjaxLoader();
        auiGrid.setGridData(data);
        fieldValues.value = initItem;
        auiGrid.removeAjaxLoader();
      }

      auiGrid.setGridData(data);
    } else {
      console.error("No data received");
    }
  } catch (error) {
    console.error("Error fetching menu list:", error);
  }
};

const handleMasterNew = () => {
  const auiGrid = myGrid.value;
  auiGrid.addRow(initItem, "last");
  fieldValues.value = initItem;
  const items = auiGrid.getSelectedItems()[0];

  gridCellClick(items.item);
};

const handleMasterDelete = () => {
  const auiGrid = myGrid.value;
  auiGrid.removeRow("selectedIndex");
};

const handleMasterSave = async () => {
  let yn = {
    title: "저장",
    description: "데이터를 저장하시겠습니까?",
    okBtn: "확인",
    cancelBtn: "닫기",
    res: "저장되었습니다.",
  };
  const auiGrid = myGrid.value;
  var items = auiGrid.getGridData();

  const result = getGridValidateCheck(auiGrid, items, INITIAL_FIELD_RULES);
  if (result.isValidate) {
    document.getElementsByName(result.column)[0].focus();
    Toast.fire({
      icon: "warning",
      title: "필수항목체크",
      text: result.message,
    });
    auiGrid.setSelectionByIndex(result.rowIndex);
    gridCellClick(result.rowItem);
    return;
  }
  swalConfirm(yn, async () => {
    const addItems = auiGrid.getAddedRowItems();
    const editItems = auiGrid.getEditedRowItems();
    const removeItems = auiGrid.getRemovedItems();
    const menuId = menuKey.value;
    let param = saveGridCheckData(addItems, editItems, removeItems, menuId);
    // console.log("사용자관리 저장 param : ", param);
    if (param.length > 0) {
      const { state, fetch } = useAxiosWithAuthorization(
        {
          url: SAVE_USER_URL,
          data: param,
          method: "POST",
        },
        { autoFetch: false } // 컴포넌트가 마운트되면 수동으로 호출
      );
      try {
        await fetch();

        if (state.value.data) {
          const data = state.value.data.data;

          handleMasterSearch();

          Toast.fire({
            icon: "success",
            title: "저장되었습니다.",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "저장오류",
            text: "저장오류",
          });
          console.error("No data received");
        }
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: "필수항목체크",
          text: "저장할 항목이 없습니다.",
        });
        console.error("Error fetching menu list:", error);
      }
      handleMasterSearch();
    }
  });
};

const handleChangeField = (event) => {
  const auiGrid = myGrid.value;
  const { name, value } = event.target;
  const items = auiGrid.getSelectedItems()[0];
  const item = items.item;

  if (name === "telNo" || name === "mobileNo") {
    //전화번호 관련 함수 정의
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(value)) {
      const phone = ajusta(value);
      item[name] = phone;
      fieldValues.value = { ...fieldValues.value, [name]: phone };
    }
  } else {
    item[name] = value;
    fieldValues.value = { ...fieldValues.value, [name]: value };
  }
  auiGrid.updateRow(item, "selectedIndex");
};

const handleMasterExcel = () => {
  const auiGrid = myGrid.value;
  auiGrid.exportToXlsx({
    fileName: menuInfo.value.menuNmKor + " 리스트",
  });
};

const handleSearchDept = () => {
  deptPopup.value = true;
};

const handleDeptPopupClose = () => {
  deptPopup.value = false;
};
const setDeptInfo = (deptInfo) => {
  //console.log(deptInfo);
  if (deptInfo !== undefined) {
    fieldValues.value = {
      ...fieldValues.value,
      dptCd: deptInfo.detlCd,
      dptNm: deptInfo.cdNmKor,
    };

    oldValues.value = { dptNm: deptInfo.cdNmKor };

    updateGridData("dptCd", deptInfo.detlCd);
    updateGridData("dptNm", deptInfo.cdNmKor);
  }
};

const setDeptInfoTxt = (evt) => {
  if (evt.keyCode === 13) {
    evt.target.blur();
  }
};

const chkDeptData = (evt) => {
  if (evt.target.value !== undefined && evt.target.value !== "") {
    autoSelect.value = true;
    deptPopup.value = true;
    // ModalDeptSearchPop({
    //   callbackFunc: setDeptInfo,
    //   searchTxt: evt.target.value,
    //   autoSelect: true,
    //   failCallbackFunc: restoreDeptData,
    // });
  }
};

const restoreDeptData = () => {
  fieldValues.value = { ...fieldValues, dptNm: oldValues.dptNm };
};
</script>

<style scoped></style>
