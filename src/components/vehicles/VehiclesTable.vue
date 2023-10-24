<template>
  <v-data-table
    :headers="headers"
    :items="cars"
    class="elevation-1"
    loading-text="Araçlar yükleniyor..."
    no-data-text="Kayıtlı araç yok."
    items-per-page-text="Sayfa başına araç:"
    :items-per-page="10"
  ></v-data-table>
</template>

<script>
export default {
  params: ["cars, loading, "],
  data() {
    return {
      loading: false,
      cars: [],
      error: null,
      headers: [
        {
          title: "Plaka",
          align: "start",
          sortable: false,
          key: "plate",
        },
        { title: "id", key: "id", align: " d-none" },
        { title: "Tip", align: "end", key: "type" },
        { title: "Marka", align: "end", key: "brand" },
        { title: "Model", align: "end", key: "modelName" },
        { title: "Durumu", align: "start", key: "status" },
        {
          title: "",
          key: "actions",
          align: "start",
          sortable: false,
          fixed: true,
        },
      ],
    };
  },
};
</script>
