//FUNCTION EVENT
function event(){
    openMAP();
}

//Biến chứa thông tin marker từ sv
var res;

/*==============================================================================================*/

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

/*==============================================================================================*/

//TẠO HÀM VẼ MAP
function openMAP(){
    
    //Khai báo biến chứa map 
    var myMap;

    //LẤY MỘT ĐIỂM MẶC ĐỊNH GIỮA MAP 
    var defaultLocation = {
        title: 'BẠN',
        content: 'BẠN ĐANG Ở ĐÂY',
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


    //Thêm marker và infoWindow
    var newMarker,a, infoWindow;

    //TẠO ĐƯỜNG CHỈ DẪN
    //THÊM SERVICE TÌM ĐƯỜNG ĐI
    var routeService = new google.maps.DirectionsService;
    var showRouteService = new google.maps.DirectionsRenderer;

    //THÊM CÁC TỌA ĐỘ CHO MARKER
    var pageload=true;
    var requestStr = "Server/getMarker.php?pageLoad="+pageload;
    xhrObject.open("GET",requestStr,true);
    xhrObject.onreadystatechange = function(){
        if(xhrObject.status == 200 && xhrObject.readyState == 4){
            var response = xhrObject.responseText;

            //LẤY VỊ TRÍ NGƯỜI DÙNG
            //Gọi Navigator của html5, nếu không gọi được có nghĩa trình duyện không hỗ trợ
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(position){
                    //Kinh độ và vĩ độ của người dùng lấy được, biến position mặc định
                    pos = {
                        title: 'BẠN',
                        content: 'BẠN ĐANG Ở ĐÂY',
                        lat: position.coords.latitude, //Lấy kinh độ vị trí hiện tại
                        lng: position.coords.longitude //Lấy vĩ độ vị trí hiện tại
                    };
                    // defaultLocation.lat = pos.lat; //Thay đổi giá trị của defaultLocation
                    // defaultLocation.lng = pos.lng;
                    // myMap.setCenter(pos); //Đưa map về chính giữa vị trí của m
                    // newMarker.setPosition(pos); //Đưa marker về vị trí của m

                    allLocation.push(pos);
                
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

                    //Khai báo marker và infoWindow

                    // for(a=0; a < allLocation.length;a++){
                    //     //Tạo icon
                    //     var imageIcon = {
                    //         url: (a == 0)?'Style/Icon/you.png':'Style/Icon/localtions.png',
                    //         size: new google.maps.Size(71, 71),
                    //         origin: new google.maps.Point(0, 0),
                    //         anchor: new google.maps.Point(17, 34),
                    //         scaledSize: new google.maps.Size(25, 25)
                    //     }
                    //     //Tạo marker
                    //     newMarker = new google.maps.Marker({
                    //         map: myMap,
                    //         icon: imageIcon,
                    //         title:allLocation[a].title ,
                    //         html:allLocation[a].content,
                    //         position: new google.maps.LatLng(allLocation[a].lat,allLocation[a].lng),
                    //         animation: google.maps.Animation.BOUNCE
                    //     });

                    //     // ArrayContainMark.push(newMarker);

                    //     //Tạo inforWindow
                    //     // infoWindow = new google.maps.InfoWindow({
                    //     //     content: "<strong>"+allLocation[a].title+"</strong><br/><br/>"+allLocation[a].content
                    //     // });
                    //     infoWindow = new google.maps.InfoWindow();
                    //     // //Đưa infoWindow vào map
                    //     // // infoWindow.open(myMap,newMarker);

                    //     // // //Tạo Sự kiện click mở infoWindow
                    //     // // newMarker.addListener('click',function(){

                    //     // //     //Tạo inforWindow
                    //     // //     infoWindow = new google.maps.InfoWindow({
                    //     // //         content: "<strong>"+allLocation[a].title+"</strong><br/><br/>"+allLocation[a].content
                    //     // //     });
                    //     // //     //Đưa infoWindow vào map
                    //     // //     infoWindow.open(myMap,newMarker);

                    //     // // });

                    //     if(a == 0){
                    //         infoWindow.setContent("Bạn đang ở đây");
                    //         infoWindow.open(myMap,newMarker);
                    //     } else {
                    //         new google.maps.event.addListener(newMarker, 'click', function(){

                    //             //Khai báo nội dung infoWindow
                    //             var infoContent = "<strong>"+this.title+"</strong><br/><br/>"+this.html;
                    //             infoWindow.setContent(infoContent);
                    //             //Đưa infoWindow vào map
                    //             infoWindow.open(myMap,this);
    
                    //         });
                    //     }


                        
                    //     // google.maps.event.addListener(newMarker, 'click', (function(newMarker, a) {
                    //     //     return function() {
                    //     //         infoWindow.setContent(allLocation[a].title);
                    //     //         infoWindow.setOptions({maxWidth: 200});
                    //     //         infoWindow.open(myMap, newMarker);
                    //     //     }
                    //     // }) (newMarker, a));
                    // }

                    //Tạo marker và đường đi đến marker bằng hàm makeAMARKER
                    /*
                    Truyền vào
                    -----------
                    Mảng tất cả các vị trí đã lấy ở trên được push vào allLocation
                    Bản đồ đã khởi tạo
                    Biến tạo infoWindow
                    2 Biến routeService và showRouteService phục vụ cho hàm tìm đường
                    Truyền vào vị trí của người dùng
                    */
                    makeAMarker(allLocation,myMap,infoWindow,newMarker,routeService,showRouteService,pos);

                    //alert(allLocation);

                    myMap.setCenter(new google.maps.LatLng(pos.lat,pos.lng)); //Đưa map về chính giữa vị trí của m

                },function(){
                    // myMap.setCenter(new google.maps.LatLng(defaultLocation.lat,defaultLocation.lng)); //Khi người dùng không cho hiện vị trí của mình, map tự động về vị trí mặc định
                    // newMarker.setPosition(new google.maps.LatLng(defaultLocation.lat,defaultLocation.lng)); //Khi người dùng không cho hiện vị trí của mình, marker tự động về vị trí mặc định
                    // handleLocationError(true, infoWindow, map.getCenter()); //Hàm handle này được viết ở ngoài hàm openMap, được lấy từ google map doc
                    allLocation.push(defaultLocation);
                
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

                    // //Khai báo marker và infoWindow
                    // var ArrayContainMark = [];
                    // for(a=0; a < allLocation.length;a++){
                    //     //Tạo icon
                    //     var imageIcon = {
                    //         url: (a == 0)?'Style/Icon/you.png':'Style/Icon/localtions.png',
                    //         size: new google.maps.Size(71, 71),
                    //         origin: new google.maps.Point(0, 0),
                    //         anchor: new google.maps.Point(17, 34),
                    //         scaledSize: new google.maps.Size(25, 25)
                    //     }
                    //     //Tạo marker
                    //     newMarker = new google.maps.Marker({
                    //         map: myMap,
                    //         icon: imageIcon,
                    //         title:allLocation[a].title ,
                    //         html:allLocation[a].content,
                    //         position: new google.maps.LatLng(allLocation[a].lat,allLocation[a].lng),
                    //         animation: google.maps.Animation.BOUNCE
                    //     });

                    //     // ArrayContainMark.push(newMarker);

                    //     //Tạo inforWindow
                    //     // infoWindow = new google.maps.InfoWindow({
                    //     //     content: "<strong>"+allLocation[a].title+"</strong><br/><br/>"+allLocation[a].content
                    //     // });
                    //     infoWindow = new google.maps.InfoWindow();
                    //     // //Đưa infoWindow vào map
                    //     // // infoWindow.open(myMap,newMarker);

                    //     // // //Tạo Sự kiện click mở infoWindow
                    //     // // newMarker.addListener('click',function(){

                    //     // //     //Tạo inforWindow
                    //     // //     infoWindow = new google.maps.InfoWindow({
                    //     // //         content: "<strong>"+allLocation[a].title+"</strong><br/><br/>"+allLocation[a].content
                    //     // //     });
                    //     // //     //Đưa infoWindow vào map
                    //     // //     infoWindow.open(myMap,newMarker);

                    //     // // });

                    //     if(a == 0){
                    //         infoWindow.setContent("Bạn đang ở đây");
                    //         infoWindow.open(myMap,newMarker);
                    //     } else {
                    //         new google.maps.event.addListener(newMarker, 'click', function(){

                    //             //Khai báo nội dung infoWindow
                    //             var infoContent = "<strong>"+this.title+"</strong><br/><br/>"+this.html;
                    //             infoWindow.setContent(infoContent);
                    //             //Đưa infoWindow vào map
                    //             infoWindow.open(myMap,this);

                    //             //Đưa đường đi trỏ đến marker vào map
                    //             displayRoute(routeService,showRouteService,defaultLocation,newMarker,this.position);
    
                    //         });
                    //     }


                        
                    //     // google.maps.event.addListener(newMarker, 'click', (function(newMarker, a) {
                    //     //     return function() {
                    //     //         infoWindow.setContent(allLocation[a].title);
                    //     //         infoWindow.setOptions({maxWidth: 200});
                    //     //         infoWindow.open(myMap, newMarker);
                    //     //     }
                    //     // }) (newMarker, a));
                    // }


                    //Tạo marker và đường đi đến marker bằng hàm makeAMARKER
                    /*
                    Truyền vào
                    -----------
                    Mảng tất cả các vị trí đã lấy ở trên được push vào allLocation
                    Bản đồ đã khởi tạo
                    Biến tạo infoWindow
                    2 Biến routeService và showRouteService phục vụ cho hàm tìm đường
                    Truyền vào vị trí của người dùng
                    */
                    makeAMarker(allLocation,myMap,infoWindow,newMarker,routeService,showRouteService,defaultLocation);


                    myMap.setCenter(new google.maps.LatLng(defaultLocation.lat,defaultLocation.lng)); //Khi người dùng không cho hiện vị trí của mình, map tự động về vị trí mặc định
                    handleLocationError(true, infoWindow, map.getCenter()); //Hàm handle này được viết ở ngoài hàm openMap, được lấy từ google map doc
                });
            } else {
                //Tức khi Geolocation không hỗ trợ
                handleLocationError(false, infoWindow, map.getCenter());
                alert("Không lấy được vị trí hiện tại của bạn!");
            }

            // //Cắt chuỗi trả về
            // res = response.split(";");
            // var i;
            // for(i = 0;i < (res.length - 1);i++){
            //     var getIt = res[i].split("-");
            //     var oldLocation = {
            //         title: getIt[0],
            //         content: getIt[1],
            //         lat: getIt[2],
            //         lng: getIt[3]
            //     }
            //     allLocation.push(oldLocation);
            // }

            
            // var newMarker,a;

            // for(a=0; a < allLocation.length;a++){
            //     newMarker = new google.maps.Marker({
            //         map: myMap,
            //         position: new google.maps.LatLng(allLocation[a].lat,allLocation[a].lng),
            //         animation: google.maps.Animation.BOUNCE
            //     });
            // }

            // alert(allLocation);
            
        } 
    }
    xhrObject.send(null);

    // //TẠO ĐƯỜNG CHỈ DẪN
    // //THÊM SERVICE TÌM ĐƯỜNG ĐI
    // var routeService = new google.maps.DirectionsService;
    // var showRouteService = new google.maps.DirectionsRenderer;
    //ĐƯA SERVICE VÀO MAP
    showRouteService.setMap(myMap);
    
    //Biến gọi hàm tìm đường
    var getRoute = function(){
        //Gọi hàm displayRoute ở ngoài hàm openMap()
        var des = document.getElementById('findPlace').value;
        displayRoute(routeService,showRouteService,defaultLocation,newMarker,des);
        // newMarker.setMap(null);
    };
    //Biến xóa sự kiện tìm đường
    var removeRoute = function(){
        showRouteService.setMap(null); //Xóa đường chỉ dẫn
        openMAP();
        // myMap.clearOverlays(); // Xóa Route cách khác
    }
    //TẠO SỰ KIỆN CHO NÚT TÌM ĐƯỜNG
    document.getElementById('FindRoute').onclick = getRoute;
    //TẠO SỰ KIỆN CHO NÚT XÓA SỰ KIỆN TÌM ĐƯỜNG
    document.getElementById('RemoveRoute').onclick = removeRoute;

    //TẠO EVENT LẤY KINH ĐỘ VÀ VĨ ĐỘ KHI CLICK MAP
    google.maps.event.addListener(myMap, 'click', function(e){
        var frmLatLng = e.latLng; //Tạo biết lưu lấy giá trị tọa độ khi click vào
        document.getElementById('frmLat').value = frmLatLng.lat();//Hàm lấy thông tin vĩ độ điểm click map 73
        document.getElementById('frmLng').value = frmLatLng.lng();//Hàm lấy thông tin kinh độ điểm click map
    });

    //TẠO EVENT KHI BẤM NÚT GỬI FORM
    document.getElementById('frmBtn').onclick = function(){
        var load = true;
        var Ten = document.getElementById('frmTitle').value;
        var NoiDung = document.getElementById('frmContent').value;
        var ViDo = document.getElementById('frmLat').value;
        var KinhDo = document.getElementById('frmLng').value;
        //Tạo sự kiện gửi
        //Gửi đến Server/addMarker.php
        var requestStrBtn = "Server/addMarker.php?load="+load+"&Ten="+Ten+"&NoiDung="+NoiDung+"&ViDo="+ViDo+"&KinhDo="+KinhDo;
        xhrObject.open("GET",requestStrBtn,true);
        xhrObject.onreadystatechange = function(){
            if(xhrObject.status == 200 && xhrObject.readyState == 4){
                var response = xhrObject.responseText;
                if(Ten != "" && NoiDung != ""){

                    //Đưa marker vừa nhập vào map
                    if(response == "1"){
                        alert("Thêm địa điểm thành công!");
                        openMAP();
                    } else {
                        alert("Thêm địa điểm không thành công!");
                    }

                } else {
                    alert("Bạn chưa nhập đủ thông tin còn thiếu!");
                }
            } 
        }
        xhrObject.send(null);
    }

}

/*==============================================================================================*/

//HÀM HIỂN THỊ MARKER VÀ SỬ DỤNG HÀM ĐƯỜNG ĐI
function makeAMarker(allLocation,myMap,infoWindow,newMarker,routeService,showRouteService,defaultLocation){

    // //Khai báo marker và infoWindow
    // var ArrayContainMark = [];
    for(i=0; i < allLocation.length;i++){
        //Tạo icon
        var imageIcon = {
            url: (i == 0)?'Style/Icon/you.png':'Style/Icon/localtions.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        }
        //Tạo marker
        newMarker = new google.maps.Marker({
            map: myMap,
            icon: imageIcon,
            title:allLocation[i].title ,
            html:allLocation[i].content,
            position: new google.maps.LatLng(allLocation[i].lat,allLocation[i].lng),
            animation: google.maps.Animation.BOUNCE
        });

        // ArrayContainMark.push(newMarker);

        //Tạo inforWindow
        // infoWindow = new google.maps.InfoWindow({
        //     content: "<strong>"+allLocation[a].title+"</strong><br/><br/>"+allLocation[a].content
        // });
        infoWindow = new google.maps.InfoWindow();
        // //Đưa infoWindow vào map
        // // infoWindow.open(myMap,newMarker);

        // // //Tạo Sự kiện click mở infoWindow
        // // newMarker.addListener('click',function(){

        // //     //Tạo inforWindow
        // //     infoWindow = new google.maps.InfoWindow({
        // //         content: "<strong>"+allLocation[a].title+"</strong><br/><br/>"+allLocation[a].content
        // //     });
        // //     //Đưa infoWindow vào map
        // //     infoWindow.open(myMap,newMarker);

        // // });

        if(i == 0){
            infoWindow.setContent("Bạn đang ở đây");
            infoWindow.open(myMap,newMarker);
        } else {
            new google.maps.event.addListener(newMarker, 'click', function(){

                //Khai báo nội dung infoWindow
                var infoContent = "<strong>"+this.title+"</strong><br/><br/>"+this.html;
                infoWindow.setContent(infoContent);
                //Đưa infoWindow vào map
                infoWindow.open(myMap,this);

                //Đưa đường đi trỏ đến marker vào map
                displayRoute(routeService,showRouteService,defaultLocation,newMarker,this.position);

            });
        }


        
        // google.maps.event.addListener(newMarker, 'click', (function(newMarker, a) {
        //     return function() {
        //         infoWindow.setContent(allLocation[a].title);
        //         infoWindow.setOptions({maxWidth: 200});
        //         infoWindow.open(myMap, newMarker);
        //     }
        // }) (newMarker, a));
    }

}

/*==============================================================================================*/

//HÀM GIỮ LỖI KHI LẤY VỊ TRÍ HIỆN TẠI
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Lỗi: dịch vụ vị trí hiện không bật!' :
                          'Lỗi: Trình duyệt của bạn không hỗ trợ vị trí');
    infoWindow.open(myMap);
  }

/*==============================================================================================*/

//HÀM TÌM VÀ HIỂN THỊ ĐƯỜNG ĐI
function displayRoute(routeService,showRouteService,myLocation,newMarker,destinationVal){
    routeService.route(
        {
            origin: new google.maps.LatLng(myLocation.lat,myLocation.lng),
            destination: destinationVal,
            travelMode: 'DRIVING'
        },
        function(response, status){
            if(status == 'OK'){
                showRouteService.setDirections(response);
                // newMarker.setMap(null);
            } else {
                window.alert('Error:'+ status);
            }
        }
    );
}

/*==============================================================================================*/

//GỌI HÀM SỰ KIỆN KHI LOAD TRANG
window.onload = event;
