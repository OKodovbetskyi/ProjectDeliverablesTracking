import { Router } from "express";
import dbConn from "../database/database-connection.js";
import Validator from "../validator/Validator.js";
import Model from "../models/Model.js"
import deliverableprofileModel from "../models/DeliverableProfile-model.js";
import Accessor from "../accessor/Accessor.js";
import Controller from "../controller/Controller.js";
import schema from "../validator/deliverable-profile-schema.js";

//Validator----------------------------------------------
const validator = new Validator(schema);
//Model--------------------------------------------------
const model = new Model(deliverableprofileModel);
const router = Router();
//Accessor-----------------------------------------------
const accessor= new Accessor(model, dbConn);
//Controller---------------------------------------------
const controller = new Controller(accessor,validator);


// * Profiles deliverables assignments.......................................
router.get('/', (req,res)=>controller.get(req,res, 'profiles')); //'profiles'
router.get('/:id', (req,res)=>controller.get(req,res, 'profiles'));
router.post('/', (req,res)=>controller.post(req,res));//'assignment'
router.put('/:id',(req, res)=>controller.put(req,res))
router.delete('/:id', (req,res)=>controller.delete(req,res));

export default router;