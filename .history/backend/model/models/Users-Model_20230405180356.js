const model  = {}
model.table = 'Profiles';
model.mutableFields = ["ProfileName", "ProfileDetails"];
model.idField = 'ProfileID';
model.fields = [model.idField, ...model.mutableFields];
//!--------------------------------------------------------------
 model.buildReadQuery = (id) =>{
    let sql = `SELECT * FROM Users`
    if (id) sql += ` WHERE UserID =:ID`
    return {sql, data:{ID: id}}
 }
export default model;