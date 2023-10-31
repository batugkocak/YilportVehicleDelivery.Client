<template>
  <vehicles-on-task-archive-table
    @toggle-add="openAddDialog"
    @toggle-details="openDetailsDialog"
    @toggle-edit="openEditDialog"
    @toggle-delete="openDeleteDialog"
    @toggle-finish="openFinishDialog"
    @open-snackbar="openSnackbar"
  />
</template>

<script>
import VehiclesOnTaskArchiveTable from "@/components/vehiclesOnTaskArchive/VehiclesOnTaskArchiveTable.vue";

export default {
  components: {
    VehiclesOnTaskArchiveTable,
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
