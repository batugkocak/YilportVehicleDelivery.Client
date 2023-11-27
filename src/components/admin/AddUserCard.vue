<template>
  <v-card class="pa-5 mt-2" title="Kullanıcı Ekle" elevation="0">
    <v-form @submit.prevent="postUser" ref="form" v-model="valid">
      <v-text-field
        v-model="newUser.firstName"
        label="Ad"
        prepend-inner-icon="mdi-account-outline"
        :rules="[
          ruleRequired,
          (v) => ruleMinLength(v, userRules.NAME_MIN_LENGTH),
          (v) => ruleMaxLength(v, userRules.NAME_MAX_LENGTH),
        ]"
        :counter="userRules.NAME_MAX_LENGTH"
      />
      <v-text-field
        v-model="newUser.lastName"
        label="Soyad"
        prepend-inner-icon="mdi-account"
        :rules="[
          ruleRequired,
          (v) => ruleMinLength(v, userRules.SURNAME_MIN_LENGTH),
          (v) => ruleMaxLength(v, userRules.SURNAME_MAX_LENGTH),
        ]"
        :counter="userRules.SURNAME_MAX_LENGTH"
      />
      <v-text-field
        v-model="newUser.username"
        label="Kullanıcı Adı"
        prepend-inner-icon="mdi-account-circle"
        :rules="[
          ruleRequired,
          (v) => ruleMinLength(v, userRules.USERNAME_MIN_LENGTH),
          (v) => ruleMaxLength(v, userRules.USERNAME_MAX_LENGTH),
        ]"
        :counter="userRules.USERNAME_MAX_LENGTH"
      >
      </v-text-field>
      <v-text-field
        ref="password"
        v-model="newUser.password"
        label="Şifre"
        type="password"
        prepend-inner-icon="mdi-key"
        :rules="
          !isForm
            ? []
            : [
                ruleRequired,
                (v) => ruleMinLength(v, userRules.PASSWORD_MIN_LENGTH),
                (v) => ruleMaxLength(v, userRules.PASSWORD_MAX_LENGTH),
                (v) => isPasswordSame(v),
              ]
        "
        :disabled="!isForm"
        :counter="userRules.PASSWORD_MAX_LENGTH"
      />
      <v-text-field
        ref="verifyPassword"
        v-model="verifyPassword"
        label="Şifre Tekrar"
        @input="isPasswordSame"
        type="password"
        :disabled="!isForm"
        prepend-inner-icon="mdi-key"
        :rules="
          !isForm
            ? []
            : [
                ruleRequired,
                (v) => ruleMinLength(v, userRules.PASSWORD_MIN_LENGTH),
                (v) => ruleMaxLength(v, userRules.PASSWORD_MAX_LENGTH),
                (v) => isPasswordSame(v),
              ]
        "
        :counter="userRules.PASSWORD_MAX_LENGTH"
      />
      <v-select
        :items="roles"
        item-title="name"
        item-value="value"
        density="compact"
        label="Kullanıcı Tipi"
        v-model="newUser.roleId"
      ></v-select>
      <v-row class="mt-3">
        <v-spacer />
        <v-switch
          :label="ldapSwitchText"
          v-model="chosenVerificationType"
          color="primary"
          :true-value="verificationTypes.LDAP"
          :false-value="verificationTypes.FORM"
        >
        </v-switch>
        <v-btn color="red" @click="clearForm"> Temizle </v-btn>
        <v-btn
          type="submit"
          color="success"
          class="ml-5 mr-5"
          :disabled="!valid"
          >Ekle
        </v-btn>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { auth } from "@/common/config/apiConfig";
import rules from "@/common/rules/rules";
import api from "@/services/httpService";
import { userRules } from "@/common/constants/validations.js";
import { verificationTypes } from "@/common/constants/verificationType";

export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-user"],
  data() {
    return {
      chosenVerificationType: 2,
      isLdap: false,
      valid: false,

      newUser: {
        username: "",
        firstName: "",
        lastName: "",
        roleId: 1,
        password: "",
        verificationType: 2,
      },
      verificationTypes,
      verifyPassword: "",
      roles: [
        {
          name: "Sürücü",
          value: 1,
        },
        {
          name: "İdari İşler",
          value: 2,
        },
      ],

      isSuccess: false,
      snackBarMessage: "",
      userRules,
      ...rules,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async postUser() {
      if (!this.isForm) {
        this.newUser.password = null;
        this.verifyPassword = null;
      }
      this.trimInserts();
      console.log(this.newUser);
      this.newUser.verificationType = this.chosenVerificationType;
      await api
        .post(auth.register, this.newUser)
        .then(() => {
          this.isSuccess = true;
          this.snackBarMessage = "Başarıyla kayıt edildi!";
          this.$emit("add-user");
          this.clearForm();
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
      this.newUser.roleId = 1;
    },
    trimInserts() {
      this.newUser.firstName = this.newUser.firstName.trim();
      this.newUser.lastName = this.newUser.lastName.trim();
      this.newUser.username = this.newUser.username.trim();
    },
    isPasswordSame() {
      if (this.newUser.password !== this.verifyPassword) {
        return "Şifreler uyuşmuyor!";
      } else return true;
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
    isForm() {
      if (this.chosenVerificationType == this.verificationTypes.FORM) {
        return true;
      } else return false;
    },
    ldapSwitchText() {
      if (this.isForm) {
        return "Form";
      } else return "Ldap";
    },
  },
  watch: {
    "newUser.password"() {
      this.$refs.verifyPassword.validate();
      this.$refs.password.validate();
    },
    verifyPassword() {
      this.$refs.password.validate();
      this.$refs.verifyPassword.validate();
    },
  },
};
</script>
