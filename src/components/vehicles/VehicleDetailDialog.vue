<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog
    v-model="dialog"
    class="dialog"
    :close-on-back="false"
    v-if="vehicle"
  >
    <v-card
      class="dialogCard"
      prepend-icon="mdi-car"
      :title="vehicle.plate"
      :subtitle="
        vehicle.brand + ' ' + vehicle.modelName + ' - ' + vehicle.modelYear
      "
      hover
    >
      <v-chip :color="chipColor">
        {{ vehicle.status }}
      </v-chip>
      <v-card elevation="3" class="dialogCard">
        <div class="d-flex align-center">
          <v-icon icon="mdi-car-estate" />
          <div>
            <v-card-title> Tip </v-card-title>
            <v-card-text>{{ vehicle.type }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div class="d-flex align-center">
          <v-icon icon="mdi-palette" />
          <div>
            <v-card-title> Renk </v-card-title>
            <v-card-text>{{ vehicle.color }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div class="d-flex align-center">
          <v-icon icon="mdi-account-tie" />
          <div>
            <v-card-title> Sahip </v-card-title>
            <v-card-text>{{ vehicle.owner }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <v-divider />
        <div class="d-flex align-center">
          <v-icon icon="mdi-fuel" />
          <div>
            <v-card-title> Yakıt Tipi </v-card-title>
            <v-card-text>{{ vehicle.fuelType }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div class="d-flex align-center">
          <v-icon icon="mdi-form-select" />
          <div>
            <v-card-title> Departman </v-card-title>
            <v-card-text>{{ vehicle.department }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div class="d-flex align-center">
          <v-icon icon="mdi-note" />
          <div>
            <v-card-title> Not </v-card-title>
          </div>
        </div>
        <v-card elevation="5" class="mt-5">
          <v-card-text v-if="vehicle.note != null">
            {{ vehicle.note }}
          </v-card-text>
          <v-card-text v-else
            >Araca ait bir not bulunamadı. Not eklemek için aracı
            düzenleyin.</v-card-text
          >
        </v-card>
      </v-card>
      <v-card-actions>
        <v-btn color="primary" block @click="closeDialog">Kapat</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-btn @click="getCar"> Test</v-btn>
</template>

<script>
import api from "@/services/httpService";
import { vehicles } from "@/common/config/apiConfig";

export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue"],
  data() {
    return {
      vehicle: null,
    };
  },

  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },

    async getCar() {
      api.get(vehicles.getById(this.id)).then((response) => {
        this.vehicle = response.data.data;
      });
    },
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set() {
        this.$emit("update:modelValue", false);
      },
    },
    chipColor() {
      if (this.vehicle.status === "Müsait") {
        return "green";
      } else {
        return "primary";
      }
    },
  },
  watch: {
    dialog: {
      handler(newValue) {
        console.log("Diyalog değişti");
        if (newValue) {
          console.log("Id ile araç yüklendi");
          this.getCar();
        }
      },
      immediate: true,
    },
  },
};
</script>
