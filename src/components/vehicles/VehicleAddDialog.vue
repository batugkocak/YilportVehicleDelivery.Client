<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card class="pa-5 mt-2">
      <v-form @submit.prevent="postVehicle" v-model="valid">
        <v-text-field
          v-model="insertedVehicle.plate"
          label="Plaka"
          placeholder="16YH1616"
          @input="isPlateExists"
          prepend-icon="mdi-card-text"
          :rules="[
            ruleRequired,
            (v) => ruleMinLength(v, vehicleRules.PLATE_MIN_LENGTH),
            (v) => ruleMaxLength(v, vehicleRules.PLATE_MAX_LENGTH),
          ]"
          :counter="vehicleRules.PLATE_MAX_LENGTH"
          :error-messages="plateExists ? ['Böyle bir plaka var.'] : []"
        />
        <v-select
          v-model="insertedVehicle.type"
          label="Tip"
          :items="types"
          item-title="name"
          item-value="id"
          prepend-icon="mdi-car-estate"
          no-data-text="Araç Sahipleri getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-select
          v-model="insertedVehicle.color"
          label="Renk"
          :items="colors"
          item-title="name"
          item-value="id"
          prepend-icon="mdi-palette"
          no-data-text="Renkler getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-autocomplete
          v-model="insertedVehicle.ownerId"
          label="Sahip"
          :items="owners"
          item-title="selectBoxValue"
          item-value="id"
          prepend-icon="mdi-account-tie"
          @click="getOwners"
          no-data-text="Araç Sahipleri getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-plus"
              elevation="0"
              @click="openOwnerAddDialog"
            ></v-btn>
          </template>
        </v-autocomplete>
        <v-select
          v-model="insertedVehicle.brandId"
          label="Marka"
          :items="brands"
          item-title="selectBoxValue"
          item-value="id"
          required
          prepend-icon="mdi-watermark"
          @click="getBrands"
          no-data-text="Markalar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-text-field
          v-model="insertedVehicle.modelName"
          label="Model"
          prepend-icon="mdi-car-outline"
          :rules="[
            ruleRequired,
            (v) => ruleMaxLength(v, vehicleRules.MODEL_NAME_LENGTH),
          ]"
          :counter="vehicleRules.MODEL_NAME_LENGTH"
        />
        <v-text-field
          v-model="insertedVehicle.modelYear"
          label="Model Yılı"
          prepend-icon="mdi-calendar-question"
          :rules="[ruleRequired, (v) => ruleMaxLength(v, 4)]"
          counter="4"
        />
        <v-autocomplete
          v-model="insertedVehicle.fuelType"
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
          v-model="insertedVehicle.departmentId"
          label="Departman"
          :items="departments"
          item-title="selectBoxValue"
          item-value="id"
          prepend-icon="mdi-form-select"
          @click="getDepartments"
          no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        ></v-autocomplete>

        <!-- <v-select
          v-model="insertedVehicle.status"
          label="Durum"
          :items="stats"
          item-title="name"
          item-value="id"
          required
          prepend-icon="mdi-list-status"
          no-data-text="Markalar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        /> -->
        <v-text-field
          v-model="insertedVehicle.note"
          label="Not"
          prepend-icon="mdi-note-edit"
          :rules="[(v) => ruleMaxLength(v, vehicleRules.NOTE_LENGTH)]"
          :counter="vehicleRules.NOTE_LENGTH"
        >
        </v-text-field>
        <v-row class="mt-3">
          <v-spacer />
          <v-btn color="red" @click="closeDialog"> Vazgeç </v-btn>
          <v-btn
            type="submit"
            color="success"
            class="ml-5 mr-5"
            :disabled="!valid"
            >Ekle
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
  <owner-add-dialog v-model="ownerAddDialog" @add-owner="afterOwnerAdded" />
</template>

<script>
import rules from "@/common/rules/rules";
import api from "@/services/httpService";
import {
  vehicles,
  departments,
  owners,
  brands,
} from "@/common/config/apiConfig";

import FuelType from "@/common/constants/fuelType";
import VehicleColor from "@/common/constants/vehicleColor";
import VehicleStatus from "@/common/constants/vehicleStatus";
import VehicleType from "@/common/constants/vehicleType";
import OwnerAddDialog from "../owners/OwnerAddDialog.vue";

import { vehicleRules } from "@/common/constants/validations";

export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-vehicle"],
  components: {
    OwnerAddDialog,
  },
  data() {
    return {
      vehicleRules,
      ...rules,
      valid: false,
      insertedVehicle: {
        plate: "",
        type: "",
        color: "",
        ownerId: "",
        brandId: "",
        modelName: "",
        modelYear: "",
        fuelType: "",
        departmentId: "",
        status: 1,
        note: null,
      },
      departments: [],
      brands: [],
      owners: [],
      isSuccess: false,
      plateExists: false,
      snackBarMessage: "",
      ownerAddDialog: false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async postVehicle() {
      this.trimInserts();
      await api
        .post(vehicles.url, this.insertedVehicle)
        .then((res) => {
          this.isSuccess = true;
          this.snackBarMessage = res.data;
          this.$emit("add-vehicle");
          this.insertedVehicle = {
            plate: "",
            type: "",
            color: "",
            ownerId: "",
            brandId: "",
            modelName: "",
            modelYear: "",
            fuelType: "",
            departmentId: "",
            status: "",
            note: "",
          };
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
    trimInserts() {
      this.insertedVehicle.plate = this.insertedVehicle.plate.trim();
      this.insertedVehicle.modelName = this.insertedVehicle.modelName.trim();
    },
    async getDepartments() {
      if (this.departments.length) {
        return;
      }
      await api
        .get(departments.selectBox)
        .then((res) => {
          console.log(res);
          this.departments = res.data.data;
          this.isSuccess = true;
          this.snackBarMessage = res.data.message;
        })
        .catch((err) => {
          this.snackBarMessage = err.response.data;
          this.isSuccess = false;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
        });
    },
    async isPlateExists() {
      if (this.insertedVehicle.plate === "") {
        return;
      }
      api
        .get(vehicles.checkPlate(this.insertedVehicle.plate))
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
    openOwnerAddDialog() {
      this.ownerAddDialog = true;
    },
    afterOwnerAdded() {
      this.owners = [];
      this.getOwners();
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
          console.log(err);
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
};
</script>
