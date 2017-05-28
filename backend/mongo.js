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

	app.listen(3333, ()=> {
		console.log('Servidor iniciado..');
	})
});