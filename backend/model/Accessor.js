class Accessor{
    constructor(dbConn){
        this.dbConn = dbConn;
    }

list = async () =>{
        const sql = `SELECT Deliverables.deliverable_title, Deliverables.deliverable_details, deliverables_assignment.status, deliverables_assignment.due_date, deliverables_assignment.feedback FROM Deliverables
        INNER JOIN deliverables_assignment ON Deliverables.deliverable_id = deliverables_assignment.deliverable_id;`

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
        const sql = `SELECT Deliverables.deliverable_title, Deliverables.deliverable_details, deliverables_assignment.status, deliverables_assignment.due_date, deliverables_assignment.feedback FROM Deliverables
        INNER JOIN deliverables_assignment ON Deliverables.deliverable_id = deliverables_assignment.deliverable_id
WHERE deliverables_assignment.student_id = ${params}`;

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