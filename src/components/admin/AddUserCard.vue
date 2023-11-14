<template>
  <v-card class="pa-5 mt-2">
    <v-form @submit.prevent="postDriver" v-model="valid">
      <v-text-field
        v-model="newUser.username"
        label="Kullanıcı Adı"
        prepend-icon="mdi-card-text"
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
        prepend-icon="mdi-card-text"
        :rules="[
          ruleRequired,
          (v) => ruleMinLength(v, 4),
          (v) => ruleMaxLength(v, 30),
        ]"
        :counter="30"
      />
      <v-text-field
        v-model="newUser.firstName"
        label="Ad"
        prepend-icon="mdi-card-text"
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
        prepend-icon="mdi-card-text"
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
        label="Kullanıcı Rolü"
        v-model="chosenDataType"
        @update:model-value="fetchVehiclesOnTaskArchive"
      ></v-select>
      <v-row class="mt-3">
        <v-spacer />
        <v-btn color="red" @click="closeDialog"> Vazgeç </v-btn>
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
import rules from "@/common/rules/rules";
import api from "@/services/httpService";



export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar"],
  data() {
    return {
      ...rules,
      valid: false,
      newUser: {
        username: "",
        firstName: "",
        lastName: "",
        roleId: "",
        password: "",
      },
      roles: [
        {
          name: "user",
          value: 1,
        },
        {
          name: "superuser",
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
        .post("", this.newUser)
        .then((res) => {
          console.log(res);
          this.isSuccess = true;
          this.snackBarMessage = res.data;
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.$emit("add-user");
          this.closeDialog();
          this.driver = {
            name: "",
          };
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
