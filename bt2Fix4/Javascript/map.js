//FUNCTION EVENT
function event(){
    openMAP();
    // sendRequestMap();
}

//Biến chứa thông tin marker từ sv
var res;

function createXHR(){
    var xhr = false;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else if(window.ActiveXObject){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}

//TẠO XHR OBJECT
var xhrObject = createXHR();


//TẠO HÀM VẼ MAP
function openMAP(){
    
    //Khai báo biến chứa map 
    var myMap;

    //LẤY MỘT ĐIỂM MẶC ĐỊNH GIỮA MAP 
    var defaultLocation = {
        title: 'You',
        content: 'You are here',
        lat: 12.238791, //KHAI BÁO THÔNG SỐ VĨ ĐỘ
        lng: 109.196749 //KHAI BÁO THÔNG SỐ KINH ĐỘ
    };
    //Khai báo biến giữ vị trí ng dùng
    var pos;
    //Khai báo mảng giữ các vị trí marker
    var allLocation = [];

    
    //var myLocation = new google.maps.LatLng(12.238791,109.196749); ĐÂY LÀ KIỂU KHAI BÁO KHÁC
    
    //NƠI HIỂN THỊ MAP
    var mapLocate = document.getElementById("mapHere");
    
    //CÁC THÔNG SỐ CƠ BẢN CỦA MAP
    var mapOptions = {
        center: new google.maps.LatLng(defaultLocation.lat,defaultLocation.lng), //ĐIỂM CHÍNH GIỮA CỦA MAP
        zoom: 14, //ZOOM VÀO 15 ĐƠN VỊ
        mapTypeControl: true, //CHO PHÉP THAY ĐỔI LOẠI BẢN ĐỒ HIỆN ĐÃ BỊ DISABLE CHO NGƯỜI DÙNG CHƯA TRẢ TIỀN
        streetViewControl: true, //CHO PHÉP XEM HÌNH ẢNH THỰC TẾ TẠI ĐƯỜNG HIỆN ĐÃ BỊ DISABLE CHO NGƯỜI DUGF CHƯA TRẢ TIỀN
        mapTypeId: google.maps.MapTypeId.ROADMAP, //KIỂU BẢN ĐỒ(ĐÂY LÀ LOẠI 2D)
    };
    
    //KHỞI TẠO MAP
    myMap = new google.maps.Map(mapLocate,mapOptions);


    //LẤY VỊ TRÍ NGƯỜI DÙNG
    //Gọi Navigator của html5, nếu không gọi được có nghĩa trình duyện không hỗ trợ
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            //Kinh độ và vĩ độ của người dùng lấy được, biến position mặc định
            pos = {
                lat: position.coords.latitude, //Lấy kinh độ vị trí hiện tại
                lng: position.coords.longitude //Lấy vĩ độ vị trí hiện tại
            };
            defaultLocation.lat = pos.lat; //Thay đổi giá trị của defaultLocation
            defaultLocation.lng = pos.lng;
            myMap.setCenter(defaultLocation); //Đưa map về chính giữa vị trí của m
            newMarker.setPosition(defaultLocation); //Đưa marker về vị trí của m
        },function(){
            myMap.setCenter(defaultLocation); //Khi người dùng không cho hiện vị trí của mình, map tự động về vị trí mặc định
            newMarker.setPosition(defaultLocation); //Khi người dùng không cho hiện vị trí của mình, marker tự động về vị trí mặc định
            handleLocationError(true, infoWindow, map.getCenter()); //Hàm handle này được viết ở ngoài hàm openMap, được lấy từ google map doc
        });
    } else {
        //Tức khi Geolocation không hỗ trợ
        handleLocationError(false, infoWindow, map.getCenter());
    }

    //Đưa vị trí đã lấy được vào mảng đã tạo 
    allLocation.push(defaultLocation);

    //THÊM CÁC TỌA ĐỘ CHO MARKER
    var pageload=true;
    var requestStr = "Server/getMarker.php?pageLoad="+pageload;
    xhrObject.open("GET",requestStr,true);
    xhrObject.onreadystatechange = function(){
        if(xhrObject.status == 200 && xhrObject.readyState == 4){
            var response = xhrObject.responseText;
            // document.getElementById("mainpage").innerHTML = response;
            //Cắt chuỗi trả về
            res = response.split(";");
            var i;
            for(i = 0;i < (res.length - 1);i++){
                var getIt = res[i].split("-");
                var oldLocation = {
                    title: getIt[0],
                    content: getIt[1],
                    lat: getIt[2],
                    lng: getIt[3]
                }
                allLocation.push(oldLocation);
            }
        } 
    }
    xhrObject.send(null);
    
    // TẠO MARKER
    // var newMarker = new google.maps.Marker({
    //     map: myMap, //ĐƯA MARKER LÊN MAP
    //     position: allLocation, //VỊ TRÍ MARKER
    //     draggable: false, //KHÔNG CHO DI CHUYỂN MARKER
    //     animation: google.maps.Animation.BOUNCE //ANIMATION CHO MARKER(NHẢY TƯNG TƯNG :V)
    // });
    var newMarker,i;
    for(i=0; i<allLocation.length;i++){
        newMarker = new google.maps.Marker({
            map: myMap,
            position: new google.maps.LatLng(allLocation[i].lat,allLocation[i].lng)
        });
        alert(allLocation[i].lng);
    }

    //TẠO ĐƯỜNG CHỈ DẪN
    //THÊM SERVICE TÌM ĐƯỜNG ĐI
    var routeService = new google.maps.DirectionsService;
    var showRouteService = new google.maps.DirectionsRenderer;
    //ĐƯA SERVICE VÀO MAP
    showRouteService.setMap(myMap);
    
    //Biến gọi hàm tìm đường
    var getRoute = function(){
        //Gọi hàm displayRoute ở ngoài hàm openMap()
        displayRoute(routeService,showRouteService,defaultLocation,newMarker);
        // if(pos === 0){
        //     //Khi người dùng không cho trang web nhận vị trí, nó sẽ lấy vị trí mặc định để chỉ đường
        //     displayRoute(routeService,showRouteService,defaultLocation,newMarker); 
        // } else {
        //     //Ngược lại
        //     displayRoute(routeService,showRouteService,pos,newMarker);
        // }
    };
    //Biến xóa sự kiện tìm đường
    var removeRoute = function(){
        showRouteService.setMap(null); //Xóa đường chỉ dẫn
        myMap = new google.maps.Map(mapLocate,mapOptions);
        newMarker.setMap(myMap);
    }
    //TẠO SỰ KIỆN CHO NÚT TÌM ĐƯỜNG
    document.getElementById('FindRoute').onclick = getRoute;
    //TẠO SỰ KIỆN CHO NÚT XÓA SỰ KIỆN TÌM ĐƯỜNG
    document.getElementById('RemoveRoute').onclick = removeRoute;

    //TẠO EVENT LẤY KINH ĐỘ VÀ VĨ ĐỘ KHI CLICK MAP
    google.maps.event.addListener(myMap, 'click', function(e){
        var frmLatLng = e.latLng; //Tạo biết lưu lấy giá trị tọa độ khi click vào
        // document.getElementById('frmLat').value = Object.keys(frmLatLng)[0];
        document.getElementById('frmLat').value = frmLatLng.lat;
    });

}

//HÀM LẤY TẤT CẢ CÁC MARKER TỪ SERVER
function sendRequestMap(myMap){
    var pageload=true;
    var requestStr = "Server/getMarker.php?pageLoad="+pageload;
    xhrObject.open("GET",requestStr,true);
    xhrObject.onreadystatechange = function(){
        if(xhrObject.status == 200 && xhrObject.readyState == 4){
            var response = xhrObject.responseText;
            // document.getElementById("mainpage").innerHTML = response;
            //Cắt chuỗi trả về
            res = response.split(";");
            var i;
            for(i = 0;i < (res.length - 1);i++){
                var getIt = res[i].split("-");
                var oldLocation = {
                    lat: getIt[2],
                    lng: getIt[3]
                }
                // TẠO MARKER
                var Marker = new google.maps.Marker({
                    map: myMap, //ĐƯA MARKER LÊN MAP
                    position: oldLocation, //VỊ TRÍ MARKER
                    draggable: false, //KHÔNG CHO DI CHUYỂN MARKER
                    animation: google.maps.Animation.BOUNCE //ANIMATION CHO MARKER(NHẢY TƯNG TƯNG :V)
                });
            }
        } 
    }
    xhrObject.send(null);
}

//HÀM GIỮ LỖI KHI LẤY VỊ TRÍ HIỆN TẠI
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Lỗi: dịch vụ vị trí hiện không bật!' :
                          'Lỗi: Trình duyệt của bạn không hỗ trợ vị trí');
    infoWindow.open(myMap);
  }

//HÀM TÌM VÀ HIỂN THỊ ĐƯỜNG ĐI
function displayRoute(routeService,showRouteService,myLocation,newMarker){
    routeService.route(
        {
            origin: myLocation,
            destination: document.getElementById('findPlace').value,
            travelMode: 'DRIVING'
        },
        function(response, status){
            if(status == 'OK'){
                showRouteService.setDirections(response);
                newMarker.setMap(null);
            } else {
                window.alert('Error:'+ status);
            }
        }
    );
}

window.onload = event;
