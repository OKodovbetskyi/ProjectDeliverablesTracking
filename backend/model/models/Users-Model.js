const model  = {}
model.table = 'Users';
model.mutableFields = ["UserName", "UserSurname", "UserKNumber"];
model.idField = 'UserID';
model.fields = [model.idField, ...model.mutableFields];
//!--------------------------------------------------------------
 model.buildReadQuery = (id) =>{
    let sql = `SELECT * FROM Users`
    if (id) sql += ` WHERE UserID =:ID`
    return {sql, data:{ID: id}}
 }
export default model;