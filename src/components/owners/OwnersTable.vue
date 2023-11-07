<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :loading="isTableLoading"
    :headers="headers"
    :items="owners"
    :hover="true"
    :search="searchText"
    density="comfortable"
    class="elevation-1"
    loading-text="Sürücüler yükleniyor..."
    no-data-text="Kayıtlı sürücü yok."
    items-per-page-text="Sayfa başına araç:"
    items-per-page="-1"
    max-width="300px"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>Araç Sahipleri</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:bottom> </template>
  </v-data-table>
</template>

<script>
import api from "@/services/httpService";
import { owners } from "@/common/config/apiConfig";
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
      owners: [],
      headers: [
        { title: "id", align: " d-none", key: "id" },
        {
          title: "Adı",
          align: "start",
          sortable: false,
          key: "name",
          width: 200,
        },
      ],
      searchText: "",
      snackBarMessage: "",
      isSuccess: false,

      isTableLoading: false,
    };
  },
  methods: {
    async fetchOwners() {
      await api.get(owners.url).then((response) => {
        this.owners = response.data.data;
      });
    },
  },

  created() {
    this.fetchOwners();
  },
};
</script>
