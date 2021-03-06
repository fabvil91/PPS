var MongoClient = require( 'mongodb' ).MongoClient;
var express = require('express');
var app = express();

var peliculas = require('./peliculas');
var complejos = require('./complejos');
var formatos = require('./formatos');
var idiomas = require('./idiomas');
var slides = require('./slides');
var funciones = require('./funciones');
var precios = require('./precios');
var promociones = require('./promociones');
var bancos = require('./bancos');
var tarjetas = require('./tarjetas');
var usuarios = require('./usuarios');
var tiposUsuario = require('./tiposUsuario');
var operaciones = require('./operaciones');
var mail = require('./mail');
var cron = require('node-cron');
var salas = require('./salas');
var notificaciones = require('./notificaciones');
var constantesM = require('./constantes');

var bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};

app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
app.use(cors());

MongoClient.connect('mongodb://127.0.0.1:27017/pps', (err, db) =>
{
	if(err)
		throw err;

	app.use((req,res,next) => {
		req.db = db;
		next();
	});
	
	app.use('/',peliculas);
	app.use('/',complejos);
	app.use('/',formatos);
	app.use('/',idiomas);
	app.use('/',slides);
	app.use('/',funciones);
	app.use('/',precios);
	app.use('/',promociones);
	app.use('/',bancos);
	app.use('/',tarjetas);
	app.use('/',usuarios);
	app.use('/',tiposUsuario);
	app.use('/',operaciones);
	app.use('/',mail);
	app.use('/',salas);
	app.use('/',notificaciones);
	app.use('/',constantesM);

	app.listen(3333, ()=> {
		console.log('Servidor iniciado..');
	})

	// Cada dia a las 23 40 PM (no esta cambiado para poder probar, pero deberia ser: 0 40 23 * * *):
	cron.schedule('0 12 20 * * *', function(){
		function addMinutes(date, minutes) {
		    return new Date(date.getTime() + minutes*60000);
		}

		db.collection('constantes')
		.find()
		.toArray((err, constantes) => {
		if (err){
		    console.log(err);     	
		}else{
		console.log(constantes);

		db
		.collection('operaciones')
		.find()
    	.toArray((err, operaciones) => {
      		if (err){
        		console.log(err);     	
      		}else{
      			console.log(operaciones);
      			var opVencidas = [];
      			for (var i = 0; i < operaciones.length; i++) {
      				if(new Date().getTime() > (addMinutes(new Date(operaciones[i].funcion.hora),30).getTime()) ){
      					if(operaciones[i].estado == 'Pagado'){
      						operaciones[i].estado = 'Cancelado';
      						
      						db.collection('operaciones')        
							        .update({_id: operaciones[i]._id}, {$set: {
							                              estado: operaciones[i].estado        
							                       }}, function (err, result){
							           if (err) {
							               console.log(err);
							            }
							            else {
							               console.log("OK");
							            }
							        }); 

      					}else if(operaciones[i].estado == 'Reservado'){
      						operaciones[i].estado = 'ReservaVencida';
      						var user = operaciones[i].usuario.username;
      						
      								db.collection('operaciones')        
							        .update({_id: operaciones[i]._id}, {$set: {
							                              estado: operaciones[i].estado,           
														  montoDeuda: operaciones[i].funcion.precioTotal*(constantes[0].porcentajeListaNegra/100)      
							                       }}, function (err, result){
							           if (err) {
							               console.log(err); 
							            }
							            else {
							               console.log(operaciones[i]);

							               db.collection('usuarios')
										   .find({username: user})
										   .toArray((err, data) => {
										    	if (err){
										        	console.log(err);  
										    	}else{
										        	console.log(data);

										        	db.collection('usuarios')        
											        .update({_id: data[0]._id}, {$set: {
											                 						listaNegra: true
											                                   }},{upsert:true}, function (err, result){
											           if (err) {
											               console.log(err);
											            }
											            else {
											               console.log("OK");
											            }
											        });  
										        }
										    });
							            }
							        }); 
      					}
      				}
      			}      			
      		}     	
    	}) 
    	}
		})
	});

	// Cada dia a las 23 50 PM (no esta cambiado para poder probar, pero deberia ser: 0 50 23 * * *):
	cron.schedule('0 1 16 * * *', function(){
		/* Verifica si dos dias son iguales */ 
		Date.prototype.isSameDateAs = function(pDate) {
		  return (
		    this.getFullYear() === pDate.getFullYear() &&
		    this.getMonth() === pDate.getMonth() &&
		    this.getDate() === pDate.getDate()
		  );
		}

		db.collection('funciones')
		.find({})
		.toArray((err, data) => {
		if (err){
			console.log(err);     	
		}else{
			var funciones = data;
			console.log(funciones);
			for (var i = 0; i < funciones.length; i++) {
				if(new Date(funciones[i].dia).isSameDateAs(new Date())){
					console.log(funciones[i]);
					db.collection('funciones')        
			        .remove({_id: funciones[i]._id}, function (err, result){
			           if (err) {
			               console.log(err);
			            }
			            else {
			               console.log("OK");
			            }
			        }); 
				}
			}
		}
	})
	});

	// Cada jueves a las 2 AM (no esta cambiado para poder probar, pero deberia ser: 0 0 2 * * 4):
	cron.schedule('0 26 0 * * *', function(){ 
		/* Filtra arrays por sala */
		function filtrar(funciones) {
		    var a = [], l = funciones.length;
		    for(var i=0; i<l; i++) {
		      for(var j=i+1; j<l; j++)
		            if (funciones[i].sala.nombre === funciones[j].sala.nombre &&
		            	funciones[i].sala.complejo.nombre === funciones[j].sala.complejo.nombre) j = ++i;
		      a.push(funciones[i]);
		    }
		    return a;
		};


		/* Verifica si dos dias son iguales */ 
		Date.prototype.isSameDateAs = function(pDate) {
		  return (
		    this.getFullYear() === pDate.getFullYear() &&
		    this.getMonth() === pDate.getMonth() &&
		    this.getDate() === pDate.getDate()
		  );
		}

  		/* Suma dias a una fecha */
		Date.prototype.addDays = function(days) {
		var dat = new Date(this.valueOf())
		dat.setDate(dat.getDate() + days);
		return dat;
		}

		/* Devuelve las fechas entre dos limites */
		function getDates(startDate, stopDate) {
		   	var dateArray = new Array();
		   	var currentDate = startDate;
		   	while (currentDate <= stopDate) {
		        	dateArray.push(currentDate)
		        	currentDate = currentDate.addDays(1);
		   	}
		   	return dateArray;
		}

		/* Eliminamos notificaciones antiguas */
		db.collection('notificaciones')        
        .remove({ }, function (err, result){
           if (err) {
               console.log(err);
            }
            else {
               console.log("Eliminaciones OK");
        
		  		//Buscamos las peliculas activas y en su ultima semana
		  		var peliculasAVencer = [];
		  		var peliculas = [];
		  		db.collection('peliculas')
			    .find({estado:'Activa'})
			    .toArray((err, data) => {
			    	if (err){
			        	console.log(err);  
			    	}else{
				        console.log(data);
				        peliculas = data;

					    var limiteSup = null;
					    var limiteInf = null;    
						for (var i = 0; i < peliculas.length; i++) {
							peliculas[i].fechaEstreno = new Date(peliculas[i].fechaEstreno);
							limiteSup = peliculas[i].fechaEstreno.addDays(7 * peliculas[i].semanasActiva);				
							limiteInf = limiteSup.addDays(-7);
							var ultimaSemana = getDates(limiteInf,limiteSup.addDays(-1));
							for (var j = 0; j < ultimaSemana.length; j++) {
									if(ultimaSemana[j].isSameDateAs(new Date())){							
										peliculasAVencer.push(peliculas[i]);
										break;
									}
								}	
						}			
									
						//Buscamos las funciones de esas peliculas y generacion notificacion
						var funciones = [];	    	
				    	for (var i = 0; i < peliculasAVencer.length; i++) {
				    		var pelicula = peliculasAVencer[i];

				    		db.collection('funciones')
							.find({'pelicula.nombre':pelicula.nombre})
				    		.toArray((err, data) => {
				      		if (err){
				        		console.log(err);     	
				      		}else{	 
				      			if(data.length != 0) {   				      				      				      				      			
									db.collection('notificaciones')        
							        .insert({extendida: false, 
							            		 fecha: new Date(),
							            		 pelicula: pelicula,
							            		 funciones: filtrar(data)       		
							        		}, function (err, result){
							           if (err) {
							               console.log(err);  
							            }
							            else {
							               console.log("Notif OK");  
							            }
							        });
						      }
				     		}
				    	})
				      }
			    	}
		    	})
	   			}
     	}) 
	});
});