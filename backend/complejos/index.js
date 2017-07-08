var express = require('express');
var router = express.Router();

router.get('/complejos/getAll',function(req, res,next){		
		req.db
		.collection('complejos')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	})
	});

router.get('/complejos/id/:id', (req, res, next) => {
    console.log(req.params.id);
    var idC = new require('mongodb').ObjectID(req.params.id);
    req.db.collection('complejos')
    .find({_id:idC})
    .toArray((err, data) => {
      if (err)
          console.log(err);  
        res.json(data);
    });
});

router.post('/complejos/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('complejos')        
        .insert({nombre: req.body.nombre, 
        		 horaApertura: new Date(req.body.horaApertura),
        		 horaCierre: new Date(req.body.horaCierre),
        		 duracionPublicidad: req.body.duracionPublicidad,
        		 duracionEntreFunciones: req.body.duracionEntreFunciones,
        		 duracionToleranciaUltimaFuncion: req.body.duracionToleranciaUltimaFuncion
			    }, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/complejos/modificar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('complejos')        
        .update({_id: id}, {$set: {nombre: req.body.nombre, 
        						   horaApertura: new Date(req.body.horaApertura),
        						   horaCierre: new Date(req.body.horaCierre),
        						   duracionPublicidad: req.body.duracionPublicidad,
        						   duracionEntreFunciones: req.body.duracionEntreFunciones,
        						   duracionToleranciaUltimaFuncion: req.body.duracionToleranciaUltimaFuncion
        						   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/complejos/modificarHoras',function(req, res, next){
        console.log(req.body);
        var id = new require('mongodb').ObjectID(req.body._id);
        console.log(id);

        req.db.collection('complejos')        
        .update({_id: id}, {$set: {horaApertura: new Date(req.body.horaApertura), 
                                   horaCierre: new Date(req.body.horaCierre)}
                                   }, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
    });

router.delete('/complejos/eliminar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('complejos')        
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