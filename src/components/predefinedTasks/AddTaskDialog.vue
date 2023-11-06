<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="pa-5 mt-2">
      <v-form @submit.prevent="postTask" v-model="valid">
        <v-text-field
          label="Görevin Niteliği / Adı"
          v-model="predefinedTask.name"
          prepend-icon="mdi-details"
        />
        <v-autocomplete
          v-model="predefinedTask.departmentId"
          label="Departman"
          :items="departments"
          item-title="name"
          item-value="id"
          @click="getDepartments"
          prepend-icon="mdi-form-select"
          no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
        ></v-autocomplete>
        <v-text-field
          label="Gidilen Adres"
          prepend-icon="mdi-map-marker"
          v-model="predefinedTask.address"
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
import { departments, predefinedTasks } from "@/common/config/apiConfig";
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar"],
  methods: {
    async postTask() {
      this.trimInserts();
      await api
        .post(predefinedTasks.url, this.predefinedTask)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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

    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async getDepartments() {
      if (this.departments.length) {
        return;
      }
      await api
        .get(departments.url)
        .then((res) => {
          console.log(res);
          this.departments = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    trimInserts() {
      this.predefinedTask.name = this.predefinedTask.name.trim();
      this.predefinedTask.address = this.predefinedTask.address.trim();
    },
  },
  data() {
    return {
      predefinedTask: {
        name: "",
        departmentId: null,
        address: "",
      },

      valid: false,
      ...baseRules,
      departments: [],
    };
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
