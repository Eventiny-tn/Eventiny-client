import { createApp } from "vue";
import App from "./App.vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import router from "./router";
import Vuelidate from "vuelidate";
import '@stripe/stripe-js'
createApp(App)
  .use(router)
  .use(Vuelidate)
  .use(CKEditor)
  .mount("#app");
