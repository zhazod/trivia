<?php
include 'conexion.php';

$sql = "SELECT * FROM scores ORDER BY score DESC";
$result = mysqli_query($conn, $sql);

$leaderboard = array();

while ($row = mysqli_fetch_assoc($result)) {
  $leaderboard[] = $row;
}

header('Content-Type: application/json');
echo json_encode($leaderboard);

mysqli_close($conn);

?>