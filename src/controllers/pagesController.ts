import { Request, Response, Router } from "express";
import { PgRepository } from "./../repository/pgRepository";
import { DataFormatter } from "../formatter/DataFormatter";
export class pagesController {
  router: Router;
  path: string;
  repository: PgRepository;
  formatter: DataFormatter

  constructor(path: string, repository: PgRepository, formatter: DataFormatter) {
    (this.router = Router()), (this.path = path);
    this.repository = repository
    this.formatter = formatter
  }

  public init = () => {
    this.router.get("/products/:page", this.getProducts);
    this.router.get("/customers/:page", this.getCustomers);
    this.router.get("/orders/:page", this.getOrders);
    this.router.get("/suppliers/:page", this.getSuppliers);
    this.router.get("/employees/:page", this.getEmployees);
  };

  public getCustomers = async (
    req: Request<{ page: number},{},{},{count?: string }>,
    res: Response
  ) => {
    try {
      const {page} = req.params
      const {count} = req.query
      const rawCustomersData = await this.repository.customersPage(page);
      const formattedData = this.formatter.addAvatarCustomer(rawCustomersData.data);
  
      const totalPagesFormat = await this.formatter.addTotalPages(rawCustomersData.sqlQueries, page, "customers", count)
  
      return res.status(200).send({
        data: formattedData,
        totalPages: totalPagesFormat.totalPages,
        currentPage: page,
        sqlQueries: totalPagesFormat.sqlQueries,
      });
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  }

  public getEmployees = async (
    req: Request<{ page: number },{},{},{count?: string}>,
    res: Response
  ) => {
    try {
      const {page} = req.params
      const {count} = req.query
      const rawCustomersData = await this.repository.employeesPage(page);
  
      const formattedData = this.formatter.addAvatarEmployee(rawCustomersData.data);
      const totalPagesFormat = await this.formatter.addTotalPages(rawCustomersData.sqlQueries, page, "employees", count)
  
      return res.status(200).send({
        data: formattedData,
        totalPages: totalPagesFormat.totalPages,
        currentPage: page,
        sqlQueries: totalPagesFormat.sqlQueries
      });
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  }

  public getOrders = async (req: Request<{ page: number },{},{},{count?: string}>, res: Response) => {
    try {
      const {page} = req.params
      const {count} = req.query
      const firstIdQuery = await this.repository.getFirstOrderId();
      const { data } = firstIdQuery;
      const {first} = data[0]
      const ordersPage = await this.repository.ordersPage(first, page);
      const formattedResponse = this.formatter.formatOrdersPageResponse(ordersPage, firstIdQuery.sqlQueries[0]);
  
      const totalPagesData = await this.formatter.addTotalPages(formattedResponse.sqlQueries, page,"orders", count)
  
      return res.status(200).send({
        data: formattedResponse.data,
        totalPages: totalPagesData.totalPages,
        currentPage: page,
        sqlQueries: totalPagesData.sqlQueries
      });
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  }

  public getProducts = async (
    req: Request<{ page: number },{},{},{count?: string}>,
    res: Response
  ) => {
    try {
      const {page} = req.params;
      const {count} = req.query
      
      const rawCustomersData = await this.repository.productsPage(page);
      const totalPagesFormat = await this.formatter.addTotalPages(rawCustomersData.sqlQueries, page,"products",count)
  
      return res.status(200).send({
        data: rawCustomersData.data,
        totalPages: totalPagesFormat.totalPages,
        currentPage: page,
        sqlQueries: totalPagesFormat.sqlQueries
      });
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  }

  public getSuppliers = async (
    req: Request<{ page: number },{},{},{count?: string}>,
    res: Response
  ) => {
    try {
      const {page} = req.params
      const {count} = req.query
      const rawCustomersData = await this.repository.suppliersPage(page);
      const formattedData = this.formatter.addAvatarSupplier(rawCustomersData.data);
      const totalPagesFormat = await this.formatter.addTotalPages(rawCustomersData.sqlQueries, page,"suppliers", count)
  
      return res.status(200).send({
        data: formattedData,
        totalPages: totalPagesFormat.totalPages,
        currentPage: page,
        sqlQueries: totalPagesFormat.sqlQueries
      });
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  }
}
