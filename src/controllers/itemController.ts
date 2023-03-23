import { PgRepository } from './../repository/pgRepository';
import { Request, Response, Router } from "express";
import { DataFormatter } from "../formatter/DataFormatter";
export class itemController {
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
    this.router.get("/product/:id", this.getProduct);
    this.router.get("/customer/:id", this.getCustomer);
    this.router.get("/order/:id", this.getOrder);
    this.router.get("/supplier/:id", this.getSupplier);
    this.router.get("/employee/:id", this.getEmployee);
  };

  public getCustomer = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const id = req.params.id;
      const rawCustomerData = await this.repository.getCustomerById(id);
      return res.status(200).send(rawCustomerData);
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  }

  public getEmployee = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const id = req.params.id;
      const rawCustomerData = await this.repository.getEmployeeById(id);
      return res.status(200).send(rawCustomerData);
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  }

  public getOrder = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const id = req.params.id;
  
      const rawTopOrderInfo = await this.repository.getOrderById(id);
      const productsInOrder = await this.repository.getOrderProductsById(id);
  
      const response = this.formatter.formatOrderResponse(
        rawTopOrderInfo,
        productsInOrder
      );
  
      return res.status(200).send(response);
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  }

  public getProduct = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const id = req.params.id;
      const rawCustomerData = await this.repository.getProductById(id);
  
      return res.status(200).send(rawCustomerData);
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  }

  public getSupplier = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const id = req.params.id;
      const rawCustomerData = await this.repository.getSupplierById(id);
      return res.status(200).send(rawCustomerData);
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  }
}
