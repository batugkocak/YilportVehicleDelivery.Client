const base = "https://localhost:7060";

export const vehiclesOnTask = {
  add: base + "/VehicleOnTasks",

  delete: (vehicleOnTaskId) =>
    base + `/VehicleOnTasks/Delete/${vehicleOnTaskId}`,

  url: base + "/VehicleOnTasks/ForNormalTable",
  archiveUrl: base + "/VehicleOnTasks/ForArchiveTable",
  byId: (vehicleOnTaskId) =>
    base + `/VehicleOnTasks/Details/${vehicleOnTaskId}`,

  archiveDetailsUrl: "https://localhost:7060/VehicleOnTasks/Details",

  finishUrl: (vehicleOnTaskId) =>
    base + `/VehicleOnTasks/Finish/${vehicleOnTaskId}`,

  editUrl: base + "/VehicleOnTasks/Update",

  get: (vehicleOnTaskId) => base + `/VehicleOnTasks/${vehicleOnTaskId}`,
};

export const vehicles = {
  url: base + "/Vehicles",
  detailsForTable: base + "/Vehicles/DetailsForTable",
  update: base + "/Vehicles/Update",
  selectBox: base + "/Vehicles/ForSelectBox",
  checkPlate: (plate) => base + `/Vehicles/CheckPlate?plate=${plate}`,
  byIdDetails: (carId) => base + `/Vehicles/${carId}/Details`,
  byId: (carId) => base + `/Vehicles/${carId}`,
  delete: (carId) => base + `/Vehicles/Delete/${carId}`,
};
export const predefinedTasks = {
  url: base + "/PredefinedTasks",
  details: base + "/PredefinedTasks/Details",
  forTable: base + "/PredefinedTasks/ForTable",
  update: base + "/PredefinedTasks/Update",
  selectBox: base + "/PredefinedTasks/ForSelectBox",
  delete: (taskId) => base + `/PredefinedTasks/Delete/${taskId}`,
  byId: (taskId) => base + `/PredefinedTasks/${taskId}`,
};
export const owners = {
  url: base + "/Owners",
  forTable: base + "/Owners/ForTable",
  selectBox: base + "/Owners/ForSelectBox",
  update: base + "/Owners/Update",
  byId: (ownerId) => base + `/Owners/${ownerId}`,
  delete: (ownerId) => base + `/Owners/Delete/${ownerId}`,
};

export const drivers = {
  url: base + "/Drivers",
  details: base + "/Drivers/Details",
  selectBox: base + "/Drivers/ForSelectBox",
  forTable: base + "/Drivers/ForTable",
  update: base + "/Drivers/Update",
  delete: (driverId) => base + `/Drivers/Delete/${driverId}`,
  byId: (driverId) => base + `/Drivers/${driverId}`,
};

export const auth = {
  login: base + "/Auth/login",
  register: base + "/Auth/register",
};
export const brands = {
  url: base + "/Brands",
  selectBox: base + "/Brands/ForSelectBox",
  forTable: base + "/Brands/ForTable",
  update: base + "/Brands/Update",
  delete: (brandId) => base + `/Brands/Delete/${brandId}`,
  byId: (brandId) => base + `/Brands/${brandId}`,
};

export const departments = {
  url: base + "/Departments",
  selectBox: base + "/Departments/ForSelectBox",
  forTable: base + "/Departments/ForTable",
  update: base + "/Departments/Update",
  delete: (departmentId) => base + `/Departments/Delete/${departmentId}`,
  byId: (departmentId) => base + `/Departments/${departmentId}`,
};

//TODO: Decide wheter using "Separate Endpoints" or "Base URL with Concatenation"
// API'de bazılarını ?vehicleID=1 şeklinde bazılarını da /1 şeklinde kullanıyoruz. Bunları standartlaştır, ona göre burayı da düzenle
// gerekirse buraya sadece base apileri koy, /Vehicles cart curtları sayfalara tek tek koy.
