import joi from "joi";
class Controller{

    constructor(accessor, validator){
        this.validator = validator;
        this.accessor = accessor;
  
    }
    get=async(req ,res, variant) =>{
        const id = req.params.id;
        //Validate  request
        const {error} = this.validator.getSchema.validate(id);
        if (error) return res.status(404).json({message: this.validator.reportErrors(error)})
       // if (!isValid) return res.status(404).json({ message: accesorMessage });
        //Access Data
        const {isSuccess, result, message: accesorMessage} = await this.accessor.read(id, variant);
        if (!isSuccess) return res.status(400).json({message: accesorMessage});
    
        res.status(200).json(result);
    }
    post= async (req, res, variant) =>{
        const record = req.body;
        //Validate request
        const {error} = this.validator.postSchema.validate(record, {abortEarly: false});
        if (error) return res.status(400).json({message: this.validator.reportErrors(error)});

        //Access data
        const {isSuccess, result, message:accesorMessage} = await this.accessor.create(record, variant);
        if (!isSuccess) return res.status(400).json({message: accesorMessage});

        //Response to request
        res.status(201).json(result);

    }
    put= async (req, res, variant) =>{
    const id = req.params.id;
    const record = req.body;  
     //Validate request
     const {error} = this.validator.putSchema.validate({id, record}, {abortEarly: false});
     if (error) return res.status(400).json({message: this.validator.reportErrors(error)});

    //Access data
    const {isSuccess, result, message:accesorMessage} = await this.accessor.update(id,record, variant);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    //Response to request
    res.status(201).json(result);
    }
    delete = async (req, res) =>{
    const id = req.params.id;    
    //Validate  request
    const {error} = this.validator.deleteSchema.validate(id);
    if (error) return res.status(404).json({message: this.validator.reportErrors(error)})
    
    //Access data
    const {isSuccess, result, message:accesorMessage} = await this.accessor.delete(id);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    //Response to request
    res.status(200).json({message:accesorMessage});
    }
}
export default Controller;