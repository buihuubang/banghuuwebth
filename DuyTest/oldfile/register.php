<html>
<head>
	<meta charset="UTF-8">
	<title>Đăng ký thành viên</title>
	<link href="assets/css/login.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="assets/js/jquery.min.js"></script>
	<script type="text/javascript" src="assets/js/jquery.validate.min.js"></script>
</head>
<body>
	<form method="post" id="form_register" class="form_login">
		<fieldset>
			<legend>Đăng ký thành viên</legend>
			<div class="clear"></div>
			<div class="item">
				<label>Tên tài khoản:</label>
				<input type="text" name="txtuser">
			</div>
			<div class="item">
				<label>Email:</label>
				<input type="email" name="txtemail">
			</div>
			<div class="item">
				<label>Điện thoại:</label>
				<input type="text" name="txtphone">
			</div>
			<div class="item">
				<label>Mật khẩu:</label>
				<input type="password" name="txtpass">
			</div>
			<div class="button">
				<button type="submit">Đăng ký</button>
				<button type="reset">Làm lại</button>
			</div>
			<div class="link">
				<a href="">Về trang chủ</a> /
				<a href="/login.php" class="last">Đăng nhập</a>
			</div>
		</fieldset>
	</form>
	<script type="text/javascript">
		$('#form_register').validate({
		    rules: {        
		        txtuser: {
		            required: true, 
		            remote: {
	                    url: '/ajax.php?thamso=ajax_check_user_register',
	                    type: "post",
	                    dataType: 'json',
	                    data: {
	                        txtuser: function () {
	                            return $('#form_register :input[name="txtuser"]').val();
	                        }
	                    }
	                }
		        },
		        txtemail:{ 
		            required: true, 
		            email: true
		        },
		        txtphone:{ 
		            required: true, 
		            number: true
		        },
		        txtpass:{ 
		            required: true, 
		        }
		    },

		    messages: {          
		        txtuser: {
		            required: "Tên đăng nhập không được bỏ trống!",
		            remote: "Tên đăng nhập không tồn tại",  
		        },
		        txtemail:{ 
		            required: "Email không được để trống", 
		            email: "Email không đúng"
		        },
		        txtphone:{ 
		            required: "Điện thoại không được để trống", 
		            number: "Số điện thoại không đúng"
		        },
		        txtpass: {
		            required: "Mật khẩu không được bỏ trống!", 
		        }
		    },

		    submitHandler: function (form) {
		        $.ajax({
		            type: 'post',
		            url: '/ajax.php?thamso=ajax_register',
		            data: $(form).serialize(),
		            success: function (res) {
		            	if(res === 'TRUE'){
		            		alert("Đăng ký thành công");
		            		
		            	}else{
		            		alert("Đăng ký không thành công");
		            	}		            
		            }
		        });
		    }
		});
	</script>
</body>
</html>