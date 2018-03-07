var http = require('http');
var url = require('url');

var paginas = [
{id:'1', ruta: '', output: 'Bienvenidos'},
{id:'2', ruta: 'about', output: '<a href="?id=3"><h1>Sobre nosotros</h1></a>'},//si lo pones asi va a localhost:8080/?id=3
{id:'3', ruta: 'productos', output: 'Info de productos'},
];

function start() {
	http.createServer(function (request, response) {
		var time = new Date().getMilliseconds();
		console.log(time);
		var id = url.parse(decodeURI(request.url), true).query.id;
		if (id) {
			paginas.forEach(function (pagina) {
				if (pagina.id === id){
					response.writeHead(200), {'content-type' : 'text/html'};
					response.end(pagina.output);
				}
			});
		}	
		if (!response.finished) {
			response.writeHead(404);
			response.end('Pagina no encontrada');
		}
		// body...
	}).listen(8080);
	console.log('Servidor app5 escuchando en 8080');
}

// Aqui para acceder a cada pagina localhost:8080/?id="NUMERO"
exports.start = start;

