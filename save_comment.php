<?php
include('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['comment'])) {
    $comment = $_POST['comment'];

    // التحضير والاستعلام لإدخال التعليق في قاعدة البيانات
    $stmt = $conn->prepare("INSERT INTO comments (comment_text) VALUES (?)");
    $stmt->bind_param("s", $comment);
    $stmt->execute();

    // إعادة الرد بنجاح
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>