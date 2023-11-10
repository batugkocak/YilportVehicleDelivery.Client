<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    v-model:page="page"
    :headers="headers"
    :items-length="totalItems"
    :items="vehiclesOnTask"
    :loading="isLoading"
    :search="searchText"
    item-value="id"
    density="compact"
    class="elevation-1"
    loading-text="Araçlar yükleniyor..."
    no-data-text="Kayıtlı araç yok."
    items-per-page-text="Sayfa başına araç:"
    @update:options="fetchVehiclesOnTaskArchive"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-toolbar-title>GÖREV ARŞİV</v-toolbar-title>
        <v-responsive max-width="200" class="pa-1 mt-2 mr-2">
          <v-select
            :items="dateTypes"
            item-title="name"
            item-value="value"
            density="compact"
            label="Tarih Filtre"
            v-model="chosenDataType"
            @update:model-value="fetchVehiclesOnTaskArchive"
          ></v-select>
        </v-responsive>
        <v-responsive max-width="200" class="pa-1">
          <label for="firstGivenDateInput">Başlangıç Tarihi</label>
          <input
            v-model="filterFirstGivenDate"
            type="date"
            id="firstGivenDateInput"
            name="Veriliş Tarihi"
            min="2020-01-01"
            lang="tr"
            @change="fetchVehiclesOnTaskArchive"
          />
        </v-responsive>
        <v-responsive max-width="200" class="pa-1">
          <label for="lastGivenDateInput">Bitiş Tarihi</label>
          <input
            v-model="filterLastGivenDate"
            type="date"
            id="lastGivenDateInput"
            name="Veriliş Tarihi"
            min="2015-01-01"
            max="now"
            lang="tr"
            @change="fetchVehiclesOnTaskArchive"
          />
        </v-responsive>
        <v-btn @click="exportExcel" color="primary">EXCEL çıktısı al</v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn
        class="ma-1"
        color="primary"
        icon="mdi-card-text"
        size="x-small"
        @click="openDetailsDialog(item.id)"
      >
      </v-btn>
    </template>
  </v-data-table-server>
</template>

<script>
import api from "@/services/httpService";
import { vehiclesOnTask } from "@/common/config/apiConfig";
import XLSX from "xlsx";
export default {
  emits: ["open-snackbar", "toggle-details"],
  data() {
    return {
      vehiclesOnTask: [],
      searchText: "",
      headers: [
        { title: "Id", key: "id", align: " d-none" },
        { title: "vehicleId", key: "vehicleId", align: " d-none" },
        {
          title: "Plaka",
          align: "start",
          sortable: false,

          key: "vehiclePlate",
        },

        {
          sortable: false,
          title: "Talep Eden Departman",
          align: "start",
          key: "departmentName",
        },
        {
          sortable: false,
          title: "Görev Niteliği",
          align: "start",
          key: "taskDefinition",
          width: "400",
        },
        {
          sortable: false,
          title: "Veriliş",
          align: "start",
          key: "givenDateFormatted",
        },
        {
          sortable: false,
          title: "Dönüş",
          align: "start",
          key: "returnDateFormatted",
        },

        {
          sortable: false,
          title: "",
          align: "start",
          key: "actions",
          fixed: true,
          width: "150",
        },
      ],
      dateTypes: [
        { name: "Veriliş Tarihi", value: "givenDate" },
        { name: "Dönüş Tarihi", value: "returnDate" },
      ],
      chosenDataType: "givenDate",

      //Snackbar:
      snackBarMessage: "",
      isSuccess: false,

      isLoading: false,

      filterFirstGivenDate: "",
      filterLastGivenDate: "",

      totalItems: 0,
      itemsPerPage: 10,
      page: 1,

      vehiclesToExportExcel: [],
    };
  },
  methods: {
    async fetchVehiclesOnTaskArchive() {
      this.isLoading = true;
      await api
        .get(vehiclesOnTask.archiveUrl, {
          page: this.page - 1,
          size: this.itemsPerPage,
          firstDate: this.filterFirstGivenDate,
          lastDate: this.filterLastGivenDate,
          dateType: this.chosenDataType,
        })
        .then((response) => {
          this.vehiclesOnTask = response.data.data.items;
          this.snackBarMessage = response.data.message;
          this.isSuccess = response.data.success;
          this.totalItems = response.data.data.totalCount;
        })
        .catch(() => {
          this.snackBarMessage = "Bilinmeyen hata meydana geldi.";
          this.isSuccess = false;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.isLoading = false;
        });
    },

    async fetchVehiclesForExcel() {
      await api
        .get(vehiclesOnTask.archiveDetailsUrl, {
          firstDate: this.filterFirstGivenDate,
          lastDate: this.filterLastGivenDate,
          dateType: this.chosenDataType,
        })
        .then((response) => {
          this.vehiclesToExportExcel = response.data.data;
          this.snackBarMessage = "Excel çıktısı alınıyor...";
          this.isSuccess = response.data.success;
          console.log(response.data);
        })
        .catch(() => {
          this.snackBarMessage = "Bilinmeyen hata meydana geldi.";
          this.isSuccess = false;
        })
        .finally(() => {
          this.$emit("open-snackbar", this.isSuccess, this.snackBarMessage);
          this.isLoading = false;
        });
    },
    openDetailsDialog(id) {
      this.$emit("toggle-details", id);
    },
    async exportExcel() {
      await this.fetchVehiclesForExcel();

      const customHeaders = {
        vehiclesOnTaskId: "x",
        vehicleId: "y",
        vehiclePlate: "Plaka",
        driverName: "Sürücü",
        departmentName: "Departman",
        authorizedPerson: "Yetkili Kişi",
        address: "Adres",
        taskDefinition: "Görev Niteliği - Adı",
        givenDate: "z",
        givenDateFormatted: "Veriliş Tarihi",
        returnDate: "k",
        returnDateFormatted: "Dönüş Tarihi",
      };

      // Sütun İsimlerini Değiştir ve Tarihleri Dönüştür
      this.vehiclesToExportExcel = this.vehiclesToExportExcel.map((item) => {
        const newItem = {};
        for (const oldColumn in customHeaders) {
          const newColumn = customHeaders[oldColumn];
          newItem[newColumn] = item[oldColumn];
        }
        return newItem;
      });

      // Id içeren sütunları sil
      const excludedColumns = ["x", "y", "z", "k"];
      this.vehiclesToExportExcel = this.vehiclesToExportExcel.map((item) => {
        for (const column of excludedColumns) {
          delete item[column];
        }
        return item;
      });

      const data = XLSX.utils.json_to_sheet(this.vehiclesToExportExcel);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      let excelName = "GorevArsiv";
      if (
        this.chosenDataType === "givenDate" &&
        (this.filterFirstGivenDate !== "" || this.filterLastGivenDate !== "")
      )
        excelName = excelName + "(VerilisTarihi)";
      if (
        this.chosenDataType === "returnDate" &&
        (this.filterFirstGivenDate !== "" || this.filterLastGivenDate !== "")
      )
        excelName = excelName + "(DonusTarihi)";
      if (this.filterFirstGivenDate !== "")
        excelName = excelName + "-Sonrasi=" + this.filterFirstGivenDate;
      if (this.filterLastGivenDate !== "")
        excelName = excelName + "-Oncesi=" + this.filterLastGivenDate;
      XLSX.writeFile(wb, excelName + ".xlsx");
    },
  },
  created() {
    this.fetchVehiclesOnTaskArchive({
      page: this.page,
      itemsPerPage: this.itemsPerPage,
    });
  },
};
</script>
