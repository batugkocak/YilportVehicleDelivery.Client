<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-text> Sahibi silmek istediğinize emin misiniz?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="dialog = false">Vazgeç</v-btn>
        <v-btn color="red" @click="deleteOwner">Evet, sil</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import { drivers } from "@/common/config/apiConfig";
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar", "delete-owner"],

  methods: {
    async deleteOwner() {
      console.log(this.id);
      await api
        .post(drivers.delete(this.id))
        .then((res) => {
          console.log(res);
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("delete-driver");
        })
        .catch((err) => {
          console.log(err);
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          console.log("Finally");
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.closeDialog();
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
