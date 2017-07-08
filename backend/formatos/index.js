var express = require('express');
var router = express.Router();

router.get('/formatos/getAll',function(req, res,next){		
		req.db
		.collection('formatos')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	})
	});

router.post('/formatos/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('formatos')        
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

router.put('/formatos/modificar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('formatos')        
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

router.delete('/formatos/eliminar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('formatos')        
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