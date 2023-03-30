import { Request, Response, Router } from "express";
import { DataFormatter } from "./../formatter/DataFormatter";
import { PgRepository } from "../repository/pgRepository";
import axios from "axios";
export class metricsController {
  router: Router;
  path: string;

  constructor(path: string) {
    (this.router = Router()), (this.path = path);
  }

  public init = () => {
    this.router.get("/", this.getCountry);
  };

  public getCountry = async (
    req: Request,
    res: Response
  ) => {
    try {
      const {data} = await axios.get("https://api.db-ip.com/v2/free/self")
      return res.status(200).send(data);
    } catch (err) {
      console.log(err)
      return res.status(500).send("Server error");
    }
  };

}
