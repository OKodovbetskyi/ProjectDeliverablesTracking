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
    //validate
    validate = (schema, value) =>{
        const {error} = schema.validate(value, {abortEarly: false});
        return error
        ? {isValid: false, message: this.reportErrors(error)}
        : {isValid: true, message: null}
    }
    //get schema
    get = (value) => this.validate(this.getSchema, value);
    //post schema
    post = (value) => this.validate(this.postSchema, value);
    //put schema
    put = (value) => this.validate(this.putSchema, value);
    //put schema
    delete = (value) => this.validate(this.deleteSchema, value);
    
    //properties
    idSchema = joi.number().integer().min(1);
    
    //helpers
    reportErrors = (errors) => errors.details.map((detail) => detail.message);
}
export default Validator;