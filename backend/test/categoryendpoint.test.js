/*import request from 'supertest';
import app from '../model/App';

describe("GET api/deliverables/categories", ()=>{
    test('Should respond with status 200', async ()=>{
        const res =await (request(app).get('/api/deliverables/categories'))
        expect(res.statusCode).toBe(200)
    })
    test('Should respond with JSON object', async ()=>{
        const res =await (request(app).get('/api/deliverables/categories'))
        expect(res.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test('Should return minimum 5 items', async ()=>{
        const res =await (request(app).get('/api/deliverables/categories'))
        expect(res.body.length).toBeGreaterThan(5);
    })
    
})

describe("POST api/deliverables/categories", ()=>{
    test('Should respond with status 200', async ()=>{
        const res =await (await (request(app).post('/api/deliverables/categories')).send(
            {
                "CategoryName":'Assingment'
            }
        ))
        expect(res.statusCode).toBe(201)
    })
    test('Should respond with JSON object equal to what we submit', async ()=>{
        const res =await (request(app).post('/api/deliverables/categories')).send(
            {
                "CategoryName":'Assingment'
            }
        )
        expect(res.body).toEqual(
            [
                {"CategoryName":'Assingment'}])
    })
    
})