<?php

$user = 'root';
$password = 'root';
$db = 'stock';
$host = 'localhost';
$port = 3306;
// Lấy thông tin username và email
$username = isset($_POST['username']) ? $_POST['username'] : false;
$email = isset($_POST['email']) ? $_POST['email'] : false;

// Nếu cả hai thông tin username và email đều không có thì dừng, thông báo lỗi
if (!$username && !$email){
    die ('{error:"bad_request"}');
}

$link = mysqli_init();
$conn = mysqli_connect(
   $link, 
   $host, 
   $user, 
   $password, 
   $db,
   $port
); or die ('{error:"bad_request"}');


// Khai báo biến lưu lỗi
$error = array(
    'error' => 'success',
    'username' => '',
    'email' => ''
);

// Kiểm tra tên đăng nhập
if ($username)
{
    $query = mysqli_query($conn, 'select count(*) as count from member where username = \''.  addslashes($username).'\'');

    if ($query){
        while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
            if ((int)$row['count'] > 0){
                $error['username'] = 'Tên đăng nhập đã tồn tại';
            } 
        };
    }
    else{
        die ('{error:"bad_request"}');
    }
}

// Kiểm tra tên email
if ($email)
{
    $query = mysqli_query($conn, 'select count(*) as count from member where email = \''.  addslashes($email).'\'');

    if ($query){
        $row = mysqli_fetch_array($query, MYSQLI_ASSOC);
        if ((int)$row['count'] > 0){
            $error['email'] = 'Email đã tồn tại';
        }
    }
    else{
        die ('{error:"bad_request"}');
    }
}


// Tiến hành lưu vào CSDL
$query = mysqli_query($conn, "insert into member(username, email) values ('".$username."','".$email."')");
    

// Trả kết quả về cho client
die (json_encode($error));


?>
