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

//endpoint to list all the posts 
app.get('/api/posts/', (req,res)=>{
    // Return the list of posts in reverse with the
    // status code 200 to signify successful retrieval
    res.send(posts.reverse());
})


// Endpoint to retrieve a post by its id
app.get('/api/posts/:id',(req, res)=>{

    const id = req.params.id;

    //using lodash's find function id and return its contents
    const post = _.find(posts, (post)=> post.id === id);

    //handle error
    if(!post){
        return res.status(400).send(
            createError('Post not found')
        )
    }
    res.send(post);
})

//endpoint update post by id
app.put('/api/posts/:id',
    [
        body('title').isString(),
        body('content').isString()
    ],
    (req,res) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array() })
        }

        const id = req.params.id;
        const{title, content} = req.body;
        
        const updatedPost = {
            id,
            title,
            content
        }
          // Retrieve the index of the OLDpost using its id
        const index = _.findIndex(posts, (post)=> post.id === updatedPost.id);

        //handling error & return 400 bad request if index is -1 
        if(index === -1){
            return res.status(400).send(
                createError('Post not found')
            )
        }
        // Replace the stored post with the updated one
        posts[index] = updatedPost;

        res.send(updatedPost);
});

//endpoint to delete post using post's id
app.delete('/api/posts/:id', (req, res)=> {

    const id = req.params.id;
    const index = _.findIndex(posts, (post)=> post.id === id);
     if(index ==-1){
         return res.status(400).send(
             createError('Post not found')
         )
     }
     //Remove the post
     posts = posts.splice(index, 1);
     
     res.send({
         'message' : `Post with id ${id} has been successfuly deleted`
     })
})


// Return an error if route does not exist in our server
app.all('*', (req, res)=> {
    return res.status(404).send(
        createError('Not Found')
    )
})
