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

//'https://localhost:7060/Vehicles/Details/ById?vehicleId=6'
export const vehicles = {
  getAll: "https://localhost:7060/Vehicles",
  getById: (carId) =>
    `https://localhost:7060/Vehicles/Details/ById?vehicleId=${carId}`,
};

//TODO: Decide wheter using "Separate Endpoints" or "Base URL with Concatenation"
// API'de bazılarını ?vehicleID=1 şeklinde bazılarını da /1 şeklinde kullanıyoruz. Bunları standartlaştır, ona göre burayı da düzenle
//gerekirse buraya sadece base apileri koy, /Vehicles cart curtları sayfalara tek tek koy.
