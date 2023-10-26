<template>
  <v-dialog v-model="dialog" v-if="vehicleOnTask" max-width="500">
    <v-card
      prepend-icon="mdi-car"
      :title="vehicleOnTask.vehiclePlate"
      :subtitle="vehicleOnTask.taskDefinition"
      hover
      class="pa-5 ma-2"
    >
      <v-card-text style="float: right; margin-right: 0"></v-card-text>

      <v-card elevation="3" class="pa-5 ma-2">
        <div class="d-flex align-center">
          <v-icon icon="mdi-account" />
          <div>
            <v-card-title> Sürücü </v-card-title>
            <v-card-text>{{ vehicleOnTask.driverName }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div class="d-flex align-center">
          <v-icon icon="mdi-map-marker" />
          <div>
            <v-card-title> Adres </v-card-title>
            <v-card-text>{{ vehicleOnTask.address }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div class="d-flex align-center">
          <v-icon icon="mdi-form-select" />
          <div>
            <v-card-title> Talep Eden Departman </v-card-title>
            <v-card-text>{{ vehicleOnTask.departmentName }}</v-card-text>
          </div>
        </div>

        <v-divider />

        <div class="d-flex align-center">
          <v-icon icon="mdi-account-tie" />
          <div>
            <v-card-title> Yetkili Kişi </v-card-title>
            <v-card-text>{{ vehicleOnTask.authorizedPerson }}</v-card-text>
          </div>
        </div>

        <v-divider />

        <div class="space-between">
          <div class="d-flex align-center">
            <v-icon icon="mdi-calendar-range" />
            <div>
              <v-card-title> Veriliş Tarihi </v-card-title>
              <v-card-text>{{ getDate(vehicleOnTask.givenDate) }}</v-card-text>
            </div>
          </div>
          <div class="d-flex align-center">
            <v-icon icon="mdi-timer-sand-full" />
            <div>
              <v-card-title> Veriliş Saati </v-card-title>
              <v-card-text>{{ getHour(vehicleOnTask.givenDate) }}</v-card-text>
            </div>
          </div>
        </div>

        <div class="space-between">
          <div class="d-flex align-center">
            <v-icon icon="mdi-calendar-range-outline" />
            <div>
              <v-card-title> Dönüş Tarihi </v-card-title>
              <v-card-text>{{ getDate(vehicleOnTask.returnDate) }}</v-card-text>
            </div>
          </div>
          <div class="d-flex align-center">
            <v-icon icon="mdi-timer-sand-empty" />
            <div>
              <v-card-title> Dönüş Saati </v-card-title>
              <v-card-text>{{ getHour(vehicleOnTask.returnDate) }}</v-card-text>
            </div>
          </div>
        </div>
      </v-card>
      <v-card-actions>
        <v-btn color="primary" block @click="closeDialog">Kapat</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import { vehiclesOnTask } from "@/common/config/apiConfig";

export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar"],
  data() {
    return {
      vehicleOnTask: null,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async getVehicle() {
      await api
        .get(vehiclesOnTask.byId(this.id))
        .then((response) => {
          this.vehicleOnTask = response.data.data;
          this.snackBarMessage = response.data.message;
          this.isSuccess = response.data.success;
        })
        .catch(() => {
          this.snackBarMessage = "Bilinmeyen hata meydana geldi.";
          this.isSuccess = false;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    getHour(fullDate) {
      if (fullDate === "0001-01-01T00:00:00") {
        return "-";
      }
      return fullDate.split("T")[1];
    },
    getDate(fullDate) {
      if (fullDate === "0001-01-01T00:00:00") {
        return "-";
      }

      const oldDate = new Date(fullDate.split("T")[0]);

      const newDate =
        (oldDate.getDate() < 10 ? "0" : "") +
        oldDate.getDate() +
        "-" +
        (oldDate.getMonth() + 1 < 10 ? "0" : "") +
        (oldDate.getMonth() + 1) +
        "-" +
        oldDate.getFullYear();

      return newDate;
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
  watch: {
    dialog: {
      handler(newValue) {
        if (newValue) {
          this.getVehicle();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
.space-between {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px 0;
}
</style>
