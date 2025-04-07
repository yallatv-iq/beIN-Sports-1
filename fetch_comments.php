<?php
include('db.php');

// استرجاع جميع التعليقات من قاعدة البيانات
$sql = "SELECT * FROM comments ORDER BY created_at DESC";
$result = $conn->query($sql);

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

// إرسال التعليقات بتنسيق JSON
echo json_encode($comments);
?>