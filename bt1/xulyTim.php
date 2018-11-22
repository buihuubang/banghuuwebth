<?php

    //Connect to mamp server
    $user = 'root';
    $password = 'root';
    $db = 'stock';
    $host = 'localhost';
    $port = 3306;
    
    $link = mysqli_init();
    $con = mysqli_real_connect(
       $link, 
       $host, 
       $user, 
       $password, 
       $db,
       $port
    );

    //Check connection
    if(!$con){
        die("Connect Error: " . mysqli_connect_error());
    }

    //Process search
    $infor = $_POST['infor'];
    if($infor != null){
        //echo "1";
        $sql = "SELECT name FROM shopstock WHERE name LIKE '%$infor%'";
        $result = mysqli_query($link, $sql);
        if ($result) {
            while ($row = mysqli_fetch_row($result)) {
                echo "<a href=\"#\" id=\"serchEn\" style=\"margin-left:10px;\">".$row[0]."</a>"."<br/>";
            }
            mysqli_free_result($result); // Giai phong du lieu
        } else {
            die('Query failed: ' . mysqli_error());
        }
        
        mysqli_close($link);
    }
    
?>