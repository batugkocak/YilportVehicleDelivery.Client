<template>
  <vehicles-on-task-archive-table
    @toggle-details="openDetailsDialog"
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
