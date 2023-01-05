/*import request from 'supertest';
import app from '../model/App';

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
})

describe("POST api/deliverables", ()=>{
    test('Should respond with status 200', async ()=>{
        const res =await (request(app).post('/api/deliverables')).send(
            {
                "DeliverableTitle": 'New Deliverable1',
                "DeliverableDetail": 'asdasd asdas weq qwdsa'
            }
        )
        expect(res.statusCode).toBe(201)
    })
    test('Should respond with JSON object equal to what we posted', async ()=>{
        const res =await (request(app).post('/api/deliverables')).send(
            {
                "DeliverableTitle": 'New Deliverable1',
                "DeliverableDetail": 'asdasd asdas weq qwdsa'
            }
        )
        expect(res.body).toEqual( 
            [{
            "DeliverableTitle": 'New Deliverable1',
            "DeliverableDetail": 'asdasd asdas weq qwdsa'
        }])
    })
    test('Submitting wrong data should response with 400', async ()=>{
        const res =await (request(app).post('/api/deliverables')).send(
            {
                "DeliverableTitle": '',
                "DeliverableDetail": 'asdasd asdas weq qwdsa'
            }
        )
        expect(res.statusCode).toBe(400)
    })
    
})
