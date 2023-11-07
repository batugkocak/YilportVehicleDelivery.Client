<template>
  <v-dialog v-model="dialog" max-width="500px" v-if="fetchedVehicleOnTask">
    <v-card class="dialogCard">
      <v-form v-model="valid" @submit.prevent="editTaskOfVehicle">
        <v-card elevation="2" class="dialogCard">
          <v-card-title>Görevde Olan Araç Düzenleme</v-card-title>
          <v-autocomplete
            label="Araç Plakası"
            v-model="fetchedVehicleOnTask.vehicleId"
            :items="vehicles"
            item-title="selectBoxValue"
            item-value="id"
            placeholder="16YH1616"
            prepend-icon="mdi-card-text"
            no-data-text="Plakalar getiriliyor, lütfen bekleyin..."
            :rules="[ruleRequired]"
          />
          <v-select
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
              (v) => ruleMaxLength(v, taskDefinitionMaxLength),
            ]"
            :counter="taskDefinitionMaxLength"
          />
          <v-text-field
            label="Gidilen Adres"
            v-model="fetchedVehicleOnTask.address"
            prepend-icon="mdi-details"
            :rules="[ruleRequired, (v) => ruleMaxLength(v, addressMaxLength)]"
            :counter="addressMaxLength"
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
          />
        </v-card>
        <v-row class="mt-3">
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
export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue", "open-snackbar"],
  data() {
    return {
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
    async fetchVehicle() {
      await api.get(vehiclesOnTask.get(this.id)).then((response) => {
        console.log(response.data.data);
        this.fetchedVehicleOnTask = response.data.data;
      });
    },

    async editTaskOfVehicle() {
      await api
        .post(vehiclesOnTask.editUrl, this.fetchedVehicleOnTask)
        .then((response) => {
          this.snackBarMessage = response.data;
          this.isSuccess = true;
          this.closeDialog();
        })
        .catch(() => {
          this.snackBarMessage = "Bir hata meydana geldi";
          this.isSuccess = false;
        })
        .finally(() => {
          this.$emit("update-task");
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },

    async getVehicles() {
      await api
        .get(vehicles.selectBox)
        .then((response) => {
          this.vehicles = response.data.data;
          this.snackBarMessage = response.data.message;
          this.isSuccess = response.data.success;
        })
        .catch(() => {
          this.snackBarMessage = "Bilinmeyen hata meydana geldi.";
          this.isSuccess = false;
        });
      // .finally(() => {
      //   this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
      // });
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
        });
      // .finally(() => {
      //   this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
      // });
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
        });
      // .finally(() => {
      //   this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
      // });
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
          this.getVehicles();
          this.getDepartments();
          this.getDrivers();
          this.fetchVehicle();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
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
