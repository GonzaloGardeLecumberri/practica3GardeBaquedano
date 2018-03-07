var express = require('express');
var app = express();
var url = require('url');

app.get('/', function (request, response) {
	var id = url.parse(decodeURI(request.url), true).query.id;
	if (id == '1'){
		response.send('Hola Mundo');
	}else{
		response.send('Adios Mundo');
	}
	
});

app.listen(8080, function (argument) {
	console.log('Escuchando 8080');
});
