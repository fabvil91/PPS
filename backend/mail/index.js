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



module.exports = router;