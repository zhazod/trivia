<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$database = "bd_trivia";

// Crear conexión
$conn = mysqli_connect($servername, $username, $password, $database);

// Verificar la conexión
if (!$conn) {
    die("Error de conexión: " . mysqli_connect_error());
}
?>
