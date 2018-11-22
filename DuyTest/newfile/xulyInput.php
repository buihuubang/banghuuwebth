<?php
    /* QUERY DE TAO DATABASE TRONG MYSQL:
        CREATE TABLE usrvalid(
            id int not null primary key AUTO_INCREMENT,
            userName varchar(50) not null,
            email varchar(50) not null,
            pwd varchar(50) not null
        );
        INSERT INTO usrvalid(`userName`,`email`,`pwd`) VALUES ('hello','duynt@gmail.com','hello');
    */
    //Connect to mamp server
    $user = 'root';
    $password = 'root';
    $db = 'stock'; //CHO NAY TU DIEN CAI DATABASE ONG TAO
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

    //Process check
    $usrName = $_POST['usrName'];
    $sql = "SELECT * FROM usrvalid WHERE userName = \"".$usrName."\"";
    $result = mysqli_query($link, $sql);
    $count = 0;
    if($result){
        //CHỖ NÀY T KIỂM TRA GIÁ TRỊ TRẢ VỀ CÓ DỮ LIỆU KHÔNG, NẾU CÓ THÌ BIẾN COUNT+=1
        while ($row = mysqli_fetch_row($result)) {
            if($row[0] != null){
                $count += 1;
            }
        }
        //BIẾN COUNT NẾU KHÁC 0 THÌ TỪ SV SẼ TRẢ VỀ 1 (TỨC TÊN ĐÃ BỊ TRÙNG)
        if($count != 0){
            echo "1";
        } else {
            echo "0";
        }
    } else {
        die('Query failed: ' . mysqli_error());
    }

?>