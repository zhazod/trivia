<?php
include 'conexion.php';

$sql = "SELECT * FROM questions ORDER BY RAND() LIMIT 15";
$result = mysqli_query($conn, $sql);

$questions = array();

while ($row = mysqli_fetch_assoc($result)) {
  $questions[] = $row;
}

header('Content-Type: application/json');
echo json_encode($questions);

mysqli_close($conn);
?>