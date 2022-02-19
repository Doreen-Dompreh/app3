module.exports = app =>{
    const tutorials = require('../controllers/tutorial.controller.js');

var router = require('express').Router();

//create a new tutorial
router.post('/', tutorials.create);

//retrieve all tutorials
router.get('/', tutorials.findAll);

//retrieve all published tutorials
router.get('/', tutorials.findAllPublished);

//retrieve a single tutorial with id
router.put('/:id', tutorials.findOne);

//delet a tutorial by id
router.delete('/id',tutorials.delete);

//delete all tutorials
router.delete('/', tutorials.deleteAll);

app.use('/api/tutorials', router);

}