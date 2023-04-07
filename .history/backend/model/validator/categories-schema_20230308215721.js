import joi from "joi"
const schema = {}
schema.recordSchema = joi.object({
    CategoryName: joi.string().min(5).required(),
}).required().unknown(true);

schema.mutableFields = ["CategoryName"];

export default schema;