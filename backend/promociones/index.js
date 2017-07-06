var express = require('express');
var router = express.Router();

router.get('/promociones/getAll',function(req, res,next){		
		req.db
		.collection('promociones')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	})
	});

router.post('/promociones/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('promociones')        
        .insert({nombre: req.body.nombre, 
        		 descripcion: req.body.descripcion,
        		 diaSemana: req.body.diaSemana,
        		 tipoPromocion: req.body.tipoPromocion,
        		 tipoDescuento: req.body.tipoDescuento,
        		 tipoEntrada: req.body.tipoEntrada,
                 banco:req.body.banco,
                 tarjeta:req.body.tarjeta,
                 porcentaje:req.body.porcentaje,
        		}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/promociones/modificar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('promociones')        
        .update({_id: id}, {$set: {nombre: req.body.nombre, 
        		 descripcion: req.body.descripcion,
        		 diaSemana: req.body.diaSemana,
        		 tipoPromocion: req.body.tipoPromocion,
        		 tipoDescuento: req.body.tipoDescuento,
        		 tipoEntrada: req.body.tipoEntrada,
                 banco:req.body.banco,
                 tarjeta:req.body.tarjeta,
                 porcentaje:req.body.porcentaje,
        						   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.delete('/promociones/eliminar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('promociones')        
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