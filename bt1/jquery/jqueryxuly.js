$(document).ready(function(){
    loadIndexAjax();
    $('#searchBox').keydown(loadFindAjax); //onkeydown or onchange or onblur
});

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

//JQUERY ADD CART
var inCart=0; //Varriable hold cart
function addCart(data){
    //var totalStock = $('.mainPage').length; //count stock from class
    //alert(totalStock);
    //alert($('#soluong'+1).text());
    // var i = 1;
    // for(i = 1; i <= totalStock; i++){
    //     $('#muaBtn'+i).click(function(){
    //         if(this.id == ('muaBtn'+i)){
    //             var tam = parseInt($('#soluong'+i).text());
    //             alert(tam);
    //             if(tam > 0){
    //                 tam -= 1;
    //                 $('#soluong'+i).html(tam);
    //             }
    //         }
    //     });
    // }
    // <!-------------- ANOTHER FUNC ----------------->
    // $('#muaBtn'+data).click(function(){
    //     //alert($('#soluong'+data).text());
    //     var tam = parseInt($('#soluong'+data).text());
    //     if(tam > 0){
    //         $.ajax({
    //             url: "xulyThem.php",
    //             type: "post",
    //             dataType: "text",
    //             data: {
    //                 pageLoad: true,
    //                 id: data,
    //                 bien: tam
    //             }
    //         }).done(function(result){
    //             $('#mainpage').html(result);
    //         }).fail(function(){
    //             $('#mainpage').html('Can\'t connect to server');
    //         });;
    //     } else {
    //         alert('Hết hàng');
    //     }
    // });
    var tam = parseInt($('#soluong'+data).text());
    if(tam > 0){
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
            $('#mainpage').html(result);
        }).fail(function(){
            $('#mainpage').html('Can\'t connect to server');
        });;
        inCart+=1;
        $('#GioHang').html(inCart);
    } else {
        alert('Hết hàng');
    }
}