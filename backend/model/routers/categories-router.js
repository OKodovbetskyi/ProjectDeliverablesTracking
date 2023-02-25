import { Router } from "express";
import Model from "../models/Model.js";
import Accessor from "../accessor/Accessor.js";
import Controller from "../controller/Controller.js";
import catmodel from "../models/Categories-Model.js";
import dbConn from "../database/database-connection.js";
import Validator from "../validator/Validator.js";
import schema from "../validator/categories-schema.js";
//Validator............................................
const validator = new Validator(schema)
const catrouter = Router();
//Model--------------------------------------------------
const model = new Model(catmodel);
const accessor = new Accessor(model, dbConn)
//Controller
const controller = new Controller(accessor,validator);
//Query builders.........................................




catrouter.get('/',(req,res)=> controller.get(req,res));
catrouter.get('/:id(\\d+)',(req,res)=> controller.get(req,res));

//POST
catrouter.post('/',(req,res)=> controller.post(req,res));

export default catrouter;