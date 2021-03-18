const request = require('supertest');
const express = require('express');
const { Auth } = require('../Middleware/auth');
require('dotenv').config();
const medreportRouter = require('../routes/medreportRouter');
const { response } = require('express');
//const reportRouter = require('../routes/reportRouter');

const app = express();
app.use(express.json());
app.use('/', medreportRouter);

require('./setup');

describe ('Report test',()=>{
    test('Should able to add report',()=>{
        return request(app).post('/medreport')
        .send({
            date: '2020-10-10',
            username: 'sabina1',
            bloodglucose: '100',
            hemoglobin: '15.8',
            wbc: '9400',
            thyroidt3: '131.6',
            thyroidt4: '9.6',
            thyroidtTSH: '3.83',
            blooddesc: 'Your TSH level is low',
            systolic: '120',
            diastolic: '80',
            averagebp: '80',
            bloodbppdesc: 'Your Bp is normal',
            color: 'Light Yellow',
            reaction: 'Acidic',
            apperance: 'Clear',
            desc: 'Everything normal'


        }).then((res)=>{
            console.log(res.body);
            expect(res.statusCode).toBe(201); 
        })
    })

    test('should able to get report',()=>{
        return request(app).get('/medreport')

    })
})   











// test('Should able to add report',()=>{
//     return request(app).post('/report')
//     .send({
//         username: 'saras1',
//         reportn: 'About x-ray',
//         myFile: 'myFile-1597823425154.jpg',
//         desc: 'Everyting is okay'
         
//     }).then((res)=>{
//         console.log(res.body);
//         expect(res.statusCode).toBe(201); 
//     })
// })

