class Accessor{ 

    constructor(model, database){
        this.model = model
        this.database = database    

    }
    //Methods
    //Data acessors.........................................
    read = async (id, variant) =>{
    try{
        const {sql, data} = this.model.buildReadQuery(id, variant);
        console.log(sql)
        const [result] = await this.database.query(sql, data);
        console.log(result)
        return result.length === 0
        ?  {isSuccess: false ,result:null, message: 'No records found'}
        : {isSuccess: true, result:result, message: 'Records successfuly recovered'};
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
    }
    }
    delete = async (id) =>{
    try{
        const {sql, data} = this.model.buildDeleteQuery(id);
        console.log(sql)
        const status = await this.database.query(sql, data);

        return status[0].affectedRows === 0
        ?  {isSuccess: false ,result:null, message: `Failed to delete record ${id}`} 
        :{isSuccess: true, result:null, message: 'Records successfuly deleted'}
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to execute query ${error.message}`};
    }
    }
    update = async (id, record) =>{
    try{
        const {sql, data} = this.model.buildUpdateQuery(id, record);
        console.log(sql)
        const status = await this.database.query(sql, data);
        if (status[0].affectedRows === 0){
            return {isSuccess: false, result: null, message: `Failed to update record: no rows affected.`};
        }
        const {isSuccess, result, message} = await this.read(id, null);
        return isSuccess
        ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
        : {isSuccess: false ,result:null, message: `Failed to recover updated record ${message}`};
        
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to execute query ${error.message}`};
    }
    }
    create = async (record , variant) =>{
    try{
        const {sql, data} = this.model.buildCreateQuery(record);
        console.log(sql)
        const status = await this.database.query(sql, data);
        const {isSuccess, result, message} = await this.read(status[0].insertId, variant);
        return isSuccess
        ?  {isSuccess: true, result:result, message: 'Records successfuly recovered'}
        : {isSuccess: false ,result:null, message: `Failed to recover the inserted record ${message}`};
        
    } catch (error) {
        return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
    }
    }   
}
export default Accessor;