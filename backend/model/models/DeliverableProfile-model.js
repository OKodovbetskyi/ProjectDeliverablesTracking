const model = {}
model.table = 'AssignmentProfDevs';
model.mutableFields = ["AssignmentProfDevDevID", "AssignmentProfDevProfID"];
model.idField = 'AssignmentProfDevID'
model.fields = [model.idField, ...model.mutableFields];
model.buildReadQuery = (id,variant) =>{
let sql =  ""
    switch (variant){
        case 'profiles':
            sql = `SELECT Profiles.ProfileName, Profiles.ProfileDetails, Deliverables.DeliverableTitle,Deliverables.DeliverableDetail, Deliverables.DeliverableID, Categories.CategoryName, Profiles.ProfileID
            FROM AssignmentProfDevs
            JOIN Deliverables
            ON Deliverables.DeliverableID = AssignmentProfDevs.AssignmentProfDevDevID 
            JOIN Profiles
            ON AssignmentProfDevs.AssignmentProfDevProfID = Profiles.ProfileID
            JOIN Categories
            ON Categories.CategoryID = Deliverables.DeliverableCategoryID
            `
            if (id) sql += ` WHERE Profiles.ProfileID=:ID`
            break;
        default:
             sql = `Select * from AssignmentProfDevs`
             if (id) sql += ` WHERE AssignmentProfDevID=:ID `  
             break;     
    }  
    return {sql, data:{ID: id}}
 
   
 }

export default model;