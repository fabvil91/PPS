var express = require('express');
var router = express.Router();

router.get('/idiomas/getAll',function(req, res,next){		
		req.db
		.collection('idiomas')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	})
	});


router.post('/idiomas/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('idiomas')        
        .insert({
                nombre:req.body.nombre
        		}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/idiomas/modificar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('idiomas')        
        .update({_id: id}, {$set: {
                nombre:req.body.nombre
        						   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.delete('/idiomas/eliminar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('idiomas')        
        .remove({_id: id}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});


module.exports = router;