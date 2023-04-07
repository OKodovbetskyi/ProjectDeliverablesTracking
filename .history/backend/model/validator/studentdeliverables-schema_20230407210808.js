import joi from "joi"
const schema = {}
schema.recordSchema = joi.object({
    "AssignmentDevUserID":joi.number().required().min(1),
    "AssignmentDevDevID": joi.number().required().min(1)
   
}).required().unknown(true);

schema.mutableFields = ["AssignmentDevUserID", "AssignmentDevDevID"];

export default schema;