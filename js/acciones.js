// JavaScript Document
$(document).ready(function(e) {
	document.addEventListener("deviceready", function(){
		var db= openDatabase ("Test", "1.0", "Base de Prueba", 65535);
		$("#Crear").bind("click", function (event)
		{
			db.transaction (function (ejecutar)
			{
				var sql= "CREATE TABLE Clientes (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL)";
				ejecutar.executeSql (sql, undefined, function ()
				{
					alert("Tabla Creada");
				}, error);
			});
		});
		$("#Eliminar").bind("click", function (event)
		{
			if (!confirm ("Borrar Tabla???", "")) return;
			db.transaction (function (transaction)
			{
				var sql = "DROP TABLE Clientes";
				transaction.executeSql (sql, undefined, function ()
				{
					alert("Tabla Borrada");
				}, error);
			});
		});
		function error (transaction, err){
			alert("Error de Base de Datos : " + err.message);
			return false;
		}
		$("#Insertar").bind("click", function (event)
		{
			var v_nombre = $("#Nombre").val();
			var v_apellido = $("#Apellido").val();
			db.transaction (function (ejecutar)
			{
				var sql = "INSERT INTO Clientes (nombre, apellido) VALUES (?, ?)";
				ejecutar.executeSql (sql, [v_nombre, v_apellido], function ()
				{
					alert("Cliente Agregado");
				}, error);
			});
		});
		$("#Listar").bind("click", function (event)
		{
			db.transaction (function (ejecutar)
			{
				var sql = "SELECT * FROM Clientes";
				ejecutar.executeSql (sql, undefined, function (ejecutar, resultado)
				{
					var a_html = "<ul>";
					if (resultado.rows.length)
					{
						for (var i = 0; i < resultado.rows.length; i++)
						{
							var fila = resultado.rows.item(i);
							var v_nombre = fila.nombre;
							var v_apellido = fila.apellido;
							a_html += "<li>" + v_nombre + "&nbsp;" + v_apellido + "</li>";
						}
					}
					else
					{
						a_html += "<li> No hay clientes </li>";
					}
					a_html += "</ul>";
					$("#listado").unbind().bind("pagebeforeshow", function ()
					{
						var $contenido = $("#listado div:jqmData(role=content)");
						$contenido.html (a_html);
						var $ul = $contenido.find ("ul");
						$ul.listview();
					});
					$.mobile.changePage ($("#listado"));
				}, error);
			});
		});
	}, false);
});