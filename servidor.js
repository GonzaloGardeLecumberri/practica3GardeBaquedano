var express = require('express');
var app = express();
var url = require('url');
var path = require('path');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var port = process.env.PORT || 3000;
var paginas = [
{ruta: '/', fichero: true, dirFichero: '/index.html', nombre: 'Base', numVisit: 0, id: false, render: false, webService: false},
{ruta: '/about', fichero: true, dirFichero: '/about.html', nombre: 'About', numVisit: 0, id: false, render: false, webService: false},
{ruta: '/productos', fichero: true, dirFichero: '/productos.html', nombre: 'Productos', numVisit: 0, id: true, render: false, webService: false},
{ruta: '/productos/:id(\\d+)', fichero: false, dirFichero: 'productos', nombre: 'productos/id', numVisit: 0, id: false, render: true, webService: false},
{ruta: '/productosJSON', fichero: false, dirFichero: 'productos', nombre: 'infoProductos', numVisit: 0, id: false, render: false, webService: true}
];

var renderizar = [
	{
		arrayRenderizar: 'productos',
		paginaRenderizar: 'productos',
		valores:[
			{idProducto: 1, nombre: 'Toro', descripcion: 'Un toro un poco escuchimizado', precio: 15, moneda: 'euro', plazoEntrega: 'Un mes contando desde ayer', datos: {danos: 'Puede cornear', peso: 'Mas de 2kg al menos', nombres: 'No les suele gustar que les llamen Toros'}, cantidad: 50000, url: 'http::laimagensilatuviera.jpeg'},
			{idProducto: 2, nombre: 'Lemur', descripcion: 'El mono mas mono. Tienen el ego subido desde que salieron en Madagascar', precio: 10, moneda: 'euro', plazoEntrega: 'I like to move it move it', datos: {danos: 'Puede mirar con cara de odio', peso: 'Pueden estar toda la noche de fiesta', nombres: 'No conocen al Rey Julien'}, cantidad: 10, url: 'http::laimagensilatuviera.jpeg'},
			{idProducto: 3, nombre: 'Kiwi', descripcion: 'Importante!! No confundir con la fruta, este bicho se supone que es un pajaro o algo asi', precio: 5, moneda: 'euro', plazoEntrega: 'Depende de cuando quieran cazarse', datos: {danos: 'Puede cornear. Naah, es broma, es un pajaro', peso: 'Mas de 2kg al menos, o no', nombres: 'No les llame como los sobrinos del pato Donald, por favor'}, cantidad: 8, url: 'http::laimagensilatuviera.jpeg'}
		]
	}
];



paginas.forEach(function(pagina){
	app.get(pagina.ruta, function (request, response) {
		if ((!pagina.id)||(typeof request.query.id === 'undefined')){
			if ((!pagina.render)&&(!pagina.webService)) {
				app.use(express.static('public'));
				var camino = path.join(__dirname+pagina.dirFichero);
				response.sendFile(camino);
			}else if (!pagina.webService){
				var id = request.params.id;
				renderizar.some(function(objeto){
					if (objeto.arrayRenderizar == pagina.dirFichero){
						objeto.valores.some(function(valor){
							var idProducto = valor.idProducto;
							console.log(id);
							console.log('id producto '+idProducto);
							if (idProducto == id){
								var indice = idProducto - 1;
								var productoFinal = objeto.valores[indice];
								var paginaRen = objeto.paginaRenderizar;
								app.set('view engine', 'pug');
								response.render(paginaRen, productoFinal);
								return true;
							}else{
								return false;
							}
						});
						return true;
					}else{
						response.send('Fatal Error BSOD');
						return false;
					}
				});
			}else{
				var productos = JSON.stringify(renderizar[0].valores);
				response.send(productos);
			}
		}else{
			console.log(request.query);
			var id = request.query.id;
			response.redirect(pagina.ruta+'/'+id);
		}
		pagina.numVisit++;
		console.log('Ha habido '+pagina.numVisit+' llamadas a la pagina '+pagina.nombre);
	});
});

app.post('/formulario', parseUrlencoded, function(request, response){
	var recibidos = request.body;
	app.set('view engine', 'pug');
	var datos = {nombre: recibidos.nombre, apellido1: recibidos.primerApellido, apellido2: recibidos.segundoApellido, email:recibidos.email};
	response.render('formulario', datos);
	//console.log(datos.email);

});

app.listen(port, function (argument) {
	console.log('Escuchando en el puerto 8080');
});
