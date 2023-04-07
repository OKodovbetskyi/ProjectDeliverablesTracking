import { Router } from "express";
import deliverablesSchema from "../validator/deliverables-schema.js";
import Validator from "../validator/Validator.js";
import Model from "../models/Model.js"
import deliverableModel from "../models/Deliverable-Model.js";
import dbConn from "../database/database-connection.js";
import Accessor from "../accessor/Accessor.js";
import Controller from "../controller/Controller.js";
import catrouter from "./categories-router.js";
import studentrouter from "./studentdeliverable-router.js"
//Router...............................................
const router = Router();
//Validator............................................
const validator = new Validator(deliverablesSchema);
//Model--------------------------------------------------
const model = new Model(deliverableModel);
const accessor = new Accessor(model, dbConn)
//Controller
const controller = new Controller(accessor,validator);
//Query builders......................................... 

//Endpoints.........................................
//GET
router.use('/categories', catrouter);
router.use('/student', studentrouter);
router.get('/', (req,res)=>controller.get(req,res));
router.get('/:id(\\d+)', (req,res)=>controller.get(req,res));
router.post('/',(req,res)=> controller.post(req,res));
//PUT
router.put('/:id',(req,res)=> controller.put(req,res));
//Delete
router.delete('/:id',(req,res)=> controller.delete(req,res));




//Deliverable Profiles




export default router;