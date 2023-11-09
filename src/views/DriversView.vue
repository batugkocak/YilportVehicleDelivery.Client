<template>
  <drivers-table
    @toggle-add="openAddDialog"
    @toggle-delete="openDeleteDialog"
    @toggle-edit="openEditDialog"
    @open-snackbar="openSnackbar"
    ref="driverTable"
  />
  <driver-add-dialog
    v-model="addDialog"
    @add-driver="updateTable"
    @open-snackbar="openSnackbar"
  />
  <driver-edit-dialog
    v-model="editDialog"
    :id="selectedDriverId"
    @update-owner="updateTable"
    @open-snackbar="openSnackbar"
  />
  <driver-delete-dialog
    v-model="deleteDialog"
    :id="selectedDriverId"
    @delete-driver="updateTable"
    @open-snackbar="openSnackbar"
  />
</template>

<script>
import DriversTable from "@/components/drivers/DriversTable.vue";
import DriverAddDialog from "@/components/drivers/DriverAddDialog.vue";
import DriverDeleteDialog from "@/components/drivers/DriverDeleteDialog.vue";
import DriverEditDialog from "@/components/drivers/DriverEditDialog.vue";

export default {
  components: {
    DriversTable,
    DriverAddDialog,
    DriverDeleteDialog,
    DriverEditDialog,
  },
  data() {
    return {
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      selectedDriverId: 0,
    };
  },
  methods: {
    openAddDialog() {
      this.addDialog = true;
    },
    openEditDialog(id) {
      this.selectedDriverId = id;
      this.editDialog = true;
    },
    openDeleteDialog(id) {
      this.selectedDriverId = id;
      this.deleteDialog = true;
    },
    openSnackbar(isSuccess, message) {
      this.$root.snackBar.show({
        isSuccess: isSuccess,
        message: message,
      });
    },
    updateTable() {
      this.$refs.driverTable.fetchDrivers();
    },
  },
};
</script>

<style></style>
