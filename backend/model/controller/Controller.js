import joi from "joi";
class Controller{

    constructor(accessor, validator){
        this.validator = validator;
        this.accessor = accessor;
  
    }
    get=async(req ,res, variant) =>{
        const id = req.params.id;
        //Validate  request
        const {isValid, message: validatorMessage} = this.validator.get(id);
        if (!isValid) return res.status(404).json({ message: validatorMessage });
        //Access Data
        const {isSuccess, result, message: accesorMessage} = await this.accessor.read(id, variant);
        if (!isSuccess) return res.status(400).json({message: accesorMessage});
        //Generate a response
        res.status(200).json(result);
    }
    post= async (req, res, variant) =>{
        const record = req.body;
        //Validate  request
        const {isValid, message: validatorMessage} = this.validator.post(record);
        if (!isValid) return res.status(404).json({ message: validatorMessage });
        //Access data
        const {isSuccess, result, message:accesorMessage} = await this.accessor.create(record, variant);
        if (!isSuccess) return res.status(400).json({message: accesorMessage});
        //Response to request
        res.status(201).json(result);
    }
    put= async (req, res, variant) =>{
    const id = req.params.id;
    const record = req.body;  
    //Validate  request
    const {isValid, message: validatorMessage} = this.validator.put({id,record});
    if (!isValid) return res.status(404).json({ message: validatorMessage });
    //Access data
    const {isSuccess, result, message:accesorMessage} = await this.accessor.update(id,record, variant);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    //Response to request
    res.status(201).json(result);
    }
    delete = async (req, res) =>{
    const id = req.params.id;    
    //Validate  request
    const {isValid, message: validatorMessage} = this.validator.delete(id);
    if (!isValid) return res.status(404).json({ message: validatorMessage });
    
    //Access data
    const {isSuccess, result, message:accesorMessage} = await this.accessor.delete(id);
    if (!isSuccess) return res.status(400).json({message: accesorMessage});
    //Response to request
    res.status(200).json({message:accesorMessage});
    }
}
export default Controller;