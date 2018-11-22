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
    $pageLoad = $_GET['pageLoad'];
    if($pageLoad == "1"){
        // echo "1";
        $sql = "SELECT * FROM shopstock";
        $result = mysqli_query($link, $sql);
        if ($result) {
            while ($row = mysqli_fetch_row($result)) {
                echo"<div class=\"mainPage\">";
                    echo"<a href=\"#\">";
                        echo"<img src=\"image/".$row[5]."\" style=\"width: 50%;\"/>";
                        echo"<p>".$row[1]."</p>";
                    echo"</a>";
                    echo"<i>Gia:</i>";
                    echo"<b id=\"gia".$row[0]."\">".$row[4]."</b><br/><br/>";
                    echo"<i>So Luong:</i>";
                    echo"<b id=\"soluong".$row[0]."\">".$row[2]."</b><br/><br/>";
                    echo"<i>Mo ta:<br/>".$row[3]."</i><br/><br/>";
                    echo"<button id=\"muaBtn".$row[0]."\" onclick=\"addCart(".$row[0].")\" style=\"margin-bottom: 10px;\">Thêm vào giỏ hàng</button>";
                echo"</div>";
            }
            mysqli_free_result($result);
        } else {
            echo 0;
            die('Query failed: ' . mysqli_error());
        }

        mysqli_close($link);
    } else {
        echo 'No signal';
        echo 'page'+$pageLoad;
    }
    
?>