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
    $usrname = $_POST['usrName'];
    $psw = $_POST['psword'];
    if($pageLoad){
        $sqlLogin = "SELECT * FROM userStock WHERE userName = \"".$usrname."\" AND  psw = \"".$psw."\"";
        $resultLogin = mysqli_query($link, $sqlLogin);
        if ($resultLogin) {
            echo "1";
            mysqli_free_result($result);
        } else {
            echo "0";
            die('Query failed: ' . mysqli_error());
        }

        mysqli_close($link);
    } else {
        echo 'No signal';
    }
    
?>