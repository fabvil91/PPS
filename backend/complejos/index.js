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

router.get('/articulos/precio/:precio', (req, res, next) => {
     console.log(req.params.precio);
    req.db.collection('articulos')
    .find({precio:{$gt:parseInt(req.params.precio)}})
    .toArray((err, data) => {
    	if (err)
        	console.log(err); 
        res.json(data);
    });
});

router.get('/articulos/proveedor/:proveedor', (req, res, next) => {
    console.log(req.params.proveedor);
    req.db.collection('articulos')
    .find({'proveedor.email':req.params.proveedor})
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
        		 duracionFunciones: req.body.duracionFunciones,
        		 duracionTolerancia: req.body.duracionTolerancia
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
        						   duracionPublicidad: req.body.duracionPublicidad
        						   duracionFunciones: req.body.duracionFunciones,
        						   duracionTolerancia: req.body.duracionTolerancia
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

router.get('/indices', function(req, res){
  req.db.collection('articulos')
  .createIndex( { name: "text",
                  'proveedor.email': "text"                   
                }, 
                { weights: { 
                name: 10,                              
                'proveedor.email': 1}}, function (err, result){
                if (err) {
                    res.json({rta : err});
                }
                 else {
                    res.json({rta : "OK"});
                }} 
            );
});

router.get('/articulos/indices/:texto', (req, res, next) => {

    req.db.collection('articulos')
    .find({$text : {$search: req.params.texto}},
          {score : {$meta : "textScore"}})
    .sort({score : {$meta: "textScore"}}) 
    .toArray((err, data) => {
    	console.log(data);
        res.json(data);
    });
});

module.exports = router;