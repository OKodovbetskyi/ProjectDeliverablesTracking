import { Router } from "express";
import dbConn from "../database/database-connection.js";
import Validator from "../validator/Validator.js";
import Model from "../models/Model.js"
import usersModel from '../models/Users-Model.js';
import Accessor from "../accessor/Accessor.js";
import schema from "../validator/profile-schema.js";
import Controller from "../controller/Controller.js";

const validator = new Validator(schema)
//Model--------------------------------------------------
const model = new Model(usersModel);
//Router-------------------------------------------------
const router = Router();
//Validators---------------------------------------------
const accessor = new Accessor(model, dbConn);
//Controller
const controller = new Controller(accessor,validator);

//Profiles....................................................
//GET
router.get('/', (req,res)=> controller.get(req,res));
router.get('/:id', (req,res)=> controller.get(req,res));



export default router;