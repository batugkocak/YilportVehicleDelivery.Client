<template>
  <v-card class="pa-5 mt-2" title="Kullanıcı Ekle" elevation="0">
    <v-form @submit.prevent="postUser" v-model="valid" ref="form">
      <p>{{ valid }}</p>
      <v-text-field
        v-model="newUser.firstName"
        label="Ad"
        prepend-inner-icon="mdi-account-outline"
        :rules="[
          ruleRequired,
          (v) => ruleMinLength(v, 4),
          (v) => ruleMaxLength(v, 30),
        ]"
        :counter="30"
      />
      <v-text-field
        v-model="newUser.lastName"
        label="Soyad"
        prepend-inner-icon="mdi-account"
        :rules="[
          ruleRequired,
          (v) => ruleMinLength(v, 4),
          (v) => ruleMaxLength(v, 30),
        ]"
        :counter="30"
      />
      <v-text-field
        v-model="newUser.username"
        label="Kullanıcı Adı"
        prepend-inner-icon="mdi-account-circle"
        :rules="[
          ruleRequired,
          (v) => ruleMinLength(v, 4),
          (v) => ruleMaxLength(v, 30),
        ]"
        :counter="30"
      />
      <v-text-field
        v-model="newUser.password"
        label="Şifre"
        type="password"
        prepend-inner-icon="mdi-key"
        :rules="[
          ruleRequired,
          (v) => ruleMinLength(v, 4),
          (v) => ruleMaxLength(v, 30),
        ]"
        :counter="30"
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
        <v-btn color="red" @click="console.log(valid)"> test </v-btn>
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

export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-user"],
  data() {
    return {
      ...rules,
      valid: false,
      newUser: {
        username: "",
        firstName: "",
        lastName: "",
        roleId: 3,
        password: "",
      },
      roles: [
        {
          name: "Sürücü",
          value: 3,
        },
        {
          name: "İdari İşler",
          value: 2,
        },
      ],

      isSuccess: false,
      snackBarMessage: "",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async postUser() {
      await api
        .post(auth.register, this.newUser)
        .then(() => {
          this.isSuccess = true;
          this.snackBarMessage = "Başarıyla kayıt edildi!";
          this.$emit("add-user");
          this.newUser = {
            username: "",
            firstName: "",
            lastName: "",
            roleId: 3,
            password: "",
          };
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.$refs.form.reset();
          this.newUser.roleId = 3;
        });
    },
    trimInserts() {
      this.newUser.firstName = this.newUser.firstName.trim();
      this.newUser.lastName = this.newUser.lastName.trim();
      this.newUser.username = this.newUser.username.trim();
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
};
</script>
