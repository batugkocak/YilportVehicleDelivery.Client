<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card class="pa-2 mt-2">
      <v-form @submit.prevent="addTaskToVehicle" v-model="valid">
        <v-card elevation="2" class="pa-5 ma-2">
          <v-card-title>Araç Bilgileri</v-card-title>
          <v-autocomplete
            label="Araç Plakası"
            v-model="newVehicleOnTask.vehicleId"
            :items="vehicles"
            item-title="selectBoxValue"
            item-value="id"
            placeholder="16YH1616"
            @click="getVehicles"
            prepend-icon="mdi-card-text"
            no-data-text="Plakalar getiriliyor, lütfen bekleyin..."
            :rules="[ruleRequired]"
          />
          <v-autocomplete
            label="Sürücü"
            v-model="newVehicleOnTask.driverId"
            :items="drivers"
            item-title="selectBoxValue"
            item-value="id"
            prepend-icon="mdi-account"
            @click="getDrivers"
            no-data-text="Araç Sürücüleri getiriliyor, lütfen bekleyin..."
            :rules="[ruleRequired]"
          />
        </v-card>
        <v-card elevation="2" class="pa-5 ma-2">
          <v-card-title>Görev Detayları</v-card-title>

          <v-autocomplete
            label="Aşağıdakileri otomatik doldurmak için hazır görev seçin"
            v-model="chosenPredefinedTaskId"
            :items="predefinedTasks"
            item-title="selectBoxValue"
            item-value="id"
            @click="getPredefinedTasks"
            @update:model-value="fillWithChosenTask(chosenPredefinedTaskId)"
            prepend-icon="mdi-details"
            no-data-text="Hazır görevler getiriliyor, lütfen bekleyin..."
          />
          <v-text-field
            label="Görevin Niteliği"
            v-model="newVehicleOnTask.taskDefinition"
            prepend-icon="mdi-format-title"
            :rules="[
              ruleRequired,
              (v) => ruleMinLength(v, vehicleOnTaskRules.NAME_MIN_LENGTH),
              (v) => ruleMaxLength(v, vehicleOnTaskRules.NAME_MAX_LENGTH),
            ]"
            :counter="vehicleOnTaskRules.NAME_MAX_LENGTH"
          />
          <v-text-field
            label="Gidilen Adres"
            v-model="newVehicleOnTask.address"
            prepend-icon="mdi-map-marker"
            :rules="[
              ruleRequired,
              (v) => ruleMaxLength(v, vehicleOnTaskRules.ADDRESS_LENGTH),
            ]"
            :counter="vehicleOnTaskRules.ADDRESS_LENGTH"
          />
        </v-card>
        <v-card elevation="2" class="pa-5 ma-2">
          <v-card-title>Talep Eden</v-card-title>
          <v-autocomplete
            label="Departman"
            v-model="newVehicleOnTask.departmentId"
            :items="departments"
            item-title="selectBoxValue"
            item-value="id"
            prepend-icon="mdi-form-select"
            @click="getDepartments"
            no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
            :rules="[ruleRequired]"
          ></v-autocomplete>
          <v-text-field
            label="Yetkili"
            v-model="newVehicleOnTask.authorizedPerson"
            prepend-icon="mdi-account-tie"
            :rules="[
              (v) =>
                ruleMaxLength(v, vehicleOnTaskRules.AUTHORIZED_PERSON_LENGTH),
            ]"
            :counter="vehicleOnTaskRules.AUTHORIZED_PERSON_LENGTH"
          />
        </v-card>

        <v-row class="ma-3">
          <v-spacer />
          <v-btn color="red" @click="closeDialog"> Vazgeç </v-btn>
          <v-btn
            type="submit"
            color="success"
            class="ml-2 mr-2"
            :disabled="!valid"
            >Ekle</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import { vehiclesOnTask } from "@/common/config/apiConfig";
import {
  departments,
  vehicles,
  drivers,
  predefinedTasks,
} from "@/common/config/apiConfig";
import baseRules from "@/common/rules/rules";
import { vehicleOnTaskRules } from "@/common/constants/validations";
export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-task"],
  data() {
    return {
      vehicleOnTaskRules,
      newVehicleOnTask: {
        vehicleId: null,
        driverId: null,
        departmentId: null,
        authorizedPerson: "",
        address: "",
        taskDefinition: "",
      },
      vehicles: [],
      drivers: [],
      predefinedTasks: [],
      chosenPredefinedTaskId: null,
      departments: [],
      ...baseRules,
      addressMaxLength: 50,
      taskDefinitionMaxLength: 20,

      snackBarMessage: "",
      isSuccess: false,

      valid: false,
    };
  },
  methods: {
    async addTaskToVehicle() {
      await api
        .post(vehiclesOnTask.add, this.newVehicleOnTask)
        .then((res) => {
          this.snackBarMessage = res.data;
          this.isSuccess = true;
          this.newVehicleOnTask = {
            vehicleId: null,
            driverId: null,
            departmentId: null,
            authorizedPerson: "",
            address: "",
            taskDefinition: "",
          };
          this.chosenPredefinedTaskId = null;
          this.closeDialog();
          this.$emit("add-task");
        })
        .catch((err) => {
          this.snackBarMessage = err.response.data;
          this.isSuccess = false;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async getVehicles() {
      if (this.vehicles.length) {
        return;
      }
      await api
        .get(vehicles.selectBox)
        .then((response) => {
          this.vehicles = response.data.data;
          this.snackBarMessage = response.data.message;
          this.isSuccess = response.data.success;
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        })
        .catch(() => {
          this.isSuccess = false;
          this.snackBarMessage = "Araca görev tanımlanamadı.";
        })
        .finally(() => {
          this.snackBarMessage = "Bilinmeyen hata meydana geldi.";
        });
    },
    async getDrivers() {
      if (this.drivers.length) {
        return;
      }
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
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    async getDepartments() {
      if (this.departments.length) {
        return;
      }
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
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    async getPredefinedTasks() {
      if (this.predefinedTasks.length) {
        return;
      }
      await api
        .get(predefinedTasks.selectBox)
        .then((response) => {
          this.predefinedTasks = response.data.data;
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
    async fillWithChosenTask(taskId) {
      this.getDepartments();
      return api.get(predefinedTasks.byId(taskId)).then((result) => {
        this.newVehicleOnTask.departmentId = result.data.data.departmentId;
        this.newVehicleOnTask.address = result.data.data.address;
        this.newVehicleOnTask.taskDefinition = result.data.data.name;
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
};
</script>
