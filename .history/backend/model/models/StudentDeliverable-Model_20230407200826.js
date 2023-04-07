const model = {};
model.table = 'AssignmentDevs';
model.mutableFields = ["AssignmentDevUserID", "AssignmentDevDevID","AssignmentDevStatus","AssignmentDevFeedback","AssignmentDevDuedate"];
model.idField = 'AssignmentID'
model.fields = [model.idField, ...model.mutableFields];

model.buildReadQuery = (id, variant) =>{
    const table = '((Deliverables INNER JOIN AssignmentDevs ON Deliverables.DeliverableID = AssignmentDevs.AssignmentDevDevID) LEFT JOIN Categories ON Deliverables.DeliverableCategoryID = Categories.CategoryID)';
    const recoveredFields = ["DeliverableTitle", "DeliverableDetail", "AssignmentID", "AssignmentDevDuedate", "AssignmentDevFeedback", "CategoryName","AssignmentDevStatus"];
    let sql="";
    switch (variant){
        case 'student':
            sql = `SELECT ${recoveredFields} FROM ${table}`
            if (id) sql += `WHERE AssignmentDevUserID =:ID`;
            break;
        default:
            sql = `SELECT * FROM ${table}`
            if (id) sql += ` WHERE ${this.idField} := ID`;
    }
    return {sql, data: {ID: id} };
}

export default model;