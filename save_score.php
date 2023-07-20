<?php
include 'conexion.php';

$username = $_POST['username'];
$score = $_POST['score'];

$sql = "INSERT INTO scores (username, score) VALUES ('$username', '$score')";

if (mysqli_query($conn, $sql)) {
  $response = 'Puntaje guardado exitosamente.';
} else {
  $response = 'Error al guardar el puntaje: ' . mysqli_error($conn);
}

mysqli_close($conn);

echo $response;
?>
