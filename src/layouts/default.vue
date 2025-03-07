<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer v-model="sidebar" :width="300" :disable-resize-watcher="true" permanent>
      <AppMenu />
    </v-navigation-drawer>
    <v-main>
      <AppHeader :sideBar="sidebar" @openSideBar="onOpenSideBar" />
      <v-container class="tab-content" style="min-height: 300px">
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import AppHeader from "@/components/Layout/AppHeader.vue";
import AppMenu from "@/components/Layout/AppMenu.vue";
import { onMounted, ref, watch } from "vue";

onMounted(() => {
  sidebar.value = true;
});
watch(history, () => {});
const sidebar = ref();

const onOpenSideBar = (e) => {
  sidebar.value = e;
};
</script>
