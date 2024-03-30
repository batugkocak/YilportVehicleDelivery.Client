<template>
  <v-dialog v-model="dialog" v-if="vehicleOnTask" max-width="600">
    <v-card
      prepend-icon="mdi-car"
      :title="vehicleOnTask.vehiclePlate"
      :subtitle="vehicleOnTask.taskDefinition"
      hover
      class="pa-5 ma-2"
    >
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
            <v-card-text>{{ authorizedPersonComputed }}</v-card-text>
          </div>
        </div>

        <v-divider />

        <div class="space-between">
          <div class="d-flex align-center">
            <v-icon icon="mdi-calendar-range" />
            <div>
              <v-card-title> Veriliş Tarihi </v-card-title>
              <v-card-text>{{ vehicleOnTask.givenDateFormatted }}</v-card-text>
            </div>
          </div>
          <div class="d-flex align-center">
            <v-icon icon="mdi-calendar-range-outline" />
            <div>
              <v-card-title> Dönüş Tarihi </v-card-title>
              <v-card-text>{{ vehicleOnTask.returnDateFormatted }}</v-card-text>
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
        .get(vehiclesOnTask.byIdDetails(this.id))
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
    authorizedPersonComputed() {
      if (this.vehicleOnTask.authorizedPerson === "") return "-";
      else return this.vehicleOnTask.authorizedPerson;
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

<style scoped>
.space-between {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px 0;
}
</style>
