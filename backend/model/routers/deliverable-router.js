import { Router } from "express";
import deliverablesSchema from "../validator/deliverables-schema.js";
import Validator from "../validator/Validator.js";
import Model from "../models/Model.js"
import deliverableModel from "../models/Deliverable-Model.js";
import dbConn from "../database/database-connection.js";
import Accessor from "../accessor/Accessor.js";
import Controller from "../controller/Controller.js";
import catrouter from "./categories-router.js";
//Validator............................................
const validator = new Validator(deliverablesSchema);
const router = Router();
//Model--------------------------------------------------
const model = new Model(deliverableModel);
const accessor = new Accessor(model, dbConn)
//Controller
const controller = new Controller(accessor,validator);
//Query builders......................................... 

//Endpoints.........................................

const getStudentDeliverableController = async (req, res) =>{
    const id =req.params.uid;
        const {isError, message: validatorMessage} = validator.validateId(id);
        if (isError) return res.status(400).json({message: validatorMessage});
    
        const { isSuccess, result, message: accessorMessage } = await accessor.read(id, 'student');
        if(!isSuccess) return res.status(400).json({ message: accessorMessage });
    
        res.json(result);    
}
//GET
router.use('/categories', catrouter)
router.get('/', (req,res)=>controller.get(req,res));
router.post('/',(req,res)=> controller.post(req,res));
//PUT
router.put('/:id',(req,res)=> controller.put(req,res));
//Delete
router.delete('/:id',(req,res)=> controller.delete(req,res));
router.get('/student/:uid',(req,res)=> getStudentDeliverableController(req,res));



//Deliverable Profiles




export default router;