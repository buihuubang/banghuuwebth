<?php
$user = 'root';
$password = 'root';
$db = 'test';
$host = 'localhost';
$port = 3306;

$link = mysqli_init();
$success = mysqli_real_connect(
   $link, 
   $host, 
   $user, 
   $password, 
   $db,
   $port
);or die(" khong the ket noi");
mysql_select_db("test",$conn);
mysql_query("SET NAMES utf8");
$thamso = $_GET['thamso'];
switch ($thamso) {
	case 'ajax_check_user':
		$txtuser = $_POST['txtuser'];
		$query = "SELECT * FROM tbl_user WHERE user_name='".$txtuser."'";
		$result = mysql_query($query);
		if(mysql_num_rows($result) > 0){
			echo json_encode(TRUE);
		}else{
			echo json_encode(FALSE);
		}
		break;
	case 'ajax_check_pass':
		$txtuser = $_POST['txtuser'];
		$txtpass = $_POST['txtpass'];
		$query = "SELECT * FROM tbl_user WHERE user_name='".$txtuser."' AND user_password=MD5('".$txtpass."')";
		$result = mysql_query($query);
		if(mysql_num_rows($result) > 0){
			echo json_encode(TRUE);
		}else{
			echo json_encode(FALSE);
		}
		break;
	case 'ajax_check_user_register':
		$txtuser = $_POST['txtuser'];
		$query = "SELECT * FROM tbl_user WHERE user_name='".$txtuser."'";
		$result = mysql_query($query);
		if(mysql_num_rows($result) > 0){
			echo json_encode(FALSE);
		}else{
			echo json_encode(TRUE);
		}
		break;
	case 'ajax_register':
		$query = "INSERT INTO `tbl_user` (`user_id`, `user_name`, `user_password`, `user_email`, `user_phone`) VALUES (NULL, '".$_POST['txtuser']."', MD5('".$_POST['txtpass']."'), '".$_POST['txtemail']."', '".$_POST['txtphone']."');";
		mysql_query($query);
		if(mysql_insert_id() > 0){
			echo "TRUE";
		}else{
			echo "FALSE";
		}
		break;
	default:
		# code...
		break;
}
?>