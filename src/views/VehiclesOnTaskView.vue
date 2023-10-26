<template>
  <vehicles-on-task-table
    @toggle-add="openAddDialog"
    @toggle-details="openDetailsDialog"
    @toggle-edit="openEditDialog"
    @toggle-delete="openDeleteDialog"
    @toggle-finish="openFinishDialog"
    @open-snackbar="openSnackbar"
  />
  <vehicles-on-task-add-dialog
    @open-snackbar="openSnackbar"
    v-model="addDialog"
  />
  <vehicles-on-task-details-dialog
    @open-snackbar="openSnackbar"
    v-model="detailDialog"
    :id="selectedVehicleId"
  />
  <vehicles-on-task-finish-dialog
    v-model="finishDialog"
    :id="selectedVehicleId"
  />
  <vehicles-on-task-edit-dialog v-model="editDialog" :id="selectedVehicleId" />
  <vehicles-on-task-delete-dialog
    v-model="deleteDialog"
    :id="selectedVehicleId"
  />

  <router-view />
</template>

<script>
import VehiclesOnTaskTable from "@/components/vehiclesOnTask/VehiclesOnTaskTable.vue";
import VehiclesOnTaskAddDialog from "@/components/vehiclesOnTask/VehiclesOnTaskAddDialog.vue";
import VehiclesOnTaskDetailsDialog from "@/components/vehiclesOnTask/VehiclesOnTaskDetailsDialog.vue";
import VehiclesOnTaskFinishDialog from "@/components/vehiclesOnTask/VehiclesOnTaskFinishDialog.vue";
import VehiclesOnTaskEditDialog from "@/components/vehiclesOnTask/VehiclesOnTaskEditDialog.vue";
import VehiclesOnTaskDeleteDialog from "@/components/vehiclesOnTask/VehiclesOnTaskDeleteDialog.vue";

export default {
  components: {
    VehiclesOnTaskTable,
    VehiclesOnTaskAddDialog,
    VehiclesOnTaskDetailsDialog,
    VehiclesOnTaskFinishDialog,
    VehiclesOnTaskEditDialog,
    VehiclesOnTaskDeleteDialog,
  },
  data() {
    return {
      detailDialog: false,
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      finishDialog: false,

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
    openFinishDialog(id) {
      this.selectedVehicleId = id;
      this.finishDialog = true;
    },
    openSnackbar(isSuccess, message) {
      this.$root.snackBar.show({
        isSuccess: isSuccess,
        message: message,
      });
    },
  },
};
</script>
