function createXHR(){
    var xhr = false;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else if(window.ActiveXObject){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}

var xhrObject = createXHR();

//FUNCTION EVENT
function event(){
    var pageload= "1";
    var requestStr = "xulyIndex.php?pageLoad="+pageload;
    xhrObject.open("GET",requestStr,true);
    xhrObject.onreadystatechange = function(){
        if(xhrObject.status == 200 && xhrObject.readyState == 4){
            var response = xhrObject.responseText;
            document.getElementById("mainpage").innerHTML = response;
        } 
    }
    xhrObject.send(null);
}


//FUNCTION ADD CART
inCart = 0;
function addCart(data){
    var soluong = document.getElementById("soluong"+data).textContent; //Get value
    var id = data;
    var payload= true;
    var requestStr = "xulyThem.php?id="+id+"&bien="+soluong+"&pageLoad="+payload;
    xhrObject.open("GET",requestStr,true);
    xhrObject.onreadystatechange = function(){
        if(xhrObject.status == 200 && xhrObject.readyState == 4){
            var response = xhrObject.responseText;
            if(response == "1"){
                soluong -= 1;
                document.getElementById("soluong"+data).innerHTML = soluong;
                inCart+=1;
                document.getElementById("GioHang").innerHTML = inCart;
            } else {
                alert("Hết hàng");
            }
        }
    }
    
    xhrObject.send(null);
}

window.onload = event;
