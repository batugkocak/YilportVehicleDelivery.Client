<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :loading="isTableLoading"
    :headers="headers"
    :items="drivers"
    :hover="true"
    :search="searchText"
    density="comfortable"
    class="elevation-1"
    loading-text="Sürücüler yükleniyor..."
    no-data-text="Kayıtlı sürücü yok."
    items-per-page-text="Sayfa başına araç:"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>Sürücüler</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openAddDialog"> Yeni Sürücü Ekle </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:bottom> </template>
  </v-data-table>
</template>

<script>
import api from "@/services/httpService";
import { drivers } from "@/common/config/apiConfig";
export default {
  emits: [
    "toggle-detail",
    "open-snackbar",
    "toggle-add",
    "toggle-edit",
    "toggle-delete",
  ],
  data() {
    return {
      drivers: [],
      headers: [
        { title: "id", align: " d-none", key: "id" },
        {
          title: "Adı",
          align: "start",
          sortable: false,
          key: "name",
        },
        { title: "Soy Adı", align: "start", key: "surname" },
        { title: "Departmanı", align: "start", key: "departmentId" },
        { title: "Görevi", align: "start", key: "mission" },
      ],
      searchText: "",
      snackBarMessage: "",
      isSuccess: false,

      isTableLoading: false,
    };
  },
  methods: {
    async fetchDrivers() {
      await api
        .get(drivers.url)
        .then((response) => {
          this.drivers = response.data.data;
          console.log(response.data.message);
          this.isSuccess = true;
          this.snackBarMessage = response.data.message;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    openAddDialog() {
      this.$emit("toggle-add");
    },
  },

  created() {
    this.fetchDrivers();
  },
};
</script>
