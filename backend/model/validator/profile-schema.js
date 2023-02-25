import joi from "joi"
const schema = {}
schema.recordSchema = joi.object({
    ProfileName: joi.string().min(5).required(),
    ProfileDetails: joi.string(),
}).required().unknown(true);

schema.mutableFields = ["ProfileName", "ProfileDetails"];

export default schema;