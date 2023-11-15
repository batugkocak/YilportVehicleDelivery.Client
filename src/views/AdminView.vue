<template>
  <v-row align="center">
    <v-col cols="4">
      <v-card elevation="10" height="550px">
        <add-user-card @add-user="refreshTable" @open-snackbar="showSnackbar">
        </add-user-card>
      </v-card>
    </v-col>
    <v-col cols="8" v-role="`[admin]`">
      <v-card elevation="10" height="550px">
        <list-users-card @toggle-delete="openDeleteDialog" ref="usersTable" />
      </v-card>
    </v-col>
  </v-row>
  <user-delete-dialog
    v-model="deleteDialog"
    :id="selectedUserId"
    @delete-user="refreshTable"
    @open-snackbar="showSnackbar"
  ></user-delete-dialog>
</template>

<script>
import AddUserCard from "@/components/admin/AddUserCard.vue";
import ListUsersCard from "@/components/admin/ListUsersCard";
import UserDeleteDialog from "@/components/admin/UserDeleteDialog.vue";
export default {
  components: {
    AddUserCard,
    ListUsersCard,
    UserDeleteDialog,
  },
  methods: {
    openDeleteDialog(id) {
      this.selectedUserId = id;
      this.deleteDialog = true;
    },
    refreshTable() {
      this.$refs.usersTable.getUsers();
    },
    showSnackbar(isSuccess, message, time) {
      this.$root.snackBar.show({
        isSuccess: isSuccess,
        message: message,
        timer: time,
      });
    },
  },
  data() {
    return {
      deleteDialog: false,
      selectedUserId: null,
    };
  },
};
</script>
