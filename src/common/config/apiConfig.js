export const brands = {
  getAll: "https://localhost:7060/Brands",
  getById: (brandId) => `${brands.getAll}/${brandId}`,
};

export const departments = {
  getAll: "https://localhost:7060/Departments",
  getById: (departmentId) => `${departments.getAll}/${departmentId}`,
};

export const vehiclesForTable = {
  getAll: "https://localhost:7060/Vehicles/DetailsForTable",
};
export const vehiclesOnTask = {
  getAll: "https://localhost:7060/VehicleOnTasks/ForTable",
};
export const predefinedTasks = {
  getAll: "https://localhost:7060/PredefinedTasks",
};

//'https://localhost:7060/Vehicles/Details/ById?vehicleId=6'
export const vehicles = {
  all: "https://localhost:7060/Vehicles",
  getByIdDetails: (carId) => `https://localhost:7060/Vehicles/${carId}/Details`,
  getById: (carId) => `https://localhost:7060/Vehicles/${carId}`,
  departments: "https://localhost:7060/Departments",
  brands: "https://localhost:7060/Brands",
  owners: "https://localhost:7060/Owners",
  drivers: "https://localhost:7060/Drivers",
};

//TODO: Decide wheter using "Separate Endpoints" or "Base URL with Concatenation"
// API'de bazılarını ?vehicleID=1 şeklinde bazılarını da /1 şeklinde kullanıyoruz. Bunları standartlaştır, ona göre burayı da düzenle
//gerekirse buraya sadece base apileri koy, /Vehicles cart curtları sayfalara tek tek koy.
