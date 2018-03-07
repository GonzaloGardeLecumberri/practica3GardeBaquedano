var http = require('http');
var path = require('path');
var fs = require('fs');

var mimeTypes = {
	'.js' : 'text/javascript',
	'.html' : 'text/html',
	'css' : 'text/css'
};

http.createServer(function (request, response) {
	var buscar = path.basename(decodeURI(request.url)) || 'index.html';
	var f = 'content/'+buscar;
	console.log(f);
	/*try{
		fs.readFile(f, function(err, data){
			if (err) {
				response.writeHead(500);
				response.end('Error del servidor');
				return;
			}
			var headers = {'content-type': mimeTypes[path.extname(buscar)]};
			response.writeHead(200, headers);
			response.end(data);
		});
	}
	catch(error){
		response.writeHead(404);
		response.end("!Pagina no encontrada");
	}
	//Preguntar por que readFile no tira excepcion cuando no existe el archivo, o sea, lanza lo mismo que si no lo puede leer
	*/
	fs.readFile(f, function(err, data){
		if (err) {
			response.writeHead(404);
			response.end("!Pagina no encontrada!");
		}
		var headers = {'content-type': mimeTypes[path.extname(buscar)]};
		response.writeHead(200, headers);
		response.end(data);
	});
// body...
}).listen(8080);

console.log('Servidor app6 escuchando en 8080');