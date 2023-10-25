<template>
  <vehicles-table
    @toggle-detail="openDetails"
    @open-snackbar="openSnackbar"
  ></vehicles-table>
  <vehicle-detail-dialog
    v-model="detailDialog"
    :id="selectedVehicleId"
  ></vehicle-detail-dialog>
</template>

<script>
import VehicleDetailDialog from "@/components/vehicles/VehicleDetailDialog.vue";
import VehiclesTable from "@/components/vehicles/VehiclesTable.vue";

export default {
  components: {
    VehiclesTable,
    VehicleDetailDialog,
  },
  data() {
    return {
      detailDialog: false,
      selectedVehicleId: 0,
    };
  },
  methods: {
    openDetails(id) {
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
