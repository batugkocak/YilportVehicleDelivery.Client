<template>
  <vehicles-table></vehicles-table>
  <v-btn @click="openSnackbar"> Show Snackbar! </v-btn>
</template>

<script>
import VehiclesTable from "@/components/vehicles/VehiclesTable.vue";

export default {
  components: {
    VehiclesTable,
  },
  data() {
    return {
      showSnackbar: false,
    };
  },
  methods: {
    openSnackbar() {
      this.$root.snackBar.show({
        isSuccess: true,
        message: "testtt",
        isShown: true,
      });
    },
  },
};
</script>
