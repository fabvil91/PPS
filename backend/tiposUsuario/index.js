var express = require('express');
var router = express.Router();

router.get('/tiposUsuario/getAll',function(req, res,next){		
		req.db
		.collection('tiposUsuario')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	})
	});

router.get('/tiposUsuario/nombre/:nombre', (req, res, next) => {
    console.log(req.params.nombre);
    req.db.collection('tiposUsuario')
    .find({nombre:req.params.nombre})
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

router.post('/usuarios/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('usuarios')        
        .insert({username: req.body.username         		 
        		}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});
router.post('/tiposUsuario/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('tiposUsuario')        
        .insert({nombre: req.body.nombre,
                 email: req.body.email,
                 password: req.body.password,
                 tipoUsuario:req.body.tipoUsuario
				}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});	

router.put('/usuarios/modificar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('articulos')        
        .update({_id: id}, {$set: {name: req.body.name, 
        						   peso: req.body.peso,
        						   precio: req.body.precio,
        						   fecha: new Date(req.body.fecha),
        						   tipo: req.body.tipo,
        						   proveedor: {email: req.body.email}
        						   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});
router.put('/tiposUsuario/modificar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('tiposUsuario')        
        .update({_id: id}, {$set: {nombre: req.body.nombre,
        						   email: req.body.email,
        						   password: req.body.password,
        						   tipoUsuario:req.body.tipoUsuario
        						   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});	

router.delete('/usuarios/eliminar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('articulos')        
        .remove({_id: id}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});
router.delete('/tiposUsuario/eliminar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('tiposUsuario')        
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