var express = require('express');
var router = express.Router();

router.get('/notificaciones/getAll',function(req, res,next){		
		req.db
		.collection('notificaciones')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	})
	});

router.get('/articulos/name/:name', (req, res, next) => {
    console.log(req.params.name);
    req.db.collection('articulos')
    .find({name:req.params.name})
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

router.post('/notificaciones/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('notificaciones')        
        .insert({extendida: req.body.extendida, 
            		 fecha: req.body.fecha,
            		 pelicula: req.body.pelicula,
            		 funciones: req.body.funciones       		
        		}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/notificaciones/modificarExtendida',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('notificaciones')        
        .update({_id: id}, {$set: {
        						   extendida: req.body.extendida						   
        						   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/funciones/modificarSala',function(req, res, next){
    console.log(req.body);
    var id = new require('mongodb').ObjectID(req.body._id);
    console.log(id);

        req.db.collection('funciones')        
        .update({_id: id}, {$set: {                     
                              sala: req.body.sala                       
                       }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
  });

router.delete('/notificaciones/eliminar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('notificaciones')        
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