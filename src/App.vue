<template>
  <v-app>
    <the-sidebar />
    <v-main>
      <div class="ma-5">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
  <result-snackbar ref="snackBar"></result-snackbar>
</template>

<script>
import TheSidebar from "@/components/layout/TheSidebar.vue";
import ResultSnackbar from "./common/components/ResultSnackbar.vue";

export default {
  components: {
    TheSidebar,
    ResultSnackbar,
  },
  mounted() {
    this.$root.snackBar = this.$refs.snackBar;
  },
};
</script>
