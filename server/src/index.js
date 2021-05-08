//Import express 
const express = require('express');
//Import lodash 
const _ = require('lodash');
//Import body-parser
const bodyParser = require('body-parser');
//Import express validator
const {body, validationResult} = require('express-validator');


const app = express();
const port = 3000;
//expose endpoints to port 3000
app.listen(port, ()=>{
    console.log("Listiening to port 3000")
})

// Use the body parser middleware to allow 
// express to recognize JSON requests
app.use(bodyParser.json());

//Error handling
function createError(message){
    return{
        errors: [
            {
                message
            }
        ]
    }
};

//function to generate ID
function generateId(){
    return'_' + Math.random().toString(36).substr(2.16);
}
//post array
let posts =[];

//Endpoint checking if API is working!
app.get('/',(req,res)=> {
    res.send({
        status: 'online'
    })
});
//endpoint to create post
app.post(
    '/api/posts/',
    [
        body('title').isString(),
        body('content').isString()
    ],
    (req,res)=>{
      // Retrieve errors from function
        const errors  = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() })
        }
        const {title, content} = req.body;

        //generate random id
        const id = generateId();

        const post = {
            id,
            title,
            content
        }
        posts.push(post);

    // Return the post with 201 status code which will 
    // signify the successful creation of the post
        res.status(201).send(post);
    });
    

