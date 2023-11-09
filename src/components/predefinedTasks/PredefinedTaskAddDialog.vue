<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card class="pa-5 mt-2">
      <v-form @submit.prevent="postTask" v-model="valid">
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
import { predefinedTasks, departments } from "@/common/config/apiConfig";
export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-task"],
  data() {
    return {
      ...rules,
      valid: false,
      predefinedTask: {
        name: "",
        departmentId: null,
        address: "",
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
    async postTask() {
      await api
        .post(predefinedTasks.url, this.predefinedTask)
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
          this.$emit("add-task");
          this.closeDialog();
          this.predefinedTask = {
            name: "",
            departmentId: null,
            address: "",
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
      this.predefinedTask.name = this.predefinedTask.name.trim();
      this.predefinedTask.address = this.predefinedTask.address.trim();
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
