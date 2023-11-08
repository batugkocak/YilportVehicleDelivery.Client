<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table
    :headers="headers"
    :items="vehiclesOnTask"
    :hover="true"
    :search="searchText"
    density="comfortable"
    class="elevation-1"
    loading-text="Araçlar yükleniyor..."
    no-data-text="Kayıtlı araç yok."
    items-per-page-text="Sayfa başına araç:"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>GÖREVDEKİ ARAÇLAR</v-toolbar-title>
        <v-spacer />
        <v-responsive max-width="150" class="mt-2 mr-3">
          <v-text-field
            variant="solo"
            label="Ara"
            v-model="searchText"
            bg-color="grey-lighten-4"
            elevation-0
            :clearable="true"
            :flat="true"
            placeholder="Plaka, Departman, ..."
          ></v-text-field>
        </v-responsive>
        <v-btn color="primary" @click="openAddDialog"> Araç Görevlendir </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn
        class="ma-1"
        color="primary"
        icon="mdi-card-text"
        size="x-small"
        @click="openDetailsDialog(item.id)"
      >
      </v-btn>
      <v-btn
        class="ma-1"
        color="green"
        icon="mdi-check"
        size="x-small"
        @click="openFinishDialog(item.id)"
      ></v-btn>
      <v-btn
        class="ma-1"
        color="primary"
        icon="mdi-pencil"
        size="x-small"
        @click="openEditDialog(item.id)"
      ></v-btn>
      <v-btn
        class="ma-1"
        color="blue"
        icon="mdi-delete"
        size="x-small"
        @click="openDeleteDialog(item.id)"
      ></v-btn>
    </template>
  </v-data-table>
</template>

<script>
import api from "@/services/httpService";
import { vehiclesOnTask } from "@/common/config/apiConfig";
import baseRules from "@/common/rules/rules.js";

export default {
  emits: [
    "open-snackbar",
    "toggle-details",
    "toggle-add",
    "toggle-edit",
    "toggle-delete",
    "toggle-finish",
  ],
  data() {
    return {
      ...baseRules,
      vehiclesOnTask: [],
      searchText: "",
      headers: [
        { title: "Id", key: "id", align: " d-none" },
        { title: "vehicleId", key: "vehicleId", align: " d-none" },
        {
          title: "Plaka",
          align: "start",
          sortable: false,
          key: "vehiclePlate",
        },

        {
          title: "Talep Eden Departman",
          align: "start",
          key: "departmentName",
        },
        {
          title: "Görev Niteliği",
          align: "start",
          key: "taskDefinition",
        },
        {
          title: "Veriliş",
          align: "start",
          key: "givenDateFormatted",
        },

        {
          title: "",
          align: "start",
          key: "actions",
          fixed: true,
          width: "150",
          sortable: false,
        },
      ],
      snackBarMessage: "",
      isSuccess: false,
    };
  },
  methods: {
    async fetchVehiclesOnTask() {
      await api
        .get(vehiclesOnTask.url)
        .then((response) => {
          this.vehiclesOnTask = response.data.data;
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
    openAddDialog() {
      this.$emit("toggle-add");
    },
    openEditDialog(id) {
      this.$emit("toggle-edit", id);
    },
    openDetailsDialog(id) {
      this.$emit("toggle-details", id);
    },
    openDeleteDialog(id) {
      this.$emit("toggle-delete", id);
    },
    openFinishDialog(id) {
      this.$emit("toggle-finish", id);
    },
  },

  created() {
    this.fetchVehiclesOnTask();
  },
};
</script>
