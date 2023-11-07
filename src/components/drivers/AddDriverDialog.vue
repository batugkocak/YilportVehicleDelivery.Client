<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="pa-5 mt-2">
      <v-form @submit.prevent="postTask" v-model="valid">
        <v-text-field
          label="Adı"
          v-model="driver.name"
          prepend-icon="mdi-card-account-details"
        />
        <v-text-field
          label="Soyadı"
          v-model="driver.surname"
          prepend-icon="mdi-card-account-details-outline"
        />
        <v-autocomplete
          v-model="driver.departmentId"
          label="Departman"
          :items="departments"
          item-title="selectBoxValue"
          item-value="id"
          @click="getDepartments"
          prepend-icon="mdi-form-select"
          no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
        ></v-autocomplete>
        <v-text-field
          label="Görevi"
          v-model="driver.mission"
          prepend-icon="mdi-details"
        />

        <v-row class="mt-3">
          <v-spacer />
          <v-btn color="red" @click="closeDialog"> Vazgeç </v-btn>
          <v-btn
            type="submit"
            color="success"
            class="ml-5 mr-5"
            :disabled="!valid"
            >Ekle</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import baseRules from "@/common/rules/rules";
import api from "@/services/httpService";
import { departments, drivers } from "@/common/config/apiConfig";
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar"],
  data() {
    return {
      driver: {
        name: "",
        surname: "",
        departmentId: null,
        mission: "",
      },

      snackbarMessage: "",
      isSuccess: false,

      valid: false,
      ...baseRules,
      departments: [],
    };
  },
  methods: {
    async postTask() {
      console.log(this.driver);
      api
        .post(drivers.url, this.driver)
        .then((response) => {
          this.snackbarMessage = response.data;
          this.isSuccess = true;
          console.log(response);
          this.closeDialog();
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackbarMessage);
        });
    },

    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async getDepartments() {
      if (this.departments.length) {
        return;
      }
      await api
        .get(departments.selectBox)
        .then((res) => {
          this.departments = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    trimInserts() {
      this.driver.name = this.driver.name.trim();
      this.driver.surname = this.driver.surname.trim();
      this.driver.mission = this.driver.mission.trim();
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
