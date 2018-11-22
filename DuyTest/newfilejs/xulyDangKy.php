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
    $usrName = $_GET['usrName'];
    $email = $_GET['email'];
    $pwd = $_GET['pwd'];
    //INSERT INTO usrvalid(userName,email,pwd) VALUES ('123','123@gmail.com','123'); 
    $sql = "INSERT INTO usrvalid(userName,email,pwd) VALUES (\"".$usrName."\",\"".$email."\",\"".$pwd."\"); ";
    $result = mysqli_query($link, $sql);
    if($result){
        //NẾU CÂU LỆNH ĐƯỢC THỰC THI, T TRẢ VỀ 1
        echo "1";
    } else {
        echo "0";
    }

?>