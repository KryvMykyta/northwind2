export type CustomerInfo = {
  id: string;
  company: string;
  name: string;
  title: string;
  city: string | null;
  country: string | null;
};

export type CustomerInfoAvatar = {
  id: string;
  company: string;
  name: string;
  title: string;
  city: string | null;
  country: string | null;
  avatarLink: string;
};

export type SupplierInfo = {
  id: number;
  companyName: string;
  name: string;
  title: string;
  city: string;
  country: string;
};

export type SupplierInfoAvatar = {
  id: number;
  companyName: string;
  name: string;
  title: string;
  city: string;
  country: string;
  avatarLink: string;
};

export type EmployeeInfo = {
  id: number;
  name: string;
  phone: string;
  title: string;
  city: string;
  country: string;
};

export type EmployeeInfoAvatar = {
  id: number;
  name: string;
  phone: string;
  title: string;
  city: string;
  country: string;
  avatarLink: string;
};

export type OrderInfo = {
  data: {
    CustomerId: string;
    ShipName: string;
    TotalProductsDiscount: number;
    TotalProductsPrice: number;
    TotalProductsItems: number;
    TotalProducts: number;
    Freight: number;
    OrderDate: string;
    RequiredDate: string;
    ShippedDate: string | null;
    ShipCity: string;
    ShipRegion: string | null;
    PostalCode: string | null;
    ShipCountry: string;
    CompanyShipper: string | null;
  }[];
  sqlQueries: {
    sql: string;
    sqlType: string;
    resultsCount: number;
    timeStart: string;
    timeTaken: number;
  }[];
};

export type OrderProductsInfo = {
  data: {
    ProductName: string | null;
    ProductId: number;
    Quantity: number;
    OrderPrice: number;
    TotalPrice: number;
    Discount: number;
  }[];
  sqlQueries: {
    sql: string;
    sqlType: string;
    resultsCount: number;
    timeStart: string;
    timeTaken: number;
  }[];
};

export type OrderPageInfo = {
  productsInfo: {
    ProductName: string | null;
    ProductId: number;
    Quantity: number;
    OrderPrice: number;
    TotalPrice: number;
    Discount: number;
  }[];
  data: {
    CustomerId: string;
    ShipName: string;
    TotalProductsDiscount: number;
    TotalProductsPrice: number;
    TotalProductsItems: number;
    TotalProducts: number;
    CompanyShipper: string | null;
    Freight: number;
    OrderDate: string;
    RequiredDate: string;
    ShippedDate: string | null;
    ShipCity: string;
    ShipRegion: string | null;
    PostalCode: string | null;
    ShipCountry: string;
  }[];
  sqlQueries: {
    sql: string;
    sqlType: string;
    resultsCount: number;
    timeStart: string;
    timeTaken: number;
  }[];
};

export type OrderPage = {
  data: {
    TotalProductsPrice: number;
    TotalProductsItems: number;
    TotalProducts: number;
    OrderId: number;
    Shipped: string | null;
    ShipName: string;
    City: string;
    Country: string;
  }[];
  sqlQueries: sqlRecord[];
};

export type sqlRecord = {
  sql: string;
  sqlType: string;
  resultsCount: number;
  timeStart: string;
  timeTaken: number;
};

export type tables = "employees" | "customers" | "suppliers" | "products" | "orders" 
