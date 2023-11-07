<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :loading="isTableLoading"
    :headers="headers"
    :items="predefinedTasks"
    :hover="true"
    density="comfortable"
    class="elevation-1"
    loading-text="Görevler yükleniyor..."
    no-data-text="Kayıtlı görev yok."
    items-per-page="-1"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>Ön Tanımlı Görevler</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openAddDialog"> Yeni Görev Ekle </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:bottom></template>
  </v-data-table>
</template>

<script>
import api from "@/services/httpService";
import { predefinedTasks } from "@/common/config/apiConfig";
export default {
  emits: ["toggle-add", "add-task", "open-snackbar"],
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
        {
          title: "İlgili Departman",
          align: "start",
          key: "departmentName",
        },
        {
          title: "Gidilen Adres",
          align: "start",
          key: "address",
        },
      ],

      isSuccess: false,
      snackBarMessage: "",

      isTableLoading: false,
    };
  },
  methods: {
    async fetchPredefinedTasks() {
      this.isTableLoading = true;
      await api
        .get(predefinedTasks.details)
        .then((response) => {
          this.isSuccess = true;
          this.snackBarMessage = response.data.message;
          this.predefinedTasks = response.data.data;
          this.$emit("add-task");
        })
        .catch()
        .finally(() => {
          this.isTableLoading = false;
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    openAddDialog() {
      this.$emit("toggle-add");
    },
  },

  created() {
    this.fetchPredefinedTasks();
  },
};
</script>
