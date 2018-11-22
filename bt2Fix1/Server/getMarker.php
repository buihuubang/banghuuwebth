<?php

    //Connect to mamp server
    $user = 'root';
    $password = 'root';
    $db = 'mapGoogle'; 
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
    $pageLoad = $_GET['pageLoad'];
    if($pageLoad){
        $sql = "SELECT * FROM mapGoo";
        $result = mysqli_query($link, $sql);
        $AllResult = array();
        $i = 0;
        if ($result) {
            while ($row = mysqli_fetch_row($result)) {
                // $Mang = array();
                // array_push($row[0],$row[1]);
                // array_push($row[0],$row[2]);
                // array_push($row[0],$row[3]);
                // array_push($row[0],$row[4]);
                // array_push($AllResult,$Mang);
                // $i++;

                //echo $row[0].'-';
                echo $row[1].'-';
                echo $row[2].'-';
                echo $row[3].'-';
                echo $row[4].';';
            }
            mysqli_free_result($result);
        } else {
            die('Query failed: ' . mysqli_error());
        }

        mysqli_close($link);
    } else {
        echo 'No signal';
    }
    
?>