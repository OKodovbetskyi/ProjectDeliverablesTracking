import joi from "joi"
const schema = {}
schema.recordSchema = joi.object({
    AssignmentProfDevDevID: joi.number().min(1).required(),
    AssignmentProfDevProfID: joi.number().min(1).required(),
}).required().unknown(true);

schema.mutableFields = ["AssignmentProfDevDevID", "AssignmentProfDevProfID"];

export default schema;