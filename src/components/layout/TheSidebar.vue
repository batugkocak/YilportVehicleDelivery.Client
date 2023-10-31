<template>
  <v-navigation-drawer :rail="hover" :permanent="true">
    <v-list>
      <v-list-item title="Araç Teslim" subtitle="Yılport Holding INC.">
        <template v-slot:prepend>
          <v-img
            :width="25"
            src="../../assets/YPH_logo_black.png"
            class="mr-2"
          ></v-img>
        </template>

        <!-- <template v-slot:append v-if="!hover">
          <v-btn elevation="0" icon="mdi-exit-to-app" @click="logout"> </v-btn>
        </template> -->
      </v-list-item>
    </v-list>
    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-car-side"
        title="Araçlar"
        to="/vehicles"
        color="primary"
      />
      <v-list-item
        prepend-icon="mdi-car-select"
        title="Görevdeki Araçlar"
        to="/vehiclesOnTask"
        color="primary"
      />
      <v-list-item
        prepend-icon="mdi-archive"
        title="Görev Arşivi"
        to="/archive"
        color="primary"
      />
      <v-list-item
        prepend-icon="mdi-calendar-check"
        title="Ön Tanımlı Görevler"
        color="primary"
      />
    </v-list>

    <template v-slot:append>
      <v-btn
        elevation="0"
        icon="mdi-exit-to-app"
        @click="logout"
        class="ml-1"
      />
      <v-spacer></v-spacer>
      <v-btn
        class="ml-1"
        variant="text"
        icon="mdi-arrow-left-right"
        @click.stop="hover = !hover"
        color="primary"
      />
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  emits: ["logout"],
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>
