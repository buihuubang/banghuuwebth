//TẠO MỘT XHR OBJECT
function createXHR(){
    var xhr = false;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else if(window.ActiveXObject){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}

//Tạo XHR OBJECT
var xhrObject = createXHR();



//HÀM XỬ LÝ SỰ KIỆN CHO CẢ TRANG
function event(){

    //KHAI BÁO CÁC BIẾN XÁC ĐỊNH CÁC PHẦN TỬ TRONG TRANG
    var userName = document.getElementById('username');
    var usrLabel = document.getElementById('warnLabel');
    var email = document.getElementById('email');
    var pwd = document.getElementById('pwd');
    var repwd = document.getElementById('repwd');
    var pwdLabel = document.getElementById('warnPwdLabel');
    var btnDK = document.getElementById('btnDK');
    var btnLabel = document.getElementById('warnRegLabel');

    //ẨN NHỮNG THÔNG BÁO
    usrLabel.style.visibility = "hidden"; //element.style.visibility = "hidden" để ẩn một thuộc tính, ngược lại là "visible"
    pwdLabel.style.visibility = "hidden";
    btnLabel.style.visibility = "hidden";

    //User name khi không được focus sẽ gửi về server để kiểm tra username đã tồn tại hay chưa?
    var userCheck = 0; //Biến kiểm tra đã có tên hay chưa, 0 là chưa, 1 là có
    userName.onblur = function(){
        var requestStr = "xulyInput.php?usrName="+userName.value;
        xhrObject.open("GET",requestStr,true);
        xhrObject.onreadystatechange = function(){
            if(xhrObject.status == 200 && xhrObject.readyState == 4){
                var response = xhrObject.responseText;
                if(response == "1"){
                    usrLabel.style.visibility = "visible";
                    userCheck = 1;
                } else {
                    usrLabel.style.visibility = "hidden";
                    userCheck = 0;
                }
            } 
        }
        xhrObject.send(null);
    };

    //Email sẽ được kiểm tra ngay trên client xem có nhập email hay chưa, không liên quan đến sv
    var emailCheck = 0;
    email.onblur = function(){
        if(email.value == ''){
            alert('Bạn chưa nhập email');
            emailCheck = 1;
        } else {
            emailCheck = 0;
        }
    };

    //Nhập lại Password sẽ được kiểm tra ngay trên client xem có nhập đúng password trước hay không
    var passCheck = 0;
    repwd.onblur = function(){
        if(repwd.value != pwd.value){
            pwdLabel.style.visibility = "visible";
            passCheck = 1;
        } else {
            pwdLabel.style.visibility = "hidden";
            passCheck = 0;
        }
    };

    //Xử lý sự kiện cho nút
    btnDK.onclick = function(){
        if(userName.value != '' && pwd != ''){
            if(userCheck != 1 && emailCheck != 1 && passCheck != 1){
                btnLabel.style.visibility = "hidden";
                var requestStr = "xulyDangKy.php?usrName="+userName.value+"&email="+email.value+"&pwd="+pwd.value;
                xhrObject.open("GET",requestStr,true);
                xhrObject.onreadystatechange = function(){
                    if(xhrObject.status == 200 && xhrObject.readyState == 4){
                        var response = xhrObject.responseText;
                        if(response == "1"){
                            alert('Đăng ký thành công!');
                        } else {
                            alert('Đăng ký không thành công!');
                        }
                    } 
                }
                xhrObject.send(null);
            } else {
                btnLabel.style.visibility = "visible";
            }
        } else {
            alert('Bạn chưa nhập đủ thông tin cần thiết!');
        }
    };
      
}

window.onload = event;