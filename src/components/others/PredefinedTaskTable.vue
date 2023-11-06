<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :loading="isTableLoading"
    :headers="headers"
    :items="predefinedTasks"
    :hover="true"
    :search="searchText"
    density="comfortable"
    class="elevation-1"
    loading-text="Görevler yükleniyor..."
    no-data-text="Kayıtlı görev yok."
    items-per-page-text="Sayfa başına araç:"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>Ön Tanımlı Görevler</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:bottom> </template>
  </v-data-table>
</template>

<script>
import api from "@/services/httpService";
import { predefinedTasks } from "@/common/config/apiConfig";
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
      predefinedTasks: [],
      headers: [
        { title: "id", align: " d-none", key: "id" },
        {
          title: "Görev Niteliği / Adı ",
          align: "start",
          sortable: false,
          key: "name",
        },
        { title: "Departman", align: "start", key: "departmentId" },
        { title: "Adres", align: "start", key: "address" },
      ],
      searchText: "",
      snackBarMessage: "",
      isSuccess: false,

      isTableLoading: false,
    };
  },
  methods: {
    async fetchPredefinedTasks() {
      await api.get(predefinedTasks.url).then((response) => {
        this.predefinedTasks = response.data.data;
      });
    },
  },

  created() {
    this.fetchPredefinedTasks();
  },
};
</script>
