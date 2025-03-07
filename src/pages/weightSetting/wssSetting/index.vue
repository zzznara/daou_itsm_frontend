b
<template>
  <ButtonBar :menuInfo="menuInfo" />
  <div class="flexible_contents_box2" style="max-width: 900px">
    <div class="databox" style="padding-right: 20px">
      <div class="scrollbox">
        <div class="subdatabox">
          <h5>계근대 공통설정</h5>
          <ul class="t_form">
            <li>
              <div class="title" style="width: 40%; text-align: left">
                5분 이내 재계근 방지
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                <component :is="buttonOnOffShow('fiveMinInSkip')" />
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                중복계근 방지
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                <component :is="buttonOnOffShow('dupSkip')" />
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                입고일-출하일 제한
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                <component :is="buttonOnOffShow('limitDtApply')" />
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                철근출하 허용오차 적용
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                <component :is="buttonOnOffShow('rebarMarginApply')" />
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                빌렛 허용오차 적용
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                <component :is="buttonOnOffShow('billetMarginApply')" />
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                계근대 방향설정 적용
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                <component :is="buttonOnOffShow('limitDirectionApply')" />
              </div>
            </li>
          </ul>
        </div>
        <div class="subdatabox" style="margin-top: 30px">
          <div style="display: flex; align-items: center">
            <h5>계근대 전체 철근출하 허용오차 설정</h5>
            <button
              class="btn_greystyle save"
              style="margin-left: 20px"
              @click="saveRebarSetting"
            >
              저장
            </button>
          </div>
          <ul class="t_form">
            <li>
              <div class="title" style="width: 40%; text-align: left">
                D10, D13
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                상한
                <input
                  v-model="fieldValues.rebar1013MaxPercent"
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="rebar1013MaxPercent"
                  @change="setChangeVal"
                />
                %<span style="margin: 0px 5px"> / </span>
                하한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="rebar1013MinPercent"
                  @change="setChangeVal"
                  v-model="fieldValues.rebar1013MinPercent"
                />
                %
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                D16, D19, D22, D25
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                상한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="rebar1625MaxPercent"
                  @change="setChangeVal"
                  v-model="fieldValues.rebar1625MaxPercent"
                />
                %<span style="margin: 0px 5px"> / </span>
                하한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="rebar1625MinPercent"
                  @change="setChangeVal"
                  v-model="fieldValues.rebar1625MinPercent"
                />
                %
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                D29, D32
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                상한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="rebar2932MaxPercent"
                  @change="setChangeVal"
                  v-model="fieldValues.rebar2932MaxPercent"
                />
                %<span style="margin: 0px 5px"> / </span>
                하한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="rebar2932MinPercent"
                  @change="setChangeVal"
                  v-model="fieldValues.rebar2932MinPercent"
                />
                %
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                승강기 레일
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                상한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="rebarRailMaxPercent"
                  @change="setChangeVal"
                  v-model="fieldValues.rebarRailMaxPercent"
                />
                %<span style="margin: 0px 5px"> / </span>
                하한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="rebarRailMinPercent"
                  @change="setChangeVal"
                  v-model="fieldValues.rebarRailMinPercent"
                />
                %
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                그 외
              </div>
              <div class="formbox" style="text-align: center; width: 60%">
                상한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="rebarEtcMaxPercent"
                  @change="setChangeVal"
                  v-model="fieldValues.rebarEtcMaxPercent"
                />
                %<span style="margin: 0px 5px"> / </span>
                하한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="rebarEtcMinPercent"
                  @change="setChangeVal"
                  v-model="fieldValues.rebarEtcMinPercent"
                />
                %
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="databox" style="padding-left: 20px; padding-right: 0px">
      <div class="scrollbox">
        <div class="subdatabox">
          <h5>계근대 방향설정</h5>
          <ul class="t_form">
            <li>
              <div
                class="title"
                style="
                  text-align: center;
                  width: 40%;
                  border-right: 1px solid #d0d6db;
                "
              ></div>
              <div
                class="title"
                style="
                  width: 30%;
                  text-align: center;
                  border-left: 0;
                  border-right: 0;
                  min-width: 100px;
                "
              >
                입차 방향 설정
              </div>
              <div
                class="title"
                style="
                  width: 30%;
                  text-align: center;
                  border-right: 0;
                  min-width: 100px;
                "
              >
                출차 방향 설정
              </div>
            </li>
            <li>
              <div class="title" style="text-align: left; width: 40%">
                1계근대 - 입차
              </div>
              <div
                class="formbox"
                style="
                  text-align: center;
                  width: 30%;
                  border-right: 1px solid #d0d6db;
                "
              >
                <component :is="buttonOnOffShow('wbrg14001010In')" />
              </div>
              <div class="formbox" style="text-align: center; width: 30%">
                <component :is="buttonOnOffShow('wbrg14001010Out')" />
              </div>
            </li>
            <li>
              <div class="title" style="text-align: left; width: 40%">
                1계근대 - 출차
              </div>
              <div
                class="formbox"
                style="
                  text-align: center;
                  width: 30%;
                  border-right: 1px solid #d0d6db;
                "
              >
                <component :is="buttonOnOffShow('wbrg14001020In')" />
              </div>
              <div class="formbox" style="text-align: center; width: 30%">
                <component :is="buttonOnOffShow('wbrg14001020Out')" />
              </div>
            </li>
            <li>
              <div class="title" style="text-align: left; width: 40%">
                2계근대 - 입차
              </div>
              <div
                class="formbox"
                style="
                  text-align: center;
                  width: 30%;
                  border-right: 1px solid #d0d6db;
                "
              >
                <component :is="buttonOnOffShow('wbrg14002010In')" />
              </div>
              <div class="formbox" style="text-align: center; width: 30%">
                <component :is="buttonOnOffShow('wbrg14002010Out')" />
              </div>
            </li>
            <li>
              <div class="title" style="text-align: left; width: 40%">
                2계근대 - 출차
              </div>
              <div
                class="formbox"
                style="
                  text-align: center;
                  width: 30%;
                  border-right: 1px solid #d0d6db;
                "
              >
                <component :is="buttonOnOffShow('wbrg14002020In')" />
              </div>
              <div class="formbox" style="text-align: center; width: 30%">
                <component :is="buttonOnOffShow('wbrg14002020Out')" />
              </div>
            </li>
          </ul>
        </div>
        <div class="subdatabox" style="margin-top: 70px">
          <div style="display: flex; align-items: center">
            <h5>계근대별 빌렛 허용오차 설정</h5>
            <button
              class="btn_greystyle save"
              style="margin-left: 20px"
              @click="saveBilletSetting"
            >
              저장
            </button>
          </div>
          <ul class="t_form">
            <li>
              <div class="title" style="width: 40%; text-align: left">
                1계근대 - 입차
              </div>
              <div class="formbox" style="text-align: center; width: 65%">
                상한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="billet14001010MaxKg"
                  @change="setChangeVal"
                  v-model="fieldValues.billet14001010MaxKg"
                />
                kg
                <span style="margin: 0px 5px"> / </span>
                하한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="billet14001010MinKg"
                  @change="setChangeVal"
                  v-model="fieldValues.billet14001010MinKg"
                />
                kg
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                1계근대 - 출차
              </div>
              <div class="formbox" style="text-align: center; width: 65%">
                상한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="billet14001020MaxKg"
                  @change="setChangeVal"
                  v-model="fieldValues.billet14001020MaxKg"
                />
                kg
                <span style="margin: 0px 5px"> / </span>
                하한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="billet14001020MinKg"
                  @change="setChangeVal"
                  v-model="fieldValues.billet14001020MinKg"
                />
                kg
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                2계근대 - 입차
              </div>
              <div class="formbox" style="text-align: center; width: 65%">
                상한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="billet14002010MaxKg"
                  @change="setChangeVal"
                  v-model="fieldValues.billet14002010MaxKg"
                />
                kg
                <span style="margin: 0px 5px"> / </span>
                하한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="billet14002010MinKg"
                  @change="setChangeVal"
                  v-model="fieldValues.billet14002010MinKg"
                />
                kg
              </div>
            </li>
            <li>
              <div class="title" style="width: 40%; text-align: left">
                2계근대 - 출차
              </div>
              <div class="formbox" style="text-align: center; width: 65%">
                상한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="billet14002020MaxKg"
                  @change="setChangeVal"
                  v-model="fieldValues.billet14002020MaxKg"
                />
                kg
                <span style="margin: 0px 5px"> / </span>
                하한
                <input
                  type="number"
                  class="ip2"
                  style="width: 55px; margin: 0px 5px"
                  name="billet14002020MinKg"
                  @change="setChangeVal"
                  v-model="fieldValues.billet14002020MinKg"
                />
                kg
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, h, onMounted, ref } from "vue";
import ButtonBar from "@/components/ButtonBar/index.vue";

// import useAppContext from "../../../utils/Reducers";
// import { useAxiosWithAuthorization } from "../../../utils/api";
// import { ModalConfirm } from "../../../components/Confirm";

const menuInfo = ref({
  menuNmKor: "계근대설정",
  menuAuth: {
    searchAuthYn: "Y",
    newAuthYn: "Y",
    delAuthYn: "Y",
    saveAuthYn: "Y",
    excelAuthYn: "Y",
    printAuthYn: "N",
  },
});
const state = ref("normaled");

const userInfo = ref({
  userId: "",
  systemCd: "",
});

const fieldValues = ref({
  fiveMinInSkip: "Y", //5분 이내 재계근 방지
  dupSkip: "", //중복계근 방지
  limitDtApply: "", //입고일-출하일 제한
  rebarMarginApply: "", //철근출하 허용오차 적용
  billetMarginApply: "", //빌렛 허용오차 적용
  limitDirectionApply: "", //계근대 방향설정 적용
  wbrg14001010In: "", //정문 1계근대 입차 - 입차방향 설정
  wbrg14001010Out: "", //정문 1계근대 입차 - 출차방향 설정
  wbrg14001020In: "", //정문 1계근대 출차 - 입차방향 설정
  wbrg14001020Out: "", //정문 1계근대 출차 - 출차방향 설정
  wbrg14002010In: "", //후문 2계근대 입차 - 입차방향 설정
  wbrg14002010Out: "", //후문 2계근대 입차 - 출차방향 설정
  wbrg14002020In: "", //후문 2계근대 출차 - 입차방향 설정
  wbrg14002020Out: "", //후문 2계근대 출차 - 출차방향 설정
  rebar1013MaxPercent: "", //철근출하 허용오차 상한 퍼센트 - D10,D13
  rebar1625MaxPercent: "", //철근출하 허용오차 상한 퍼센트 - D16,D19,D22,D25
  rebar2932MaxPercent: "", //철근출하 허용오차 상한 퍼센트 - D29,D32
  rebar1013MinPercent: "", //철근출하 허용오차 하한 퍼센트 - D10,D13
  rebar1625MinPercent: "", //철근출하 허용오차 하한 퍼센트 - D16,D19,D22,D25
  rebar2932MinPercent: "", //철근출하 허용오차 하한 퍼센트 - D29,D32
  rebarRailMaxPercent: "", //철근출하 허용오차 상한 퍼센트 - 승강기 레일
  rebarRailMinPercent: "", //철근출하 허용오차 하한 퍼센트 - 승강기 레일
  rebarEtcMaxPercent: "", //철근출하 허용오차 상한 퍼센트 - 기타
  rebarEtcMinPercent: "", //철근출하 허용오차 하한 퍼센트 - 기타
  billet14001010MaxKg: "", //빌렛 허용오차 상한 KG - 정문 1계근대 입차
  billet14001010MinKg: "", //빌렛 허용오차 하한 KG - 정문 1계근대 입차
  billet14001020MaxKg: "", //빌렛 허용오차 상한 KG - 정문 1계근대 출차
  billet14001020MinKg: "", //빌렛 허용오차 하한 KG - 정문 1계근대 출차
  billet14002010MaxKg: "", //빌렛 허용오차 상한 KG - 후문 2계근대 입차
  billet14002010MinKg: "", //빌렛 허용오차 하한 KG - 후문 2계근대 입차
  billet14002020MaxKg: "", //빌렛 허용오차 상한 KG - 후문 2계근대 출차
  billet14002020MinKg: "", //빌렛 허용오차 하한 KG - 후문 2계근대 출차
});

const SEARCH_COMMON_SETTING_URL =
  "/weightsetting/wssSetting/SearchCommonSettings";
const SEARCH_DIRECTION_SETTING_URL =
  "/weightsetting/wssSetting/SearchWeighbridgeDirections";
const SEARCH_ERR_RANGE_SETTING_URL =
  "/weightsetting/wssSetting/SearchWeightBrigdeAllowErrRangeSettings";
const SEARCH_BILLET_ERR_RANGE_SETTING_URL =
  "/weightsetting/wssSetting/SearchWeightBrigdeBilletAllowErrRangeSettings";
//
const SAVE_SINGLE_SETTING_URL = "/weightsetting/wssSetting/saveSingleSetting";
const SAVE_COMMON_SETTING_URL = "/weightsetting/wssSetting/saveCommonSettings";
const SAVE_DIRECTION_SETTING_URL =
  "/weightsetting/wssSetting/saveWeighbridgeDirections";
const SAVE_REBAR_ERR_RANGE_SETTING_URL =
  "/weightsetting/wssSetting/saveWeightBrigdeAllowErrRangeSettings";
const SAVE_BILLET_ERR_RANGE_SETTING_URL =
  "/weightsetting/wssSetting/saveWeightBrigdeBilletAllowErrRangeSettings";

// const [, fetchCommonData] = useAxiosWithAuthorization(
//   {
//     url: SEARCH_COMMON_SETTING_URL,
//   },
//   { manual: true }
// );

// const [, fetchDirectionData] = useAxiosWithAuthorization(
//   {
//     url: SEARCH_DIRECTION_SETTING_URL,
//   },
//   { manual: true }
// );

// const [, fetchErrRangeData] = useAxiosWithAuthorization(
//   {
//     url: SEARCH_ERR_RANGE_SETTING_URL,
//   },
//   { manual: true }
// );

// const [, fetchBilletErrRangeData] = useAxiosWithAuthorization(
//   {
//     url: SEARCH_BILLET_ERR_RANGE_SETTING_URL,
//   },
//   { manual: true }
// );

// const [, fetchSettingSave] = useAxiosWithAuthorization(
//   {
//     url: SAVE_SINGLE_SETTING_URL,
//   },
//   { manual: true }
// );

const myGrid = ref();
const handleCommonSearch = async (setObj) => {
  // const {
  //   data: { data },
  // } = await fetchCommonData({
  //   url: SEARCH_COMMON_SETTING_URL,
  //   params: {},
  // });
  // let fiveMinInSkip = "";
  // let dupSkip = "";
  // let billetMarginApply = "";
  // let limitDirectionApply = "";
  // let limitDtApply = "";
  // let rebarMarginApply = "";
  // for (let i = 0; i < data.length; i++) {
  //   switch (data[i].setCd) {
  //     case "5MIN_IN_SKIP":
  //       fiveMinInSkip = data[i].setVal;
  //       break;
  //     case "DUP_SKIP":
  //       dupSkip = data[i].setVal;
  //       break;
  //     case "BILLET_MARGIN_APPLY":
  //       billetMarginApply = data[i].setVal;
  //       break;
  //     case "LIMIT_DIRECTION_APPLY":
  //       limitDirectionApply = data[i].setVal;
  //       break;
  //     case "LIMIT_DT_APPLY":
  //       limitDtApply = data[i].setVal;
  //       break;
  //     case "REBAR_MARGIN_APPLY":
  //       rebarMarginApply = data[i].setVal;
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // if (setObj === undefined) {
  //   setFieldValues({
  //     ...fieldValues,
  //     fiveMinInSkip: fiveMinInSkip,
  //     dupSkip: dupSkip,
  //     billetMarginApply: billetMarginApply,
  //     limitDirectionApply: limitDirectionApply,
  //     limitDtApply: limitDtApply,
  //     rebarMarginApply: rebarMarginApply,
  //   });
  //   return Promise.resolve();
  // } else {
  //   setObj.fiveMinInSkip = fiveMinInSkip;
  //   setObj.dupSkip = dupSkip;
  //   setObj.billetMarginApply = billetMarginApply;
  //   setObj.limitDirectionApply = limitDirectionApply;
  //   setObj.limitDtApply = limitDtApply;
  //   setObj.rebarMarginApply = rebarMarginApply;
  //   return Promise.resolve(setObj);
  // }
};

const handleDirectionSearch = async (setObj) => {
  // const {
  //   data: { data },
  // } = await fetchDirectionData({
  //   url: SEARCH_DIRECTION_SETTING_URL,
  //   params: {},
  // });
  // let wbrg14001010In = "";
  // let wbrg14001010Out = "";
  // let wbrg14001020In = "";
  // let wbrg14001020Out = "";
  // let wbrg14002010In = "";
  // let wbrg14002010Out = "";
  // let wbrg14002020In = "";
  // let wbrg14002020Out = "";
  // for (let i = 0; i < data.length; i++) {
  //   switch (data[i].setCd) {
  //     case "WBRG_14001010_IN": //정문 1계근대 입차 - 입차방향 설정
  //       wbrg14001010In = data[i].setVal;
  //       break;
  //     case "WBRG_14001010_OUT": //정문 1계근대 입차 - 출차방향 설정
  //       wbrg14001010Out = data[i].setVal;
  //       break;
  //     case "WBRG_14001020_IN": //정문 1계근대 출차 - 입차방향 설정
  //       wbrg14001020In = data[i].setVal;
  //       break;
  //     case "WBRG_14001020_OUT": //정문 1계근대 출차 - 출차방향 설정
  //       wbrg14001020Out = data[i].setVal;
  //       break;
  //     case "WBRG_14002010_IN": //후문 2계근대 입차 - 입차방향 설정
  //       wbrg14002010In = data[i].setVal;
  //       break;
  //     case "WBRG_14002010_OUT": //후문 2계근대 입차 - 출차방향 설정
  //       wbrg14002010Out = data[i].setVal;
  //       break;
  //     case "WBRG_14002020_IN": //후문 2계근대 출차 - 입차방향 설정
  //       wbrg14002020In = data[i].setVal;
  //       break;
  //     case "WBRG_14002020_OUT": //후문 2계근대 출차 - 출차방향 설정
  //       wbrg14002020Out = data[i].setVal;
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // if (setObj === undefined) {
  //   setFieldValues({
  //     ...fieldValues,
  //     wbrg14001010In: wbrg14001010In,
  //     wbrg14001010Out: wbrg14001010Out,
  //     wbrg14001020In: wbrg14001020In,
  //     wbrg14001020Out: wbrg14001020Out,
  //     wbrg14002010In: wbrg14002010In,
  //     wbrg14002010Out: wbrg14002010Out,
  //     wbrg14002020In: wbrg14002020In,
  //     wbrg14002020Out: wbrg14002020Out,
  //   });
  //   return Promise.resolve();
  // } else {
  //   setObj.wbrg14001010In = wbrg14001010In;
  //   setObj.wbrg14001010Out = wbrg14001010Out;
  //   setObj.wbrg14001020In = wbrg14001020In;
  //   setObj.wbrg14001020Out = wbrg14001020Out;
  //   setObj.wbrg14002010In = wbrg14002010In;
  //   setObj.wbrg14002010Out = wbrg14002010Out;
  //   setObj.wbrg14002020In = wbrg14002020In;
  //   setObj.wbrg14002020Out = wbrg14002020Out;
  //   return Promise.resolve(setObj);
  // }
};

const handleRebarErrRangeSearch = async (setObj) => {
  // const {
  //   data: { data },
  // } = await fetchErrRangeData({
  //   url: SEARCH_ERR_RANGE_SETTING_URL,
  //   params: {},
  // });
  // let rebar1013MaxPercent = "";
  // let rebar1013MinPercent = "";
  // let rebar1625MaxPercent = "";
  // let rebar1625MinPercent = "";
  // let rebar2932MaxPercent = "";
  // let rebar2932MinPercent = "";
  // let rebarRailMaxPercent = "";
  // let rebarRailMinPercent = "";
  // let rebarEtcMaxPercent = "";
  // let rebarEtcMinPercent = "";
  // for (let i = 0; i < data.length; i++) {
  //   switch (data[i].setCd) {
  //     case "REBAR_1013_MAX_PERCENT": //철근출하 허용오차 상한 퍼센트 - D10,D13
  //       rebar1013MaxPercent = data[i].setVal;
  //       break;
  //     case "REBAR_1013_MIN_PERCENT": //철근출하 허용오차 하한 퍼센트 - D10,D13
  //       rebar1013MinPercent = data[i].setVal;
  //       break;
  //     case "REBAR_1625_MAX_PERCENT": //철근출하 허용오차 상한 퍼센트 - D16,D19,D22,D25
  //       rebar1625MaxPercent = data[i].setVal;
  //       break;
  //     case "REBAR_1625_MIN_PERCENT": //철근출하 허용오차 하한 퍼센트 - D16,D19,D22,D25
  //       rebar1625MinPercent = data[i].setVal;
  //       break;
  //     case "REBAR_2932_MAX_PERCENT": //철근출하 허용오차 상한 퍼센트 - D29,D32
  //       rebar2932MaxPercent = data[i].setVal;
  //       break;
  //     case "REBAR_2932_MIN_PERCENT": //철근출하 허용오차 하한 퍼센트 - D29,D32
  //       rebar2932MinPercent = data[i].setVal;
  //       break;
  //     case "REBAR_RAIL_MAX_PERCENT": //철근출하 허용오차 상한 퍼센트 - 승강기 레일
  //       rebarRailMaxPercent = data[i].setVal;
  //       break;
  //     case "REBAR_RAIL_MIN_PERCENT": //철근출하 허용오차 하한 퍼센트 - 승강기 레일
  //       rebarRailMinPercent = data[i].setVal;
  //       break;
  //     case "REBAR_ETC_MAX_PERCENT": //철근출하 허용오차 상한 퍼센트 - 기타
  //       rebarEtcMaxPercent = data[i].setVal;
  //       break;
  //     case "REBAR_ETC_MIN_PERCENT": //철근출하 허용오차 하한 퍼센트 - 기타
  //       rebarEtcMinPercent = data[i].setVal;
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // if (setObj === undefined) {
  //   setFieldValues({
  //     ...fieldValues,
  //     rebar1013MaxPercent: rebar1013MaxPercent,
  //     rebar1013MinPercent: rebar1013MinPercent,
  //     rebar1625MaxPercent: rebar1625MaxPercent,
  //     rebar1625MinPercent: rebar1625MinPercent,
  //     rebar2932MaxPercent: rebar2932MaxPercent,
  //     rebar2932MinPercent: rebar2932MinPercent,
  //     rebarRailMaxPercent: rebarRailMaxPercent,
  //     rebarRailMinPercent: rebarRailMinPercent,
  //     rebarEtcMaxPercent: rebarEtcMaxPercent,
  //     rebarEtcMinPercent: rebarEtcMinPercent,
  //   });
  //   return Promise.resolve();
  // } else {
  //   setObj.rebar1013MaxPercent = rebar1013MaxPercent;
  //   setObj.rebar1013MinPercent = rebar1013MinPercent;
  //   setObj.rebar1625MaxPercent = rebar1625MaxPercent;
  //   setObj.rebar1625MinPercent = rebar1625MinPercent;
  //   setObj.rebar2932MaxPercent = rebar2932MaxPercent;
  //   setObj.rebar2932MinPercent = rebar2932MinPercent;
  //   setObj.rebarRailMaxPercent = rebarRailMaxPercent;
  //   setObj.rebarRailMinPercent = rebarRailMinPercent;
  //   setObj.rebarEtcMaxPercent = rebarEtcMaxPercent;
  //   setObj.rebarEtcMinPercent = rebarEtcMinPercent;
  //   return Promise.resolve(setObj);
  // }
};

const handleBilletErrRangeSearch = async (setObj) => {
  // const {
  //   data: { data },
  // } = await fetchBilletErrRangeData({
  //   url: SEARCH_BILLET_ERR_RANGE_SETTING_URL,
  //   params: {},
  // });
  // let billet14001010MaxKg = "";
  // let billet14001010MinKg = "";
  // let billet14001020MaxKg = "";
  // let billet14001020MinKg = "";
  // let billet14002010MaxKg = "";
  // let billet14002010MinKg = "";
  // let billet14002020MaxKg = "";
  // let billet14002020MinKg = "";
  // for (let i = 0; i < data.length; i++) {
  //   switch (data[i].setCd) {
  //     case "BILLET_14001010_MAX_KG": //빌렛 허용오차 상한 KG - 정문 1계근대 입차
  //       billet14001010MaxKg = data[i].setVal;
  //       break;
  //     case "BILLET_14001010_MIN_KG": //빌렛 허용오차 하한 KG - 정문 1계근대 입차
  //       billet14001010MinKg = data[i].setVal;
  //       break;
  //     case "BILLET_14001020_MAX_KG": //빌렛 허용오차 상한 KG - 정문 1계근대 출차
  //       billet14001020MaxKg = data[i].setVal;
  //       break;
  //     case "BILLET_14001020_MIN_KG": //빌렛 허용오차 하한 KG - 정문 1계근대 출차
  //       billet14001020MinKg = data[i].setVal;
  //       break;
  //     case "BILLET_14002010_MAX_KG": //빌렛 허용오차 상한 KG - 후문 2계근대 입차
  //       billet14002010MaxKg = data[i].setVal;
  //       break;
  //     case "BILLET_14002010_MIN_KG": //빌렛 허용오차 하한 KG - 후문 2계근대 입차
  //       billet14002010MinKg = data[i].setVal;
  //       break;
  //     case "BILLET_14002020_MAX_KG": //빌렛 허용오차 상한 KG - 후문 2계근대 출차
  //       billet14002020MaxKg = data[i].setVal;
  //       break;
  //     case "BILLET_14002020_MIN_KG": //빌렛 허용오차 하한 KG - 후문 2계근대 출차
  //       billet14002020MinKg = data[i].setVal;
  //       break;
  //     default:
  //       break;
  //   }
  // }
  // if (setObj === undefined) {
  //   setFieldValues({
  //     ...fieldValues,
  //     billet14001010MaxKg: billet14001010MaxKg,
  //     billet14001010MinKg: billet14001010MinKg,
  //     billet14001020MaxKg: billet14001020MaxKg,
  //     billet14001020MinKg: billet14001020MinKg,
  //     billet14002010MaxKg: billet14002010MaxKg,
  //     billet14002010MinKg: billet14002010MinKg,
  //     billet14002020MaxKg: billet14002020MaxKg,
  //     billet14002020MinKg: billet14002020MinKg,
  //   });
  //   return Promise.resolve();
  // } else {
  //   setObj.billet14001010MaxKg = billet14001010MaxKg;
  //   setObj.billet14001010MinKg = billet14001010MinKg;
  //   setObj.billet14001020MaxKg = billet14001020MaxKg;
  //   setObj.billet14001020MinKg = billet14001020MinKg;
  //   setObj.billet14002010MaxKg = billet14002010MaxKg;
  //   setObj.billet14002010MinKg = billet14002010MinKg;
  //   setObj.billet14002020MaxKg = billet14002020MaxKg;
  //   setObj.billet14002020MinKg = billet14002020MinKg;
  //   return Promise.resolve(setObj);
  // }
};

onMounted(() => {
  // let setObj = Object.create(null);
  // //각각의 셋팅별 조회 함수에서 setFieldValues 호출시 타이밍 차이로 인해 데이터가 꼬여서 Promise 사용으로 구현
  // handleCommonSearch(setObj).then((afterSetObj) => {
  //   handleDirectionSearch(afterSetObj).then((afterSetObj) => {
  //     handleRebarErrRangeSearch(afterSetObj).then((afterSetObj) => {
  //       handleBilletErrRangeSearch(afterSetObj).then((afterSetObj) => {
  //         setFieldValues({
  //           fiveMinInSkip: afterSetObj.fiveMinInSkip,
  //           dupSkip: afterSetObj.dupSkip,
  //           billetMarginApply: afterSetObj.billetMarginApply,
  //           limitDirectionApply: afterSetObj.limitDirectionApply,
  //           limitDtApply: afterSetObj.limitDtApply,
  //           rebarMarginApply: afterSetObj.rebarMarginApply,
  //           //
  //           wbrg14001010In: afterSetObj.wbrg14001010In,
  //           wbrg14001010Out: afterSetObj.wbrg14001010Out,
  //           wbrg14001020In: afterSetObj.wbrg14001020In,
  //           wbrg14001020Out: afterSetObj.wbrg14001020Out,
  //           wbrg14002010In: afterSetObj.wbrg14002010In,
  //           wbrg14002010Out: afterSetObj.wbrg14002010Out,
  //           wbrg14002020In: afterSetObj.wbrg14002020In,
  //           wbrg14002020Out: afterSetObj.wbrg14002020Out,
  //           //
  //           rebar1013MaxPercent: afterSetObj.rebar1013MaxPercent,
  //           rebar1013MinPercent: afterSetObj.rebar1013MinPercent,
  //           rebar1625MaxPercent: afterSetObj.rebar1625MaxPercent,
  //           rebar1625MinPercent: afterSetObj.rebar1625MinPercent,
  //           rebar2932MaxPercent: afterSetObj.rebar2932MaxPercent,
  //           rebar2932MinPercent: afterSetObj.rebar2932MinPercent,
  //           rebarRailMaxPercent: afterSetObj.rebarRailMaxPercent,
  //           rebarRailMinPercent: afterSetObj.rebarRailMinPercent,
  //           rebarEtcMaxPercent: afterSetObj.rebarEtcMaxPercent,
  //           rebarEtcMinPercent: afterSetObj.rebarEtcMinPercent,
  //           //
  //           billet14001010MaxKg: afterSetObj.billet14001010MaxKg,
  //           billet14001010MinKg: afterSetObj.billet14001010MinKg,
  //           billet14001020MaxKg: afterSetObj.billet14001020MaxKg,
  //           billet14001020MinKg: afterSetObj.billet14001020MinKg,
  //           billet14002010MaxKg: afterSetObj.billet14002010MaxKg,
  //           billet14002010MinKg: afterSetObj.billet14002010MinKg,
  //           billet14002020MaxKg: afterSetObj.billet14002020MaxKg,
  //           billet14002020MinKg: afterSetObj.billet14002020MinKg,
  //         });
  //       }); //계근대별 빌렛 허용오차 설정 조회
  //     }); //계근대 전체 철근출하 허용오차 설정 조회
  //   }); //계근대 방향설정 조회
  // }); //계근대 공통설정 조회
});

// onMounted(() => {
//   console.log("change fieldValus");
// }, [fieldValues]);

const buttonOnOffShow = (keyName) => {
  let buttonTag = "";

  if (fieldValues.value[keyName] === "Y") {
    buttonTag = h(
      "button",
      {
        class: "btn_greystyle1",
        style: { minWidth: "60px" },
        onClick: () => setOnOff(keyName, "N"),
      },
      "On"
    );
  } else {
    buttonTag = h(
      "button",
      {
        class: "btn_greystyle",
        style: { minWidth: "60px" },
        onClick: () => setOnOff(keyName, "Y"),
      },
      "Off"
    );
  }
  return buttonTag;
};

const setOnOff = (keyName, yn) => {
  // let setCd = "";
  // switch (keyName) {
  //   case "fiveMinInSkip":
  //     setFieldValues({
  //       ...fieldValues,
  //       fiveMinInSkip: yn,
  //     });
  //     setCd = "5MIN_IN_SKIP";
  //     break;
  //   case "dupSkip":
  //     setFieldValues({
  //       ...fieldValues,
  //       dupSkip: yn,
  //     });
  //     setCd = "DUP_SKIP";
  //     break;
  //   case "limitDtApply":
  //     setFieldValues({
  //       ...fieldValues,
  //       limitDtApply: yn,
  //     });
  //     setCd = "LIMIT_DT_APPLY";
  //     break;
  //   case "rebarMarginApply":
  //     setFieldValues({
  //       ...fieldValues,
  //       rebarMarginApply: yn,
  //     });
  //     setCd = "REBAR_MARGIN_APPLY";
  //     break;
  //   case "billetMarginApply":
  //     setFieldValues({
  //       ...fieldValues,
  //       billetMarginApply: yn,
  //     });
  //     setCd = "BILLET_MARGIN_APPLY";
  //     break;
  //   case "limitDirectionApply":
  //     setFieldValues({
  //       ...fieldValues,
  //       limitDirectionApply: yn,
  //     });
  //     setCd = "LIMIT_DIRECTION_APPLY";
  //     break;
  //   case "wbrg14001010In":
  //     if (yn === "Y") {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14001010In: yn,
  //         wbrg14001010Out: "N",
  //         wbrg14001020In: "N",
  //         wbrg14001020Out: "Y",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14001010_IN", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14001010_OUT", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_OUT", setVal: "Y", sysMenuId: menuKey },
  //       ];
  //     } else {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14001010In: yn,
  //         wbrg14001010Out: "Y",
  //         wbrg14001020In: "Y",
  //         wbrg14001020Out: "N",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14001010_IN", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14001010_OUT", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_OUT", setVal: "N", sysMenuId: menuKey },
  //       ];
  //     }
  //     break;
  //   case "wbrg14001010Out":
  //     if (yn === "Y") {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14001010In: "N",
  //         wbrg14001010Out: yn,
  //         wbrg14001020In: "Y",
  //         wbrg14001020Out: "N",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14001010_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001010_OUT", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_OUT", setVal: "N", sysMenuId: menuKey },
  //       ];
  //     } else {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14001010In: "Y",
  //         wbrg14001010Out: yn,
  //         wbrg14001020In: "N",
  //         wbrg14001020Out: "Y",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14001010_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001010_OUT", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_OUT", setVal: "Y", sysMenuId: menuKey },
  //       ];
  //     }
  //     break;
  //   case "wbrg14001020In":
  //     if (yn === "Y") {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14001010In: "N",
  //         wbrg14001010Out: "Y",
  //         wbrg14001020In: yn,
  //         wbrg14001020Out: "N",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14001010_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001010_OUT", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_IN", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_OUT", setVal: "N", sysMenuId: menuKey },
  //       ];
  //     } else {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14001010In: "Y",
  //         wbrg14001010Out: "N",
  //         wbrg14001020In: yn,
  //         wbrg14001020Out: "Y",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14001010_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001010_OUT", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_IN", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_OUT", setVal: "Y", sysMenuId: menuKey },
  //       ];
  //     }
  //     break;
  //   case "wbrg14001020Out":
  //     if (yn === "Y") {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14001010In: "Y",
  //         wbrg14001010Out: "N",
  //         wbrg14001020In: "N",
  //         wbrg14001020Out: yn,
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14001010_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001010_OUT", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_OUT", setVal: yn, sysMenuId: menuKey },
  //       ];
  //     } else {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14001010In: "N",
  //         wbrg14001010Out: "Y",
  //         wbrg14001020In: "Y",
  //         wbrg14001020Out: yn,
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14001010_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001010_OUT", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14001020_OUT", setVal: yn, sysMenuId: menuKey },
  //       ];
  //     }
  //     break;
  //   case "wbrg14002010In":
  //     if (yn === "Y") {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14002010In: yn,
  //         wbrg14002010Out: "N",
  //         wbrg14002020In: "N",
  //         wbrg14002020Out: "Y",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14002010_IN", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14002010_OUT", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_OUT", setVal: "Y", sysMenuId: menuKey },
  //       ];
  //     } else {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14002010In: yn,
  //         wbrg14002010Out: "Y",
  //         wbrg14002020In: "Y",
  //         wbrg14002020Out: "N",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14002010_IN", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14002010_OUT", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_OUT", setVal: "N", sysMenuId: menuKey },
  //       ];
  //     }
  //     break;
  //   case "wbrg14002010Out":
  //     if (yn === "Y") {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14002010In: "N",
  //         wbrg14002010Out: yn,
  //         wbrg14002020In: "Y",
  //         wbrg14002020Out: "N",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14002010_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002010_OUT", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_OUT", setVal: "N", sysMenuId: menuKey },
  //       ];
  //     } else {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14002010In: "Y",
  //         wbrg14002010Out: yn,
  //         wbrg14002020In: "N",
  //         wbrg14002020Out: "Y",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14002010_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002010_OUT", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_OUT", setVal: "Y", sysMenuId: menuKey },
  //       ];
  //     }
  //     break;
  //   case "wbrg14002020In":
  //     if (yn === "Y") {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14002010In: "N",
  //         wbrg14002010Out: "Y",
  //         wbrg14002020In: yn,
  //         wbrg14002020Out: "N",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14002010_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002010_OUT", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_IN", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_OUT", setVal: "N", sysMenuId: menuKey },
  //       ];
  //     } else {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14002010In: "Y",
  //         wbrg14002010Out: "N",
  //         wbrg14002020In: yn,
  //         wbrg14002020Out: "Y",
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14002010_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002010_OUT", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_IN", setVal: yn, sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_OUT", setVal: "Y", sysMenuId: menuKey },
  //       ];
  //     }
  //     break;
  //   case "wbrg14002020Out":
  //     if (yn === "Y") {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14002010In: "Y",
  //         wbrg14002010Out: "N",
  //         wbrg14002020In: "N",
  //         wbrg14002020Out: yn,
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14002010_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002010_OUT", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_OUT", setVal: yn, sysMenuId: menuKey },
  //       ];
  //     } else {
  //       setFieldValues({
  //         ...fieldValues,
  //         wbrg14002010In: "N",
  //         wbrg14002010Out: "Y",
  //         wbrg14002020In: "Y",
  //         wbrg14002020Out: yn,
  //       });
  //       setCd = [
  //         { setCd: "WBRG_14002010_IN", setVal: "N", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002010_OUT", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_IN", setVal: "Y", sysMenuId: menuKey },
  //         { setCd: "WBRG_14002020_OUT", setVal: yn, sysMenuId: menuKey },
  //       ];
  //     }
  //     break;
  //   default:
  //     break;
  // }
  // if (
  //   keyName === "fiveMinInSkip" ||
  //   keyName === "dupSkip" ||
  //   keyName === "limitDtApply" ||
  //   keyName === "rebarMarginApply" ||
  //   keyName === "billetMarginApply" ||
  //   keyName === "limitDirectionApply"
  // ) {
  //   saveSingleSetting(setCd, yn);
  // } else {
  //   saveDirectionSetting(setCd);
  // }
};

const setChangeVal = (evt) => {
  // if (evt.target.value < 0) {
  //   ModalConfirm({
  //     title: "항목체크",
  //     description: "음수는 입력 할 수 없습니다",
  //     type: "alert",
  //   });
  //   return;
  // }
  // let copyMap = JSON.parse(JSON.stringify(fieldValues));
  // copyMap[evt.target.name] = evt.target.value;
  // setFieldValues(copyMap);
};

//계근대 공통설정 저장
const saveSingleSetting = async (setCd, yn) => {
  // let param = { setCd: setCd, setVal: yn, sysMenuId: menuKey };
  // const {
  //   data: { data },
  // } = fetchSettingSave({
  //   url: SAVE_SINGLE_SETTING_URL,
  //   data: param,
  //   method: "POST",
  // });
};

//계근대 방향설정
const saveDirectionSetting = async (setCd) => {
  // const {
  //   data: { data },
  // } = await fetchSettingSave({
  //   url: SAVE_DIRECTION_SETTING_URL,
  //   data: setCd,
  //   method: "POST",
  // });
};

//계근대 전체 철근출하 허용오차 설정
const saveRebarSetting = async () => {
  // if (
  //   await ModalConfirm({
  //     title: "저장",
  //     description: "데이터를 저장하시겠습니까?",
  //   })
  // ) {
  //   if (
  //     fieldValues.rebar1013MaxPercent === undefined ||
  //     fieldValues.rebar1013MaxPercent === "" ||
  //     fieldValues.rebar1013MinPercent === undefined ||
  //     fieldValues.rebar1013MinPercent === "" ||
  //     //
  //     fieldValues.rebar1625MaxPercent === undefined ||
  //     fieldValues.rebar1625MaxPercent === "" ||
  //     fieldValues.rebar1625MinPercent === undefined ||
  //     fieldValues.rebar1625MinPercent === "" ||
  //     //
  //     fieldValues.rebar2932MaxPercent === undefined ||
  //     fieldValues.rebar2932MaxPercent === "" ||
  //     fieldValues.rebar2932MinPercent === undefined ||
  //     fieldValues.rebar2932MinPercent === "" ||
  //     //
  //     fieldValues.rebarRailMaxPercent === undefined ||
  //     fieldValues.rebarRailMaxPercent === "" ||
  //     fieldValues.rebarRailMinPercent === undefined ||
  //     fieldValues.rebarRailMinPercent === "" ||
  //     //
  //     fieldValues.rebarEtcMaxPercent === undefined ||
  //     fieldValues.rebarEtcMaxPercent === "" ||
  //     fieldValues.rebarEtcMinPercent === undefined ||
  //     fieldValues.rebarEtcMinPercent === ""
  //   ) {
  //     ModalConfirm({
  //       title: "항목체크",
  //       description: "입력 할 항목의 값이 입력되었는지 확인해주세요",
  //       type: "alert",
  //     });
  //     return;
  //   }
  //   const {
  //     data: { data },
  //   } = await fetchSettingSave({
  //     url: SAVE_REBAR_ERR_RANGE_SETTING_URL,
  //     data: {
  //       rebar1013MaxPercent: fieldValues.rebar1013MaxPercent,
  //       rebar1013MinPercent: fieldValues.rebar1013MinPercent,
  //       rebar1625MaxPercent: fieldValues.rebar1625MaxPercent,
  //       rebar1625MinPercent: fieldValues.rebar1625MinPercent,
  //       rebar2932MaxPercent: fieldValues.rebar2932MaxPercent,
  //       rebar2932MinPercent: fieldValues.rebar2932MinPercent,
  //       rebarRailMaxPercent: fieldValues.rebarRailMaxPercent,
  //       rebarRailMinPercent: fieldValues.rebarRailMinPercent,
  //       rebarEtcMaxPercent: fieldValues.rebarEtcMaxPercent,
  //       rebarEtcMinPercent: fieldValues.rebarEtcMinPercent,
  //       sysMenuId: menuKey,
  //     },
  //     method: "POST",
  //   });
  // }
};

//계근대별 빌렛 허용오차 설정
const saveBilletSetting = async () => {
  // if (
  //   await ModalConfirm({
  //     title: "저장",
  //     description: "데이터를 저장하시겠습니까?",
  //   })
  // ) {
  //   if (
  //     fieldValues.billet14001010MaxKg === undefined ||
  //     fieldValues.billet14001010MaxKg === "" ||
  //     fieldValues.billet14001010MinKg === undefined ||
  //     fieldValues.billet14001010MinKg === "" ||
  //     //
  //     fieldValues.billet14001020MaxKg === undefined ||
  //     fieldValues.billet14001020MaxKg === "" ||
  //     fieldValues.billet14001020MinKg === undefined ||
  //     fieldValues.billet14001020MinKg === "" ||
  //     //
  //     fieldValues.billet14002010MaxKg === undefined ||
  //     fieldValues.billet14002010MaxKg === "" ||
  //     fieldValues.billet14002010MinKg === undefined ||
  //     fieldValues.billet14002010MinKg === "" ||
  //     //
  //     fieldValues.billet14002020MaxKg === undefined ||
  //     fieldValues.billet14002020MaxKg === "" ||
  //     fieldValues.billet14002020MinKg === undefined ||
  //     fieldValues.billet14002020MinKg === ""
  //   ) {
  //     ModalConfirm({
  //       title: "항목체크",
  //       description: "입력 할 항목의 값이 입력되었는지 확인해주세요",
  //       type: "alert",
  //     });
  //     return;
  //   }
  //   const {
  //     data: { data },
  //   } = await fetchSettingSave({
  //     url: SAVE_BILLET_ERR_RANGE_SETTING_URL,
  //     data: {
  //       billet14001010MaxKg: fieldValues.billet14001010MaxKg,
  //       billet14001010MinKg: fieldValues.billet14001010MinKg,
  //       billet14001020MaxKg: fieldValues.billet14001020MaxKg,
  //       billet14001020MinKg: fieldValues.billet14001020MinKg,
  //       billet14002010MaxKg: fieldValues.billet14002010MaxKg,
  //       billet14002010MinKg: fieldValues.billet14002010MinKg,
  //       billet14002020MaxKg: fieldValues.billet14002020MaxKg,
  //       billet14002020MinKg: fieldValues.billet14002020MinKg,
  //       sysMenuId: menuKey,
  //     },
  //     method: "POST",
  //   });
  // }
};
</script>
