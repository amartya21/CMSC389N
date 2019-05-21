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
const authorRouter = express.Router();              // creating a new router
const Author = require('../../../models/author');   // importing author model

// importing controller
const author_controller = require('../../../controllers/authorController');

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
