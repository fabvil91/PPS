var mongo=require('mongodb');
var express = require('express');
var router = express.Router();

router.get('/funciones/getAll',function(req, res,next){		
		req.db
		.collection('funciones')
		.find()
    	.toArray((err, data) => {
      		if (err)
        		console.log(err);     	
     	res.json(data);
    	})
	});

router.post('/funciones/filtrar',function(req, res,next){
    console.log(req.body);  
    var idPeli = new require('mongodb').ObjectID(req.body.pelicula._id); 
    var idFormato = new require('mongodb').ObjectID(req.body.formato); 
    var idIdioma = new require('mongodb').ObjectID(req.body.idioma); 
    var idComplejo = new require('mongodb').ObjectID(req.body.complejo); 

    req.db
    .collection('funciones')
    .find({'pelicula._id':idPeli.toString(),
            'formato._id':idFormato.toString(),
            'idioma._id':idIdioma.toString(),
            'complejo._id':idComplejo.toString()
            //diaTime: req.body.diaLocale
          })
      .toArray((err, data) => {
          if (err)
            console.log(err);
      console.log(data);             
      res.json(data);
      })
   
  });

router.post('/funciones/filtrarMain',function(req, res,next){
    console.log(req.body);      
    var idFormato = new require('mongodb').ObjectID(req.body.formato); 
    var idIdioma = new require('mongodb').ObjectID(req.body.idioma); 
    var idComplejo = new require('mongodb').ObjectID(req.body.complejo); 

    req.db
    .collection('funciones')
     .find({
            'formato._id':idFormato.toString(),
            'idioma._id':idIdioma.toString(),
            'complejo._id':idComplejo.toString()
            //diaTime: req.body.diaLocale
          })
      .toArray((err, data) => {
          if (err)
            console.log(err);
      console.log(data);             
      res.json(data);
      })  
               
  });

router.post('/funciones/filtrarCajero',function(req, res,next){
    console.log(req.body);         
    var idComplejo = new require('mongodb').ObjectID(req.body.complejo); 

    req.db
    .collection('funciones')
     .find({            
            'complejo._id':idComplejo.toString()
            //diaTime: req.body.diaLocale
          })
      .toArray((err, data) => {
          if (err)
            console.log(err);
      console.log(data);             
      res.json(data);
      })  
               
  });

router.post('/funciones/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('funciones')        
        .insert({pelicula: req.body.pelicula, 
            		 formato: req.body.formato,
            		 complejo: req.body.complejo,
            		 idioma: req.body.idioma,
            		 dia: new Date(req.body.dia),
            		 hora: new Date(req.body.hora),
                 sala: req.body.sala,
                 fechaCreacion: new Date(req.body.fechaCreacion),
                 diaTime: req.body.diaTime
        		}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/funciones/modificar',function(req, res, next){
	
		var id = new require('mongodb').ObjectID(req.body._id);
	

        req.db.collection('funciones')        
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
    

router.put('/funciones/modificarSala',function(req, res, next){
 
    var id = new require('mongodb').ObjectID(req.body._id);
  

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

router.put('/funciones/modificarComplejo',function(req, res, next){
 
    var id = new require('mongodb').ObjectID(req.body._id);


        req.db.collection('funciones')        
        .update({_id: id}, {$set: {                     
                              complejo: req.body.complejo                       
                       }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
  });

router.delete('/funciones/eliminar',function(req, res, next){
	
		var id = new require('mongodb').ObjectID(req.body._id);


        req.db.collection('funciones')        
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
    
        res.json(data);
    });
});

module.exports = router;