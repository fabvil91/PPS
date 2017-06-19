var express = require('express');
var router = express.Router();

router.get('/usuarios/getAll',function(req, res,next){		
		req.db
		.collection('usuarios')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	})
	});

router.get('/usuarios/username/:username', (req, res, next) => {
    console.log(req.params.username);
    req.db.collection('usuarios')
    .find({username:req.params.username})
    .toArray((err, data) => {
    	if (err)
        	console.log(err);  
        res.json(data);
    });
});

//hago uno separado para insertar datos de tarjeta??
router.post('/usuarios/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('usuarios')        
        .insert({username: req.body.username,
                 password: req.body.password,
                 email: req.body.email,
                 tipo: req.body.tipoUsuario,
                 datosPersonales:{
                     nombre:req.body.datosPersonales.nombre,
                     apellido:req.body.datosPersonales.apellido,
                     telefono:req.body.datosPersonales.telefono
                 }         		 
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

        req.db.collection('usuarios')        
        .update({_id: id}, {$set: {
                 username: req.body.username,
                 password: req.body.password,
        						   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/usuarios/modificarPersonales',function(req, res, next){
    console.log(req.body);
    var id = new require('mongodb').ObjectID(req.body._id);
    console.log(id);

    req.db.collection('usuarios')        
    .update({_id: id}, {$set: {
                email: req.body.email,
                datosPersonales:{
                    nombre:req.body.datosPersonales.nombre,
                    apellido:req.body.datosPersonales.apellido,
                    telefono:req.body.datosPersonales.telefono
                }
                                }}, function (err, result){
        if (err) {
            res.json({rta : err});
        }
        else {
            res.json({rta : "OK"});
        }
    });  
});
router.put('/usuarios/modificarTarjeta',function(req, res, next){
    console.log(req.body);
    var id = new require('mongodb').ObjectID(req.body._id);
    console.log(id);

    req.db.collection('usuarios')        
    .update({_id: id}, {$set: {
                datosTarjeta:{
                    banco:req.body.datosTarjeta.banco,
                    tarjeta:req.body.datosTarjeta.tarjeta,
                    numeroTarjeta:req.body.datosTarjeta.numeroTarjeta,
                    dni:req.body.datosTarjeta.dni,
                    titular:req.body.datosTarjeta.titular,
                    codigoSeguridad:req.body.datosTarjeta.codigoSeguridad,
                    vencimiento:req.body.datosTarjeta.vencimiento
                }
            } 
        },
        {upsert:true}, function (err, result){
        if (err) {
            res.json({rta : err});
        }
        else {
            res.json({rta : "OK"});
        }
    });  
});
router.put('/usuarios/borrarTarjeta',function(req, res, next){
    console.log(req.body);
    var id = new require('mongodb').ObjectID(req.body._id);
    console.log(id);

    req.db.collection('usuarios')        
    .update({_id: id}, {username: req.body.username,
                 password: req.body.password,
                 email: req.body.email,
                 tipo: req.body.tipoUsuario,
                 datosPersonales:{
                     nombre:req.body.datosPersonales.nombre,
                     apellido:req.body.datosPersonales.apellido,
                     telefono:req.body.datosPersonales.telefono
                 }         		 
                                }, function (err, result){
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

        req.db.collection('usuarios')        
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