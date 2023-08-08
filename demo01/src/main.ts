import "./style/reset.scss";
import { createApp } from "vue";
import App from "@/App.vue";
import Menu from "@/components/menu/index.vue";
import router from "@/router/index.ts";

const app = createApp(App);
app.component("Menu", Menu);
app.use(router);

app.mount("#app");
