/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";
// Composables
import { createApp } from "vue";
import { createPinia } from "pinia";
import mitt from "mitt";

const emitter = mitt();

const app = createApp(App);
app.config.globalProperties.emitter = emitter;
registerPlugins(app);

// const pinia = createPinia();
// import piniapluginpersistedstate from "pinia-plugin-persistedstate";
// pinia.use(piniapluginpersistedstate);

app.mount("#app");
