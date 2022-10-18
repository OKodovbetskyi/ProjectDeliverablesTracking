class Controller{
    constructor(accesor){
        this.accesor = accesor;
    }
    list = async  (req ,res) =>{
        const {isSuccess, result, message: accesorMessage} = await this.accesor.list();
        if (!isSuccess) return res.status(400).json({message: accesorMessage});

        res.json(result);
    }
}

export default Controller;