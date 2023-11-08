<template>
  <v-dialog v-model="dialog" class="dialog" v-if="owner" max-width="400">
    <v-card class="pa-5 mt-2">
      <v-card-text>Düzenle: {{ tempName }}</v-card-text>
      <v-form @submit.prevent="updateOwner">
        <v-text-field
          v-model="owner.name"
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
import { owners } from "@/common/config/apiConfig";

import baseRules from "@/common/rules/rules";

export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "update-owner"],
  data() {
    return {
      ...baseRules,
      owner: {
        name: "",
      },
      tempName: "",
    };
  },
  methods: {
    async updateOwner() {
      await api
        .post(owners.update, this.owner)
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
          this.$emit("update-owner");
          this.closeDialog();
        });
    },
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async getOwner() {

      api
        .get(owners.byId(this.id))
        .then((response) => {
          this.owner = response.data.data;

        })
        .finally(() => {
          this.tempName = this.owner.name;
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
          this.getOwner();
        }
      },
      immediate: true,
    },
  },
};
</script>
