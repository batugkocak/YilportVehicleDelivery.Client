<template>
  <predefined-tasks-table
    @toggle-add="openAddDialog"
    @toggle-delete="openDeleteDialog"
    @toggle-edit="openEditDialog"
    @open-snackbar="openSnackbar"
    ref="taskTable"
  />
  <predefined-task-add-dialog
    v-model="addDialog"
    @add-task="updateTable"
    @open-snackbar="openSnackbar"
  />
  <predefined-tasks-edit-dialog
    v-model="editDialog"
    :id="selectedPredefinedTaskId"
    @update-task="updateTable"
    @open-snackbar="openSnackbar"
  />
  <predefined-tasks-delete-dialog
    v-model="deleteDialog"
    :id="selectedPredefinedTaskId"
    @delete-task="updateTable"
    @open-snackbar="openSnackbar"
  />
</template>

<script>
import PredefinedTasksTable from "@/components/predefinedTasks/PredefinedTasksTable.vue";
import PredefinedTaskAddDialog from "@/components/predefinedTasks/PredefinedTaskAddDialog.vue";
import PredefinedTasksEditDialog from "@/components/predefinedTasks/PredefinedTasksEditDialog.vue";
import PredefinedTasksDeleteDialog from "@/components/predefinedTasks/PredefinedTasksDeleteDialog.vue";

export default {
  components: {
    PredefinedTasksTable,
    PredefinedTaskAddDialog,
    PredefinedTasksEditDialog,
    PredefinedTasksDeleteDialog,
  },
  data() {
    return {
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      selectedPredefinedTaskId: 0,
    };
  },
  methods: {
    openAddDialog() {
      this.addDialog = true;
    },
    openEditDialog(id) {
      this.selectedPredefinedTaskId = id;
      this.editDialog = true;
    },
    openDeleteDialog(id) {
      this.selectedPredefinedTaskId = id;
      this.deleteDialog = true;
    },
    openSnackbar(isSuccess, message) {
      this.$root.snackBar.show({
        isSuccess: isSuccess,
        message: message,
      });
    },
    updateTable() {
      this.$refs.taskTable.fetchPredefinedTasks();
    },
  },
};
</script>
