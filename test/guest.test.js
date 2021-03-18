const request =require ('supertest');
const express =require ('express');
const {Auth} = require('../Middleware/auth');
require ('dotenv').config();
const patientRouter =require ('../routes/patientRouter');
const guestRouter =require ('../routes/guestRouter');

const app = express();
app.use(express.json());    
app.use('/patient',patientRouter);
app.use('/staff',guestRouter);
//setup
require('./setup');


test('Should able to add patient guest',()=>{
    return request(app).post('/staff/guest')
    .send({
        fullname: 'Test Test',
        guardname: 'Testing Testing',
        contactno: '987008878',
        address: 'Boudha,Kathmandu',
        age: '20',
        alt_contact: '982346787',
        desc: 'Minor accident'
         
    }).then((res)=>{
        console.log(res.body);
        expect(res.statusCode).toBe(201); 
    })
})


// test('Should able to view all emergency patient list',()=>{
//     return request(app).post('/staff/guest')
//     .send({
//         'headers': { 'Authorization': 'Bearer ' }
//     }).then((response) => {
//         expect(response.guest).toBe(200);
//     })
//     })

test('should able to get emergency patient list',()=>{
    return request(app).get('/staff/guest')

})




//sample test 
test('sample test',()=>{
    expect(true).toBe(true);
})