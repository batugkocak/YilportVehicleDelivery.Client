<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card
      class="pa-2"
      prepend-icon="mdi-account-details"
      :title="username"
      subtitle="Şifre Değiş"
      hover
    >
      <v-form class="px-3" v-model="valid" ref="form">
        <input
          type="text"
          name="email"
          value="..."
          autocomplete="username email"
          style="display: none"
        />
        <v-text-field
          ref="password"
          v-model="currentPassword"
          label="Güncel Şifre"
          type="password"
          autocomplete="new-password"
          prepend-inner-icon="mdi-key-variant"
          :rules="[
            ruleRequired,
            (v) => ruleMinLength(v, userRules.PASSWORD_MIN_LENGTH),
            (v) => ruleMaxLength(v, userRules.PASSWORD_MAX_LENGTH),
          ]"
          :counter="userRules.PASSWORD_MAX_LENGTH"
        />
        <v-text-field
          ref="newPassword"
          v-model="newPassword"
          label="Yeni Şifre"
          type="password"
          autocomplete="new-password"
          prepend-inner-icon="mdi-key-variant"
          :rules="[
            ruleRequired,
            (v) => ruleMinLength(v, userRules.PASSWORD_MIN_LENGTH),
            (v) => ruleMaxLength(v, userRules.PASSWORD_MAX_LENGTH),
            (v) => isPasswordSame(v),
          ]"
          :counter="userRules.PASSWORD_MAX_LENGTH"
        />
        <v-text-field
          ref="verifyNewPassword"
          v-model="verifyNewPassword"
          label="Yeni Şifre Tekrar"
          type="password"
          autocomplete="new-password"
          prepend-inner-icon="mdi-key-variant"
          :rules="[
            ruleRequired,
            (v) => ruleMinLength(v, userRules.PASSWORD_MIN_LENGTH),
            (v) => ruleMaxLength(v, userRules.PASSWORD_MAX_LENGTH),
            (v) => isPasswordSame(v),
          ]"
          :counter="userRules.PASSWORD_MAX_LENGTH"
        />
        <v-btn block color="success" @click="changePassword">Onayla</v-btn>
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="closeDialog">Kapat</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getUserName } from "@/services/authService";
import { userRules } from "@/common/constants/validations.js";
import api from "@/services/httpService";
import { auth } from "@/common/config/apiConfig";
import rules from "@/common/rules/rules";
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    isPasswordSame() {
      if (this.newPassword !== this.verifyNewPassword) {
        return "Şifreler uyuşmuyor!";
      } else return true;
    },
    async changePassword() {
      await api
        .post(auth.changePassword, {
          username: getUserName(localStorage.getItem("jwt")).username,
          oldPassword: this.currentPassword,
          newPassword: this.newPassword,
        })
        .then(() => {
          this.isSuccess = true;
          this.snackBarMessage = "Başarıyla şifre değiştirildi!";
          this.$emit("add-user");
          this.clearForm();
          this.closeDialog();
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    clearForm() {
      this.$refs.form.reset();
    },
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set() {
        this.closeDialog();
      },
    },
  },
  data() {
    return {
      currentPassword: "",

      newPassword: "",
      verifyNewPassword: "",

      username: "",
      cardContentStyling: "d-flex align-center",

      valid: false,

      isSuccess: false,
      snackBarMessage: "",

      userRules,
      ...rules,
    };
  },
  watch: {
    dialog: {
      handler(newValue) {
        if (newValue) {
          const token = localStorage.getItem("jwt");
          this.username = getUserName(token).username;
        }
      },
      immediate: true,
    },

    newPassword() {
      this.$refs.verifyNewPassword.validate();
      this.$refs.newPassword.validate();
    },
    verifyNewPassword() {
      this.$refs.verifyNewPassword.validate();
      this.$refs.newPassword.validate();
    },
  },
};
</script>
