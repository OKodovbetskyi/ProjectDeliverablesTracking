import { Router } from "express";
import dbConn from "../database/database-connection.js";
import Validator from "../validator/Validator.js";
import Model from "../models/Model.js"
import profileModel from "../models/Profile-Model.js";
import routerDevProfiles from "./deliverableprofile-router.js";
import Accessor from "../accessor/Accessor.js";
import schema from "../validator/profile-schema.js";
import Controller from "../controller/Controller.js";

const validator = new Validator(schema)
//Model--------------------------------------------------
const model = new Model(profileModel);
//Router-------------------------------------------------
const router = Router();
//Validators---------------------------------------------
const accessor = new Accessor(model, dbConn);
//Controller
const controller = new Controller(accessor,validator);

router.use('/deliverables', routerDevProfiles);
//Profiles....................................................
//GET
router.get('/', (req,res)=> controller.get(req,res));
router.get('/:id(\\d+)', (req,res)=> controller.get(req,res));
//POST
router.post('/', (req,res)=> controller.post(req,res));
//PUT
router.put('/:id', (req,res)=> controller.put(req,res));
//DELETE
router.delete('/:id', (req,res)=> controller.delete(req,res));
//PUT


export default router;