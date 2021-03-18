const request = require('supertest');
const express = require('express');
const { Auth } = require('../Middleware/auth');
require('dotenv').config();
const patientRouter = require('../routes/patientRouter');

const app = express();
app.use(express.json());
app.use('/patient', patientRouter);

require('./setup');

//sample test
// test('sample test',()=>{
//     expect(true).toBe(true);
//  })



describe('Test of Patient Router', () => {
    test('should able to register a new patient user', () => {
        return request(app).post('/patient/register')
            .send({
                firstname: 'sersoti',
                lastname: 'luitel',
                gmail: 'sersoti.luitel@gmail.com',
                contactno: '9860090909',
                emcontact: '9851145678',
                marstatus: 'unmarried',
                dob: '1998-10-20',
                nationality: 'Nepali',
                paddress: 'Boudha,kathmandu',
                taddress: 'Boudha,kathmandu',
                username: 'sersotii9',
                password: 'sersoti9'
            })
            .then((res) => {
               // console.log(res.body);
                expect(res.statusCode).toBe(201);
            })
    })
test('user should able to login',()=>{
    return request(app).post('/patient/login')
    .send({
        username: 'sersotii9',
         password: 'sersoti9'
    }).then((res)=>{
        console.log(res.body);
        expect(res.statusCode).toBe(200); 
        expect(res.body.token).not.toBe('undefined');
    })
})

test('should able to get report',()=>{
    return request(app).get('/patient/detail')

})


// test('user details should be updated',()=>{
//     return request(app).put('/patient/details',Auth)
// })



})









