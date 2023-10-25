<template>
  <v-dialog v-model="dialog" class="dialog" max-width="500">
    <v-card class="pa-5 mt-2">
      <v-form v-model="form" @submit.prevent="postCar">
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
          :items="vehicleTypes"
          item-title="name"
          item-value="id"
          prepend-icon="mdi-car-estate"
          @click="getOwners"
          no-data-text="Araç Sahipleri getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-select
          v-model="insertedVehicle.color"
          label="Renk"
          :items="vehicleColors"
          item-title="name"
          item-value="id"
          prepend-icon="mdi-palette"
          no-data-text="Renkler getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-autocomplete
          v-model="insertedVehicle.owner"
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
          v-model="insertedVehicle.brand"
          label="Marka"
          :items="brands"
          item-title="name"
          item-value="id"
          required
          prepend-icon="mdi-watermark"
          @click="getBrands"
          :loading="load"
          no-data-text="Markalar getiriliyor, lütfen bekleyin..."
          :rules="[ruleRequired]"
        />
        <v-text-field
          v-model="insertedVehicle.model"
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
          v-model="insertedVehicle.department"
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
          :items="vehicleStats"
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
            @click="refreshTable"
            class="ml-5 mr-5"
            >Ekle</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import rules from "@/common/rules/rules";
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      insertedVehicle: {
        plate: "",
        type: "",
        color: "",
        owner: "",
        brand: "",
        model: "",
        modelYear: "",
        fuelType: "",
        department: "",
        status: "",
        note: "",
      },
      ...rules,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
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
