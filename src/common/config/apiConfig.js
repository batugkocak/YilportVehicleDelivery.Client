export const brands = {
  url: "https://localhost:7060/Brands",
  byId: (brandId) => `${brands.getAll}/${brandId}`,
};

export const departments = {
  url: "https://localhost:7060/Departments",
  byId: (departmentId) => `${departments.getAll}/${departmentId}`,
};

//https://localhost:7060/VehicleOnTasks/Details?firstGivenDate=2023-10-01&lastGivenDate=2023-11-03

export const vehiclesOnTask = {
  add: "https://localhost:7060/VehicleOnTasks",

  delete: (vehicleOnTaskId) =>
    `https://localhost:7060/VehicleOnTasks/Delete/${vehicleOnTaskId}`,

  url: "https://localhost:7060/VehicleOnTasks/ForNormalTable",
  archiveUrl: "https://localhost:7060/VehicleOnTasks/ForArchiveTable",
  byId: (vehicleOnTaskId) =>
    `https://localhost:7060/VehicleOnTasks/Details/${vehicleOnTaskId}`,

  archiveDetailsUrl: "https://localhost:7060/VehicleOnTasks/Details",

  finishUrl: (vehicleOnTaskId) =>
    `https://localhost:7060/VehicleOnTasks/Finish/${vehicleOnTaskId}`,

  editUrl: "https://localhost:7060/VehicleOnTasks/Update",

  get: (vehicleOnTaskId) =>
    `https://localhost:7060/VehicleOnTasks/${vehicleOnTaskId}`,
};

export const vehicles = {
  url: "https://localhost:7060/Vehicles",
  detailsForTable: "https://localhost:7060/Vehicles/DetailsForTable",
  update: "https://localhost:7060/Vehicles/Update",
  byIdDetails: (carId) => `https://localhost:7060/Vehicles/${carId}/Details`,
  byId: (carId) => `https://localhost:7060/Vehicles/${carId}`,
  delete: (carId) => `https://localhost:7060/Vehicles/Delete/${carId}`,
};
export const predefinedTasks = {
  url: "https://localhost:7060/PredefinedTasks",
};
export const owners = {
  url: "https://localhost:7060/Owners",
};

export const drivers = {
  url: "https://localhost:7060/Drivers",
};

export const auth = {
  login: "https://localhost:7060/Auth/login",
  register: "https://localhost:7060/Auth/register",
};

//TODO: Decide wheter using "Separate Endpoints" or "Base URL with Concatenation"
// API'de bazılarını ?vehicleID=1 şeklinde bazılarını da /1 şeklinde kullanıyoruz. Bunları standartlaştır, ona göre burayı da düzenle
//gerekirse buraya sadece base apileri koy, /Vehicles cart curtları sayfalara tek tek koy.
