<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card class="pa-5 mt-2">
      <v-form @submit.prevent="postDriver" v-model="valid">
        <v-text-field
          v-model="driver.name"
          label="İsim"
          prepend-icon="mdi-account"
          :rules="[
            ruleRequired,
            (v) => ruleMaxLength(v, driverRules.NAME_LENGTH),
          ]"
          :counter="driverRules.NAME_LENGTH"
        />
        <v-text-field
          v-model="driver.surname"
          label="Soyisim"
          prepend-icon="mdi-account-outline"
          :rules="[
            ruleRequired,

            (v) => ruleMaxLength(v, driverRules.SURNAME_LENGTH),
          ]"
          :counter="driverRules.SURNAME_LENGTH"
        />
        <v-text-field
          v-model="driver.mission"
          label="Görev"
          prepend-icon="mdi-card-text"
          :rules="[
            ruleRequired,
            (v) => ruleMaxLength(v, driverRules.MISSION_LENGTH),
          ]"
          :counter="driverRules.MISSION_LENGTH"
        />
        <v-autocomplete
          v-model="driver.departmentId"
          label="Departman"
          :items="departments"
          item-title="selectBoxValue"
          item-value="id"
          prepend-icon="mdi-form-select"
          @click="getDepartments"
          no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        ></v-autocomplete>

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
  </v-dialog>
</template>

<script>
import rules from "@/common/rules/rules";
import api from "@/services/httpService";
import { drivers, departments } from "@/common/config/apiConfig";
import { driverRules } from "@/common/constants/validations";
export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-driver"],
  data() {
    return {
      driverRules,
      ...rules,
      valid: false,
      driver: {
        name: "",
        surname: "",
        departmentId: null,
        mission: "",
      },
      departments: [],
      isSuccess: false,
      snackBarMessage: "",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async postDriver() {
      await api
        .post(drivers.url, this.driver)
        .then((res) => {
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("add-driver");
          this.closeDialog();
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.driver = {
            name: "",
          };
        });
    },
    async getDepartments() {
      if (this.departments.length) {
        return;
      }
      await api
        .get(departments.selectBox)
        .then((res) => {
          this.departments = res.data.data;
          this.isSuccess = true;
          this.snackBarMessage = res.data.message;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    trimInserts() {
      this.driver.name = this.driver.name.trim();
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
