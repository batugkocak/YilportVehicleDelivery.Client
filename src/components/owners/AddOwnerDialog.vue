<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="pa-5 mt-2">
      <v-form @submit.prevent="postTask" v-model="valid">
        <v-text-field label="Görevin Niteliği" prepend-icon="mdi-details" />
        <v-autocomplete
          label="Departman"
          prepend-icon="mdi-form-select"
          no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
        ></v-autocomplete>
        <v-text-field label="Gidilen Adres" prepend-icon="mdi-map-marker" />

        <v-row class="mt-3">
          <v-spacer />
          <v-btn color="red" @click="closeDialog"> Vazgeç </v-btn>
          <v-btn
            type="submit"
            color="success"
            class="ml-5 mr-5"
            :disabled="!valid"
            >Ekle</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue"],
  methods: {
    postTask() {},

    closeDialog() {
      this.$emit("update:modelValue", false);
    },
  },
  data() {
    return {
      valid: false,
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
  },
};
</script>
