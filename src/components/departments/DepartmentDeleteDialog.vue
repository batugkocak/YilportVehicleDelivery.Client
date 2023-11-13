<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-text> Departmanı silmek istediğinize emin misiniz? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="dialog = false">Vazgeç</v-btn>
        <v-btn color="red" @click="deleteDepartment">Evet, sil</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import { departments } from "@/common/config/apiConfig";
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar", "delete-department"],

  methods: {
    async deleteDepartment() {
      await api
        .post(departments.delete(this.id))
        .then((res) => {
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("delete-department");
        })
        .catch((err) => {
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
