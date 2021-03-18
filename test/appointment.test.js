const request =require ('supertest');
const express =require ('express');
require ('dotenv').config();
const patientRouter =require ('../routes/patientRouter');
const appointRouter =require ('../routes/appointRouter');

const app = express();
app.use(express.json());    
app.use('/patient',patientRouter);
app.use('/appoint',appointRouter);
//setup
require('./setup');

describe ('Appointment test',()=>{
let token;
test('Should get a  new patiet user token',()=>{
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
        username: 'sersoti9',
        password: 'sersoti9'
    })
    .then((res)=>{
        console.log(res.body)
        return request (app).post('/patient/login')
        .send({
            username: 'sersoti9',
            password: 'sersoti9'
        })
        .then((res)=>{
            console.log(res.body)
            expect(res.statusCode).toBe(200);
            token =res.body.token;
        })
    })
})

    test('Should appoint an appointment',()=>{
return request(app).post('/appoint')
.set('authorization',token)
.send({
    pname:'test123',
    date:'2020-09-09',
    time:'2pm',
    desc:'stomach ache'
})
.then((res)=>{
    console.log(res.body);
    expect(res.statusCode).toBe(201);
})
    })
})

test('should able to get appointment List',()=>{
    return request(app).get('/appoint')
})






//sample test 
test('sample test',()=>{
    expect(true).toBe(true);
})