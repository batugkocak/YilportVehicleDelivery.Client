<template>
  <v-dialog v-model="dialog" class="dialog" v-if="department" max-width="400">
    <v-card class="pa-5 mt-2">
      <v-card-text>Düzenle: {{ tempName }}</v-card-text>
      <v-form @submit.prevent="updateDepartment">
        <v-text-field
          v-model="department.name"
          label="İsim"
          placeholder="Gemport"
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
import { departments } from "@/common/config/apiConfig";

import baseRules from "@/common/rules/rules";

export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "update-department", "open-snackbar"],
  data() {
    return {
      ...baseRules,
      department: {
        name: "",
      },
      tempName: "",
    };
  },
  methods: {
    async updateDepartment() {
      await api
        .update(departments.update, this.department)
        .then((res) => {
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("update-department");
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
    async getDepartment() {
      api
        .get(departments.byId(this.id))
        .then((response) => {
          this.department = response.data.data;
        })
        .finally(() => {
          this.tempName = this.department.name;
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
          this.getDepartment();
        }
      },
      immediate: true,
    },
  },
};
</script>
