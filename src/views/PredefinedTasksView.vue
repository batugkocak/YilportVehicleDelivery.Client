<template>
  <predefined-task-table
    @toggle-add="openAddDialog"
    @open-snackbar="openSnackbar"
    ref="taskTable"
  ></predefined-task-table>
  <add-task-dialog
    v-model="addDialog"
    @add-task="updateTable"
    @open-snackbar="openSnackbar"
  ></add-task-dialog>
</template>

<script>
import PredefinedTaskTable from "@/components/predefinedTasks/PredefinedTaskTable";
import AddTaskDialog from "@/components/predefinedTasks/AddTaskDialog";

export default {
  components: {
    PredefinedTaskTable,
    AddTaskDialog,
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
      this.$refs.taskTable.fetchPredefinedTasks();
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
