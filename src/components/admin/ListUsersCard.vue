<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-card class="pa-5 mt-2" title="Kullanıcılar" elevation="0">
    <v-data-table
      :headers="headers"
      :items="users"
      height="460px"
      density="compact"
      no-data-text="Kullanıcı bulunamadı"
    >
      <template v-slot:bottom></template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          class="ma-1"
          color="blue"
          icon="mdi-delete"
          size="small"
          @click="openDeleteDialog(item.id)"
        ></v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import api from "@/services/httpService";
import { users } from "@/common/config/apiConfig";

export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "toggle-delete"],
  data() {
    return {
      users: [],
      roles: [
        {
          name: "Sürücü",
          value: 1,
        },
        {
          name: "İdari İşler",
          value: 2,
        },
      ],
      headers: [
        {
          title: "Kullanıcı Adı",
          align: "start",
          sortable: false,
          key: "username",
        },
        {
          title: "Ad",
          align: "start",
          sortable: false,
          key: "firstName",
        },

        {
          title: "Soyad",
          align: "start",
          sortable: false,
          key: "lastName",
        },
        {
          title: "Rol",
          align: "start",
          sortable: false,
          key: "role",
        },
        {
          title: "Doğrulama Türü",
          align: "start",
          sortable: false,
          key: "verificationType",
        },
        {
          title: "",
          key: "actions",
          align: "start",
          sortable: false,
          fixed: true,
          width: 1,
        },
      ],

      isSuccess: false,
      snackBarMessage: "",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async getUsers() {
      await api.get(users.forTable).then((respond) => {
        this.users = respond.data.data;
      });
    },
    trimInserts() {
      this.newUser.firstName = this.newUser.firstName.trim();
      this.newUser.lastName = this.newUser.lastName.trim();
      this.newUser.username = this.newUser.username.trim();
    },
    openDeleteDialog(id) {
      this.$emit("toggle-delete", id);
    },
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set() {
        this.closeDialog();
      },
    },
  },
  created() {
    this.getUsers();
  },
};
</script>
