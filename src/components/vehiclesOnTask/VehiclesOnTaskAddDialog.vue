<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="pa-2 mt-2">
      <v-form @submit.prevent="addTaskToVehicle" v-model="valid">
        <v-card elevation="2" class="pa-5 ma-2">
          <v-card-title>Araç Bilgileri</v-card-title>
          <v-autocomplete
            label="Araç Plakası"
            v-model="newVehicleOnTask.vehicleId"
            :items="vehicles"
            item-title="plate"
            item-value="id"
            placeholder="16YH1616"
            @click="getVehicles"
            prepend-icon="mdi-card-text"
            no-data-text="Plakalar getiriliyor, lütfen bekleyin..."
            :rules="[ruleRequired]"
          />
          <v-select
            label="Sürücü"
            v-model="newVehicleOnTask.driverId"
            :items="drivers"
            item-title="name"
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
            item-title="name"
            item-value="id"
            @click="getPredefinedTasks"
            @update:model-value="fillWithChosenTask(chosenPredefinedTaskId)"
            prepend-icon="mdi-details"
            no-data-text="Hazır görevler getiriliyor, lütfen bekleyin..."
          />
          <v-text-field
            label="Görevin Niteliği"
            v-model="newVehicleOnTask.taskDefinition"
            prepend-icon="mdi-details"
            :rules="[
              ruleRequired,
              (v) => ruleMaxLength(v, taskDefinitionMaxLength),
            ]"
            :counter="taskDefinitionMaxLength"
          />
          <v-text-field
            label="Gidilen Adres"
            v-model="newVehicleOnTask.address"
            prepend-icon="mdi-details"
            :rules="[ruleRequired, (v) => ruleMaxLength(v, addressMaxLength)]"
            :counter="addressMaxLength"
          />
        </v-card>
        <v-card elevation="2" class="pa-5 ma-2">
          <v-card-title>Talep Eden</v-card-title>
          <v-autocomplete
            label="Departman"
            v-model="newVehicleOnTask.departmentId"
            :items="departments"
            item-title="name"
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
export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-task"],
  data() {
    return {
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
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async getVehicles() {
      await api
        .get(vehicles.detailsForTable)
        .then((response) => {
          this.vehicles = response.data.data;
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
    async getDrivers() {
      await api
        .get(drivers.url)
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
      await api
        .get(departments.url)
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
      this.getDepartments();
      await api
        .get(predefinedTasks.url)
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
      var task = this.predefinedTasks.find((x) => x.id === taskId);
      this.newVehicleOnTask.departmentId = task.departmentId;
      this.newVehicleOnTask.address = task.address;
      this.newVehicleOnTask.taskDefinition = task.name;
    },
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
          console.log(err);
          this.snackBarMessage = err.response.data;
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
  },
};
</script>

<style></style>
