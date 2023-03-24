import { tables } from "./../types/types";
import { shippers } from "./../schemas/pgSchema";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  customers,
  employees,
  orderDetail,
  orders,
  products,
  supplies,
} from "../schemas/pgSchema";
import { sql } from "drizzle-orm/sql";
import { eq, asc, ilike, and, gte, lt } from "drizzle-orm/expressions";
import { alias } from "drizzle-orm/pg-core";

export class PgRepository {
  db: NodePgDatabase;

  constructor(poolConnection: Pool) {
    const db = drizzle(poolConnection);
    this.db = db;
  }

  public getCount = async (table: tables) => {
    const startTime = new Date();
    let queryRequest
    switch (table) {
      case "customers":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(customers);
        break;
      case "employees":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(employees);
        break;
      case "orders":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(orders);
        break;
      case "products":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(products);
        break;
      case "suppliers":
        queryRequest = this.db
          .select({
            count: sql<number>`COUNT (*)`.as("count"),
          })
          .from(supplies);
        break;
    }
    const {sql: sqlString} = queryRequest.toSQL()
    const queryResponse = await queryRequest
    const endTime = new Date()
    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };


  public getCustomerById = async (id: string) => {
    const startTime = new Date();
    const customerQuery = this.db
      .select()
      .from(customers)
      .where(eq(customers.CustomerID, id));
    const { sql } = customerQuery.toSQL();

    const queryResponse = await customerQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public getEmployeeById = async (id: number) => {
    const startTime = new Date();
    const aliasEmployee = alias(employees,"aliasEmployee")
    const employeeQuery = this.db
      .select({
        ...employees,
        reportsName: sql<string>`CONCAT(${aliasEmployee.FirstName}, ' ' , ${aliasEmployee.LastName})`.as(
          "reportsName"
        )
      })
      .from(employees)
      .leftJoin(aliasEmployee,eq(employees.ReportsTo, aliasEmployee.EmployeeID))
      .where(eq(employees.EmployeeID, id));
    const { sql: sqlString } = employeeQuery.toSQL();

    const queryResponse = await employeeQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public getProductById = async (id: number) => {
    const startTime = new Date();
    const productQuery = this.db
      .select({
        productName: products.ProductName,
        supplierId: products.SupplierID,
        supplier: supplies.CompanyName,
        qtyPerUnit: products.QuantityPerUnit,
        unitPrice: products.UnitPrice,
        unitsInStock: products.UnitsInStock,
        unitsInOrder: products.UnitsOnOrder,
        reorderLevel: products.ReorderLevel,
        discontinued: products.Discontinued,
      })
      .from(products)
      .leftJoin(supplies, eq(products.SupplierID, supplies.SupplierID))
      .where(eq(products.ProductID, id));
    const { sql } = productQuery.toSQL();

    const queryResponse = await productQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public getSupplierById = async (id: number) => {
    const startTime = new Date();
    const suppliesQuery = this.db
      .select()
      .from(supplies)
      .where(eq(supplies.SupplierID, id));
    const { sql } = suppliesQuery.toSQL();

    const queryResponse = await suppliesQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public searchCustomers = async (keyword: string) => {
    const startTime = new Date();
    const foundCustomers = this.db
      .select({
        id: customers.CustomerID,
        name: customers.CompanyName,
        contact: customers.ContactName,
        title: customers.ContactTitle,
        phone: customers.Phone,
      })
      .from(customers)
      .where(ilike(customers.CompanyName, `%${keyword}%`));

    const { sql } = foundCustomers.toSQL();

    const queryResponse = await foundCustomers;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public searchProducts = async (keyword: string) => {
    const startTime = new Date();
    const foundProducts = this.db
      .select({
        id: products.ProductID,
        name: products.ProductName,
        quantPerUnit: products.QuantityPerUnit,
        price: products.UnitPrice,
        stock: products.UnitsInStock,
      })
      .from(products)
      .where(ilike(products.ProductName, `%${keyword}%`));

    const { sql } = foundProducts.toSQL();

    const queryResponse = await foundProducts;
    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select where",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public customersPage = async (page: number) => {
    const startTime = new Date();
    const customersQuery = this.db
      .select({
        id: customers.CustomerID,
        company: customers.CompanyName,
        name: customers.ContactName,
        title: customers.ContactTitle,
        city: customers.City,
        country: customers.Country,
      })
      .from(customers)
      .orderBy(customers.CustomerID)
      .limit(20)
      .offset((page - 1) * 20);

    const { sql } = customersQuery.toSQL();

    const queryResponse = await customersQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public productsPage = async (page: number) => {
    const startTime = new Date();
    const productsQuery = this.db
      .select({
        id: products.ProductID,
        name: products.ProductName,
        qt: products.QuantityPerUnit,
        price: products.UnitPrice,
        stock: products.UnitsInStock,
        orders: products.UnitsOnOrder,
      })
      .from(products)
      .orderBy(products.ProductID)
      .limit(20)
      .offset((page - 1) * 20);

    const { sql } = productsQuery.toSQL();

    const queryResponse = await productsQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public suppliersPage = async (page: number) => {
    const startTime = new Date();
    const suppliesQuery = this.db
      .select({
        id: supplies.SupplierID,
        companyName: supplies.CompanyName,
        name: supplies.ContactName,
        title: supplies.ContactTitle,
        city: supplies.City,
        country: supplies.Country,
      })
      .from(supplies)
      .orderBy(supplies.SupplierID)
      .limit(20)
      .offset((page - 1) * 20);

    const { sql } = suppliesQuery.toSQL();

    const queryResponse = await suppliesQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public employeesPage = async (page: number) => {
    const startTime = new Date();
    const employeesQuery = this.db
      .select({
        id: employees.EmployeeID,
        name: sql<string>`CONCAT(${employees.FirstName}, ' ' , ${employees.LastName})`.as(
          "name"
        ),
        title: employees.Title,
        city: employees.City,
        phone: employees.HomePhone,
        country: employees.Country,
      })
      .from(employees)
      .orderBy(employees.EmployeeID)
      .limit(20)
      .offset((page - 1) * 20);

    const { sql: sqlString } = employeesQuery.toSQL();

    const queryResponse = await employeesQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public getFirstOrderId = async () => {
    const startTime = new Date();
    const totalQuery = this.db
      .select({ first: orders.OrderID })
      .from(orders)
      .limit(1)
      .orderBy(asc(orders.OrderID));

    const { sql: sqlString } = totalQuery.toSQL();

    const queryResponse = await totalQuery;
    const endTime = new Date();
    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public ordersPage = async (first: number, page: number) => {
    const startTime = new Date();
    const ordersQuery = this.db
      .select({
        TotalProductsPrice:
          sql<number>`SUM(${orderDetail.UnitPrice} * ${orderDetail.Quantity})`.as(
            "TotalProductsPrice"
          ),
        TotalProductsItems: sql<number>`SUM(${orderDetail.Quantity})`.as(
          "TotalProductsItems"
        ),
        TotalProducts: sql<number>`COUNT(${orderDetail.OrderID})`.as(
          "TotalProducts"
        ),
        OrderId: orders.OrderID,
        Shipped: orders.ShippedDate,
        ShipName: orders.ShipName,
        City: orders.ShipCity,
        Country: orders.ShipCountry,
      })
      .from(orders)
      .leftJoin(orderDetail, eq(orders.OrderID, orderDetail.OrderID))
      .where(
        and(
          gte(orders.OrderID, Number(first) + (page - 1) * 20),
          lt(orders.OrderID, Number(first) + page * 20)
        )
      )
      .groupBy(
        orders.OrderID,
        orders.ShippedDate,
        orders.ShipName,
        orders.ShipCity,
        orders.ShipCountry
      )
      .orderBy(asc(orders.OrderID));

    const { sql: sqlString } = ordersQuery.toSQL();

    const queryResponse = await ordersQuery;
    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public getOrderById = async (id: number) => {
    const startTime = new Date();
    const orderQuery = this.db
      .select({
        CustomerId: orders.CustomerID,
        ShipName: orders.ShipName,
        TotalProductsDiscount:
          sql<number>`SUM(${orderDetail.UnitPrice} * ${orderDetail.Quantity} * ${orderDetail.Discount})`.as(
            "TotalProductsDiscount"
          ),
        TotalProductsPrice:
          sql<number>`SUM(${orderDetail.UnitPrice} * ${orderDetail.Quantity})`.as(
            "TotalProductsPrice"
          ),
        TotalProductsItems: sql<number>`SUM(${orderDetail.Quantity})`.as(
          "TotalProductsItems"
        ),
        TotalProducts: sql<number>`COUNT(${orderDetail.OrderID})`.as(
          "TotalProducts"
        ),
        CompanyShipper: shippers.companyName,
        Freight: orders.Freight,
        OrderDate: orders.OrderDate,
        RequiredDate: orders.RequiredDate,
        ShippedDate: orders.ShippedDate,
        ShipCity: orders.ShipCity,
        ShipRegion: orders.ShipRegion,
        PostalCode: orders.ShipPostalCode,
        ShipCountry: orders.ShipCountry,
      })
      .from(orders)
      .leftJoin(orderDetail, eq(orders.OrderID, orderDetail.OrderID))
      .leftJoin(shippers, eq(orders.ShipVia, shippers.shipperID))
      .where(eq(orderDetail.OrderID, id))
      .groupBy(
        orders.CustomerID,
        shippers.companyName,
        orders.OrderID,
        orders.ShipName,
        orders.Freight,
        orders.OrderDate,
        orders.RequiredDate,
        orders.ShippedDate,
        orders.ShipCity,
        orders.ShipRegion,
        orders.ShipPostalCode,
        orders.ShipCountry
      );

    const { sql: sqlString } = orderQuery.toSQL();

    const queryResponse = await orderQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

  public getOrderProductsById = async (id: number) => {
    const startTime = new Date();
    const orderQuery = this.db
      .select({
        ProductName: products.ProductName,
        ProductId: orderDetail.ProductID,
        Quantity: orderDetail.Quantity,
        OrderPrice: orderDetail.UnitPrice,
        TotalPrice:
          sql<number>`${orderDetail.UnitPrice} * ${orderDetail.Quantity}`.as(
            "TotalPrice"
          ),
        Discount: orderDetail.Discount,
      })
      .from(orderDetail)
      .leftJoin(products, eq(products.ProductID, orderDetail.ProductID))
      .where(eq(orderDetail.OrderID, id))
      .groupBy(
        orderDetail.ProductID,
        products.ProductName,
        orderDetail.Quantity,
        orderDetail.UnitPrice,
        orderDetail.Discount
      )

    const { sql: sqlString } = orderQuery.toSQL();

    const queryResponse = await orderQuery;

    const endTime = new Date();

    return {
      data: queryResponse,
      sqlQueries: [
        {
          sql: sqlString,
          sqlType: "select where left join",
          resultsCount: queryResponse.length,
          timeStart: startTime.toISOString(),
          timeTaken: endTime.getTime() - startTime.getTime(),
        },
      ],
    };
  };

}

