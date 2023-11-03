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
        <v-responsive max-width="200" class="pa-1">
          <label for="firstGivenDateInput">Başlangıç Veriliş Tarihi</label>
          <input
            v-model="filterFirstGivenDate"
            type="date"
            id="firstGivenDateInput"
            name="Veriliş Tarihi"
            min="2015-01-01"
            lang="tr"
            @change="fetchVehiclesOnTaskArchive"
          />
        </v-responsive>
        <v-responsive max-width="200" class="pa-1">
          <label for="lastGivenDateInput">Son Veriliş Tarihi</label>
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

    <template v-slot:item.givenDate="{ item }">
      <td>
        {{ getDate(item.givenDate) }}
      </td>
    </template>

    <template v-slot:item.givenHour="{ item }">
      <td>
        {{ getHour(item.givenDate) }}
      </td>
    </template>

    <template v-slot:item.returnDate="{ item }">
      <td>
        {{ getDate(item.returnDate) }}
      </td>
    </template>

    <template v-slot:item.returnHour="{ item }">
      <td>
        {{ getHour(item.returnDate) }}
      </td>
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
        },

        {
          sortable: false,
          title: "Veriliş Tarihi",
          align: "start",
          key: "givenDate",
        },
        {
          sortable: false,
          title: "Veriliş Saati",
          align: "start",
          key: "givenHour",
        },
        {
          sortable: false,
          title: "Dönüş Tarihi",
          align: "start",
          key: "returnDate",
        },
        {
          sortable: false,
          title: "Dönüş Saati",
          align: "start",
          key: "returnHour",
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
          firstGivenDate: this.filterFirstGivenDate,
          lastGivenDate: this.filterLastGivenDate,
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
          firstGivenDate: this.filterFirstGivenDate,
          lastGivenDate: this.filterLastGivenDate,
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
        driverName: "Sürücü Adı",
        departmentName: "Departman",
        authorizedPerson: "Yetkili Kişi",
        address: "Adres",
        taskDefinition: "Görev Niteliği - Adı",
        givenDate: "Veriliş Tarihi",
        returnDate: "Dönüş Tarihi",
      };

      // Sütun İsimlerini Değiştir
      this.vehiclesToExportExcel = this.vehiclesToExportExcel.map((item) => {
        const newItem = {};
        for (const oldColumn in customHeaders) {
          const newColumn = customHeaders[oldColumn];
          newItem[newColumn] = item[oldColumn];
        }
        return newItem;
      });

      // Id içeren sütunları sil
      const excludedColumns = ["x", "y"];
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
      if (this.filterFirstGivenDate !== "")
        excelName = excelName + "-Sonrasi=" + this.filterFirstGivenDate;
      if (this.filterLastGivenDate !== "")
        excelName = excelName + "-Oncesi=" + this.filterLastGivenDate;
      XLSX.writeFile(wb, excelName + ".xlsx");
    },
    getHour(fullDate) {
      if (fullDate === "0001-01-01T00:00:00") {
        return "-";
      }
      return fullDate.split("T")[1];
    },
    getDate(fullDate) {
      if (fullDate === "0001-01-01T00:00:00") {
        return "-";
      }

      const oldDate = new Date(fullDate.split("T")[0]);

      const newDate =
        (oldDate.getDate() < 10 ? "0" : "") +
        oldDate.getDate() +
        "-" +
        (oldDate.getMonth() + 1 < 10 ? "0" : "") +
        (oldDate.getMonth() + 1) +
        "-" +
        oldDate.getFullYear();

      return newDate;
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
