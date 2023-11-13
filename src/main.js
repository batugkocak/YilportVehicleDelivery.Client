// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

// Directives
import { RoleDirective } from "@/common/directives/roleDirective";

const app = createApp(App);

app.directive("role", RoleDirective);

registerPlugins(app);

app.mount("#app");
