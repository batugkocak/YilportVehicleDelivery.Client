<template>
  <v-dialog v-model="dialog" class="dialog" v-if="driver" max-width="400">
    <v-card class="pa-5 mt-2">
      <v-card-text>Düzenle: {{ tempName }}</v-card-text>
      <v-form @submit.prevent="updateDriver">
        <v-text-field
          v-model="driver.name"
          label="İsim"
          prepend-icon="mdi-account"
          :rules="[
            ruleRequired,
            (v) => ruleMaxLength(v, driverRules.MISSION_LENGTH),
          ]"
          :counter="driverRules.MISSION_LENGTH"
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
          no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        ></v-autocomplete>

        <v-row class="mt-3">
          <v-spacer />
        </v-row>
        <v-row class="mr-2">
          <v-spacer></v-spacer>
          <v-btn color="red" @click="closeDialog" class="ml-5 mr-5">
            Vazgeç
          </v-btn>
          <v-btn type="submit" color="success"> Düzenle </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import { drivers, departments } from "@/common/config/apiConfig";

import baseRules from "@/common/rules/rules";
import { driverRules } from "@/common/constants/validations";

export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "update-driver"],
  data() {
    return {
      driverRules,
      ...baseRules,
      driver: {
        name: "",
        surname: "",
        departmentId: null,
        mission: "",
      },
      departments: ["Bilgi Teknolojileri"],
      tempName: "",
    };
  },
  methods: {
    async updateDriver() {
      await api
        .update(drivers.update, this.driver)
        .then((res) => {
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("update-driver");
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
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async getDriver() {
      api
        .get(drivers.byId(this.id))
        .then((response) => {
          console.log(response.data.data);
          this.driver = response.data.data;
        })
        .finally(() => {
          this.tempName = this.driver.name + " " + this.driver.surname;
        });
    },
    async getDepartments() {
      api.get(departments.selectBox).then((response) => {
        this.departments = response.data.data;
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
  watch: {
    dialog: {
      handler(newValue) {
        if (newValue) {
          this.getDriver();
          this.getDepartments();
        }
      },
      immediate: true,
    },
  },
};
</script>
