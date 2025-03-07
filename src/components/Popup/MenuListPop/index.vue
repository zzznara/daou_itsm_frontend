<template>
  <v-dialog class="sitemap" style="height: calc(100dvh - 20px); width: calc(100% - 600px)">
    <v-card>
      <v-card-title style="padding: 0px">
        <div style="padding: 2.3rem 0; width: 110%; background-color: #f2f4f7">
          <h4 style="margin-left: 2rem">{{ props.title }}</h4>
        </div>
      </v-card-title>
      <nav class="nav-box" style="padding-left: 0px; margin-top: 0px; margin-bottom: 0px">
        <ul class="gnb-nav" v-if="props.menuOriginList">
          <template v-for="item in props.menuOriginList.data">
            <li v-if="item.upperMenuId !== null && item.menuLvl === 1">
              <a>
                {{ item.menuNmKor }}
              </a>
              <div class="depth2" v-if="props.menuList">
                <template v-for="subMenu in props.menuList">
                  <ul v-if="subMenu.upperMenuId === item.menuId && subMenu.menuLvl === 2">
                    <li>
                      <a href @click.prevent="onMenuClick(subMenu)">
                        {{ subMenu.menuNmKor }}
                      </a>
                    </li>
                  </ul>
                </template>
              </div>
            </li>
          </template>
        </ul>
      </nav>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { useRouter } from "vue-router";

const props = defineProps(["title", "menuOriginList", "menuList", "onSelectMenu", "handleClose"]);
const router = useRouter();

const onMenuClick = (menu, event) => {
  // console.log("onMenuClick : ", menu);
  // router.push(menu.menuUrl);
  props.handleClose();
  props.onSelectMenu(menu);
};
</script>
