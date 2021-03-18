const express= require('express');
const router =express.Router();
//const User =require('../models/Codeid')

router.route('/')
.get( (req,res)=>{
    User.find()
    .then((users)=>{
        res.json(users);
 
    }).catch((err)=>console.log(err));
});
router.post('/staffid',( req,res,next)=>{
    const  {staffid} = req.body;
    User.findOne({staffid})
    .then((user)=>{
        if (!user){
            let err = new Error('Id doesnot match with staff');
            err.status=400;
            return next(err);

        }
        res.json({message:'staff registartion'});
        
        }).catch(next);
    });

 router.post('/docid',( req,res,next)=>{
        const  {docid} = req.body;
        User.findOne({docid})
        .then((user)=>{
            if (!user){
                let err = new Error('Id doesnot match with doctor');
                err.status=400;
                return next(err);
    
            }
            res.json({message:'You are into doctor registration'});
            
            }).catch(next);
        });
 
    module.exports =router;