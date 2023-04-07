const model = {};
model.table = 'AssignmentDevs';
model.mutableFields = ["AssignmentDevUserID", "AssignmentDevDevID","AssignmentDevStatus","AssignmentDevFeedback","AssignmentDevDuedate"];
model.idField = 'AssignmentID'
model.fields = [model.idField, ...model.mutableFields];

model.buildReadQuery = (id, variant) =>{
    
        }

export default model;