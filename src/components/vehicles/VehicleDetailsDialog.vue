<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog v-model="dialog" v-if="vehicle" max-width="600">
    <v-card
      class="pa-2"
      prepend-icon="mdi-car"
      :title="vehicle.plate"
      :subtitle="cardSubtitle"
      hover
    >
      <v-chip :color="chipColor">
        {{ vehicle.status }}
      </v-chip>
      <v-card elevation="1" class="pa-5 mt-2 scroll">
        <div :class="cardContentStyling">
          <v-icon icon="mdi-car-estate" />
          <div>
            <v-card-title> Tip </v-card-title>
            <v-card-text>{{ vehicle.type }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div :class="cardContentStyling">
          <v-icon icon="mdi-palette" />
          <div>
            <v-card-title> Renk </v-card-title>
            <v-card-text>{{ vehicle.color }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div :class="cardContentStyling">
          <v-icon icon="mdi-account-tie" />
          <div>
            <v-card-title> Sahip </v-card-title>
            <v-card-text>{{ vehicle.owner }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <v-divider />
        <div :class="cardContentStyling">
          <v-icon icon="mdi-fuel" />
          <div>
            <v-card-title> Yakıt Tipi </v-card-title>
            <v-card-text>{{ vehicle.fuelType }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div :class="cardContentStyling">
          <v-icon icon="mdi-form-select" />
          <div>
            <v-card-title> Departman </v-card-title>
            <v-card-text>{{ vehicle.department }}</v-card-text>
          </div>
        </div>
        <v-divider />

        <div :class="cardContentStyling">
          <v-icon icon="mdi-note" />
          <div>
            <v-card-title> Not </v-card-title>
          </div>
        </div>
        <v-card elevation="2" class="px-5">
          <v-card-text v-if="vehicle.note">
            {{ vehicle.note }}
          </v-card-text>
          <v-card-text v-else
            >Araca ait bir not bulunamadı. Not eklemek için aracı düzenleyin.
          </v-card-text>
        </v-card>
      </v-card>
      <v-card-actions>
        <v-btn color="primary" @click="closeDialog">Kapat</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/httpService";
import { vehicles } from "@/common/config/apiConfig";
import baseRules from "@/common/rules/rules";

export default {
  props: ["modelValue", "id"],
  emits: ["update:modelValue"],
  data() {
    return {
      ...baseRules,
      vehicle: null,
    };
  },

  methods: {
    closeDialog() {
      this.$emit("update:modelValue", false);
    },

    async getCar() {
      api.get(vehicles.byIdDetails(this.id)).then((response) => {
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
        this.closeDialog();
      },
    },
    chipColor() {
      if (this.vehicle.status === "Müsait") {
        return "green";
      } else {
        return "primary";
      }
    },
    cardSubtitle() {
      return (
        this.vehicle.brand +
        " " +
        this.vehicle.modelName +
        " - " +
        this.vehicle.modelYear
      );
    },
    cardContentStyling() {
      return "d-flex align-center";
    },
  },
  watch: {
    dialog: {
      handler(newValue) {
        if (newValue) {
          this.getCar();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style>
.scroll {
   overflow-y: scroll
}
</style>