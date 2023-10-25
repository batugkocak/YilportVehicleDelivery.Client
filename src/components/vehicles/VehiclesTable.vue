<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :headers="headers"
    :items="vehicles"
    class="elevation-1"
    loading-text="Araçlar yükleniyor..."
    no-data-text="Kayıtlı araç yok."
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>ARAÇLAR</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openAddDialog"> Araç Ekle </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        class="ma-1"
        color="primary"
        icon="mdi-card-text"
        size="small"
        @click="openDetailsDialog(item.id)"
      ></v-btn>
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
      ></v-btn> </template
  ></v-data-table>
</template>

<script>
import api from "@/services/httpService";
import { vehiclesForTable } from "@/common/config/apiConfig";

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
      vehicles: [],
      headers: [
        {
          title: "Plaka",
          align: "start",
          sortable: false,
          key: "plate",
        },
        { title: "id", align: " d-none", key: "id" },
        { title: "Tip", align: "end", key: "type" },
        { title: "Marka", align: "end", key: "brand" },
        { title: "Model", align: "end", key: "modelName" },
        { title: "Durumu", align: "start", key: "status" },
        {
          title: "",
          key: "actions",
          align: "start",
          sortable: false,
          fixed: true,
        },
      ],
      isSuccess: false,
      snackBarMessage: "",
    };
  },
  methods: {
    async fetchVehicles() {
      await api
        .get(vehiclesForTable.getAll)
        .then((response) => {
          this.vehicles = response.data.data;
          this.snackBarMessage = response.data.message;
          this.isSuccess = response.data.success;
        })
        .catch(() => {
          this.snackBarMessage = "Bilinmeyen hata meydana geldi.";
          this.isSuccess = false;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    openDetailsDialog(id) {
      this.$emit("toggle-detail", id);
    },
    openEditDialog(id) {
      this.$emit("toggle-edit", id);
    },
    openAddDialog(id) {
      this.$emit("toggle-add", id);
    },
    openDeleteDialog(id) {
      this.$emit("toggle-delete", id);
    },
  },

  created() {
    this.fetchVehicles();
  },
};
</script>
