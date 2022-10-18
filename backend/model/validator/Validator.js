class Validator{
    constructor(schema){
        this.idSchema = schema;
    }

    reportErrors = (errors) => errors.details.map((detail) => detail.message);
    validate(schema, value){
        const {error} = schema.validate(value, {abortEarly:false});
        return error
        ? { isError: true, message: `[ Validator] ${this.reportErrors(error)}` }
        : { isError: false, message: null };
    }
    validateId = (id) => this.validate(this.idSchema, id);
}
export default Validator;