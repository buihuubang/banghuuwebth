$(document).ready(function(){
    $('#warnLabel').hide(); //Ẩn label của nhập username
    $('#warnPwdLabel').hide(); //Ẩn label của nhập lại password
    $('#warnRegLabel').hide(); //Ẩn label của nút đăng ký
    var checkValUsr = 1; //Đây là biến kiểm tra user khi bấm vào đăng ký có hợp lệ hay không. 1 là hợp lệ, 0 ngược lại
    var checkValPsw = 1; //Đây là biến kiểm tra pass khi bấm vào đăng ký có hợp lệ hay không. 1 là hợp lệ, 0 ngược lại

    /*
    ĐÂY LÀ HÀM JQUERY XỬ LÝ SỰ KIỆN KHI CHUỘT RA KHỎI
    Ô TEXT USERNAME VÀ KIỂM TRA ĐÃ CÓ USER NAME NÀY HAY
    CHƯA Ở DATABASE 
    */
    $('#username').blur(function(){
        $.ajax({
            url: "xulyInput.php",
            type: "post",
            dataType: "text",
            data: {
                usrName: $('#username').val()
            }
        }).done(function(response){
            if(response == "1"){
                $('#warnLabel').show();
                checkValUsr = 0;
            } else {
                $('#warnLabel').hide();
                checkValUsr = 1;
            }
        }).fail(function(){
            $('#warnLabel').html('Lỗi đến server!');
        });
    });

    /*
    ĐÂY LÀ HÀM JQUERY XỬ LÝ SỰ KIỆN KHI Ô EMAIL 
    THAY ĐỔI
    */
   var checkMail = 1;
   $('#email').blur(function(){
       if($('#email').val() == ''){
           alert('Không được để trường này trống');
           checkMail = 0;
        } else {
            checkMail = 1;
        }
   });

    /*
    ĐÂY LÀ HÀM JQUERY XỬ LÝ SỰ KIỆN KHI Ô NHẬP LẠI
    PASSWORD THAY ĐỔI, SẼ BÁO PASSWORD NHẬP KHÔNG CHÍNH
    XÁC. HÀM NÀY KHÔNG LIÊN QUAN ĐẾN DATABASE
    */
   $('#repwd').change(function(){
       //LẤY GIÁ TRỊ CỦA 2 TRƯỜNG PASSWORD VÀ NHẬP LẠI PASSWORD
        var repwd = $('#repwd').val();
        var pwd = $('#pwd').val();
        //SAU ĐÓ ĐEM ĐI SO SÁNH
        if(repwd != pwd){
            $('#warnPwdLabel').show();
            checkValPsw = 0;
        } else {
            $('#warnPwdLabel').hide();
            checkValPsw = 1;
        }
   });

   /*
   ĐÂY LÀ HÀM XỬ LÝ SỰ KIỆN ĐĂNG KÝ CHO NÚT
   */
  $('#btnDK').click(function(){
    if(checkValPsw != 0 && checkValUsr != 0 && checkMail != 0){
        //XỬ LÝ GỬI FORM ĐĂNG KÝ Ở ĐÂY THÔNG QUA AJAX
        $.ajax({
            url: "xulyDangKy.php",
            type: "post",
            dataType: "text",
            data: {
                usrName: $('#username').val(),
                email: $('#email').val(),
                pwd: $('#pwd').val()
            }
        }).done(function(response){
            if(response == "1"){
                alert('Đăng ký thành công!');
            } else {
                alert('Đăng ký thất bại!');
            }
        }).fail(function(){
            $('#warnRegLabel').html('Lỗi đến server!');
        });
    }else{
        $('#warnRegLabel').show(); //NẾU PASSWORD VÀ USER CÒN NHẬP SAI THÌ LABEL NÀY SẼ HIỆN LÊN
    }

  });

});


