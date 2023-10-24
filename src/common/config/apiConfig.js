export const brands = {
  url: "https://localhost:7060/Brands",
  getById: (brandId) => `${brands.url}/${brandId}`,
};

export const departments = {
  url: "https://localhost:7060/Departments",
  getById: (departmentId) => `${departments.url}/${departmentId}`,
};

//TODO: Decide wheter using "Separate Endpoints" or "Base URL with Concatenation"
