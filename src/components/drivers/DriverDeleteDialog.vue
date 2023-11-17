<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-text> Sahibi silmek istediğinize emin misiniz?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="dialog = false">Vazgeç</v-btn>
        <v-btn color="red" @click="deleteDriver">Evet, sil</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import { drivers } from "@/common/config/apiConfig";
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar", "delete-driver"],

  methods: {
    async deleteDriver() {
      await api
        .post(drivers.delete(this.id))
        .then((res) => {
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("delete-driver");
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.closeDialog();
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    closeDialog() {
      this.$emit("update:modelValue", false);
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
