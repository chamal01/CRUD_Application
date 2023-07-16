<?php
// Replace the following with your MySQL database credentials
$servername = 'localhost';
$username = 'your_mysql_username';
$password = 'your_mysql_password';
$dbname = 'crud_app_db';

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Check the action sent from JavaScript and perform CRUD operations accordingly
if (isset($_REQUEST['action'])) {
    if ($_REQUEST['action'] === 'fetch') {
        $result = $conn->query('SELECT * FROM users');
        $users = array();
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users);
    } elseif ($_REQUEST['action'] === 'get') {
        $userId = $_REQUEST['id'];
        $result = $conn->query("SELECT * FROM users WHERE id = $userId");
        $user = $result->fetch_assoc();
        echo json_encode($user);
    } elseif ($_REQUEST['action'] === 'delete') {
        $userId = $_REQUEST['id'];
        $conn->query("DELETE FROM users WHERE id = $userId");
    } elseif ($_REQUEST['action'] === 'save') {
        $userId = $_POST['id'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $age = $_POST['age'];

        if ($userId) {
            $conn->query("UPDATE users SET name = '$name', email = '$email', age = $age WHERE id = $userId");
        } else {
            $conn->query("INSERT INTO users (name, email, age) VALUES ('$name', '$email', $age)");
        }
    }
}

$conn->close();
?>