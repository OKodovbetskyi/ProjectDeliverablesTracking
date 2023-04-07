const model = {};
model.table = 'Deliverables';
model.mutableFields = ["DeliverableTitle", "DeliverableDetail","DeliverableCategoryID"];
model.idField = 'DeliverableID'
model.fields = [model.idField, ...model.mutableFields];

model.buildReadQuery = (id, variant) =>{
    
        }

export default model;