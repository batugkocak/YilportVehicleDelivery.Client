<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card
      class="pa-5"
      prepend-icon="mdi-account-details"
      :title="username"
      subtitle="Kullanıcı Bilgileri"
      hover
    >
      <v-card elevation="1" class="pa-5 mt-2">
        <div :class="cardContentStyling">
          <v-icon icon="mdi-account" />
          <div>
            <v-card-title> Ad Soyad: </v-card-title>
            <v-card-text>{{ name }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <v-divider />
        <div :class="cardContentStyling">
          <v-icon icon="mdi-timer-sand-full" />
          <div>
            <v-card-title> Giriş Tarihi </v-card-title>
            <v-card-text>{{ loginTime }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div :class="cardContentStyling">
          <v-icon icon="mdi-timer-sand-empty" />
          <div>
            <v-card-title> Yetki Bitiş Tarihi: </v-card-title>
            <v-card-text>{{ expTime }}</v-card-text>
          </div>
        </div>
        <v-divider />
        <v-row>
          <v-spacer />
          <v-btn class="mt-5" @click="openChangePasswordDialog"
            >Şifre Değiştir</v-btn
          >
          <v-spacer />
        </v-row>
      </v-card>
      <v-row class="mt-5">
        <v-spacer />
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog">Kapat</v-btn>
        </v-card-actions>
      </v-row>
    </v-card>
  </v-dialog>
  <change-password-dialog
    v-model="isChangingPassword"
    @change-password="afterPasswordChange"
    @open-snackbar="openSnackbar"
  >
  </change-password-dialog>
</template>

<script>
import {
  getUserName,
  getName,
  getExpirationTime,
  getLoginTime,
  getVerificationType,
} from "@/services/authService";
import ChangePasswordDialog from "./ChangePasswordDialog.vue";
import { verificationTypes } from "@/common/constants/verificationType";
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  components: {
    ChangePasswordDialog,
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    openChangePasswordDialog() {
      const token = localStorage.getItem("jwt");
      const verificationType = getVerificationType(token).verificationType;
      if (verificationType == verificationTypes.LDAP) {
        this.openSnackbar(false, "LDAP Kullanıcıları Şifre Değişemez!");
        return;
      }
      this.isChangingPassword = true;
    },
    afterPasswordChange() {
      console.log("Test");
    },
    openSnackbar(isSuccess, message) {
      this.$root.snackBar.show({
        isSuccess: isSuccess,
        message: message,
      });
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
      expTime: "",
      loginTime: "",
      name: "",
      username: "",
      isChangingPassword: false,
      cardContentStyling: "d-flex align-center",
    };
  },
  watch: {
    dialog: {
      handler(newValue) {
        if (newValue) {
          const token = localStorage.getItem("jwt");
          this.name = getName(token).name;
          this.username = getUserName(token).username;
          this.loginTime = getLoginTime(token);
          this.expTime = getExpirationTime(token);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
.scroll {
  overflow-y: scroll;
}
</style>
