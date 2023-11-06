<template>
  <drivers-table
    @toggle-add="openAddDialog"
    @open-snackbar="openSnackbar"
    ref="driverTable"
  />
  <add-driver-dialog
    v-model="addDialog"
    @add-task="updateTable"
    @open-snackbar="openSnackbar"
  />
</template>

<script>
import DriversTable from "@/components/drivers/DriversTable";
import AddDriverDialog from "@/components/drivers/AddDriverDialog";

export default {
  components: {
    DriversTable,
    AddDriverDialog,
  },
  data() {
    return {
      addDialog: false,
    };
  },
  methods: {
    openAddDialog() {
      this.addDialog = true;
    },
    updateTable() {
      this.$refs.driverTable.fetchDrivers();
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

<style></style>
