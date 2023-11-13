<template>
  <v-card width="500px" class="mr-auto">
    <the-table
      :headers="headers"
      :items="items"
      :title="title"
      :button-text="buttonText"
      @toggle-add="openAddDialog"
      @toggle-edit="openEditDialog"
      @toggle-delete="openDeleteDialog"
      @open-snackbar="openSnackbar"
    />
  </v-card>
  <brand-add-dialog
    v-model="addDialog"
    @add-brand="updateTable"
    @open-snackbar="openSnackbar"
  />
  <brand-edit-dialog
    v-model="editDialog"
    :id="selectedBrandId"
    @update-brand="updateTable"
    @open-snackbar="openSnackbar"
  />
  <brand-delete-dialog
    v-model="deleteDialog"
    :id="selectedBrandId"
    @delete-brand="updateTable"
    @open-snackbar="openSnackbar"
  />
</template>

<script>
import BrandAddDialog from "@/components/brands/BrandAddDialog";
import BrandEditDialog from "@/components/brands/BrandEditDialog";
import BrandDeleteDialog from "@/components/brands/BrandDeleteDialog";
import TheTable from "@/components/layout/TheTable.vue";

import api from "@/services/httpService";
import { brands } from "@/common/config/apiConfig";

export default {
  components: {
    TheTable,
    BrandAddDialog,
    BrandEditDialog,
    BrandDeleteDialog,
  },
  data() {
    return {
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      selectedBrandId: 0,

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
      items: [],
      title: "MARKALAR",
      buttonText: "Marka Ekle",
    };
  },
  methods: {
    openAddDialog() {
      this.addDialog = true;
    },
    openEditDialog(id) {
      this.selectedBrandId = id;
      this.editDialog = true;
    },
    openDeleteDialog(id) {
      this.selectedBrandId = id;
      this.deleteDialog = true;
    },
    openSnackbar(isSuccess, message) {
      this.$root.snackBar.show({
        isSuccess: isSuccess,
        message: message,
      });
    },
    updateTable() {
      this.fetchBrands();
    },
    async fetchBrands() {
      this.isTableLoading = true;
      await api
        .get(brands.forTable)
        .then((response) => {
          this.items = response.data.data;
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
  },
  created() {
    this.fetchBrands();
  },
};
</script>
