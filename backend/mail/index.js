var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

/*router.post('/mail/enviar',function(req, res,next){		
		
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

	});*/

router.post('/mail/enviarContrasenia',function(req, res,next){     
        
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
            to: req.body.email, // list of receivers (who receives)
            subject: 'Recuperación de contraseña', // Subject line          
            html:   '<u>Su contraseña</u>' + '<br>' +
                    '<br>' +
                    '<b>Nombre de usuario: </b>'+ req.body.username + '<br>' +
                    '<b>Contraseña: </b>'+ req.body.password + '<br>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json(console.log(error));
            }

            res.json('Message sent: ' + info.response);
        });

    });

    
router.post('/mail/enviarContactanos',function(req, res,next){		
		
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
            html:   
                
            '<table style="width:440px;  padding: 15px; table-layout:fixed;"><thead><th><h2>Datos Usuario</h2></th></thead><tbody><tr><td>'+
                        '<p style="font-size:16px">Nombre: '+ req.body.firstName+'</p>'+
                        '<p style="font-size:16px">Apellido: '+ req.body.lastName+'</p>'+
                        '<p style="font-size:16px">E-Mail: '+ req.body.email+'</p>'+
                        '<p style="font-size:16px">Complejo: '+ req.body.complejo+'</p>'+
            '</td></tr></tbody></table><table style="width:440px;  padding: 15px; table-layout:fixed;"><thead><th><h2>Comentario</h2></th></thead>'+
            '<tbody><tr><td><p style="word-wrap:break-word; vertical-align:top;">'+req.body.mensaje +'</p></td></tr></tbody></table>'
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json(console.log(error));
            }

            res.json('Message sent: ' + info.response);
        });

	});

    router.post('/mail/enviarCancelarOperacion',function(req, res,next){		
		
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
            to: req.body.usuario.email, // list of receivers (who receives)
            subject: req.body.asunto, // Subject line          
            html:   '<table style="font-family: Arial, Helvetica, sans-serif;"><tr><td align="center" style="background-color: #00438E;" ><h1 style="color:#5BC0DE;">CINEMAR</h1></td></tr><tr><td><table style="padding:5px"><tr><td><ul style="list-style: none;">'+
    '<li><h3>Ha cancelado una '+req.body.operacion.funcion.transaccion.tipoTransaccion+'</h3></li>'+
    '<li>'+req.body.usuario.userName+'</li>'+
    '<li><p>Su '+req.body.operacion.funcion.transaccion.tipoTransaccion+' ha sido cancelada exitosamente.</p></li></ul></td><td><ul style="list-style: none;">'+
    '<li><h3>Datos de '+req.body.operacion.funcion.transaccion.tipoTransaccion+':</h3></li><li><strong>Pelicula:</strong></li>'+
    '<li>'+req.body.operacion.funcion.pelicula+'</li>'+
    '<li>'+req.body.operacion.funcion.formato+","+req.body.operacion.funcion.idioma+'</li>'+
    '<li>'+req.body.operacion.funcion.diaFormateado+'</li><br><li><strong>Entradas:</strong></li>'+   
    '<li>Cantidad: '+req.body.operacion.funcion.cantidadAsientos+'</li>'+        
    '<li>Precio total: $'+req.body.operacion.funcion.precioTotal+'</li></ul></td>'+
    '</tr></table></td></tr><tr><td style="background-color: #00438E;"><br><br><br></td></tr></table>'
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json(console.log(error));
            }

            res.json('Message sent: ' + info.response);
        });

	});
router.post('/mail/enviarCompra',function(req, res,next){		
		
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
            to: req.body.usuario.email, // list of receivers (who receives)
            subject: req.body.asunto, // Subject line          
            html:   '<table style="font-family: Arial, Helvetica, sans-serif;"><tr><td align="center" style="background-color: #00438E;" ><h1 style="color:#5BC0DE;">CINEMAR</h1></td></tr><tr><td><table style="padding:5px"><tr><td><ul style="list-style: none;"><li><h3>Ha realizado una Compra</h3></li>'+
    '<li>'+req.body.usuario.userName+'</li><li><p>Su Compra ha sido confirmada.</p></li><li><p>Sus entradas deberan ser retiradas antes del '+req.body.dia+' a las'+req.body.hora+'.<br>Pasado este tiempo, se lo considerara una cancelación y no podra retirarlas.</p></li></ul></td>'+
    '<td><ul style="list-style: none;"><li><h3>Datos de Compra:</h3></li><li><strong>Pelicula:</strong></li>'+
                               '<li>'+req.body.operacion.funcion.pelicula+'</li>'+
                               '<li>'+req.body.operacion.funcion.formato+','+req.body.operacion.funcion.idioma+'</li>'+
                               '<li>'+req.body.operacion.funcion.diaFormateado+'</li>'+
                               '<br><li><strong>Entradas:</strong></li>'+ 
                               '<li>Cantidad: '+req.body.operacion.funcion.cantidadAsientos+'</li>'+        
                               '<li>Precio total: $'+req.body.operacion.funcion.precioTotal+'</li>'+           
    '</ul></td></tr></table></td></tr><tr><td style="background-color: #00438E;"><br><br><br></td></tr></table>'
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json(console.log(error));
            }

            res.json('Message sent: ' + info.response);
        });

	});
router.post('/mail/enviarEntraListaNegra',function(req, res,next){		
		
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
            to: req.body.usuario.email, // list of receivers (who receives)
            subject: req.body.asunto, // Subject line          
            html:   '<table style="font-family: Arial, Helvetica, sans-serif;"><tr><td align="center" style="background-color: #00438E;" ><h1 style="color:#5BC0DE;">CINEMAR</h1></td></tr><tr><td><table style="padding:5px"><tr><td><ul style="list-style: none;"><li><h3>Ingreso a Lista Negra</h3></li>'+
'<li>'+req.body.usuario.userName+'</li><li><p>Usted a sido ingresado a Lista Negra. Esto significa que no podra realizar Reservas hasta que salga de ella. Sin embargo, podra seguir realizando compras sin ningun problema.</p></li>'+      
'</ul></td><td><ul style="list-style: none;"><li><h3>Datos de operación vencida:</h3></li><li><strong>Pelicula:</strong></li>'+
'<li>'+req.body.operacion.funcion.pelicula+'</li>'+
'<li>'+req.body.operacion.funcion.formato+','+req.body.operacion.funcion.idioma+'</li>'+
'<li>'+req.body.operacion.funcion.diaFormateado+'</li><br><li><strong>Entradas:</strong></li>'+    
'<li>Cantidad: '+req.body.operacion.funcion.cantidadAsientos+'</li>'+        
'<li>Precio total: $'+req.body.operacion.funcion.precioTotal+'</li>'+  
'<li><em>Monto Debido:</em> $'+req.body.operacion.montoDeuda+'</li>'+              
'</ul></td></tr></table></td></tr><tr><td style="background-color: #00438E;"><br><br><br></td></tr></table>'
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json(console.log(error));
            }

            res.json('Message sent: ' + info.response);
        });

	});
    router.post('/mail/enviarReserva',function(req, res,next){		
		var user = req.body.usuario;
        var operacion = req.body.operacion;
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
            to: user.email, // list of receivers (who receives)
            subject: req.body.asunto, // Subject line          
            html:  
'<table style="font-family: Arial, Helvetica, sans-serif;"><tr><td align="center" style="background-color: #00438E;" ><h1 style="color:#5BC0DE;">CINEMAR</h1></td></tr><tr><td><table style="padding:5px"><tr><td><ul style="list-style: none;"><li><h3>Ha realizado una Reserva</h3></li>'+
'<li>'+user.userName+'</li>'+
'<li><p>Su Reserva ha sido confirmada.</p></li><li><p>Sus entradas deberan ser retiradas antes del '+req.body.dia+' a las '+operacion.funcion.hora+'. <br>De lo contrario, usted sera ingresado a Lista Negra<br> y no podra realizar nuevas reservas hasta abonar lo debido.<br>(%'+req.body.porcentajeListaNegra+' del precio total de la reserva.)</p></li>'+

'</ul></td><td><ul style="list-style: none;"><li><h3>Datos de Reserva:</h3></li><li><strong>Pelicula:</strong></li>'+
'<li>'+operacion.funcion.pelicula+'</li>'+
'<li>'+operacion.funcion.formato+','+operacion.funcion.idioma+'</li>'+
'<li>'+operacion.funcion.diaFormateado+'</li><br><li><strong>Entradas:</strong></li>'+  
'<li>Cantidad: '+operacion.funcion.cantidadAsientos+'</li>'+     
'<li>Precio total: $'+operacion.funcion.precioTotal+'</li>'+         
'</ul></td></tr></table></td></tr><tr><td style="background-color: #00438E;"><br><br><br></td></tr></table>'


        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json(console.log(error));
            }

            res.json('Message sent: ' + info.response);
        });

	});
    router.post('/mail/enviarSaleListaNegra',function(req, res,next){		
		
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
            to: req.body.usuario.email, // list of receivers (who receives)
            subject: req.body.asunto, // Subject line          
            html:   '<table style="font-family: Arial, Helvetica, sans-serif;"><tr><td align="center" style="background-color: #00438E;" ><h1 style="color:#5BC0DE;">CINEMAR</h1></td></tr><tr><td><table style="padding:5px"><tr><td><h3>Lista Negra</h3>'+
'<p>'+req.body.usuario.userName+'</p>'+
'<p>Usted a sido salido de Lista Negra. Podra realizar reservas normalmente.</p></td></tr></table></td></tr><tr><td style="background-color: #00438E;"><br><br><br></td></tr></table>'
 
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.json(console.log(error));
            }

            res.json('Message sent: ' + info.response);
        });

	});

module.exports = router;