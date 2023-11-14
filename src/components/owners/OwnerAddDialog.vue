<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card class="pa-5 mt-2">
      <v-form @submit.prevent="postOwner" v-model="valid">
        <v-text-field
          v-model="owner.name"
          label="İsim"
          placeholder="Yılport"
          prepend-icon="mdi-card-text"
          :rules="[
            ruleRequired,

            (v) => ruleMaxLength(v, ownerRules.NAME_LENGTH),
          ]"
          :counter="ownerRules.NAME_LENGTH"
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
import { owners } from "@/common/config/apiConfig";
import { ownerRules } from "@/common/constants/validations";
export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-owner"],
  data() {
    return {
      ownerRules,
      ...rules,
      valid: false,
      owner: {
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
    async postOwner() {
      await api
        .post(owners.url, this.owner)
        .then((res) => {
          console.log(res);
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("add-owner");
          this.closeDialog();
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.owner = {
            name: "",
          };
        });
    },
    trimInserts() {
      this.owner.name = this.owner.name.trim();
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
