import request from 'supertest';
import app from '../model/App';
let deliverableID;
/*
describe("GET api/deliverables", ()=>{
   test('Should respond with statuscode 200', async ()=>{
        const res = await request(app).get('/api/deliverables')
        expect(res.statusCode).toBe(200)
    })
    test('Should send json response', async ()=>{
        const res = await request(app).get('/api/deliverables')
        expect(res.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test('Should send all deliverables', async () =>{
        const res = await request(app).get('/api/deliverables')
        expect(res.body.length).toBeGreaterThanOrEqual(15);
    })
    test('Should return one deliverable with id 3', async () =>{
        const res = await request(app).get('/api/deliverables/3')
        expect(res.body.length).toEqual(1)
        expect(res.body[0]).toHaveProperty("DeliverableTitle","PUT Proper Deliverable")
        expect(res.body[0]).toHaveProperty("DeliverableID",3)
    })
})
*/
describe("POST api/deliverables", ()=>{
    test('Should respond with status 200', async ()=>{
        const res =await (request(app).post('/api/deliverables')).send(
            {
                "DeliverableTitle": 'New Deliverable1',
                "DeliverableDetail": 'asdasd asdas weq qwdsa',
                "DeliverableCategoryID": 2,
            }
        )
        expect(res.statusCode).toBe(201)
        deliverableID = res.body[0]['DeliverableID'];
    })
    
    test('Submitting wrong data should response with 404', async ()=>{
        const res =await (request(app).post('/api/deliverables')).send(
            {
                "DeliverableTitle": '',
                "DeliverableDetail": 'asdasd asdas weq qwdsa'
            }
        )
        expect(res.statusCode).toBe(404)
    })
    test('Testing if schema working correctly', async ()=>{
        const res =await (request(app).post('/api/deliverables')).send(
            {
                "DeliverableTitle": '',
                "DeliverableDetail": 'asdasd asdas weq qwdsa',
                "DeliverableCategoryID": "2b",
            }
        )
        expect(res.statusCode).toBe(404) && expect(res.body.message).toContain(
            [
                "\"DeliverableTitle\" is not allowed to be empty",
                "\"DeliverableCategoryID\" must be a number"
            ]
        )
    })
})


describe("PUT api/deliverables/ID", ()=>{
    test('Testing if existing record can be edited', async ()=>{
        const data = {
            "DeliverableTitle": 'Apply for 12 jobs and send me job titles',
            "DeliverableDetail": 'Description to achieve these tasks',
            "DeliverableCategoryID": 2,
        }
        const res =await (request(app).put('/api/deliverables/',deliverableID)).send(data)
        expect(res.statusCode).toBe(404) && expect(res.body.message).toContain(
            [data]
        )
    })
})



describe("DELETE api/deliverables", ()=>{
    test('Testing if record can be deleted', async ()=>{
        const res =await (request(app).delete('/api/deliverables/'+deliverableID)).send()
        expect(res.body).toHaveProperty('message', 'Records successfuly deleted')
    })
    test('Testing if validation schema is working for delete request', async ()=>{
        deliverableID = undefined;
        const res =await (request(app).delete('/api/deliverables/'+deliverableID)).send()
        expect(res.body).toHaveProperty('message', ["\"value\" must be a number"])
    })
})


