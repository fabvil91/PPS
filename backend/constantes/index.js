var express = require('express');
var router = express.Router();

router.get('/constantes/getAll',function(req, res,next){		
		req.db
		.collection('constantes')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	})
	});


router.post('/precios/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('precios')        
        .insert({complejo: req.body.complejo,
			     formato: req.body.formato,
                 tipo: req.body.tipo,
			     monto: req.body.monto

                }, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/constantes/modificar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('constantes')        
        .update({_id: id}, {$set: {porcentajeListaNegra: req.body.porcentajeListaNegra,
        						               cantidadPeliculasMasVistas: req.body.cantidadPeliculasMasVistas                                           						   
        						  }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.delete('/precios/eliminar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('precios')        
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