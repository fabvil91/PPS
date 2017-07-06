var express = require('express');
var router = express.Router();

router.get('/salas/getAll',function(req, res,next){		
		req.db
		.collection('salas')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	})
	});

router.get('/salas/id/:id', (req, res, next) => {
    console.log(req.params.id);
    var idC = new require('mongodb').ObjectID(req.params.id);
    req.db.collection('salas')
    .find({_id:idC})
    .toArray((err, data) => {
    	if (err)
        	console.log(err);  
        res.json(data);
    });
});


router.post('/salas/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('salas')        
        .insert({nombre: req.body.nombre, 
                 formato: req.body.formato,
                 complejo: req.body.complejo,
                 asientos: req.body.asientos
        		}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/salas/modificarAsientos',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('salas')        
        .update({_id: id}, {$set: {asientos: req.body.asientos         						          						                       						  
        						   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.delete('/salas/eliminar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('salas')        
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