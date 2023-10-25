<template>
  <vehicles-table
    @toggle-add="openAdd"
    @toggle-detail="openDetails"
    @open-snackbar="openSnackbar"
  />
  <vehicle-detail-dialog v-model="detailDialog" :id="selectedVehicleId" />
  <vehicle-add-dialog v-model="addDialog" />
</template>

<script>
import VehiclesTable from "@/components/vehicles/VehiclesTable.vue";
import VehicleDetailDialog from "@/components/vehicles/VehicleDetailDialog.vue";
import VehicleAddDialog from "@/components/vehicles/VehicleAddDialog.vue";

export default {
  components: {
    VehiclesTable,
    VehicleDetailDialog,
    VehicleAddDialog,
  },
  data() {
    return {
      detailDialog: false,
      addDialog: false,

      selectedVehicleId: 0,
    };
  },
  methods: {
    openDetails(id) {
      this.selectedVehicleId = id;
      this.detailDialog = true;
    },
    openAdd() {
      this.addDialog = true;
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
