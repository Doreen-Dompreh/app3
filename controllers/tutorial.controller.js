const Tutorial = require('../models/tutorial.model.js');
//create ans save a new tutorial

exports.create = (req, res)=>{
    if(!req.body){
        res.status(400).send({
            message: 'content cannot be empty!'
        });
    }

    // create a new tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    //save tutorial in the database
    Tutorial.create(tutorial, (err, data)=>{
        if(err)
            res.status(500).send({
                message: 
                    err.message || 'some error occured while creating the tutorial'
            });
        else res.send(data);
    })
}

// retrieve all tutorials from database with or without condition
exports.findAll = (req, res)=>{
    const title = req.query.title;

    Tutorial.getAll(title, (err, data)=>{
        if(err)
            res.status(500).send({
                message:
                    err.message || 'some error occured while retriving tutorials'
            });
        else res.send(data)
    });
};

//find a single tutorial by id
exports.findOne = (req, res)=>{
    Tutorial.findById(req.params.id, (err, data)=>{
        if(err){
            if(err.kind ==='not found'){
                res.status(404).send({
                    message: `not found tutorial with id ${req.params.id}.`
                });
            }
            else{
                res.status(500).send({
                    message: 'error retrieving tutorial with id ' + req.params.id
                });
            }             
            
        }else res.send(data);
    })
}

// update a tutorial identified by the id in the request
exports.update = (req, res)=>{
    //validate a request
    if(!req.body){
        res.status(400).send({
            message: 'content cannot be empty'
        });
    }
    console.log(req.body);
    Tutorial.updatedById(
        req.params.id,
        new Tutorial(req.body),
        (err, data)=>{
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `not found tutorial with id ${req.params.id}.`
                    });
                }else{
                    res.status(500).send({
                        message: ' error updating tutorial with id ' + req.params.id
                    });
                }
            }else res.send(data);
        }
    );
};

// delete a tutorial with the specified id
exports.delete = (req, res)=>{
    Tutorial.remove(req.params.id, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `not found tutorial with id ${req.params.id}.`
                });
            }else{
                res.status(500).send({
                    message: 'could not delete tutorial with id ' + req.params.id
                });
            }
        }else res.send({
            message: 'tutorial was deleted successfully'
        });
    });
};

//delete all tutorials from the database
exports.deleteAll = (req, res)=>{
    Tutorial.removeAll((err, data)=>{
        if(err)
            res.status(500).send({
                message: 
                    err.message || 'some error occured while removing all tutorials.'
            });
        else res.send({
            message: 'all tutorials were deleted successfully'
        })
    })
}