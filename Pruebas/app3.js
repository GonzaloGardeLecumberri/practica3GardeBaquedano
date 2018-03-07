var http = require('http');
var path = require('path');

var paginas = [
{ruta: '', output: 'Bienvenidos'},
{ruta: 'about', output: '<h1>Sobre nosotros</h1>'},
{ruta: 'productos', output: 'Info de productos'},
];

http.createServer(function (request, response) {
	var ruta = path.basename(decodeURI(request.url));

	paginas.forEach(function (pagina) {
		if (ruta == pagina.ruta){
			response.writeHead(200), {'content-type' : 'text/html'};
			response.end(pagina.output);
		}
	});
	if (!response.finished) {
		response.writeHead(404);
		response.end('Pagina no encontrada');
	}
	// body...
}).listen(8080);

console.log('Servidor app3 escuchando en 8080');