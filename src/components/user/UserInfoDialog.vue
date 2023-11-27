<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card
      class="pa-2"
      prepend-icon="mdi-account-details"
      :title="username"
      subtitle="Kullanıcı Bilgileri"
      hover
    >
      <v-card elevation="1" class="pa-5 mt-2">
        <div :class="cardContentStyling">
          <v-icon icon="mdi-account" />
          <div>
            <v-card-title> Ad Soyad: </v-card-title>
            <v-card-text>{{ name }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <v-divider />
        <div :class="cardContentStyling">
          <v-icon icon="mdi-timer-sand-full" />
          <div>
            <v-card-title> Giriş Tarihi </v-card-title>
            <v-card-text>{{ loginTime }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div :class="cardContentStyling">
          <v-icon icon="mdi-timer-sand-empty" />
          <div>
            <v-card-title> Yetki Bitiş Tarihi: </v-card-title>
            <v-card-text>{{ expTime }}</v-card-text>
          </div>
        </div>
        <v-divider />
      </v-card>
      <v-card-actions>
        <v-btn color="primary" @click="closeDialog">Kapat</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  getUserName,
  getName,
  getExpirationTime,
  getLoginTime,
} from "@/services/authService";
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
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
  data() {
    return {
      expTime: "",
      loginTime: "",
      name: "",
      username: "",
      cardContentStyling: "d-flex align-center",
    };
  },
  watch: {
    dialog: {
      handler(newValue) {
        if (newValue) {
          const token = localStorage.getItem("jwt");
          this.name = getName(token).name;
          this.username = getUserName(token).username;
          this.loginTime = getLoginTime(token);
          this.expTime = getExpirationTime(token);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
.scroll {
  overflow-y: scroll;
}
</style>
