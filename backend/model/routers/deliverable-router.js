import { Router } from "express";
import dbConn from "../database/database-connection.js";
import idSchema from "../validator/id-schema.js";
import {deliverableSchema, categorySchema} from "../validator/id-schema.js";
import Validator from "../validator/Validator.js";
import { profileSchema } from "../validator/profiles-schema.js";
const router = Router();
const validator = new Validator(idSchema);
const profilesValidator = new Validator(profileSchema);
const delivearableValidator = new Validator(deliverableSchema);
//Query builders.........................................
const buildDeliverablesCreateQuery = (record) =>{
    let table = 'Deliverables';
    let fields = ["DeliverableTitle", "DeliverableDetail"];
    let sql= `INSERT INTO ${table}
            SET 
            DeliverableTitle ="${record['DeliverableTitle']}",
            DeliverableDetail="${record['DeliverableDetail']}",
            DeliverableCategoryID="${record['DeliverableCategoryID']}"  `

    return {sql, data :record };    
}    
const buildDeliverablesReadQuery = (id, variant) =>{
    {let table = '((Deliverables INNER JOIN AssignmentDevs ON Deliverables.DeliverableID = AssignmentDevs.AssignmentDevDevID) LEFT JOIN Categories ON Deliverables.DeliverableCategoryID = Categories.CategoryID)';
    let fields = ["DeliverableTitle", "DeliverableDetail", "AssignmentID", "AssignmentDevDuedate", "AssignmentDevFeedback", "CategoryName","AssignmentDevStatus"];
    let sql = '';

    switch (variant){
       case 'student':
            sql = `SELECT ${fields} FROM ${table}`
            if (id) sql += `WHERE AssignmentDevUserID =:ID`;
            break;
        case 'deliverable':
            sql = `SELECT * FROM Deliverables `;
            if (id) sql += ` WHERE DeliverableID =:ID`
            break;
        default: 
            sql = `SELECT DeliverableID, DeliverableTitle, DeliverableDetail,CategoryName, CategoryID FROM Deliverables 
            LEFT JOIN Categories ON 
            Deliverables.DeliverableCategoryID = Categories.CategoryID`
            if (id) sql += ` WHERE DeliverableID =:ID`;
    }
    return {sql, data: {ID: id} };
}}
const buildProfilesReadQuery = (id) =>{
   let sql = `SELECT * FROM Profiles `
   if (id) sql += `WHERE ProfileID =:ID`
   return {sql, data:{ID: id}}
}
const buildProfilesCreateQuery = (record) =>{
    let table = 'Profiles';
    let fields = ["ProfileName", "ProfileDetails"];
    let sql= `INSERT INTO ${table}
            SET 
            ProfileName ="${record['ProfileName']}",
            ProfileDetails ="${record['ProfileDetails']}"`

    return {sql, data :record };    
} 
const buildProfilesUpdateQuery = (id, record) =>{
    let table = 'Profiles ';
    let mutablefieds =  ["ProfileName", "ProfileDetails"];
    let sql= `UPDATE Profiles SET ProfileName="${record.ProfileName}", ProfileDetails="${record.ProfileDetails}" WHERE ProfileID =:ProfileID`
    return {sql, data: {...record, ProfileID:id}}

}
const buildDeliverablesUpdateQuery = (id, record) =>{
        let table = 'Deliverables ';
        let mutablefieds = ["DeliverableTitle", "DeliverableDetail"];
        let sql= `UPDATE Deliverables SET DeliverableTitle="${record.DeliverableTitle}", DeliverableDetail="${record.DeliverableDetail}" WHERE DeliverableID =:DeliverableID`
        return {sql, data: {...record, DeliverableID:id}}
    
}
const buildProfilesDeleteQuery = (id) =>{
    let sql= `DELETE FROM Profiles WHERE ProfileID =:ProfileID`
    return {sql, data: {ProfileID:id }}
}
const buildDeliverablesDeleteQuery = (id) =>{
            let sql= `DELETE FROM Deliverables WHERE DeliverableID =:DeliverableID`
            return {sql, data: {DeliverableID:id }}
}
const buildCategoryCreateQuery = (record) =>{
let table = 'Categories';
let fields = ["CategoryName"];
let sql= `INSERT INTO Categories
        SET 
        CategoryName="${record['CategoryName']}"`
return {sql, data:record};
}  
const buildCategoriesSelectSql=(id)=>{
    let sql = `SELECT * FROM Categories `;
    if (id) sql += ` WHERE CategoryID = ${id}`
    return {sql};
}
//Data acessors.........................................
const read = async (query) =>{
    try{
        const [result] = await dbConn.query(query.sql, query.data);
        return result.length === 0
        ?  {isSuccess: false ,result:null, message: 'No records found'}
        : {isSuccess: true, result:result, message: 'Records successfuly recovered'};
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
    }
}
const deleteDeliverables = async (deleteQuery) =>{
try{
const status = await dbConn.query(deleteQuery.sql, deleteQuery.data);
return status[0].affectedRows === 0
?  {isSuccess: false ,result:null, message: `Failed to delete record ${id}`} 
:{isSuccess: true, result:null, message: 'Records successfuly deleted'}
} catch (error) {
return {isSuccess: false, result: null, message: `Failed to execute query ${error.message}`};
}
}
const updateDeliverables = async (updateQuery) =>{
    try{
        const status = await dbConn.query(updateQuery.sql, updateQuery.data);
        if (status[0].affectedRows === 0){
            return {isSuccess: false, result: null, message: `Failed to update record: no rows affected.`};
        }
        const recoverRecord = buildDeliverablesReadQuery(updateQuery.data.DeliverableID, null);
        console.log(recoverRecord)
        const {isSuccess, result, message} = await read(recoverRecord);
        return isSuccess
        ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
        : {isSuccess: false ,result:null, message: `Failed to recover updated record ${message}`};
        
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to execute query ${error.message}`};
    }
}
const create = async (query, option) =>{
    try{
        const status = await dbConn.query(query.sql);
        const recoverRecord = buildDeliverablesReadQuery(status[0].insertId, option);

        const {isSuccess, result, message} = await read(recoverRecord);
        return isSuccess
        ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
        : {isSuccess: false ,result:null, message: `Failed to recover the inserted record ${message}`};
        
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
    }
}

const createCategories = async (query, option) =>{
    try{
        const status = await dbConn.query(query.sql);
        const recoverRecord = buildCategoriesSelectSql(status[0].insertId, option);
        console.log(recoverRecord)

        const {isSuccess, result, message} = await read(recoverRecord);
        return isSuccess
        ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
        : {isSuccess: false ,result:null, message: `Failed to recover the inserted record ${message}`};
        
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
    }
}
//Endpoints.........................................
//Controllers
const getDeliverablesController= async  (req ,res) =>{
    const id = req.params.id;
    const sql = buildDeliverablesReadQuery(id,null);
    const {isSuccess, result, message: accesorMessage} = await read(sql,id);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});

    res.status(200).json(result);
}
const getStudentDeliverableController = async (req, res) =>{
const id =req.params.uid;
const query = buildDeliverablesReadQuery(id, 'student');
    const {isError, message: validatorMessage} = validator.validateId(id);
    if (isError) return res.status(400).json({message: validatorMessage});

    const { isSuccess, result, message: accessorMessage } = await read(query);
    if(!isSuccess) return res.status(400).json({ message: accessorMessage });

    res.json(result);    
}
const postDeliverablesController = async (req, res) =>{
const record = req.body;
const {isError, message: validatorMessage} = delivearableValidator.validate(deliverableSchema, record);
if (isError) return res.status(400).json({message: validatorMessage});

const query = buildDeliverablesCreateQuery(record);

const {isSuccess, result, message:accesorMessage} = await create(query);

if (!isSuccess) return res.status(400).json({message: accesorMessage});
res.status(201).json(result);
}
const putDeliverablesController = async (req, res) =>{
//Validate request
const id = req.params.id;
const record = req.body;  
//Access data
const query = buildDeliverablesUpdateQuery(id, record);
const {isSuccess, result, message:accesorMessage} = await updateDeliverables(query);
if (!isSuccess) return res.status(400).json({message: accesorMessage});
//Response to request
res.status(201).json(result);
}
const deleteDeliverablesController = async (req, res) =>{
//Validate request
const id = req.params.id;
//Access data
const query = buildDeliverablesDeleteQuery(id);
const {isSuccess, result, message:accesorMessage} = await deleteDeliverables(query);
if (!isSuccess) return res.status(400).json({message: accesorMessage});
//Response to request
res.status(200).json({message:accesorMessage});
}
const getCategoriesController = async  (req ,res) =>{
    const id = req.params.id;
    const sql =await buildCategoriesSelectSql(id);
    const {isSuccess, result, message: accesorMessage} = await read(sql, id);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});

    res.json(result);
}
const postCategoryController = async (req, res) =>{
    const record = req.body;
    const {isError, message: validatorMessage} = validator.validate(categorySchema, record);
    if (isError) return res.status(400).json({message: validatorMessage});
    const query = buildCategoryCreateQuery(record);

    const {isSuccess, result, message:accesorMessage} = await createCategories(query);
    if (!isSuccess) return res.status(404).json({message: accesorMessage});
    res.status(201).json(result);
}
const getProfilesController = async  (req ,res) =>{
    const id = req.params.pid;
    const query = buildProfilesReadQuery(id);
    const {isSuccess, result, message: accesorMessage} = await read(query);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});

    res.status(200).json(result);
}
const postProfilesController = async (req, res) =>{
    const record = req.body;
    const {isError, message: validatorMessage} = profilesValidator.validate(profileSchema, record);
    if (isError) return res.status(400).json({message: validatorMessage});
   
    const query = buildProfilesCreateQuery(record);
    console.log(query.sql)
    const {isSuccess, result, message:accesorMessage} = await createProfiles(query);
    
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    res.status(201).json(result);
    }
const createProfiles = async (query, option) =>{
    try{
        const status = await dbConn.query(query.sql);
        console.log(status)
        const recoverRecord = buildProfilesReadQuery(status[0].insertId, option);
       
        const {isSuccess, result, message} = await read(recoverRecord);
        return isSuccess
        ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
        : {isSuccess: false ,result:null, message: `Failed to recover the inserted record ${message}`};
        
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
    }
}
const putProfilesController = async (req, res) =>{
    //Validate request
    const id = req.params.pid;
    const record = req.body;  
    //Access data
    const query = buildProfilesUpdateQuery(id, record);
    const {isSuccess, result, message:accesorMessage} = await updateProfile(query);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    //Response to request
    res.status(201).json(result);
    }
const updateProfile = async (updateQuery) =>{
        try{
            const status = await dbConn.query(updateQuery.sql, updateQuery.data);
            if (status[0].affectedRows === 0){
                return {isSuccess: false, result: null, message: `Failed to update record: no rows affected.`};
            }
            const recoverRecord = buildProfilesReadQuery(updateQuery.data.ProfileID, null);
            const {isSuccess, result, message} = await read(recoverRecord);
            return isSuccess
            ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
            : {isSuccess: false ,result:null, message: `Failed to recover updated record ${message}`};
            
        } catch (error) {
            return {isSuccess: false, result: null, message: `Failed to execute query ${error.message}`};
        }
}
const deleteProfilesController = async (req, res) =>{
    //Validate request
    const id = req.params.pid;
    //Access data
    const query = buildProfilesDeleteQuery(id);
    const {isSuccess, result, message:accesorMessage} = await deleteDeliverables(query);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    //Response to request
    res.status(200).json({message:accesorMessage});
    }
//GET
router.get('/', (req,res)=>getDeliverablesController(req,res));
router.get('/categories',(req,res)=> getCategoriesController(req,res));
router.get('/categories/:id',(req,res)=> getCategoriesController(req,res));
router.get('/:id(\\d+)',(req,res)=> getDeliverablesController(req,res));
router.get('/student/:uid',(req,res)=> getStudentDeliverableController(req,res));
//POST
router.post('/categories', postCategoryController);
router.post('/', postDeliverablesController);
//PUT
router.put('/:id', putDeliverablesController);
//Delete
router.delete('/:id',(req,res)=> deleteDeliverablesController(req,res));

//Profiles....................................................
//GET
router.get('/profiles', (req,res)=> getProfilesController(req,res));
router.get('/profiles/:pid', (req,res)=> getProfilesController(req,res));
//POST
router.post('/profiles', (req,res)=> postProfilesController(req,res));
//PUT
router.put('/profiles/:pid', (req,res)=> putProfilesController(req,res));
//DELETE
//PUT
router.delete('/profiles/:pid', (req,res)=> deleteProfilesController(req,res));
export default router;