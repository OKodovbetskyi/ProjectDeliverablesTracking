import { Router } from "express";
import { profileSchema } from "../validator/profiles-schema.js";
import dbConn from "../database/database-connection.js";
import Validator from "../validator/Validator.js";

const router = Router();
const profilesValidator = new Validator(profileSchema);
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
const buildProfilesDeleteQuery = (id) =>{
    let sql= `DELETE FROM Profiles WHERE ProfileID =:ProfileID`
    return {sql, data: {ProfileID:id }}
}
//!--------------------------------------------------------------
const buildDeliverableProfilesReadQuery = (id) =>{
    let sql = `SELECT Profiles.ProfileName, Profiles.ProfileDetails, Deliverables.DeliverableTitle,Deliverables.DeliverableDetail, Categories.CategoryName, Profiles.ProfileID
    FROM AssignmentProfDevs
    JOIN Deliverables
    ON Deliverables.DeliverableID = AssignmentProfDevs.AssProfDevDevID 
    JOIN Profiles
    ON AssignmentProfDevs.AssProfDevProfID = Profiles.ProfileID
    JOIN Categories
    ON Categories.CategoryID = Deliverables.DeliverableCategoryID
    `
    if (id) sql += ` WHERE AssProfDevID =:AssProfDevID`
    return {sql, data:{AssProfDevID: id}}
 }
 const buildDeliverableProfilesCreateQuery = (record) =>{
    let table = 'AssignmentProfDevs';
    let fields = ["AssProfDevDevID", "AssProfDevProfID"];
    let sql= `INSERT INTO ${table}
            SET 
            AssProfDevDevID ="${record['AssProfDevDevID']}",
            AssProfDevProfID ="${record['AssProfDevProfID']}"`

    return {sql, data :record };    
} 
const buildDeliverableProfilesUpdateQuery = (id, record) =>{
    let table = 'AssignmentProfDevs';
    let mutablefieds =  ["AssProfDevDevID", "AssProfDevProfID"];
    let sql= `UPDATE ${table} SET AssProfDevDevID="${record.AssProfDevDevID}", AssProfDevProfID="${record.AssProfDevProfID}" WHERE  AssProfDevID=:AssProfDevID`
     
    return {sql, data: {...record, AssProfDevID:id}}

}
const postDeliverableProfilesController = async (req, res) =>{
    const record = req.body;
    const query = buildDeliverableProfilesCreateQuery(record);
   
    const {isSuccess, result, message:accesorMessage} = await assignProfiles(query);
    
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    res.status(201).json(result);
    }

 const getDeliverableProfilesController = async  (req ,res) =>{
    const id = req.params.id;
    const query = buildDeliverableProfilesReadQuery(id);
    const {isSuccess, result, message: accesorMessage} = await read(query);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});

    res.status(200).json(result);
}
const assignProfiles = async (query, option) =>{
    try{
        const status = await dbConn.query(query.sql);
        console.log(status)
        const recoverRecord = buildDeliverableProfilesReadQuery(null);
       
        const {isSuccess, result, message} = await read(recoverRecord);
        return isSuccess
        ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
        : {isSuccess: false ,result:null, message: `Failed to recover the inserted record ${message}`};
        
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
    }
}
const deleteDeliverableProfilesController = async (req, res) =>{
    //Validate request
    const id = req.params.id;
    //Access data
    const query = buildDeliverableProfilesDeleteQuery(id);
    const {isSuccess, result, message:accesorMessage} = await deleteDeliverables(query);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    //Response to request
    res.status(200).json({message:accesorMessage});
    }
const putDeliverableProfilesController = async (req, res) =>{
    //Validate request
    const id = req.params.id;
        const record = req.body;  
        //Access data
        const query = buildDeliverableProfilesUpdateQuery(id, record);
        console.log(query.sql)
        const {isSuccess, result, message:accesorMessage} = await updateDeliverableProfile(query);
        if (!isSuccess) return res.status(400).json({message: accesorMessage});
        //Response to request
        res.status(201).json(result);
        }
const updateDeliverableProfile = async (updateQuery) =>{
    try{
      
        const status = await dbConn.query(updateQuery.sql, updateQuery.data);
        if (status[0].affectedRows === 0){
            return {isSuccess: false, result: null, message: `Failed to update record: no rows affected.`};
        }
        console.log(updateQuery.data.AssProfDevID)
        const recoverRecord = buildDeliverableProfilesReadQuery(updateQuery.data.AssProfDevID);
       
        const {isSuccess, result, message} = await read(recoverRecord);
        return isSuccess
        ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
        : {isSuccess: false ,result:null, message: `Failed to recover updated record ${message}`};
        
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to execute query ${error.message}`};
    }
}
//!------------
const buildDeliverableProfilesDeleteQuery = (id) =>{
    let sql= `DELETE FROM AssignmentProfDevs WHERE AssProfDevID =:ProfileID`
    return {sql, data: {ProfileID:id }}
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
    const id = req.params.id;
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

const read = async (query) =>{
        try{
            console.log(query.sql);
            const [result] = await dbConn.query(query.sql, query.data);
            
            return result.length === 0
            ?  {isSuccess: false ,result:null, message: 'No records found'}
            : {isSuccess: true, result:result, message: 'Records successfuly recovered'};
        } catch (error) {
            return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
        }
    }



//Profiles....................................................
//GET
router.get('/', (req,res)=> getProfilesController(req,res));
router.get('/:pid(\\d+)', (req,res)=> getProfilesController(req,res));
//POST
router.post('/', (req,res)=> postProfilesController(req,res));
//PUT
router.put('/:pid', (req,res)=> putProfilesController(req,res));
//DELETE
router.delete('/:pid', (req,res)=> deleteProfilesController(req,res));
//PUT
// * Profiles deliverables assignments.......................................
router.get('/deliverables', (req,res)=>getDeliverableProfilesController(req,res));
router.get('/deliverables/:id', (req,res)=>getDeliverableProfilesController(req,res));
router.post('/deliverables', (req,res)=>postDeliverableProfilesController(req,res));
router.put('/deliverables/:id',(req, res)=>putDeliverableProfilesController(req,res))
router.delete('/deliverables/:id', (req,res)=>deleteDeliverableProfilesController(req,res));

export default router;