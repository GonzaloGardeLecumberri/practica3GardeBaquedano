var http = require('http');
http.createServer(function (request, response) {
	console.log('Peticion http');
	response.writeHead(200, {'content-type':'text/plain'});
	response.end('Hola mundo');
}).listen(8080);
console.log('Servidor ejecutandose en el puerto 8080');