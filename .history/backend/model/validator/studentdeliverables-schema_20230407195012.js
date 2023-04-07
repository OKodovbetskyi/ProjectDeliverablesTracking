import joi from "joi"
const schema = {}
schema.recordSchema = joi.object({
   
}).required().unknown(true);

schema.mutableFields = ["AssignmentDevUserID", "AssignmentDevDevID","AssignmentDevStatus","AssignmentDevFeedback","AssignmentDevDuedate"];

export default schema;