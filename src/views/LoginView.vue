<template>
  <v-container class="login-container" background-color="primary">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-img src="@/assets/YPH_Mainlogo_titled.png" class="mb-8" />
        <v-form @submit.prevent="login" v-model="valid" id="loginForm">
          <v-text-field
            v-model="user.username"
            label="Kullanıcı Adı"
            bg-color="white"
            variant="solo-filled"
            class="mb-2"
            :rules="[
              ruleRequired,
              (v) => ruleMaxLength(v, userRules.USERNAME_MAX_LENGTH),
              (v) => ruleMinLength(v, userRules.USERNAME_MIN_LENGTH),
            ]"
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            elevation="10"
            bg-color="white"
            label="Şifre"
            variant="solo-filled"
            type="password"
            class="mb-2"
            autocomplete="off"
            :rules="[
              ruleRequired,
              (v) => ruleMaxLength(v, userRules.PASSWORD_MAX_LENGTH),
              (v) => ruleMinLength(v, userRules.PASSWORD_MIN_LENGTH),
            ]"
          ></v-text-field>
          <v-spacer />

          <v-btn
            prepend-icon="mdi-key"
            block
            class="login-button"
            type="submit"
            :disabled="!valid"
          >
            Giriş Yap
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <div id="CssLoader" v-if="loading">
    <the-loader></the-loader>
  </div>
  <div class="background-wallpaper"></div>
</template>

<script>
import api from "@/services/httpService";
import { auth } from "@/common/config/apiConfig";
import baseRules from "@/common/rules/rules";
import { userRules } from "@/common/constants/validations";

import TheLoader from "@/components/layout/TheLoader.vue";

export default {
  data() {
    return {
      userRules,
      valid: false,
      loading: false,
      user: {
        username: "",
        password: "",
      },
      ...baseRules,
    };
  },
  computed: {
    fixedUsername() {
      return this.username.trim();
    },
  },
  methods: {
    async login() {
      this.loading = true;
      this.user.username = this.user.username.trim();
      await api
        .login(auth.login, this.user)
        .then((result) => {
          if (result.data.token) {
            localStorage.setItem("jwt", result.data.token);
            setTimeout(() => {
              this.loading = false;
              this.$router.push("/admin");
            }, 1000);

            localStorage.removeItem("isExpired");
          }
        })
        .catch((error) => {
          if (error.response === undefined) {
            this.showSnackbar(false, "Sunucuya bağlanılamadı.");
          } else this.showSnackbar(false, error.response.data);
          this.loading = false;
        });
    },

    showSnackbar(isSuccess, message, time) {
      this.$root.snackBar.show({
        isSuccess: isSuccess,
        message: message,
        timer: time,
      });
    },
  },
  mounted() {
    if (localStorage.getItem("isExpired") === "true") {
      this.showSnackbar(
        false,
        "Oturum süreniz doldu. Lütfen tekrar giriş yapın.",
        5000
      );
    }
  },
  components: {
    TheLoader,
  },
};
</script>

<style>
.login-container {
  width: 35%;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  background: rgb(var(--v-theme-primary));
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-logo {
  margin-bottom: 20px;
}

.background-wallpaper {
  width: 65%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("@/assets/login_background.jpg");
  background-size: cover;
  background-position: center;
}

#loginForm .v-messages__message {
  color: lightblue;
}

#CssLoader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(63, 68, 77, 0.7);
  z-index: 9999;
}
</style>
