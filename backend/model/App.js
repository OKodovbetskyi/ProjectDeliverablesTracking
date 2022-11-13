//Imports
import express from "express";
import cors from "cors";
import dbConn from "./database/database-connection.js";
import idSchema from "./validator/id-schema.js";
import {deliverableSchema, categorySchema} from "./validator/id-schema.js";
import Validator from "./validator/Validator.js";

//Configuration server.
const app = express();
const PORT = process.env.PORT || 3000;


//Configure middleware
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Controll-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const validator = new Validator(idSchema);
const delivearableValidator = new Validator(deliverableSchema);


//Controllers 


const listallDeliverablesController = async  (req ,res) =>{
        const sql = buildDeliverablesSelectSql()
        const {isSuccess, result, message: accesorMessage} = await read(sql);
        if (!isSuccess) return res.status(400).json({message: accesorMessage});

        res.json(result);
    }

const listDeliverablesWithUIDController = async (req, res) =>{
    const sql = buildDeliverablesSelectSql(req.params.uid, 'student');
        const {isError, message: validatorMessage} = validator.validateId(req.params.uid);
        if (isError) return res.status(400).json({message: validatorMessage});

        const { isSuccess, result, message: accessorMessage } = await  read(sql);
        if(!isSuccess) return res.status(400).json({ message: accessorMessage });

        res.json(result);    
}
const listallCategoriesController = async  (req ,res) =>{
    const sql = buildDeliverablesSelectSql(null, 'categories')
    const {isSuccess, result, message: accesorMessage} = await read(sql);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});

    res.json(result);
}

const postDeliverablesController = async (req, res) =>{
    const {isError, message: validatorMessage} = delivearableValidator.validate(deliverableSchema, req.body);
    if (isError) return res.status(400).json({message: validatorMessage});
    
    const sql = buildDeliverablesInsert(req.body, null);

    const {isSuccess, result, message:accesorMessage} = await create(sql);
    if (!isSuccess) return res.status(404).json({message: accesorMessage});
    res.status(201).json(result);
}
const postCategoryController = async (req, res) =>{
    const {isError, message: validatorMessage} = validator.validate(categorySchema, req.body);
    if (isError) return res.status(400).json({message: validatorMessage});
    
    const sql = buildCategoryInsert(req.body, null);
    const {isSuccess, result, message:accesorMessage} = await create(sql, 'categories');
    if (!isSuccess) return res.status(404).json({message: accesorMessage});
    res.status(201).json(result);
}

const read = async (sql) =>{
            try{
                const [result] = await dbConn.query(sql);
                return result.length === 0
                ?  {isSuccess: false ,result:null, message: 'No records found'}
                : {isSuccess: true, result:result, message: 'Records successfuly recovered'};
            } catch (error) {
                return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
            }
        }
const create = async (sql, option) =>{
            try{
                const status = await dbConn.query(sql);
              console.log(sql);
                const recoverRecord = buildDeliverablesSelectSql(status[0].insertId, option);

                const {isSuccess, result, message} = await read(recoverRecord);
    
                return isSuccess
                ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
                : {isSuccess: false ,result:null, message: `Failed to recover the inserted record ${message}`};
                
            } catch (error) {
                return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
            }
        }

    const buildDeliverablesSelectSql = (id, variant) =>{
        let table = '((Deliverables INNER JOIN AssignmentDevs ON Deliverables.DeliverableID = AssignmentDevs.AssignmentDevDevID) LEFT JOIN Categories ON Deliverables.DeliverableCategoryID = Categories.CategoryID)';
        let fields = ["DeliverableTitle", "DeliverableDetail", "AssignmentID", "AssignmentDevDuedate", "AssignmentDevFeedback", "CategoryName","AssignmentDevStatus"];
        let sql = '';

        switch (variant){
           case 'student':
                sql = `SELECT ${fields} FROM ${table}`
                if (id) sql += `WHERE AssignmentDevUserID =${id}`;
                break;
            case 'categories':
                sql = `SELECT * FROM Categories`;
                if (id) sql += ` WHERE CategoryID = ${id}`
                break;
            default: 
                sql = `SELECT DeliverableTitle, DeliverableDetail FROM Deliverables `
                if (id) sql += `WHERE DeliverableID =${id}`;
        }
        return sql;
    }
    const buildDeliverablesInsert = (record, variant) =>{
        let table = 'Deliverables';
        let fields = ["DeliverableTitle", "DeliverableDetail"];
        
        let sql =''
        switch (variant) {
            default:
               sql= `INSERT INTO ${table}
                SET 
                DeliverableTitle ="${record['DeliverableTitle']}",
                DeliverableDetail="${record['DeliverableDetail']}"  `
              
        }
        return sql;    
    }    
    const buildCategoryInsert = (record,variant) =>{
        let table = 'Categories';
        let fields = ["CategoryName"];
        
        let sql =''
        switch (variant) {
            default:
                sql= `INSERT INTO Categories
                SET 
                CategoryName="${record['CategoryName']}"`
        }
        return sql;
    }  

//Endpoints
//GET
app.get('/api/deliverables', listallDeliverablesController);
app.get('/api/deliverables/categories', listallCategoriesController);
app.get('/api/student/deliverables/:uid', listDeliverablesWithUIDController);

//POST
app.post('/api/deliverables/categories', postCategoryController);
app.post('/api/deliverables', postDeliverablesController);




//Start Server
app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)});
