<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card class="pa-5 mt-2">
      <v-form @submit.prevent="postBrand" v-model="valid">
        <v-text-field
          v-model="brand.name"
          label="İsim"
          placeholder="Mercedes"
          prepend-icon="mdi-card-text"
          :rules="[
            ruleRequired,

            (v) => ruleMaxLength(v, brandRules.NAME_LENGTH),
          ]"
          :counter="brandRules.NAME_LENGTH"
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
import { brands } from "@/common/config/apiConfig";
import { brandRules } from "@/common/constants/validations";
export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-brand"],
  data() {
    return {
      brandRules,
      ...rules,
      valid: false,
      brand: {
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
    async postBrand() {
      await api
        .post(brands.url, this.brand)
        .then((res) => {
          this.trimInserts();
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("add-brand");
          this.closeDialog();
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.brand = {
            name: "",
          };
        });
    },
    trimInserts() {
      this.brand.name = this.brand.name.trim();
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
