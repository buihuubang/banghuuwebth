<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script language="javascript" src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
    </head>
    <body>
        <form method="post" action="">
            <table border="0" cellpadding="10" cellspacing="0">
                <tr>
                    <td>Username</td>
                    <td><input type="text" id="username" name="username" value=""/></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input type="text" id="email" name="email" value=""/></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <!--<input type="submit"  name="submit" value="Register"/>-->
                        <button id = "registerbtn" onclick="RegisterAjax()" >Login</button>
                        <input type="reset" name="submit" value="Clear"/>
                    </td>
                </tr>
            </table>
            <div id="showerror"></div>
        </form>
        <script language="javascript">
            $(document).ready(function(){
                

            });

            function RegisterAjax(){$('#showerror').html('');
            
            var username = $('#username').val();
            var email = $('#email').val();
            
            // Kiểm tra dữ liệu có null hay không
            if ($.trim(username) == ''){
                alert('Bạn chưa nhập tên đăng nhập');
                return false;
            }
            
            if ($.trim(email) == ''){
                alert('Bạn chưa nhập email');
                return false;
            }
            
            $.ajax({
                url : 'do_validate.php',
                type : 'post',
                dataType : 'json',
                data : {
                    username : username,
                    email : email
                },
                success : function (result)
                {
                    // Kiểm tra xem thông tin gửi lên có bị lỗi hay không
                    // Đây là kết quả trả về từ file do_validate.php
                    if (!result.hasOwnProperty('error') || result['error'] != 'success')
                    {
                        alert('lỗi');
                        return false;
                    }
                    
                    var html = '';
                    
                    // Lấy thông tin lỗi username
                    if ($.trim(result.username) != ''){
                        html += result.username + '<br/>';
                    }
                    
                    // Lấy thông tin lỗi email
                    if ($.trim(result.email) != ''){
                        html += result.email;
                    }
                   
                    // Cuối cùng kiểm tra xem có lỗi không
                    // Nếu có thì xuất hiện lỗi
                    if (html != ''){
                        $('#showerror').append(html);
                    }
                    else {
                        // Thành công
                        $('#showerror').append('Thêm thành công');
                    }
                }
            });
            
            return false;

            }

            $('form').submit(function ()
            {
                // Xóa trắng thẻ div show lỗi
                $('#showerror').html('');
            
                var username = $('#username').val();
                var email = $('#email').val();
                
                // Kiểm tra dữ liệu có null hay không
                if ($.trim(username) == ''){
                    alert('Bạn chưa nhập tên đăng nhập');
                    return false;
                }
                
                if ($.trim(email) == ''){
                    alert('Bạn chưa nhập email');
                    return false;
                }
                
                $.ajax({
                    url : 'do_validate.php',
                    type : 'post',
                    dataType : 'json',
                    data : {
                        username : username,
                        email : email
                    },
                    success : function (result)
                    {
                        // Kiểm tra xem thông tin gửi lên có bị lỗi hay không
                        // Đây là kết quả trả về từ file do_validate.php
                        if (!result.hasOwnProperty('error') || result['error'] != 'success')
                        {
                            alert('lỗi');
                            return false;
                        }
                        
                        var html = '';
                        
                        // Lấy thông tin lỗi username
                        if ($.trim(result.username) != ''){
                            html += result.username + '<br/>';
                        }
                        
                        // Lấy thông tin lỗi email
                        if ($.trim(result.email) != ''){
                            html += result.email;
                        }
                       
                        // Cuối cùng kiểm tra xem có lỗi không
                        // Nếu có thì xuất hiện lỗi
                        if (html != ''){
                            $('#showerror').append(html);
                        }
                        else {
                            // Thành công
                            $('#showerror').append('Thêm thành công');
                        }
                    }
                });
                
                return false;
            });
            
        </script>
    </body>
</html>
