<template>
  <vehicles-table
    @toggle-add="openAddDialog"
    @toggle-detail="openDetailsDialog"
    @toggle-edit="openEditDialog"
    @toggle-delete="openDeleteDialog"
    @open-snackbar="openSnackbar"
    ref="vehicleTable"
  />


  <vehicle-details-dialog v-model="detailDialog" :id="selectedVehicleId" />
  <vehicle-add-dialog
    v-model="addDialog"
    @open-snackbar="openSnackbar"
    @add-vehicle="updateTable"
  />
  <vehicle-edit-dialog
    v-model="editDialog"
    :id="selectedVehicleId"
    @update-vehicle="updateTable"
    @open-snackbar="openSnackbar"
  />
  <vehicle-delete-dialog
    v-model="deleteDialog"
    :id="selectedVehicleId"
    @delete-vehicle="updateTable"
    @open-snackbar="openSnackbar"
  />
</template>

<script>
import VehiclesTable from "@/components/vehicles/VehiclesTable.vue";
import VehicleDetailsDialog from "@/components/vehicles/VehicleDetailsDialog.vue";
import VehicleAddDialog from "@/components/vehicles/VehicleAddDialog.vue";
import VehicleEditDialog from "@/components/vehicles/VehicleEditDialog.vue";
import VehicleDeleteDialog from "@/components/vehicles/VehicleDeleteDialog.vue";

export default {
  components: {
    VehiclesTable,
    VehicleDetailsDialog,
    VehicleAddDialog,
    VehicleEditDialog,
    VehicleDeleteDialog,
  },
  data() {
    return {
      detailDialog: false,
      addDialog: false,
      editDialog: false,
      deleteDialog: false,

      selectedVehicleId: 0,
    };
  },
  methods: {
    openAddDialog() {
      this.addDialog = true;
    },
    openDetailsDialog(id) {
      this.selectedVehicleId = id;
      this.detailDialog = true;
    },
    openEditDialog(id) {
      this.selectedVehicleId = id;
      this.editDialog = true;
    },
    openDeleteDialog(id) {
      this.selectedVehicleId = id;
      this.deleteDialog = true;
    },
    openSnackbar(isSuccess, message) {
      this.$root.snackBar.show({
        isSuccess: isSuccess,
        message: message,
      });
    },
    updateTable() {
      this.$refs.vehicleTable.fetchVehicles();
    },
  },
};
</script>
