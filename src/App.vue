<template>
  <v-app>
    <the-sidebar
      v-if="$route.path !== `/login`"
      @logout="logoutDialog"
      @open-info-dialog="openInfoDialog"
    />

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

  <user-info-dialog v-model="infoDialog"></user-info-dialog>
</template>

<script>
import TheSidebar from "@/components/layout/TheSidebar.vue";
import ResultSnackbar from "./common/components/ResultSnackbar.vue";
import UserInfoDialog from "./components/user/UserInfoDialog.vue";

export default {
  data() {
    return {
      isLoggingOut: false,
      infoDialog: false,
    };
  },
  components: {
    TheSidebar,
    ResultSnackbar,
    UserInfoDialog,
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
    openInfoDialog() {
      this.infoDialog = true;
    },
  },
};
</script>
