import joi from "joi";
const schema = {}
schema.recordSchema = joi.object({
    DeliverableTitle: joi.string().required(),
    DeliverableDetail: joi.string().required(),
    DeliverableCategoryID: joi.number().required()
}).required().unknown(true);
schema.mutableFields = ["DeliverableTitle", "DeliverableDetail","DeliverableCategoryID"]


export default schema;