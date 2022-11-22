import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import './assets/main.css'
import "./index.css";

// library fixed
import Datepicker from "@vuepic/vue-datepicker";
import VueGoodTablePlugin from "vue-good-table-next";
import vSelect from "vue-select";
import { QuillEditor } from "@vueup/vue-quill";

const app = createApp(App);

const globalOptions = {
  //   debug: "info",
  //   modules: {
  //     toolbar: "minimal",
  //   },
  placeholder: "Type here . . .",
  readOnly: false,
  theme: "snow",
};

app.use(createPinia());
app.use(router);
app.component("Datepicker", Datepicker);
app.use(VueGoodTablePlugin);
app.component("v-select", vSelect);
app.component("QuillEditor", QuillEditor);

app.mount("#app");
