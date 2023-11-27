<template>
  <v-dialog v-model="dialog" max-width="600px" v-if="fetchedVehicleOnTask">
    <v-card class="dialogCard" elevation="2">
      <v-form v-model="valid" @submit.prevent="editTaskOfVehicle">
        <v-card elevation="2" class="dialogCard">
          <v-card-title>Sürücü</v-card-title>
          <!-- <v-autocomplete
            label="Araç Plakası"
            v-model="fetchedVehicleOnTask.vehicleId"
            :items="vehicles"
            item-title="selectBoxValue"
            item-value="id"
            placeholder="16YH1616"
            prepend-icon="mdi-card-text"
            no-data-text="Plakalar getiriliyor, lütfen bekleyin..."
            :rules="[ruleRequired]"
          /> -->
          <v-autocomplete
            label="Sürücü"
            v-model="fetchedVehicleOnTask.driverId"
            :items="drivers"
            item-title="selectBoxValue"
            item-value="id"
            prepend-icon="mdi-account"
            no-data-text="Araç Sürücüleri getiriliyor, lütfen bekleyin..."
            :rules="[ruleRequired]"
          />
        </v-card>
        <v-card elevation="2" class="dialogCard">
          <v-card-title>Görev Detayları</v-card-title>
          <v-text-field
            label="Görevin Niteliği"
            v-model="fetchedVehicleOnTask.taskDefinition"
            prepend-icon="mdi-details"
            :rules="[
              ruleRequired,
              (v) => ruleMinLength(v, vehicleOnTaskRules.NAME_MIN_LENGTH),
              (v) => ruleMaxLength(v, vehicleOnTaskRules.NAME_MAX_LENGTH),
            ]"
            :counter="vehicleOnTaskRules.NAME_MAX_LENGTH"
          />
          <v-text-field
            label="Gidilen Adres"
            v-model="fetchedVehicleOnTask.address"
            prepend-icon="mdi-details"
            :rules="[
              ruleRequired,
              (v) => ruleMaxLength(v, vehicleOnTaskRules.ADDRESS_LENGTH),
            ]"
            :counter="vehicleOnTaskRules.ADDRESS_LENGTH"
          />
        </v-card>
        <v-card elevation="2" class="dialogCard">
          <v-card-title>Talep Eden</v-card-title>
          <v-autocomplete
            label="Departman"
            v-model="fetchedVehicleOnTask.departmentId"
            :items="departments"
            item-title="selectBoxValue"
            item-value="id"
            prepend-icon="mdi-form-select"
            no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
            :rules="[ruleRequired]"
          ></v-autocomplete>
          <v-text-field
            label="Yetkili"
            v-model="fetchedVehicleOnTask.authorizedPerson"
            prepend-icon="mdi-account-tie"
            :rules="[
              (v) =>
                ruleMaxLength(v, vehicleOnTaskRules.AUTHORIZED_PERSON_LENGTH),
            ]"
            :counter="vehicleOnTaskRules.AUTHORIZED_PERSON_LENGTH"
          />
        </v-card>
        <v-row class="mt-5">
          <v-spacer />
          <v-btn color="red" @click="closeDialog"> Vazgeç </v-btn>
          <v-btn type="submit" color="success" class="ml-5 mr-5">Düzenle</v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import {
  vehiclesOnTask,
  drivers,
  vehicles,
  departments,
} from "@/common/config/apiConfig";
import baseRules from "@/common/rules/rules";
import { vehicleOnTaskRules } from "@/common/constants/validations";
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar"],
  data() {
    return {
      vehicleOnTaskRules,
      valid: false,

      fetchedVehicleOnTask: null,

      vehicles: [],
      drivers: [],
      departments: [],

      addressMaxLength: 50,
      taskDefinitionMaxLength: 20,

      snackBarMessage: "",
      isSuccess: false,
      ...baseRules,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async fetchVehicleOnTask() {
      await api.get(vehiclesOnTask.get(this.id)).then((response) => {
        console.log(response.data.data);
        this.fetchedVehicleOnTask = response.data.data;
      });
    },

    async editTaskOfVehicle() {
      await api
        .update(vehiclesOnTask.editUrl, this.fetchedVehicleOnTask)
        .then((response) => {
          this.snackBarMessage = response.data;
          this.isSuccess = true;
          this.$emit("update-task");
          this.closeDialog();
        })
        .catch(() => {
          this.snackBarMessage = "Bir hata meydana geldi";
          this.isSuccess = false;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },

    async fetchVehicle() {
      await api
        .get(vehicles.byId(this.fetchedVehicleOnTask.vehicleId))
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getDrivers() {
      await api
        .get(drivers.selectBox)
        .then((response) => {
          this.drivers = response.data.data;
          this.snackBarMessage = response.data.message;
          this.isSuccess = response.data.success;
        })
        .catch(() => {
          this.snackBarMessage = "Bilinmeyen hata meydana geldi.";
          this.isSuccess = false;
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    async getDepartments() {
      await api
        .get(departments.selectBox)
        .then((response) => {
          this.departments = response.data.data;
          this.snackBarMessage = response.data.message;
          this.isSuccess = response.data.success;
        })
        .catch(() => {
          this.snackBarMessage = "Bilinmeyen hata meydana geldi.";
          this.isSuccess = false;
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
  },
  watch: {
    dialog: {
      handler(newValue) {
        if (newValue) {
          this.getDepartments();
          this.getDrivers();
          this.fetchVehicleOnTask();
          this.fetchVehicle();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.dialogCard {
  margin: 1%;
  padding: 3%;
  height: 60%;
  overflow: auto;
}
.space-between {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px 0;
}
</style>
