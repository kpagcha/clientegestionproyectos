var ws_host = "http://localhost:8080";
var ws_name = "GestionProyectos";
var ws_service = "api/estudiantes";
var ws_path = ws_host + "/" + ws_name + "/" + ws_service;

var get_all_estudiantes_path = "/";
var get_estudiante_path = "/buscar/";
var create_estudiante_path = "/crear";
var update_estudiante_path = "/actualizar/";
var delete_estudiante_path = "/eliminar/";

function getAllEstudiantes() {
	$("#result").empty();
	$.ajax({
		type: "GET",
		url: ws_path + get_all_estudiantes_path,
		dataType: "json",
		success: function(data) {
			html = "<table>";
			html += "<tr>";
			html += "<th>Nombre</th>";
			html += "<th>Primer apellido</th>";
			html += "<th>Segundo apellido</th>";
			html += "<th>Título del proyecto</th>";
			html += "<th>Tutor 1</th>";
			html += "<th>Tutor 2</th>";
			html += "<th>Estado del proyecto</th>";
			html += "<th>Fecha de presentación del proyecto</th>";
			html += "<th>Calificación del proyecto</th>";
			html += "</tr>";
			$.each(data, function(i, estudiante) {
				html += "<tr>";
				html += "<td>" + estudiante.nombre + "</td>";
				html += "<td>" + estudiante.primerApellido + "</td>";
				html += "<td>" + estudiante.segundoApellido + "</td>";
				html += "<td>" + estudiante.tituloProyecto + "</td>";
				html += "<td>" + estudiante.tutor1 + "</td>";
				html += "<td>" + estudiante.tutor2 + "</td>";
				html += "<td>" + estudiante.estadoProyecto + "</td>";
				html += "<td>" + estudiante.fechaPresentacionProyecto + "</td>";
				html += "<td>" + estudiante.calificacionProyecto + "</td>";
				html += "</tr>";
			});
			html += "</table>";
			$("#result").html(html);
		},
		error: function(err) {
			setErrorMessage(err);
		}
	});
}

function getEstudiante() {
	$("#result").empty();
	var key = $("#key").val();
	$.ajax({
		type: "GET",
		url: ws_path + get_estudiante_path + key,
		success: function(data) {
			$("#result").html(data);
		},
		error: function(err) {
			setErrorMessage(err);
		}
	});
}

function createEstudiante() {
	$("#result").empty();
	var key = $("#key").val();
	var json = JSON.stringify(buildJSON());
	$.ajax({
		type: "POST",
		url: ws_path + create_estudiante_path,
		data: json,
		contentType: "application/json",
		dataType: "json",
		success: function(data) {
			setEstudiante(data);
		},
		error: function(err) {
			setErrorMessage(err);
		}
	});
}

function updateEstudiante() {
	$("#result").empty();
	var json = JSON.stringify(buildJSON());
	var key = $("#key").val();
	$.ajax({
		type: "PUT",
		url: ws_path + update_estudiante_path + key,
		data: json,
		contentType: "application/json",
		dataType: "json",
		success: function(data) {
			setEstudiante(data);
		},
		error: function(err) {
			setErrorMessage(err);
		}
	});
}

function deleteEstudiante() {
	$("#result").empty();
	var key = $("#key").val();
	$.ajax({
		type: "DELETE",
		url: ws_path + delete_estudiante_path + key,
		success: function(data) {
			if (data == "true") {
				$("#result").html("Estudiante borrado.");
			} else {
				$("#result").html("No se pudo borrar al estudiante.");
			}
		},
		error: function(err) {
			setErrorMessage(err);
		}
	});
}

function setErrorMessage(err) {
	var error = "<div style='color:#e84d3a'>Error: " + err.statusText + "</div>";
	$("#result").append(error);
}

function setEstudiante(data) {
	var html = "Nombre: " + data.nombre + "<br>";
	html += "Primer apellido: " + data.primerApellido + "<br>";
	html += "Segundo apellido: " + data.segundoApellido + "<br>";
	html += "Título del proyecto: " + data.tituloProyecto + "<br>";
	html += "Tutor 1: " + data.tutor1 + "<br>";
	html += "Tutor 2: " + data.tutor2 + "<br>";
	html += "Estado del proyecto: " + data.estadoProyecto + "<br>";
	html += "Fecha de presentación del proyecto: " + data.fechaPresentacionProyecto + "<br>";
	html += "Calificación del proyecto: " + data.calificacionProyecto + "<br>";
	$("#result").html(html);
}

function buildJSON() {
	var n = $("#nombre").val();
	var ap1 = $("#primerApellido").val();
	var ap2 = $("#segundoApellido").val();
	var t = $("#tituloProyecto").val();
	var t1 = $("#tutor1").val();
	var t2 = $("#tutor2").val();
	var e = $("#estadoProyecto").val();
	var f = $("#fechaPresentacionProyecto").val();
	var c = $("#calificacionProyecto").val();

	return {
		"nombre": n,
		"primerApellido": ap1,
		"segundoApellido": ap2,
		"tituloProyecto": t,
		"tutor1": t1,
		"tutor2": t2,
		"estadoProyecto": e,
		"fechaPresentacionProyecto": f,
		"calificacionProyecto": c
	}
}