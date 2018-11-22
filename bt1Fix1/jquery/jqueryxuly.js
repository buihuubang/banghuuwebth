$(document).ready(function(){
    $('#LoginDiv').hide();
    $('#RegisterDiv').hide();
    $('#WrappMain').show(); //Hide this when user not login
    loadIndexAjax();
    $('#searchBox').keydown(loadFindAjax); //onkeydown or onchange or onblur
    //Register button click
    // $('#regbtn').click(function(){
    //     $('#LoginDiv').hide();
    //     $('#RegisterDiv').show();
    // });
    //Back button click
    // $('#backbtn').click(function(){
    //     $('#LoginDiv').show();
    //     $('#RegisterDiv').hide();
    // });
});


//AJAX LOGIN
function LoginAjax(){
    $.ajax({
        url: "xulyLogin.php",
        type: "post",
        dataType: "text",
        data: {
            usrName: $('#username').val(),
            psword: $('#pwd').val()
        }
    }).done(function(response){
        alert(response);
        if(response == "1"){
            $('#WrappLogin').hide();
            $('#WrappMain').show();
            alert("Login successful!");
        } else {
            alert("Wrong username or password!");
        }
    }).fail(function(){
        $('#result').html('Can\'t connect to server');
    });
}

//AJAX REGISTER
function RegisterAjax(){

}

//AJAX SEARCH STOCK
function loadFindAjax(){
    $.ajax({
        url: "xulyTim.php",
        type: "post",
        dataType: "text",
        data: {
            infor: $('#searchBox').val()
        }
    }).done(function(result){
        $('#result').html(result);
    }).fail(function(){
        $('#result').html('Can\'t connect to server');
    });
}

//AJAX INDEX
function loadIndexAjax(){
    $.ajax({
        url: "xulyIndex.php",
        type: "post",
        dataType: "text",
        data: {
            pageLoad: true
        }
    }).done(function(result){
        $('#mainpage').html(result);
    }).fail(function(){
        $('#mainpage').html('Can\'t connect to server');
    });;
}

//AJAX ADD CART
var inCart=0; //Varriable hold cart
function addCart(data){
    var tam = parseInt($('#soluong'+data).text());
        $.ajax({
            url: "xulyThem.php",
            type: "post",
            dataType: "text",
            data: {
                pageLoad: true,
                id: data,
                bien: tam
            }
        }).done(function(result){
            // $('#mainpage').html(result);
            if(result == "1"){
                tam -= 1;
                $('#soluong'+data).html(tam);
                inCart+=1;
                $('#GioHang').html(inCart);
            }else {
                alert("Hết hàng");
            }
        }).fail(function(){
            $('#mainpage').html('Server error!');
        });;
}