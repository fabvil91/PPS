var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

router.post('/mail/enviar',function(req, res,next){		
		
        // Create the transporter with the required configuration for Gmail        
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'cinemarcomplejos@gmail.com',
                pass: '2017pps2017'
            }
        });

        // setup e-mail data
        var mailOptions = {
            from: '"Cinemar " <cinemarcomplejos@gmail.com>', // sender address (who sends)
            to: 'cinemarcomplejos@gmail.com', // list of receivers (who receives)
            subject: req.body.asunto, // Subject line          
            html:   '<u>Mensaje desde página Contactanos</u>' + '<br>' +
                    '<br>' +
                    '<b>Nombre: </b>'+ req.body.firstName + '<br>' +
                    '<b>Apellido: </b>'+ req.body.lastName + '<br>' +
                    '<b>E-mail: </b>'+ req.body.email + '<br>' +
                    '<b>Complejo: </b>'+ req.body.complejo + '<br>' +
                    '<b>Mensaje: </b>' + req.body.mensaje + '<br>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json(console.log(error));
            }

            res.json('Message sent: ' + info.response);
        });

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

router.post('/insertar',function(req, res, next){
		console.log(req.body);

        req.db.collection('articulos')        
        .insert({name: req.body.name, 
        		 peso: req.body.peso,
        		 precio: req.body.precio,
        		 fecha: new Date(req.body.fecha),
        		 tipo: req.body.tipo,
        		 proveedor: {email: req.body.email}
        		}, function (err, result){
           if (err) {
               res.json({rta : err});
            }
            else {
               res.json({rta : "OK"});
            }
        });  
	});

router.put('/modificar',function(req, res, next){
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