var express = require('express');
var router = express.Router();

router.get('/operaciones/getAll',function(req, res,next){		
		req.db
		.collection('operaciones')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	}) 
	});

router.get('/operaciones/codigo/:codigo', (req, res, next) => {
    console.log(req.params.codigo);
    req.db.collection('operaciones')
    .find({codigo:req.params.codigo})
    .toArray((err, data) => {
    	if (err)
        	console.log(err);  
        res.json(data);
    });
});

router.get('/operaciones/codigoUser/:codigo', (req, res, next) => {
    console.log(req.params.codigo);
    req.db.collection('operaciones')
    .find({'usuario._id':req.params.codigo})
    .toArray((err, data) => {
      if (err)
          console.log(err);  
        res.json(data);
    });
});


router.post('/operaciones/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('operaciones')        
        .insert({
            codigo: req.body.codigo,
            estado: req.body.estado,
            funcion: req.body.funcion,
            entradas: req.body.entradas,
            tipoPago: req.body.tipoPago,
            nombreTitular: req.body.nombreTitular,
            dniTitular: req.body.dniTitular,
            nroTarjeta: req.body.nroTarjeta,
            codigoSeguridad: req.body.codigoSeguridad,
            fechaVencimiento: req.body.fechaVencimiento,
            tarjeta: req.body.tarjeta,
            banco: req.body.banco,
            fechaOperacion: req.body.fechaOperacion,
            usuario: req.body.usuario,
            promocion: req.body.promocion
          }, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/operaciones/modificar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('operaciones')        
        .update({_id: id}, {$set: {
        						   dia: new Date(req.body.dia),
                       hora: new Date(req.body.hora)
                     //  sala: req.body.sala        						   
        						   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/operaciones/modificarEfectivo',function(req, res, next){
    console.log(req.body);
    var id = new require('mongodb').ObjectID(req.body._id);
    console.log(id);

        req.db.collection('operaciones')        
        .update({_id: id}, {$set: {
                              estado: req.body.estado,           
                              tipoPago: req.body.tipoPago,           
                              fechaOperacion: req.body.fechaOperacion,
                              promocion: req.body.promocion             
                       }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
  });

router.put('/operaciones/modificarCompra',function(req, res, next){
    console.log(req.body);
    var id = new require('mongodb').ObjectID(req.body._id);
    console.log(id);

        req.db.collection('operaciones')        
        .update({_id: id}, {$set: {
                              estado: req.body.estado,                                             
                              fechaOperacion: req.body.fechaOperacion                                         
                       }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
  });

router.put('/operaciones/modificarTarjeta',function(req, res, next){
    console.log(req.body);
    var id = new require('mongodb').ObjectID(req.body._id);
    console.log(id);

        req.db.collection('operaciones')        
        .update({_id: id}, {$set: {                               
                                estado: req.body.estado,                              
                                tipoPago: req.body.tipoPago,
                                nombreTitular: req.body.nombreTitular,
                                dniTitular: req.body.dniTitular,
                                nroTarjeta: req.body.nroTarjeta,
                                codigoSeguridad: req.body.codigoSeguridad,
                                fechaVencimiento: req.body.fechaVencimiento,
                                tarjeta: req.body.tarjeta,
                                banco: req.body.banco,
                                fechaOperacion: req.body.fechaOperacion,                              
                                promocion: req.body.promocion                                        
                       }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
  });

  

router.delete('/eliminar',function(req, res, next){
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