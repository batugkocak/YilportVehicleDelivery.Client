<template>
  <v-card width="510px" class="mr-auto">
    <the-table
      :headers="headers"
      :items="items"
      :title="title"
      :button-text="buttonText"
      @toggle-add="openAddDialog"
      @toggle-edit="openEditDialog"
      @toggle-delete="openDeleteDialog"
    />
  </v-card>
  <departments-add-dialog
    v-model="addDialog"
    @add-department="updateTable"
    @open-snackbar="openSnackbar"
  />
  <departments-edit-dialog
    v-model="editDialog"
    :id="selectedDepartmentId"
    @update-department="updateTable"
    @open-snackbar="openSnackbar"
  />
  <departments-delete-dialog
    v-model="deleteDialog"
    :id="selectedDepartmentId"
    @delete-department="updateTable"
    @open-snackbar="openSnackbar"
  />
</template>

<script>
import TheTable from "@/components/layout/TheTable";

import DepartmentsAddDialog from "@/components/departments/DepartmentAddDialog";
import DepartmentsEditDialog from "@/components/departments/DepartmentEditDialog";
import DepartmentsDeleteDialog from "@/components/departments/DepartmentDeleteDialog";

import api from "@/services/httpService";
import { departments } from "@/common/config/apiConfig";
export default {
  components: {
    TheTable,
    DepartmentsAddDialog,
    DepartmentsEditDialog,
    DepartmentsDeleteDialog,
  },
  data() {
    return {
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      selectedDepartmentId: 0,

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
      title: "DEPARTMANLAR",
      buttonText: "Departman Ekle",
    };
  },
  methods: {
    openAddDialog() {
      this.addDialog = true;
    },
    openEditDialog(id) {
      this.selectedDepartmentId = id;
      this.editDialog = true;
    },
    openDeleteDialog(id) {
      this.selectedDepartmentId = id;
      this.deleteDialog = true;
    },
    openSnackbar(isSuccess, message) {
      this.$root.snackBar.show({
        isSuccess: isSuccess,
        message: message,
      });
    },
    updateTable() {
      this.fetchDepartments();
    },
    async fetchDepartments() {
      this.isTableLoading = true;
      await api
        .get(departments.forTable)
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
    this.fetchDepartments();
  },
};
</script>
