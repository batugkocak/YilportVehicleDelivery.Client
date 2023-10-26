export const brands = {
  url: "https://localhost:7060/Brands",
  byId: (brandId) => `${brands.getAll}/${brandId}`,
};

export const departments = {
  url: "https://localhost:7060/Departments",
  byId: (departmentId) => `${departments.getAll}/${departmentId}`,
};

export const vehiclesOnTask = {
  url: "https://localhost:7060/VehicleOnTasks/ForTable",
  byId: (vehicleOnTaskId) =>
    `https://localhost:7060/VehicleOnTasks/Details/${vehicleOnTaskId}`,
};
export const predefinedTasks = {
  url: "https://localhost:7060/PredefinedTasks",
};
export const vehicles = {
  url: "https://localhost:7060/Vehicles",
  byIdDetails: (carId) => `https://localhost:7060/Vehicles/${carId}/Details`,
  detailsForTable: "https://localhost:7060/Vehicles/DetailsForTable",
  byId: (carId) => `https://localhost:7060/Vehicles/${carId}`,
};

export const owners = {
  url: "https://localhost:7060/Owners",
};

export const drivers = {
  url: "https://localhost:7060/Drivers",
};

//TODO: Decide wheter using "Separate Endpoints" or "Base URL with Concatenation"
// API'de bazılarını ?vehicleID=1 şeklinde bazılarını da /1 şeklinde kullanıyoruz. Bunları standartlaştır, ona göre burayı da düzenle
//gerekirse buraya sadece base apileri koy, /Vehicles cart curtları sayfalara tek tek koy.
