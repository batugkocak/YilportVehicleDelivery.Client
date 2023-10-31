<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card class="pa-5 mt-2">
      <p>{{ valid }}</p>
      <v-form @submit.prevent="postVehicle" v-model="valid">
        <v-text-field
          v-model="insertedVehicle.plate"
          label="Plaka"
          placeholder="16YH1616"
          prepend-icon="mdi-card-text"
          :rules="[
            ruleRequired,
            (v) => ruleMinLength(v, 4),
            (v) => ruleMaxLength(v, 10),
          ]"
          :counter="10"
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
          item-title="name"
          item-value="id"
          prepend-icon="mdi-account-tie"
          @click="getOwners"
          no-data-text="Araç Sahipleri getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        ></v-autocomplete>
        <v-select
          v-model="insertedVehicle.brandId"
          label="Marka"
          :items="brands"
          item-title="name"
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
          :rules="[ruleRequired, (v) => ruleMaxLength(v, 15)]"
          :counter="15"
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
          item-title="name"
          item-value="id"
          prepend-icon="mdi-form-select"
          @click="getDepartments"
          no-data-text="Departmanlar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        ></v-autocomplete>

        <v-select
          v-model="insertedVehicle.status"
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
          v-model="insertedVehicle.note"
          label="Not"
          prepend-icon="mdi-note-edit"
          :rules="[(v) => ruleMaxLength(v, 200)]"
          :counter="200"
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
            >Ekle</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
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

export default {
  props: ["modelValue"],
  emits: ["update:modelValue", "open-snackbar", "add-vehicle"],
  data() {
    return {
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
        status: "",
        note: null,
      },
      departments: [],
      brands: [],
      owners: [],
      isSuccess: false,
      snackBarMessage: "",
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },
    async postVehicle() {
      await api
        .post(vehicles.url, this.insertedVehicle)
        .then((res) => {
          console.log(res);
          this.isSuccess = true;
          this.snackBarMessage = res.data;
        })
        .catch((err) => {
          this.isSuccess = false;
          this.snackBarMessage = err.response.data;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.$emit("add-vehicle");
          this.closeDialog();
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
        });
    },
    trimInserts() {
      this.insertedVehicle.plate = this.insertedVehicle.plate.trim();
      this.insertedVehicle.modelName = this.insertedVehicle.modelName.trim();
      this.insertedVehicle.note = this.insertedVehicle.note.trim();
    },
    async getDepartments() {
      if (this.departments.length) {
        return;
      }
      await api
        .get(departments.url)
        .then((res) => {
          console.log(res);
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
        .get(owners.url)
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
        .get(brands.url)
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
