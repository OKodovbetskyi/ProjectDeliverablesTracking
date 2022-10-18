import { Router } from "express";
import Accessor from "../Accessor.js";
import dbConn from "../database/database-connection.js";
import Controller from "../controller/controller.js";
const router = Router();
const accesor = new Accessor(dbConn);
const controller = new Controller(accesor);

router.get('/' , controller.list);



export default router;