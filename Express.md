# Express

## Organization

- project
  - app.js
  - models
    - define schema (model definition) inside this subdirectory
    - documents are instances of models in MongoDB
  - routes
    - api
      - v1
        - define router inside this subdirectory
        - router defines endpoints
        - uses controller to handle actions to be taken
  - controllers
    - define controller inside this subdirectory
    - controllers handle business logic
      - application logic including interactions with data

## Examples

```javascript
// DEFINING MODEL EXAMPLE

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// instances of models are called documents
// defines what author document looks like
const AuthorSchema = new Schema({
    firstName: {type: String, required: true, max: 100},
    familyName: {type: String, required: true, max: 100},
    dateOfBirth: {type: Date},
    dateOfDeath: {type: Date},
});

// compiling the model and exporting it for use by controller
module.exports = mongoose.model('Author', AuthorSchema);
```

```javascript
// DEFINING ENDPOINTS (ROUTER) EXAMPLE

const express = require('express');
const authorRouter = express.Router();                                        // creating a new router
const author_controller = require('../../../controllers/authorController');   // importing controller

// defines middleware (next() must be called for router to advance to next middleware/endpoint)
authorRouter.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// router.route(URL string).http_verb(callback function (either from controller or not))
authorRouter.route('/')
  .get(author_controller.author_list)  
  .post(author_controller.author_create_post);

// exporting the router to be used
module.exports = authorRouter;
```

```javascript
// DEFINING CONTROLLER

const Author = require('../models/author');                 // importing the model

exports.author_list = function(req, res) {                  // retrieve list of all Authors (for use with GET)
  Author.find({}, (err, authors) => {
    res.json(authors)
  })
};

exports.author_create_post = function(req, res) {           // create a new Author (for use with POST)  
  const author = new Author(req.body); 
  author.save();
  res.status(201).send(author) 
};

exports.author_delete = function(req, res) {                // finds and deletes an Author (for use with DELETE)
  Author.findById(req.params.authorId, (err, author) => {
    author.remove(err => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(204).send('removed')
        }
    });
  });
};
                                                            // finds an Author and performs an update (for use with PUT)
exports.author_update = function(req, res) {
  Author.findByIdAndUpdate(req.params.authorId, {$set:req.body}, {new: true}, function(err, result) {
    if(err){
        console.log('error in put');
        console.log(err);
    }
    console.log("RESULT: " + result);
    res.json(result);
  });
};
```
