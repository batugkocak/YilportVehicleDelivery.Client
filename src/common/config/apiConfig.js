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
  url: "https://localhost:7060/VehicleOnTasks/ForNormalTable",
  archiveUrl: "https://localhost:7060/VehicleOnTasks/ForArchiveTable",
  byId: (vehicleOnTaskId) =>
    `https://localhost:7060/VehicleOnTasks/Details/${vehicleOnTaskId}`,
  archiveDetailsUrl: "https://localhost:7060/VehicleOnTasks/Details",
};
export const predefinedTasks = {
  url: "https://localhost:7060/PredefinedTasks",
};
export const vehicles = {
  url: "https://localhost:7060/Vehicles",
  detailsForTable: "https://localhost:7060/Vehicles/DetailsForTable",
  update: "https://localhost:7060/Vehicles/Update",
  byIdDetails: (carId) => `https://localhost:7060/Vehicles/${carId}/Details`,
  byId: (carId) => `https://localhost:7060/Vehicles/${carId}`,
  delete: (carId) => `https://localhost:7060/Vehicles/Delete/${carId}`,
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
