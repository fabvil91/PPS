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

var bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};

app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017/pps', (err, db) =>
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

	app.listen(3333, ()=> {
		console.log('Servidor iniciado..');
	})

	cron.schedule('0 56 22 * * *', function(){ 
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

  		//Buscamos las peliculas activas y en su ultima semana
  		var peliculasAVencer = [];
  		var peliculas = [];
  		db.collection('peliculas')
	    .find({estado:'Activa'})
	    .toArray((err, data) => {
	    	if (err){
	        	console.log(err);  
	    	}else{
		        //console.log(data);
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
    	});	   		    	
	});
});