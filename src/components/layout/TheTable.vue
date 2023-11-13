<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :loading="isTableLoading"
    :headers="headers"
    :items="items"
    :hover="true"
    density="comfortable"
    class="elevation-1"
    loading-text="Veriler yükleniyor..."
    no-data-text="Kayıtlı veri yok."
    width="20%"
    items-per-page="-1"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openAddDialog"> {{ buttonText }} </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        class="ma-1"
        color="blue"
        icon="mdi-pencil"
        size="small"
        @click="openEditDialog(item.id)"
      ></v-btn>
      <v-btn
        class="ma-1"
        color="blue"
        icon="mdi-delete"
        size="small"
        @click="openDeleteDialog(item.id)"
      ></v-btn>
    </template>
    <template v-slot:bottom></template>
  </v-data-table>
</template>

<script>
export default {
  emits: ["open-snackbar", "toggle-add", "toggle-edit", "toggle-delete"],
  props: ["modelValue", "headers", "items", "title", "buttonText"],
  data() {
    return {
      owners: [],

      snackBarMessage: "",
      isSuccess: false,

      isTableLoading: false,
    };
  },
  methods: {
    openEditDialog(id) {
      this.$emit("toggle-edit", id);
    },
    openAddDialog() {
      this.$emit("toggle-add");
    },
    openDeleteDialog(id) {
      this.$emit("toggle-delete", id);
    },
  },
};
</script>
