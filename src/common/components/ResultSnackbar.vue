<template>
  <v-snackbar v-model="showSnackbar" :color="snackBarColor">
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: "base-snackbar",
  data() {
    return {
      showSnackbar: false,
      message: "",
      isSuccess: false,
      timer: 3000,
    };
  },
  methods: {
    show(data) {
      this.isSuccess = data.isSuccess;
      this.message = data.message;
      this.showSnackbar = true;
    },
  },
  computed: {
    snackBarColor() {
      if (this.isSuccess) {
        return "success";
      } else {
        return "error";
      }
    },
  },
  watch() {},
};
</script>
