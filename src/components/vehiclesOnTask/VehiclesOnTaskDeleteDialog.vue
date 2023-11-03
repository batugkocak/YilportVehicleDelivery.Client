<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-text>
        Görev kaydını silmek istediğinize emin misiniz? Bu kayıda Arşiv'den
        erişemeyeceksiniz.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="deleteDialog = false">Vazgeç</v-btn>
        <v-btn color="red" @click="deleteTask">Evet, sil</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import { vehiclesOnTask } from "@/common/config/apiConfig";
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "delete-task"],
  data() {
    return {
      snackBarMessage: "",
      isSuccess: false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    deleteTask() {
      api
        .post(vehiclesOnTask.delete(this.id))
        .then(() => {
          this.$emit("delete-task", this.snackBarMessage, this.isSuccess);
        })
        .finally(() => {
          this.closeDialog();
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

<style></style>
