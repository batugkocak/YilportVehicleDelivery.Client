<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-text> Aracı silmek istediğinize emin misiniz?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="dialog = false">Vazgeç</v-btn>
        <v-btn color="red" @click="deleteCar">Evet, sil</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar"],

  methods: {
    deleteCar() {
      console.log("Araba silindi: ");
      console.log(this.id);
      this.closeDialog();
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
