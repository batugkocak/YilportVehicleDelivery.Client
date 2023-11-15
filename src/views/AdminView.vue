<template>
  <v-row align="center">
    <v-col cols="4">
      <v-card elevation="10" height="550px">
        <add-user-card></add-user-card>
      </v-card>
    </v-col>
    <v-col cols="8" v-role="`[admin]`">
      <v-card elevation="10" height="550px">
        <list-users-card />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AddUserCard from "@/components/admin/AddUserCard.vue";
import ListUsersCard from "@/components/admin/ListUsersCard";
export default {
  components: {
    AddUserCard,
    ListUsersCard,
  },
};
</script>
