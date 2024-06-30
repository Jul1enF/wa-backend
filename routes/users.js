var express = require('express');
var router = express.Router();

const User = require('../models/users')

const {checkBody}= require('../modules/checkBody')

router.post('/signup', (req, res) => {
    const mail = req.body.email
    const passw = req.body.password
    const nam = req.body.name
    if (!checkBody(req.body, ["name", "email", "password"])){
        res.json({
            result :false,
            error : 'Missing or empty fields'
        })
        return
    }
    else {
        
        User.findOne({email : mail}).then(data=> {
            if (data){
                res.json({
                    result :false,
                    error : 'User already exists'
                })
                return
            }
            else {
                const newUser = new User({
                    name : nam,
                    email : mail,
                    password : passw,
                })
                newUser.save()
                res.json({result : true})
                return
            }
        })
        

    }

   
})


router.post('/signin', (req, res) => {
    const mail = req.body.email
    const passw = req.body.password
    
    if (!checkBody(req.body, ["email", "password"])){
        res.json({
            result :false,
            error : 'Missing or empty fields'
        })
        return
    }
    else {
        User.findOne({email : mail}).then(data => {
            if (!data || data.password!==passw){
                res.json({
                    result :false,
                    error : 'User not found'
                })
            }
            else {res.json({result : true})}
        })
    }
    
    
    
    
    
    /*User.find().then(data=> {

        if (!mail || !passw){
        res.json({
            result :false,
            error : 'Missing or empty fields'
        })
    }
    else if (
        data.some(e => e.email !== mail || e.password !== passw) 
    ){
        res.json({
            result :false,
            error : 'User not found'
        })
    }
    else if (data.some(e => e.email === mail && e.password === passw))
    {
        res.json({result : true})
    }

})*/
})
    
    



module.exports = router;
