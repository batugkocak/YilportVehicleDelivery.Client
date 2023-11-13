<template>
  <v-dialog
    v-model="dialog"
    class="dialog"
    v-if="predefinedTask"
    max-width="400"
  >
    <v-card class="pa-5 mt-2">
      <v-card-text>Düzenle: {{ tempName }}</v-card-text>
      <v-form @submit.prevent="updatePredefinedTask">
        <v-text-field
          v-model="predefinedTask.name"
          label="Görev Niteliği / Adı"
          prepend-icon="mdi-card-text"
          :rules="[
            ruleRequired,
            (v) => ruleMinLength(v, 4),
            (v) => ruleMaxLength(v, 30),
          ]"
          :counter="30"
        />
        <v-autocomplete
          v-model="predefinedTask.departmentId"
          label="Departman"
          :items="departments"
          item-title="selectBoxValue"
          item-value="id"
          prepend-icon="mdi-form-select"
          @click="getDepartments"
          no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        ></v-autocomplete>

        <v-text-field
          v-model="predefinedTask.address"
          label="Adres"
          prepend-icon="mdi-card-text"
          :rules="[
            ruleRequired,
            (v) => ruleMinLength(v, 4),
            (v) => ruleMaxLength(v, 30),
          ]"
          :counter="30"
        />

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
import { predefinedTasks, departments } from "@/common/config/apiConfig";

import baseRules from "@/common/rules/rules";

export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "update-task"],
  data() {
    return {
      ...baseRules,
      predefinedTask: {
        name: "",
        departmentId: null,
        address: "",
      },
      departments: ["Bilgi Teknolojileri"],
      tempName: "",
    };
  },
  methods: {
    async updatePredefinedTask() {
      await api
        .update(predefinedTasks.update, this.predefinedTask)
        .then((res) => {
          this.isSuccess = true;
          this.snackBarMessage = res.data;
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.$emit("update-task");
          this.closeDialog();
        });
    },
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async getPredefinedTask() {
      api
        .get(predefinedTasks.byId(this.id))
        .then((response) => {
          console.log(response.data.data);
          this.predefinedTask = response.data.data;
        })
        .finally(() => {
          this.tempName = this.predefinedTask.name;
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
          this.getPredefinedTask();
          this.getDepartments();
        }
      },
      immediate: true,
    },
  },
};
</script>
