<template>
  <div class="data_wrap">
    <div class="subdatabox">
      <h5>소스정보</h5>
      <ul class="t_form">
        <li>
          <div class="title"><span class="red">*</span> 유형선택</div>
          <div class="formbox">
            <v-radio-group
              v-model="fieldValues.genType"
              inline
              density="compact"
              class="mt-0 pt-0"
              @update:model-value="handleChangeField"
              hide-details
            >
              <v-radio
                v-for="item in comboItems.genType"
                :key="item"
                :label="item"
                :value="item"
                color="primary"
                density="compact"
              ></v-radio>
            </v-radio-group>
          </div>
        </li>
        <li>
          <div class="title"><span class="red">*</span> 참조모듈선택</div>
          <div class="formbox">
            <v-select
              v-model="fieldValues.referModule"
              :items="moduleItems"
              :item-title="fieldValues.genType === 'backend' ? 'title' : 'name'"
              :item-value="fieldValues.genType === 'backend' ? 'path' : 'path'"
              label="모듈 선택"
              variant="outlined"
              density="compact"
              hide-details
              style="width: 300px"
              @update:model-value="handleModuleChange"
              return-object
            ></v-select>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { useAxiosWithAuthorization } from '@/utils/api';
import { Toast } from '@/components/Confirm/swal';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { Authorization } = storeToRefs(appStore);

const initItem = {
  genType: 'backend',
  referModule: null
};

const comboItems = {
  genType: ['backend', 'frontend']
};

const fieldValues = ref(initItem);
const moduleItems = ref([]);

const searchModules = async () => {
  try {
    if (fieldValues.value.genType === 'backend') {
      // Backend 모듈 검색 - 하드코딩된 목록 사용
      const backendModules = [
        { name: 'auth', path: 'kr/co/dysnt/framework/common/auth' },
        { name: 'bean', path: 'kr/co/dysnt/framework/common/bean' },
        { name: 'code', path: 'kr/co/dysnt/framework/common/code' },
        { name: 'group', path: 'kr/co/dysnt/framework/common/group' },
        { name: 'handler', path: 'kr/co/dysnt/framework/common/handler' },
        { name: 'menu', path: 'kr/co/dysnt/framework/common/menu' },
        { name: 'provider', path: 'kr/co/dysnt/framework/common/provider' },
        { name: 'user', path: 'kr/co/dysnt/framework/common/user' },
        { name: 'util', path: 'kr/co/dysnt/framework/common/util' }
      ];

      moduleItems.value = backendModules
        .filter(module => !['controller', 'service', 'dao'].includes(module.name))
        .map(module => ({
          title: module.name,
          path: module.path
        }));
    } else {
      // Frontend 모듈 검색
      if (!Authorization.value) {
        Toast.fire({
          icon: 'error',
          title: '인증 토큰이 없습니다. 다시 로그인해주세요.'
        });
        return;
      }

      const { state, fetch } = useAxiosWithAuthorization(
        {
          url: '/common/file/listDirectories',
          method: 'GET',
          params: {
            path: 'frontend/src/pages/Common'
          }
        },
        { autoFetch: false }
      );

      await fetch();

      console.log('API Response:', state.value);

      if (state.value.data?.status === 'success' && state.value.data?.data) {
        moduleItems.value = state.value.data.data
          .filter(dir => !dir.startsWith('.'))
          .map(dir => ({
            name: dir,
            path: `src/pages/Common/${dir}`
          }));
      } else {
        moduleItems.value = [];
        const errorMessage = state.value.data?.message || '디렉토리 목록을 가져오는데 실패했습니다.';
        Toast.fire({
          icon: 'error',
          title: errorMessage
        });
      }
    }
  } catch (error) {
    console.error('모듈 검색 중 오류 발생:', error);
    Toast.fire({
      icon: 'error',
      title: '디렉토리 목록을 가져오는데 실패했습니다.'
    });
    moduleItems.value = [];
  }
};

const handleChangeField = async (value) => {
  fieldValues.value.genType = value;
  fieldValues.value.referModule = null;
  await searchModules();
};

const handleModuleChange = (value) => {
  fieldValues.value.referModule = value;
};

onMounted(async () => {
  await searchModules();
  appStore.$patch();
});
</script>

<style scoped>
.red {
  color: red;
}
.data_wrap {
  margin: 10px;
}
.subdatabox {
  border: 1px solid #ddd;
  padding: 10px;
}
.subdatabox h5 {
  margin-bottom: 10px;
}
.t_form {
  list-style: none;
  padding: 0;
}
.title {
  width: 150px;
  padding: 5px;
}
.formbox {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
