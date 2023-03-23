import {
    text,
    real,
    pgTable
  } from 'drizzle-orm/pg-core';

export const orderDetail = pgTable('OrderDetails', {
    OrderID: real('OrderID').notNull(),
    ProductID: real('ProductID').notNull(),
    Quantity: real('Quantity').notNull(),
    UnitPrice: real('UnitPrice').notNull(),
    Discount: real('Discount').notNull()
});

export const orders = pgTable('Orders', {
    OrderID: real('OrderID').notNull(),
    CustomerID: text('CustomerID').notNull(),
    EmployeeID: real('EmployeeID').notNull(),
    OrderDate: text('OrderDate').notNull(),
    RequiredDate: text('RequiredDate').notNull(),
    ShippedDate: text('ShippedDate'),
    ShipVia: real('ShipVia').notNull(),
    Freight: real('Freight').notNull(),
    ShipName: text('ShipName').notNull(),
    ShipAddress: text('ShipAddress').notNull(),
    ShipCity: text('ShipCity').notNull(),
    ShipRegion: text('ShipRegion'),
    ShipPostalCode: text('ShipPostalCode'),
    ShipCountry: text('ShipCountry').notNull()
})

export const categories = pgTable('categories', {
    CategoryID: real('CategoryID').notNull(),
    CategoryName: text('CategoryName').notNull(),
    Description: text('Description').notNull()
})

export const employees = pgTable('Employees', {
    EmployeeID: real('EmployeeID').notNull(),
    LastName: text('LastName').notNull(),
    FirstName: text('FirstName').notNull(),
    Title: text('Title').notNull(),
    TitleOfCourtesy: text('TitleOfCourtesy').notNull(),
    BirthDate: text('BirthDate').notNull(),
    HireDate: text('HireDate').notNull(),
    Address: text('Address').notNull(),
    City: text('City').notNull(),
    Region: text('Region').notNull(),
    PostalCode: text('PostalCode'),
    Country: text('Country').notNull(),
    HomePhone: text('HomePhone').notNull(),
    Extension: real('Extension').notNull(),
    Notes: text('Notes').notNull(),
    ReportsTo: text('ReportsTo')
})

export const customers = pgTable('Customers', {
    CustomerID: text('CustomerID').notNull(),
    CompanyName: text('CompanyName').notNull(),
    ContactName: text('ContactName').notNull(),
    ContactTitle: text('ContactTitle').notNull(),
    Address: text('Address'),
    City: text('City'),
    Region: text('Region'),
    PostalCode: text('PostalCode'),
    Country: text('Country'),
    Phone: text('Phone'),
    Fax: text('Fax')
})


export const employeeTerritories = pgTable('EmployeeTerritories', {
    EmployeeID: real('EmployeeID').notNull(),
    TerritoryID: text('TerritoryID').notNull(),
})

export const products = pgTable('Products', {
    ProductID: real('ProductID').notNull(),
    ProductName: text('ProductName').notNull(),
    SupplierID: real('SupplierID').notNull(),
    CategoryID: real('CategoryID').notNull(),
    QuantityPerUnit: text('QuantityPerUnit').notNull(),
    UnitPrice: real('UnitPrice').notNull(),
    UnitsInStock: real('UnitsInStock').notNull(),
    UnitsOnOrder: real('UnitsOnOrder').notNull(),
    ReorderLevel: real('ReorderLevel').notNull(),
    Discontinued: real('Discontinued').notNull()
})

export const regions = pgTable('Regions', {
    regionID: real('regionID').notNull(),
    regionDescription: text('regionDescription').notNull(),
})

export const shippers = pgTable('Shippers', {
    shipperID: real('ShipperID').notNull(),
    companyName: text('CompanyName').notNull(),
    phone: text('Phone').notNull()
})

export const supplies = pgTable('Supplies', {
    SupplierID: real('SupplierID').notNull(),
    CompanyName: text('CompanyName').notNull(),
    ContactName: text('ContactName').notNull(),
    ContactTitle: text('ContactTitle').notNull(),
    Address: text('Address').notNull(),
    City: text('City').notNull(),
    Region: text('Region'),
    PostalCode: text('PostalCode').notNull(),
    Country: text('Country').notNull(),
    Phone: text('Phone').notNull(),
    Fax: text('Fax'),
    HomePage: text('HomePage')
})

export const territories = pgTable('Territories', {
    TerritoryID: text('TerritoryID').notNull(),
    TerritoryDescription: text('TerritoryDescription').notNull(),
    RegionID: real('RegionID').notNull()
})