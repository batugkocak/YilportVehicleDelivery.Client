<template>
  <v-card width="500px" class="mr-auto">
    <owners-table
      @toggle-add="openAddDialog"
      @toggle-edit="openEditDialog"
      @toggle-delete="openDeleteDialog"
      @open-snackbar="openSnackbar"
      ref="ownerTable"
    />
  </v-card>
  <owner-add-dialog
    v-model="addDialog"
    @add-owner="updateTable"
    @open-snackbar="openSnackbar"
  />
  <owner-edit-dialog
    v-model="editDialog"
    :id="selectedOwnerId"
    @update-owner="updateTable"
    @open-snackbar="openSnackbar"
  />
  <owner-delete-dialog
    v-model="deleteDialog"
    :id="selectedOwnerId"
    @delete-owner="updateTable"
    @open-snackbar="openSnackbar"
  />
</template>

<script>
import OwnersTable from "@/components/owners/OwnersTable";
import OwnerAddDialog from "@/components/owners/OwnerAddDialog";
import OwnerEditDialog from "@/components/owners/OwnerEditDialog";
import OwnerDeleteDialog from "@/components/owners/OwnerDeleteDialog";

export default {
  components: {
    OwnersTable,
    OwnerAddDialog,
    OwnerEditDialog,
    OwnerDeleteDialog,
  },
  data() {
    return {
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      selectedOwnerId: 0,
    };
  },
  methods: {
    openAddDialog() {
      this.addDialog = true;
    },
    openEditDialog(id) {
      this.selectedOwnerId = id;
      this.editDialog = true;
    },
    openDeleteDialog(id) {
      this.selectedOwnerId = id;
      this.deleteDialog = true;
    },
    openSnackbar(isSuccess, message) {
      this.$root.snackBar.show({
        isSuccess: isSuccess,
        message: message,
      });
    },
    updateTable() {
      this.$refs.ownerTable.fetchOwners();
    },
  },
};
</script>
