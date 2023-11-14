<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card class="pa-5 mt-2">
      <v-form @submit.prevent="postDepartment" v-model="valid">
        <v-text-field
          v-model="department.name"
          label="İsim"
          placeholder="Bilgi Teknolojileri"
          prepend-icon="mdi-card-text"
          :rules="[
            ruleRequired,
            (v) => ruleMaxLength(v, departmentRules.NAME_LENGTH),
          ]"
          :counter="departmentRules.NAME_LENGTH"
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
import { departments } from "@/common/config/apiConfig";
import { departmentRules } from "@/common/constants/validations";
export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-department"],
  data() {
    return {
      departmentRules,
      ...rules,
      valid: false,
      department: {
        name: "",
      },

      isSuccess: false,
      snackBarMessage: "",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async postDepartment() {
      await api
        .post(departments.url, this.department)
        .then((res) => {
          console.log(res);
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("add-department");
          this.closeDialog();
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.department = {
            name: "",
          };
        });
    },
    trimInserts() {
      this.department.name = this.department.name.trim();
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
