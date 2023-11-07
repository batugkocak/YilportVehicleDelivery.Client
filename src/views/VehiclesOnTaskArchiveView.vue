<template>
  <vehicles-on-task-archive-table
    @toggle-details="openDetailsDialog"
    @open-snackbar="openSnackbar"
  />
  <vehicles-on-task-archive-details-dialog
    :id="selectedVehicleId"
    v-model="detailDialog"
  >
  </vehicles-on-task-archive-details-dialog>
</template>

<script>
import VehiclesOnTaskArchiveTable from "@/components/vehiclesOnTaskArchive/VehiclesOnTaskArchiveTable.vue";
import VehiclesOnTaskArchiveDetailsDialog from "@/components/vehiclesOnTaskArchive/VehiclesOnTaskArchiveDetailsDialog.vue";

export default {
  components: {
    VehiclesOnTaskArchiveTable,
    VehiclesOnTaskArchiveDetailsDialog,
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
    openDetailsDialog(id) {
      this.selectedVehicleId = id;
      this.detailDialog = true;
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
