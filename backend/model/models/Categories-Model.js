const model = {}
model.mutableFields = ["CategoryName"]
model.table = 'Categories'
model.idField ='CategoryID'

model.buildReadQuery = (id, variant) =>{
    let sql = `SELECT * FROM ${model.table}`
    if (id) sql += ` WHERE CategoryID =:ID`
    return {sql, data:{ID: id}}
}

export default model;