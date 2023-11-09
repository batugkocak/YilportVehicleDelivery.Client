<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :loading="isTableLoading"
    :headers="headers"
    :items="drivers"
    :hover="true"
    density="comfortable"
    class="elevation-1"
    loading-text="Sürücüler yükleniyor..."
    no-data-text="Kayıtlı sürücü yok."
    width="20%"
    items-per-page="-1"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>SÜRÜCÜLER</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openAddDialog"> Sürücü Ekle </v-btn>
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
import api from "@/services/httpService";
import { drivers } from "@/common/config/apiConfig";

export default {
  emits: ["open-snackbar", "toggle-add", "toggle-edit", "toggle-delete"],
  data() {
    return {
      drivers: [],
      headers: [
        {
          title: "Ad",
          align: "start",
          sortable: false,
          key: "name",
        },
        {
          title: "Soyad",
          align: "start",
          sortable: false,
          key: "surname",
        },
        {
          title: "Departman",
          align: "start",
          sortable: false,
          key: "departmentName",
        },
        {
          title: "Görev",
          align: "start",
          sortable: false,
          key: "mission",
        },
        {
          title: "",
          key: "actions",
          align: "start",
          sortable: false,
          fixed: true,
          width: "150",
        },
      ],

      snackBarMessage: "",
      isSuccess: false,

      isTableLoading: false,
    };
  },
  methods: {
    async fetchDrivers() {
      this.isTableLoading = true;
      await api
        .get(drivers.forTable)
        .then((response) => {
          this.drivers = response.data.data;
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
    this.fetchDrivers();
  },
};
</script>
