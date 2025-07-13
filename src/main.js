import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import './registerServiceWorker'

const app = createApp(App);

store.dispatch("initializeUserRole"); // 👈 initialize user info from token

app.use(store).use(router).mount("#app");
