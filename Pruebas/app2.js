var http = require('http');
var path = require('path');

http.createServer(function (request, response) {
	var ruta = path.basename(decodeURI(request.url));
	if (ruta == '') {
		response.writeHead(200, {'content-type': 'text/plain'});
		response.end('Hola mundo');
	}else if (ruta == 'about') {
		response.writeHead(200,{'content-type': 'text/plain'});
		response.end('<h1>Informacion sobre nosotros</h1>');
	} else {
		response.writeHead(404);
		response.end('!Pagina no encontrada');
	}
	// body...
}).listen(8080);

// La direccion en navegador cambiara en localhost:8080/"ALGO" en funcion de ese algo ecribira lo que sea. 
//Ojo que no pone HTML de primeras porque le hemos dicho que el tipo es plain
console.log('Servidor en el puerto 8080');