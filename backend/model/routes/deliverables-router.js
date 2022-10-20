import { Router } from "express";
import Accessor from "../database/accessor/Accessor.js";
import dbConn from "../database/database-connection.js";
import Controller from "../controller/controller.js";
import idSchema from "../validator/id-schema.js";
import Validator from "../validator/Validator.js";
const router = Router();

const validator = new Validator(idSchema);
const accesor = new Accessor(dbConn);
const controller = new Controller(accesor, validator);

router.get('/' , controller.list);
router.get('/:id', controller.listWithId);



export default router;