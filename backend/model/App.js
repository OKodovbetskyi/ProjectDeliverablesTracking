//Imports
import express from "express";
import cors from "cors";
import dbConn from "./database/database-connection.js";
import idSchema from "./validator/id-schema.js";
import {deliverableSchema, categorySchema} from "./validator/id-schema.js";
import Validator from "./validator/Validator.js";

//Configuration server.
const app = express();
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
const getDeliverablesController= async  (req ,res) =>{
        const id = req.params.id;
        const sql = buildDeliverablesSelectSql(id,null);
        const {isSuccess, result, message: accesorMessage} = await read(sql);
        if (!isSuccess) return res.status(400).json({message: accesorMessage});

        res.status(200).json(result);
    }

const getStudentDeliverableController = async (req, res) =>{
    const sql = buildDeliverablesSelectSql(req.params.uid, 'student');
        const {isError, message: validatorMessage} = validator.validateId(req.params.uid);
        if (isError) return res.status(400).json({message: validatorMessage});

        const { isSuccess, result, message: accessorMessage } = await  read(sql);
        if(!isSuccess) return res.status(400).json({ message: accessorMessage });

        res.json(result);    
}
const getCategoriesController = async  (req ,res) =>{
    const id = req.params.id;
    const sql =await buildCategoriesSelectSql(id);
    const {isSuccess, result, message: accesorMessage} = await read(sql);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});

    res.json(result);
}
const buildSetFields = (fields) =>fields.reduce((setSQL,field,index)=>
    setSQL + `${field}=:${field}`+ ((index=== fields.length-1) ? '' : ', '),'SET ');

const buildDeliverablesUpdateSql = (id, obj) =>{
    let table = 'Deliverables ';
    let mutablefieds = ["DeliverableTitle", "DeliverableDetail"];
    return `UPDATE Deliverables SET DeliverableTitle="${obj.DeliverableTitle}", DeliverableDetail="${obj.DeliverableDetail}" WHERE DeliverableID =${id}`
    }

const buildDeliverablesDeleteSql = (id, obj) =>{
    let table = 'Deliverables ';
    let mutablefieds = ["DeliverableTitle", "DeliverableDetail"];
    return `DELETE FROM Deliverables WHERE DeliverableID =${id}`
    }
const postDeliverablesController = async (req, res) =>{
    const {isError, message: validatorMessage} = delivearableValidator.validate(deliverableSchema, req.body);
    if (isError) return res.status(400).json({message: validatorMessage});
    
    const sql = buildDeliverablesInsert(req.body, null);

    const {isSuccess, result, message:accesorMessage} = await create(sql);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    res.status(201).json(result);
}
const putDeliverablesController = async (req, res) =>{
    //Validate request
    const id = req.params.id;
    const record = req.body;  
    //Access data
    const sql = buildDeliverablesUpdateSql(id, req.body);
    console.log(sql)
    const {isSuccess, result, message:accesorMessage} = await updateDeliverables(sql, id, record);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    //Response to request
    res.status(201).json(result);
}
const deleteDeliverablesController = async (req, res) =>{
    //Validate request
    const id = req.params.id;
    //Access data
    const sql = buildDeliverablesDeleteSql(id);
    console.log(sql)
    const {isSuccess, result, message:accesorMessage} = await deleteDeliverables(sql,id);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    //Response to request
    res.status(200).json({message:accesorMessage});
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
 const deleteDeliverables = async (sql,id) =>{
    try{
        const status = await dbConn.query(sql);
        return status[0].affectedRows === 0
        ?  {isSuccess: false ,result:null, message: `Failed to delete record ${id}`} 
        :{isSuccess: true, result:null, message: 'Records successfuly deleted'}
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to execute query ${error.message}`};
    }
        }
const updateDeliverables = async (sql,id, record) =>{
            try{
                const status = await dbConn.query(sql);
                if (status[0].affectedRows === 0){
                    return {isSuccess: false, result: null, message: `Failed to update record: no rows affected.`};
                }
                const recoverRecord = buildDeliverablesSelectSql(id, null);
                console.log(recoverRecord)
                const {isSuccess, result, message} = await read(recoverRecord);
                return isSuccess
                ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
                : {isSuccess: false ,result:null, message: `Failed to recover updated record ${message}`};
                
            } catch (error) {
                return {isSuccess: false, result: null, message: `Failed to execute query ${error.message}`};
            }
        }
const create = async (sql, option) =>{
            try{
                const status = await dbConn.query(sql);
                const recoverRecord = buildDeliverablesSelectSql(status[0].insertId, option);

                const {isSuccess, result, message} = await read(recoverRecord);
                console.warn(result);
                return isSuccess
                ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
                : {isSuccess: false ,result:null, message: `Failed to recover the inserted record ${message}`};
                
            } catch (error) {
                return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
            }
        }
const buildCategoriesSelectSql=(id)=>{
    let sql = `SELECT * FROM Categories `;
    if (id) sql += ` WHERE CategoryID = ${id}`
        return sql;
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
            case 'deliverable':
                sql = `SELECT * FROM Deliverables `;
                if (id) sql += ` WHERE DeliverableID = ${id}`
                break;
            default: 
                sql = `SELECT DeliverableID, DeliverableTitle, DeliverableDetail,CategoryName, CategoryID FROM Deliverables 
                LEFT JOIN Categories ON 
                Deliverables.DeliverableCategoryID = Categories.CategoryID`
                if (id) sql += ` WHERE DeliverableID =${id}`;
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
                DeliverableDetail="${record['DeliverableDetail']}",
                DeliverableCategoryID="${record['DeliverableCategoryID']}"  `
              
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
app.get('/', (req,res)=>{res.status(200)})
app.get('/api/deliverables', getDeliverablesController);
app.get('/api/deliverables/categories', getCategoriesController);
app.get('/api/deliverables/categories/:id', getCategoriesController);
app.get('/api/deliverables/:id', getDeliverablesController);
app.get('/api/student/deliverables/:uid', getStudentDeliverableController);
//POST
app.post('/api/deliverables/categories', postCategoryController);
app.post('/api/deliverables', postDeliverablesController);

//PUT
app.put('/api/deliverables/:id', putDeliverablesController);


//Delete
app.delete('/api/deliverables/:id', deleteDeliverablesController);

//Start Server


export default app;