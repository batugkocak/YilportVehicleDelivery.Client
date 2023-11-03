<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :loading="isTableLoading"
    :headers="headers"
    :items="vehicles"
    :hover="true"
    :search="searchText"
    density="comfortable"
    class="elevation-1"
    loading-text="Araçlar yükleniyor..."
    no-data-text="Kayıtlı araç yok."
    items-per-page-text="Sayfa başına araç:"
    :items-per-page-options="[10, 20, -1]"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>ARAÇLAR</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-responsive max-width="150" class="mt-2 mr-3">
          <v-text-field
            variant="solo"
            label="Ara"
            v-model="searchText"
            bg-color="grey-lighten-4"
            elevation-0
            :clearable="true"
            :flat="true"
            placeholder="Plaka, Tip, Marka, ..."
          ></v-text-field>
        </v-responsive>
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
import { vehicles } from "@/common/config/apiConfig";

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
          width: "200",
        },
      ],
      searchText: "",
      snackBarMessage: "",
      isSuccess: false,

      isTableLoading: false,
    };
  },
  methods: {
    async fetchVehicles() {
      this.isTableLoading = true;
      await api
        .get(vehicles.detailsForTable)
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
          this.isTableLoading = false;
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    openDetailsDialog(id) {
      this.$emit("toggle-detail", id);
    },
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

  created() {
    this.fetchVehicles();
  },
};
</script>
