<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-text> Görevi bitirmek istediğinize emin misiniz?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="closeDialog">Vazgeç</v-btn>
        <v-btn color="green" @click="finishTask">Evet, bitir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import { vehiclesOnTask } from "@/common/config/apiConfig";
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar", "finish-task"],
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async finishTask() {
      api
        .post(vehiclesOnTask.finishUrl(this.id))
        .then((respond) => {
          this.successMessage = respond.data.message;
          console.log(respond);
          this.successSnackbar = true;
          this.finishDialog = false;
          this.$emit("finish-task");
          this.closeDialog();
        })
        .finally(() => {
          this.$emit("open-snackbar");
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
};
</script>
