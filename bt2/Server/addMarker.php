<?php

    //Connect to mamp server
    $user = 'root';
    $password = 'root';
    $db = 'mapGoogle'; //THAY DATABASE CỦA M VÀO
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
    $load = $_GET['load'];
    $Ten = $_GET['Ten'];
    $NoiDung = $_GET['NoiDung'];;
    $ViDo = $_GET['ViDo'];
    $KinhDo = $_GET['KinhDo'];
    if($load){
        $sql = "INSERT INTO mapGoo(Ten,NoiDung,ViDo,KinhDo) VALUES (\"".$Ten."\",\"".$NoiDung."\",".$ViDo.",".$KinhDo.")";
        $result = mysqli_query($link, $sql);
        $AllResult = array();
        $i = 0;
        if ($result) {
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