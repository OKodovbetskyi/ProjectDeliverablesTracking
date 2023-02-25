const model = {};
model.table = 'Deliverables';
model.mutableFields = ["DeliverableTitle", "DeliverableDetail","DeliverableCategoryID"];
model.idField = 'DeliverableID'
model.fields = [model.idField, ...model.mutableFields];

model.buildReadQuery = (id, variant) =>{
    const table = '((Deliverables INNER JOIN AssignmentDevs ON Deliverables.DeliverableID = AssignmentDevs.AssignmentDevDevID) LEFT JOIN Categories ON Deliverables.DeliverableCategoryID = Categories.CategoryID)';
    const recoveredFields = ["DeliverableTitle", "DeliverableDetail", "AssignmentID", "AssignmentDevDuedate", "AssignmentDevFeedback", "CategoryName","AssignmentDevStatus"];
    let sql = '';
    switch (variant){
       case 'student':
            sql = `SELECT ${recoveredFields} FROM ${table}`
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
        }

export default model;