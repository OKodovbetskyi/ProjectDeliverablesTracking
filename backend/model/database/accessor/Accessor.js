class Accessor{
    constructor(dbConn){
        this.dbConn = dbConn;
    }

list = async () =>{
    const sql = `SELECT Deliverables.DeliverableTitle, Deliverables.DeliverableDetail, AssignmentDevs.AssignmentID, AssignmentDevs.AssignmentDevDuedate, AssignmentDevs.AssignmentDevFeedback, Categories.CategoryName FROM Deliverables
    INNER JOIN AssignmentDevs ON Deliverables.DeliverableID = AssignmentDevs.AssignmentDevDevID
    LEFT JOIN Categories ON Deliverables.DeliverableCategoryID = Categories.CategoryID`;

        try{
            const [result] = await this.dbConn.query(sql);
            return result.length === 0
            ?  {isSuccess: false ,result:null, message: 'No records found'}
            : {isSuccess: true, result:result, message: 'Records successfuly recovered'};
        } catch (error) {
            return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
        }
    }
    listwithId = async (params) =>{
        const sql = `SELECT Deliverables.DeliverableTitle, Deliverables.DeliverableDetail, AssignmentDevs.AssignmentID, AssignmentDevs.AssignmentDevDuedate, AssignmentDevs.AssignmentDevFeedback, Categories.CategoryName FROM Deliverables
        INNER JOIN AssignmentDevs ON Deliverables.DeliverableID = AssignmentDevs.AssignmentDevDevID
        LEFT JOIN Categories ON Deliverables.DeliverableCategoryID = Categories.CategoryID
        WHERE AssignmentDevs.AssignmentDevUserID = ${params}`;

        



        try{
            const [result] = await this.dbConn.query(sql);
            return result.length === 0
            ?  {isSuccess: false ,result:null, message: 'No records found'}
            : {isSuccess: true, result:result, message: 'Records successfuly recovered'};
        } catch (error) {
            return {isSuccess: false, result: null, message: `Failed to recover records ${error.message}`};
        }
    }
}
export default Accessor;

/*

*/