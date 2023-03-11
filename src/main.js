import { createApp } from "vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { createPinia } from "pinia";
import { defineStore } from 'pinia'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// Global
import BaseCombobox from "./components/base/BaseCombobox.vue";
import ENUM from "./resources/enum";
import RESOURCE from "./resources/resource";

import App from "./App.vue";
const app = createApp(App);
const pinia = createPinia();

// global
app.component("BaseCombobox", BaseCombobox);
app.config.globalProperties.$ENUM = ENUM;
app.config.globalProperties.$RESOURCE = RESOURCE;

app.use(ElementPlus);
app.use(pinia);
app.use(router, VueAxios, axios, ElementPlus).mount("#app");
// createApp(App).use(router, VueAxios, axios, ElementPlus).mount('#app')

export const chooseArrayStore = defineStore({
  id: "chooseArray",
  state: () => ({
    count: 0,
    chooseArrayID: ["abc"],
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
