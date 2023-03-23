import { DataFormatter } from './formatter/DataFormatter';
import { pagesController } from './controllers/pagesController';
import { searchController } from './controllers/searchController';
import { itemController } from './controllers/itemController';
import { PgRepository } from './repository/pgRepository';
import { Pool } from "pg";
import express from 'express'
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'


const app = express()

const PORT = 3000

app.use(express.json())
app.use(cors())

const poolConnection = new Pool({
    connectionString: process.env.CONN_STRING as string,
  });

const repository = new PgRepository(poolConnection)
const formatter = new DataFormatter(repository)

const items = new itemController("/item", repository, formatter)
const search = new searchController("/search", repository, formatter)
const pages = new pagesController("/pages", repository, formatter)

const controllers = [items, search, pages]
controllers.forEach((controller) => {
    controller.init()
    app.use(controller.path, controller.router)
})


app.listen(PORT, () => {
    console.log("started")
})