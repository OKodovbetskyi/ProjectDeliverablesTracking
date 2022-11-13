class Validator{
    constructor(schema, value){
        this.schema = schema;
        this.value = value;
    }

    reportErrors = (errors) => errors.details.map((detail) => detail.message);
    validate(schema, value){
        const {error} = schema.validate(value, {abortEarly:false});
        return error
        ? { isError: true, message: `[ Validator] ${this.reportErrors(error)}` }
        : { isError: false, message: null };
    }
    validateId = (id) => this.validate(this.schema, id);
}
export default Validator;