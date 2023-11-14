<template>
  <v-card width="400px" elevation="5">
    <add-user-card></add-user-card>
  </v-card>
</template>

<script>
import AddUserCard from "@/components/admin/AddUserCard.vue";
export default {
  components: {
    AddUserCard,
  },
};
</script>
