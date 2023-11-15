<template>
  <v-app>
    <the-sidebar v-if="$route.path !== `/login`" @logout="logoutDialog" />

    <v-main>
      <div class="ma-5">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
  <result-snackbar ref="snackBar"></result-snackbar>

  <v-dialog v-model="isLoggingOut" width="500px">
    <v-card title="Çıkış">
      <v-card-text> Çıkış yapmak istediğinize emin misiniz? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green" text="Vazgeç" @click="isLoggingOut = false" />
        <v-btn color="red" text="Evet" @click="logoutUser" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TheSidebar from "@/components/layout/TheSidebar.vue";
import ResultSnackbar from "./common/components/ResultSnackbar.vue";

export default {
  data() {
    return {
      isLoggingOut: false,
    };
  },
  components: {
    TheSidebar,
    ResultSnackbar,
  },
  mounted() {
    this.$root.snackBar = this.$refs.snackBar;
  },
  methods: {
    logoutDialog() {
      this.isLoggingOut = true;
    },
    logoutUser() {
      this.isLoggingOut = false;
      localStorage.removeItem("jwt");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
