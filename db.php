<?php
$servername = "localhost";
$username = "root"; // ضع اسم المستخدم الخاص بك
$password = ""; // ضع كلمة المرور الخاصة بك
$dbname = "yalla_tv";

// إنشاء الاتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>