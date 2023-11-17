<template>
  <v-dialog v-model="dialog" class="dialog" v-if="vehicle" max-width="600">
    <v-card class="pa-5 mt-2">
      <v-card-text> Düzenle: {{ tempPlate }} </v-card-text>
      <v-form @submit.prevent="updateVehicle" v-model="valid">
        <v-text-field
          v-model="vehicle.plate"
          label="Plaka"
          placeholder="16YH1616"
          prepend-icon="mdi-card-text"
          @input="isPlateExists"
          :rules="[
            ruleRequired,
            (v) => ruleMinLength(v, vehicleRules.PLATE_MIN_LENGTH),
            (v) => ruleMaxLength(v, vehicleRules.PLATE_MAX_LENGTH),
          ]"
          :counter="vehicleRules.PLATE_MAX_LENGTH"
          :error-messages="plateExists ? ['Böyle bir plaka var.'] : []"
        />
        <v-select
          v-model="vehicle.type"
          label="Tip"
          :items="types"
          item-title="name"
          item-value="id"
          prepend-icon="mdi-car-estate"
          no-data-text="Araç Tipleri getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-select
          v-model="vehicle.color"
          label="Renk"
          :items="colors"
          item-title="name"
          item-value="id"
          prepend-icon="mdi-palette"
          no-data-text="Renkler getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-autocomplete
          v-model="vehicle.ownerId"
          label="Sahip"
          :items="owners"
          item-title="selectBoxValue"
          item-value="id"
          prepend-icon="mdi-account-tie"
          no-data-text="Araç Sahipleri getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        ></v-autocomplete>
        <v-select
          v-model="vehicle.brandId"
          label="Marka"
          :items="brands"
          item-title="selectBoxValue"
          item-value="id"
          required
          prepend-icon="mdi-watermark"
          no-data-text="Markalar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-text-field
          v-model="vehicle.modelName"
          label="Model"
          prepend-icon="mdi-car-outline"
          :rules="[
            ruleRequired,
            (v) => ruleMaxLength(v, vehicleRules.MODEL_NAME_LENGTH),
          ]"
          :counter="vehicleRules.MODEL_NAME_LENGTH"
        />
        <v-text-field
          v-model="vehicle.modelYear"
          label="Model Yılı"
          prepend-icon="mdi-calendar-question"
          :rules="[ruleRequired, (v) => ruleMaxLength(v, 4)]"
          counter="4"
        />
        <v-autocomplete
          v-model="vehicle.fuelType"
          label="Yakıt Türü"
          prepend-icon="mdi-fuel"
          :items="fuelTypes"
          item-title="name"
          item-value="id"
          required
          no-data-text="Yakıtlar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-autocomplete
          v-model="vehicle.departmentId"
          label="Departman"
          :items="departments"
          item-title="selectBoxValue"
          item-value="id"
          prepend-icon="mdi-form-select"
          no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        ></v-autocomplete>

        <v-select
          v-model="vehicle.status"
          label="Durum"
          :items="stats"
          item-title="name"
          item-value="id"
          required
          prepend-icon="mdi-list-status"
          no-data-text="Markalar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-text-field
          v-model="vehicle.note"
          label="Not"
          prepend-icon="mdi-note-edit"
          :rules="[(v) => ruleMaxLength(v, vehicleRules.NOTE_LENGTH)]"
          :counter="vehicleRules.NOTE_LENGTH"
        >
        </v-text-field>
        <v-row class="mt-3">
          <v-spacer />
        </v-row>
        <v-row class="mr-2">
          <v-spacer></v-spacer>
          <v-btn color="red" @click="closeDialog" class="ml-5 mr-5">
            Vazgeç
          </v-btn>
          <v-btn type="submit" color="success" :disabled="!valid">
            Düzenle
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import {
  vehicles,
  brands,
  owners,
  departments,
} from "@/common/config/apiConfig";

import { vehicleRules } from "@/common/constants/validations";

import baseRules from "@/common/rules/rules";

import FuelType from "@/common/constants/fuelType";
import VehicleColor from "@/common/constants/vehicleColor";
import VehicleStatus from "@/common/constants/vehicleStatus";
import VehicleType from "@/common/constants/vehicleType";

export default {
  props: ["modelValue", "id", ""],
  emits: ["update:modelValue", "update-vehicle"],
  data() {
    return {
      valid: false,
      vehicleRules,
      ...baseRules,
      vehicle: null,
      brands: [],
      departments: [],
      owners: [],
      tempPlate: 0,
      plateExists: false,
    };
  },
  methods: {
    async updateVehicle() {
      await api
        .update(vehicles.update, this.vehicle)
        .then((res) => {
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("update-vehicle");
          this.closeDialog();
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    async isPlateExists() {
      if (this.vehicle.plate === "" || this.tempPlate === this.vehicle.plate) {
        return;
      }
      api
        .get(vehicles.checkPlate(this.vehicle.plate))
        .then(() => {
          this.plateExists = false;
        })
        .catch((response) => {
          this.snackBarMessage = response.response.data;
          this.isSuccess = false;
          this.plateExists = true;
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async getCar() {
      api
        .get(vehicles.byId(this.id))
        .then((response) => {
          this.vehicle = response.data.data;
        })
        .finally(() => {
          this.tempPlate = this.vehicle.plate;
        });
    },
    async getDepartments() {
      if (this.departments.length) {
        return;
      }
      await api
        .get(departments.selectBox)
        .then((res) => {
          this.departments = res.data.data;
          this.isSuccess = true;
          this.snackBarMessage = res.data.message;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    async getOwners() {
      if (this.owners.length) {
        return;
      }
      await api
        .get(owners.selectBox)
        .then((res) => {
          this.owners = res.data.data;
          this.isSuccess = true;
          this.snackBarMessage = res.data.message;
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.data.message;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    async getBrands() {
      if (this.brands.length) {
        return;
      }
      await api
        .get(brands.selectBox)
        .then((res) => {
          this.brands = res.data.data;
          this.isSuccess = true;
          this.snackBarMessage = res.data.message;
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.data.message;
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
    fuelTypes() {
      return FuelType.fuelTypes;
    },
    colors() {
      return VehicleColor.vehicleColors;
    },
    stats() {
      return VehicleStatus.stats;
    },
    types() {
      return VehicleType.vehicleTypes;
    },
  },
  watch: {
    dialog: {
      handler(newValue) {
        if (newValue) {
          this.getCar();
          this.getBrands();
          this.getDepartments();
          this.getOwners();
        }
      },
      immediate: true,
    },
  },
};
</script>
