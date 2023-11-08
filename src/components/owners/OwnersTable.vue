<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :loading="isTableLoading"
    :headers="headers"
    :items="owners"
    :hover="true"
    density="comfortable"
    class="elevation-1"
    loading-text="Sahipler yükleniyor..."
    no-data-text="Kayıtlı araç yok."
    width="20%"
    items-per-page="-1"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>ARAÇ SAHİPLERİ</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openAddDialog"> Sahip Ekle </v-btn>
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
import { owners } from "@/common/config/apiConfig";

export default {
  emits: ["open-snackbar", "toggle-add", "toggle-edit", "toggle-delete"],
  data() {
    return {
      owners: [],
      headers: [
        {
          title: "Ad",
          align: "start",
          sortable: false,
          key: "name",
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
    async fetchOwners() {
      this.isTableLoading = true;
      await api
        .get(owners.url)
        .then((response) => {
          this.owners = response.data.data;
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
    this.fetchOwners();
  },
};
</script>
