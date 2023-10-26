<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <p>Finish {{ id }}</p>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue"],
  methods: {
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

<style></style>
