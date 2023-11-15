<template>
  <v-container class="login-container" background-color="primary">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-img src="@/assets/YPH_Mainlogo_titled.png" class="mb-8" />
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="user.username"
            label="Kullanıcı Adı"
            bg-color="white"
            variant="solo-filled"
            :rules="[ruleRequired, (v) => ruleMaxLength(v, 10)]"
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            label="Şifre"
            bg-color="white"
            variant="solo-filled"
            type="password"
            :rules="[ruleRequired]"
          ></v-text-field>
          <v-spacer />

          <v-btn
            prepend-icon="mdi-key"
            block
            class="login-button"
            type="submit"
          >
            Giriş Yap
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <div class="background-wallpaper"></div>
</template>

<script>
import api from "@/services/httpService";
import { auth } from "@/common/config/apiConfig";
import baseRules from "@/common/rules/rules";

export default {
  data() {
    return {
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
      this.user.username = this.user.username.trim();
      api
        .login(auth.login, this.user)
        .then((result) => {
          if (result.data.token) {
            localStorage.setItem("jwt", result.data.token);
            this.$router.push("/vehicles");
            localStorage.removeItem("isExpired");
          }
        })
        .catch((error) => {
          this.showSnackbar(false, error.response.data);
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
};
</script>

<style>
.login-container {
  height: 100vh;
  width: 30%;
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
  position: fixed;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=3270&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
}
</style>
