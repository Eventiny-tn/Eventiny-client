import { createApp } from "vue";
import App from "./App.vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import router from "./router";
import Vuelidate from "vuelidate";
// import firebase from "firebase/app";
// import { firestorePlugin } from "vuefire";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAaKGAFDoRM2NXMJ31nbF2ODCH4X7XaYdU",
//   authDomain: "eventinytn-ae4ce.firebaseapp.com",
//   projectId: "eventinytn-ae4ce",
//   storageBucket: "eventinytn-ae4ce.appspot.com",
//   messagingSenderId: "675398842952",
//   appId: "1:675398842952:web:d2905903212b6aff4d367d",
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .use(Vuelidate)
  .use(CKEditor)
  // .use(firestorePlugin)
  .mount("#app");
