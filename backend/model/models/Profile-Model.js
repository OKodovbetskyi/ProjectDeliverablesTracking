const model  = {}
model.table = 'Profiles';
model.mutableFields = ["ProfileName", "ProfileDetails"];
model.idField = 'ProfileID';
model.fields = [model.idField, ...model.mutableFields];
//!--------------------------------------------------------------
 model.buildReadQuery = (id) =>{
    let sql = `SELECT * FROM Profiles`
    if (id) sql += ` WHERE ProfileID =:ID`
    return {sql, data:{ID: id}}
 }
export default model;