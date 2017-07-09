var express = require('express');
var router = express.Router();

router.get('/peliculas/getAll',function(req, res,next){		
		req.db
		.collection('peliculas')
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

router.post('/peliculas/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('peliculas')        
        .insert({nombre: req.body.nombre, 
        		 imageUrl: req.body.imageUrl,
        		 trailerUrl: req.body.trailerUrl,
        		 fechaEstreno: new Date(req.body.fechaEstreno),
        		 descripcion: req.body.descripcion,
        		 genero:  req.body.genero,
             duracion:  req.body.duracion,
             tituloOriginal:  req.body.tituloOriginal,
             director:  req.body.director,
             calificacion:  req.body.calificacion,
             estado:  req.body.estado,
             semanasActiva: req.body.semanasActiva,
             formato:  req.body.formato,
             idioma:  req.body.idioma
            }
        		, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/peliculas/modificar',function(req, res, next){
        console.log(req.body);
        var id = new require('mongodb').ObjectID(req.body._id);
        console.log(id);

        req.db.collection('peliculas')        
        .update({_id: id}, {$set: {
                                   nombre: req.body.nombre, 
                                   imageUrl: req.body.imageUrl,
                                   trailerUrl: req.body.trailerUrl,
                                   fechaEstreno: new Date(req.body.fechaEstreno),
                                   descripcion: req.body.descripcion,
                                   genero:  req.body.genero,
                                   duracion:  req.body.duracion,
                                   tituloOriginal:  req.body.tituloOriginal,
                                   director:  req.body.director,
                                   calificacion:  req.body.calificacion,
                                   estado:  req.body.estado,
                                   semanasActiva: req.body.semanasActiva,
                                   formato:  req.body.formato,
                                   idioma:  req.body.idioma                                            
                                   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
    });

router.put('/peliculas/modificarSemanas',function(req, res, next){
        console.log(req.body);
        var id = new require('mongodb').ObjectID(req.body._id);
        console.log(id);

        req.db.collection('peliculas')        
        .update({_id: id}, {$set: {
                                   semanasActiva: req.body.semanasActiva                                           
                                   }}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
    });

router.delete('/peliculas/eliminar',function(req, res, next){
		console.log(req.body);
		var id = new require('mongodb').ObjectID(req.body._id);
		console.log(id);

        req.db.collection('peliculas')        
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