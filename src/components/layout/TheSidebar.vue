<template>
  <v-navigation-drawer :rail="hover" :permanent="true">
    <v-list>
      <v-list-item title="Yılport" subtitle="Holding INC.">
        <template v-slot:prepend>
          <v-img
            :width="25"
            src="../../assets/YPH_logo_black.png"
            class="mr-2"
          ></v-img>
        </template>

        <template v-slot:append v-if="!hover">
          <v-btn elevation="0" icon="mdi-exit-to-app" @click="logout"> </v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider />

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-car" title="Araçlar" to="/vehicles" />
      <v-list-item
        prepend-icon="mdi-car-multiple"
        title="Görevdeki Araçlar"
        to="/vehiclesOnTask"
      />
      <v-list-item prepend-icon="mdi-calendar-check" title="Görevler" />
    </v-list>

    <template v-slot:append>
      <v-btn
        class="ml-1"
        variant="text"
        icon="mdi-arrow-left-right"
        @click.stop="hover = !hover"
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
