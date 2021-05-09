var passport = require('passport');
var config = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Category = require('../models/Category');

//route to get the list of the category.
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res){
    var token = getToken(req.headers);
    if(token){
        Category.find((err, categories)=>{
            if(err) return next(err);
            res.json(categories);
        })
    }else{
        return res.status(403).send({success: false, msg: 'Unauthorized.'})
    }
})

//route to get a single category by ID.
