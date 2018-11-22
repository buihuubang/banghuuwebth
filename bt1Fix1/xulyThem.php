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
    $pageLoad = $_POST['pageLoad'];
    $bien = $_POST['bien'];
    $id = $_POST['id'];
    if($pageLoad){
        if($bien > 0){
            $bien -= 1;
            $sqlCart = "UPDATE shopstock SET amount = ".$bien." WHERE id = ".$id."";
            
            $resultCart = mysqli_query($link, $sqlCart);
            if ($resultCart) {
                echo "1";
                mysqli_free_result($result);
            } else {
                echo "0";
                die('Query failed: ' . mysqli_error());
            }
    
            mysqli_close($link);
        } else {
            echo "0";
        }
    } else {
        echo 'No signal';
    }
    
?>