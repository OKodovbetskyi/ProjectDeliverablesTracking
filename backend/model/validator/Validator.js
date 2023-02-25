import joi from "joi";
class Validator{
    constructor(schema){
        this.getSchema = this.idSchema;
        this.postSchema = schema.recordSchema.and(...schema.mutableFields);
        this.putSchema =joi.object({
            id: this.idSchema.required(),
            record: schema.recordSchema.or(...schema.mutableFields)
         });
        this.deleteSchema = this.idSchema.required();
    }

    //properties
    idSchema = joi.number().integer().min(1);
    //helpers
    reportErrors = (errors) => errors.details.map((detail) => detail.message);
}
export default Validator;