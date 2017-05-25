var MongoClient = require( 'mongodb' ).MongoClient;
var express = require('express');
var app = express();
var rutas = require('./rutas');
var bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};

app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
app.use(cors());

MongoClient.connect('mongodb://localhost:27017/final', (err, db) =>
{
	if(err)
		throw err;

	app.use((req,res,next) => {
		req.db = db;
		next();
	});
	app.use('/',rutas);

	app.listen(3333, ()=> {
		console.log('Servidor iniciado..');
	})
});