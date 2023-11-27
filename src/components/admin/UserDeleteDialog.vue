<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-text>{{ dialogText }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="dialog = false">Vazgeç</v-btn>
        <v-btn color="red" @click="deleteUser">Evet, sil</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { auth } from "@/common/config/apiConfig";
import api from "@/services/httpService";

import { getId } from "@/services/authService";

export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar", "delete-user"],

  methods: {
    async deleteUser() {
      await api
        .update(auth.delete(this.id))
        .then((res) => {
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("delete-user");
          if (this.id == this.currentId) {
            this.$router.push("/login");
            localStorage.removeItem("jwt");
          }
          this.closeDialog();
        })
        .catch((err) => {
          this.isSuccess = true;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
  },
  data() {
    return {
      currentId: "",
    };
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
    dialogText() {
      if (this.id == this.currentId) {
        return "**KENDİ KULLANICINIZI** silmek istediğinize emin misiniz?";
      } else return "Kullanıcıyı silmek istediğinize emin misiniz?";
    },
  },
  watch: {
    dialog: {
      handler(newValue) {
        if (newValue) {
          this.currentId = getId(localStorage.getItem("jwt")).id;
        }
      },
      immediate: true,
    },
  },
};
</script>
