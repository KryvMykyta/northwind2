import { Request, Response, Router } from "express";
import { DataFormatter } from "./../formatter/DataFormatter";
import { PgRepository } from "../repository/pgRepository";
export class searchController {
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
    this.router.get("/products/:key", this.searchProducts);
    this.router.get("/customers/:key", this.searchCustomers);
  };

  public searchProducts = async (
    req: Request<{ key: string }>,
    res: Response
  ) => {
    try {
      const keyword = req.params.key;
      const rawCustomersData = await this.repository.searchProducts(keyword);
      return res.status(200).send(rawCustomersData);
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  };

  public searchCustomers = async (
    req: Request<{ key: string }>,
    res: Response
  ) => {
    try {
      const keyword = req.params.key;
      // const this.repository = new Pgthis.repository(process.env.CONN_STRING as string);
      const rawCustomersData = await this.repository.searchCustomers(keyword);
      return res.status(200).send(rawCustomersData);
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  };
}
