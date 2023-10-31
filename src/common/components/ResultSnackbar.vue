<template>
  <v-snackbar v-model="showSnackbar" :color="snackBarColor" :timeout="timer">
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
      timer: 2500,
    };
  },
  methods: {
    show(data) {
      this.isSuccess = data.isSuccess;
      this.message = data.message;
      this.showSnackbar = true;
      this.timer = data.timer || 2000;
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
};
</script>
