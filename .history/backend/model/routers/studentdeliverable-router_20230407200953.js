import { Router } from "express";
import dbConn from "../database/database-connection.js";
import Validator from "../validator/Validator.js";
import Model from "../models/Model.js"
import Accessor from "../accessor/Accessor.js";
import Controller from "../controller/Controller.js";
import studentdeliverablemodel from "../models/StudentDeliverable-Model.js";
import schema from "../validator/studentdeliverables-schema.js";

//Validator----------------------------------------------
const validator = new Validator(schema);
//Model--------------------------------------------------
const model = new Model(studentdeliverablemodel);
const router = Router();
//Accessor-----------------------------------------------
const accessor= new Accessor(model, dbConn);
//Controller---------------------------------------------
const controller = new Controller(accessor,validator);


// * Student deliverables assignments.......................................
router.get('/',(req,res)=> controller.get(req,res,));
router.get('/:id',(req,res)=> controller.get(req,res,));
router.post('/',(req,res)=> controller.post(req,res));
export default router;