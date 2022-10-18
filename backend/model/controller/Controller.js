class Controller{
    constructor(accesor, validator){
        this.accesor = accesor;
        this.validator = validator;
    }
    list = async  (req ,res) =>{
        const {isSuccess, result, message: accesorMessage} = await this.accesor.list();
        if (!isSuccess) return res.status(400).json({message: accesorMessage});

        res.json(result);
    }
    listWithId = async (req, res) =>{
        const {isError, message: validatorMessage} = this.validator.validateId(req.params.id);
        if (isError) return res.status(400).json({message: validatorMessage});

        const { isSuccess, result, message: accessorMessage } = await this.accesor.listwithId(req.params.id);
        if(!isSuccess) return res.status(400).json({ message: accessorMessage });

        res.json(result);

    }
}

export default Controller;