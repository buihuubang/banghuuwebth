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

                    //Đưa điểm pos vào allLocation
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
                            lng: getIt[3],
                            anh: getIt[4],
                            thuoctinh: getIt[5]
                        }
                        allLocation.push(oldLocation);
                    }

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
                    
                    //Nếu người dùng không bật định vị thì điểm defaultLocation đưa vào allLocation
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
                            lng: getIt[3],
                            anh: getIt[4],
                            thuoctinh: getIt[5]
                        }
                        allLocation.push(oldLocation);
                    }

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
            
        } 
    }
    xhrObject.send(null);

    //Tạm thời disable nút xóa marker
    // document.getElementById('frmBtnDel').disabled = true;

    // //TẠO ĐƯỜNG CHỈ DẪN
    // //THÊM SERVICE TÌM ĐƯỜNG ĐI
    // var routeService = new google.maps.DirectionsService;
    // var showRouteService = new google.maps.DirectionsRenderer;
    //ĐƯA SERVICE VÀO MAP
    showRouteService.setMap(myMap);
    
    //Biến gọi hàm tìm đường
    // var getRoute = function(){
    //     //Gọi hàm displayRoute ở ngoài hàm openMap()
    //     var des = document.getElementById('findPlace').value;
    //     displayRoute(routeService,showRouteService,defaultLocation,des);
    //     // newMarker.setMap(null);
    // };
    //Biến xóa sự kiện tìm đường
    var removeRoute = function(){
        showRouteService.setMap(null); //Xóa đường chỉ dẫn
        openMAP();
        document.getElementById("khoangCach").value = "";
        // myMap.clearOverlays(); // Xóa Route cách khác
        //Mở form
        disableForm(false); //Gía trị false đưa form hiện
        //Mở nhập tọa độ trong form
        //Remove value
        document.getElementById('frmTitle').value = "";
        document.getElementById('frmContent').value = "";
        document.getElementById('frmLat').value = "";
        document.getElementById('frmLng').value = "";
        document.getElementById('frmImage').value = "";
    }
    //TẠO SỰ KIỆN CHO NÚT TÌM ĐƯỜNG
    // document.getElementById('FindRoute').onclick = getRoute;
    //TẠO SỰ KIỆN CHO NÚT XÓA SỰ KIỆN TÌM ĐƯỜNG
    document.getElementById('RemoveRoute').onclick = removeRoute;

    // //TẠO EVENT LẤY KINH ĐỘ VÀ VĨ ĐỘ KHI CLICK MAP
    // google.maps.event.addListener(myMap, 'click', function(e){
    //     var frmLatLng = e.latLng; //Tạo biết lưu lấy giá trị tọa độ khi click vào
    //     document.getElementById('frmLat').value = frmLatLng.lat();//Hàm lấy thông tin vĩ độ điểm click map 73
    //     document.getElementById('frmLng').value = frmLatLng.lng();//Hàm lấy thông tin kinh độ điểm click map
    // });

    // //TẠO EVENT KHI BẤM NÚT GỬI FORM
    // document.getElementById('frmBtn').onclick = function(){
    //     var load = true;
    //     var Ten = document.getElementById('frmTitle').value;
    //     var NoiDung = document.getElementById('frmContent').value;
    //     var ViDo = document.getElementById('frmLat').value;
    //     var KinhDo = document.getElementById('frmLng').value;
    //     //Tạo sự kiện gửi
    //     //Gửi đến Server/addMarker.php
    //     var requestStrBtn = "Server/addMarker.php?load="+load+"&Ten="+Ten+"&NoiDung="+NoiDung+"&ViDo="+ViDo+"&KinhDo="+KinhDo;
    //     xhrObject.open("GET",requestStrBtn,true);
    //     xhrObject.onreadystatechange = function(){
    //         if(xhrObject.status == 200 && xhrObject.readyState == 4){
    //             var response = xhrObject.responseText;
    //             if(Ten != "" && NoiDung != ""){

    //                 //Đưa marker vừa nhập vào map
    //                 if(response == "1"){
    //                     alert("Thêm địa điểm thành công!");
    //                     openMAP();
    //                 } else {
    //                     alert("Thêm địa điểm không thành công!");
    //                 }

    //             } else {
    //                 alert("Bạn chưa nhập đủ thông tin còn thiếu!");
    //             }
    //         } 
    //     }
    //     xhrObject.send(null);
    // }

    //Khai báo biến clickMarker để lưu marker khi click
    var clickMarker;
    //Tạo ra marker khi click vào map
    markAClick(myMap,clickMarker);

}

/*==============================================================================================*/

//HÀM HIỂN THỊ MARKER VÀ SỬ DỤNG HÀM ĐƯỜNG ĐI
function makeAMarker(allLocation,myMap,infoWindow,newMarker,routeService,showRouteService,defaultLocation){

    // //Khai báo marker và infoWindow
    var ArrayContainMark = [];
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
            zIndex: i, //Đưa tham số thứ tự cho marker
            icon: imageIcon,
            title:allLocation[i].title ,
            html:allLocation[i].content + "-" + allLocation[i].anh + "-" + allLocation[i].thuoctinh,
            position: new google.maps.LatLng(allLocation[i].lat,allLocation[i].lng),
            animation: (i == 0)? google.maps.Animation.BOUNCE : google.maps.Animation.DROP
        });

        //Đưa marker vào
        ArrayContainMark.push(newMarker);

        //Tạo infoWindow khi có sự kiện click vào map
        infoWindow = new google.maps.InfoWindow({maxWidth:120});
        

        if(i == 0){

            //Tạo infoWindow cho điểm đầu tiên
            infoWindow.setContent("Bạn đang ở đây");
            infoWindow.open(myMap,newMarker);
            
        } else {

            //Tạo infoWindow cho các điểm còn lại
            new google.maps.event.addListener(newMarker, 'click', function(){

                //Khai báo biến giữ nội dung marker
                var keepContent = this.html.split("-");
                var strRecoImage = keepContent[1].replace(/fbf/g,'-'); //Đưa lại về chuẩn link cũ
                //Khai báo nội dung infoWindow
                var infoContent = "<strong>"+this.title+"</strong><br/><br/><br/>"+"<img src=\""+strRecoImage+"\" style=\"max-width:100%;\" /> <br/><br/>"+keepContent[0];
                //Đưa đường đi trỏ đến marker vào map
                /*
                Truyền vào: 
                route service
                show route service
                vị trí mặc định
                vị trí markers muốn đến
                mảng chứa các marker
                Map
                */
                displayRoute(routeService,showRouteService,defaultLocation,this.position,ArrayContainMark,myMap);
                //Đưa nội dung vào marker
                infoWindow.setContent(infoContent);
                //Đưa vị trí infoWindow về đúng điểm
                infoWindow.setPosition(this.position);
                //Đưa infoWindow vào map
                infoWindow.open(myMap,this);

                //Đưa thông tin marker vào form
                document.getElementById('frmTitle').value = this.title;
                document.getElementById('frmContent').value = keepContent[0];
                document.getElementById('frmLat').value = this.position.lat();
                document.getElementById('frmLng').value = this.position.lng();
                document.getElementById('frmImage').value = strRecoImage;
                document.getElementById('thuocTinh').value = keepContent[2];
                /* Còn thiếu image,Ngoài trời */

                //Disable Form
                // document.getElementById('frmTitle').disabled = true;
                // document.getElementById('frmContent').disabled = true;
                // document.getElementById('frmLat').disabled = true;
                // document.getElementById('frmLng').disabled = true;
                // document.getElementById('frmBtn').disabled = true;
                // document.getElementById('frmImage').disabled = true;
                // document.getElementById('thuocTinh').disabled = true;
                disableForm(true);

                deleteMarker(this.position.lat());

            });

        }

        //LẤY ĐƯỜNG ĐI
        var getRoute = function(){
            //Gọi hàm displayRoute ở ngoài hàm openMap()
            var des = document.getElementById('findPlace').value;
            displayRoute(routeService,showRouteService,defaultLocation,des,ArrayContainMark);
            // newMarker.setMap(null);
        };

        document.getElementById('FindRoute').onclick = getRoute;

        // document.getElementById('btnLoc').onclick = locDiadiem(ArrayContainMark);
        locDiadiem(ArrayContainMark,myMap,defaultLocation);

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
function displayRoute(routeService,showRouteService,myLocation,destinationVal,newMarker,myMap){

    routeService.route(
        {
            origin: new google.maps.LatLng(myLocation.lat,myLocation.lng),
            destination: destinationVal,
            travelMode: 'DRIVING'
        },
        function(response, status){
            if(status === 'OK'){
                showRouteService.setDirections(response);
            } else {
                window.alert('Error:'+ status);
            }
        }
    );

    // document.getElementById('KhoangCach').value = distanceCal(myLocation,destinationVal);
    distanceCal(myLocation,destinationVal);

    for(var i = 0;i < newMarker.length; i++){
        newMarker[i].setMap(null);
    }

    //Tạo infoWindows ở vị trí của mình
    var infoWin = new google.maps.InfoWindow();
    infoWin.setPosition(new google.maps.LatLng(myLocation.lat,myLocation.lng));
    infoWin.setContent("Bạn đang ở đây");
    infoWin.open(myMap);

}

/*==============================================================================================*/

//HÀM TÍNH KHOẢNG CÁCH ĐƯỜNG ĐI
function distanceCal(myLocation,destinationVal){
    var radLatOrigin = Math.PI * (myLocation.lat)/180;
    var radLatDestin = Math.PI * (destinationVal.lat())/180;
    var theta = myLocation.lng - destinationVal.lng();
    var radTheta = Math.PI * theta/180;
    var distance = Math.sin(radLatOrigin) * Math.sin(radLatDestin) + Math.cos(radLatOrigin) * Math.cos(radLatDestin) * Math.cos(radTheta);
    distance = Math.acos(distance);
	distance = distance * 180/Math.PI;
    distance = distance * 60 * 1.1515;
    distance = distance * 1.609344;
    document.getElementById("khoangCach").value = distance.toFixed(3) + " km";
    return distance;
}

/*==============================================================================================*/

//HÀM XỬ LÝ KHI NHẤN MAP

function markAClick(myMap,clickMarker){

    //TẠO EVENT LẤY KINH ĐỘ VÀ VĨ ĐỘ KHI CLICK MAP
    google.maps.event.addListener(myMap, 'click', function(e){

        //Xóa giá trị trong form
        document.getElementById("frmLat").value = "";
        document.getElementById("frmLng").value = "";

        //Tạm thời disable nhập tọa độ vào form
        document.getElementById('frmLat').disabled = true;
        document.getElementById('frmLng').disabled = true;
        //Enable value
        document.getElementById('frmTitle').disabled = false;
        document.getElementById('frmContent').disabled = false;
        document.getElementById('frmImage').disabled = false;
        document.getElementById('thuocTinh').disabled = false;
        document.getElementById('frmBtndel').disabled = true;
        //Remove value
        document.getElementById('frmTitle').value = "";
        document.getElementById('frmContent').value = "";
        document.getElementById('frmImage').value = "";

        var frmLatLng = e.latLng; //Tạo biết lưu lấy giá trị tọa độ khi click vào
        var frmLat = frmLatLng.lat();//Hàm lấy thông tin vĩ độ điểm click map 73
        var frmLng = frmLatLng.lng();//Hàm lấy thông tin kinh độ điểm click map
        //Đưa tọa độ vào hiển thị
        document.getElementById('frmLat').value = frmLat;
        document.getElementById('frmLng').value = frmLng;


        //Tạo icon cho click marker
        var clickimageIcon = {
            url: 'Style/Icon/clickMarker.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        }

        //KIỂM TRA clickMarker đã được tạo marker chưa
        if(clickMarker){
            //Nếu đã tạo thì sẽ thay đổi vị trí markers
            clickMarker.setPosition(new google.maps.LatLng(frmLat,frmLng));
        } else {
            //Nếu không, tạo một marker mới vào điểm đã click
            clickMarker = new google.maps.Marker({
                map: myMap,
                icon: clickimageIcon,
                title:'Bạn đã click vào đây',
                position: new google.maps.LatLng(frmLat,frmLng),
                animation: google.maps.Animation.DROP
            });
        }


        //TẠO EVENT KHI BẤM NÚT GỬI FORM
        document.getElementById('frmBtn').onclick = function(){
            var load = true;
            var Ten = document.getElementById('frmTitle').value;
            var NoiDung = document.getElementById('frmContent').value;
            var ViDo = document.getElementById('frmLat').value;
            var KinhDo = document.getElementById('frmLng').value;
            var Image = document.getElementById('frmImage').value;
            var strImage = Image.replace(/[-]/g,'fbf'); //Thay dấu gạch nganh trong url ảnh
            var ThuocTinh = document.getElementById('thuocTinh').value;
            // if(ViDo == "" && KinhDo == ""){
            //     ViDo = frmLat;
            //     KinhDo = frmLng;
            //     // alert("Bạn đã chọn vị trí trên bản đồ!");
            // }
            //Tạo sự kiện gửi
            //Gửi đến Server/addMarker.php
            var requestStrBtn = "Server/addMarker.php?load="+load+"&Ten="+Ten+"&NoiDung="+NoiDung+"&ViDo="+ViDo+"&KinhDo="+KinhDo+"&Image="+strImage+"&ThuocTinh="+ThuocTinh;
            xhrObject.open("GET",requestStrBtn,true);
            xhrObject.onreadystatechange = function(){
                if(xhrObject.status == 200 && xhrObject.readyState == 4){
                    var response = xhrObject.responseText;
                    if(Ten != "" && NoiDung != ""){
    
                        //Đưa marker vừa nhập vào map
                        if(response == "1"){
                            alert("Thêm địa điểm thành công!");
                            openMAP();
                            disableForm(false);
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

    });

}

/*==============================================================================================*/

//HÀM XỬ LÝ SỰ KIỆN HIỆN HOẶC ẨN FORM
function disableForm(isDis){

    //Disable Form
    document.getElementById('frmTitle').disabled = isDis;
    document.getElementById('frmContent').disabled = isDis;
    document.getElementById('frmLat').disabled = isDis;
    document.getElementById('frmLng').disabled = isDis;
    document.getElementById('frmBtn').disabled = isDis;
    document.getElementById('frmImage').disabled = isDis;
    document.getElementById('thuocTinh').disabled = isDis;
    document.getElementById('frmBtndel').disabled = !(isDis);

}

/*==============================================================================================*/

//HÀM XÓA MARKER
function deleteMarker(ViDo){

    //Tạo sự kiện cho nút xóa
    document.getElementById('frmBtndel').onclick = function(){

        var checkDel = confirm("Bạn có muốn xóa marker này không?");
        
        if(checkDel){
        
            var load = true;
        
            var requestStrBtnDel = "Server/delMarker.php?load="+load+"&ViDo="+ViDo;
            xhrObject.open("GET",requestStrBtnDel,true);
            xhrObject.onreadystatechange = function(){
                if(xhrObject.status == 200 && xhrObject.readyState == 4){
                    var response = xhrObject.responseText;
                    //Xóa marker vừa chọn và reload map
                    if(response == "1"){
                        alert("Xóa địa điểm thành công!");
                        openMAP();
                        disableForm(false);
                    } else {
                        alert("Xóa địa điểm không thành công!");
                    }
                } 
            }
            xhrObject.send(null);
    
        }

    }

}

/*==============================================================================================*/

//HÀM LỌC THUỘC TÍNH MARKER
/*
Truyền vào:
Mảng marker
Map đã tạo
Marker gốc
*/
function locDiadiem(ArrayContainMark,myMap,defaultLocation){
    document.getElementById('btnLoc').onclick = function(){

        locMarkerthuoctinh(ArrayContainMark,myMap);
        locMarkerkhoangcach(defaultLocation,ArrayContainMark,myMap);

    };
}

/*==============================================================================================*/

//HÀM LỌC THUỘC TÍNH MARKER
function locMarkerthuoctinh(ArrayContainMark,myMap){

    //Lấy thuộc tính của địa điểm
    var thuoctinhDiadiem = document.getElementById('chonDiadiem').value;

    if(ArrayContainMark.length > 1){

        if(thuoctinhDiadiem != 2){

            for(var i = 1; i < ArrayContainMark.length; i++){
                var keepMark = ArrayContainMark[i].html.split("-");
                if(keepMark[2] != thuoctinhDiadiem){
                    ArrayContainMark[i].setMap(null);
                } else {
                    ArrayContainMark[i].setMap(myMap);
                }
            }
            // alert(thuoctinhDiadiem);

        } else {
            for(var b = 1; b <ArrayContainMark.length; b++){

                ArrayContainMark[b].setMap(myMap);
                
            }
        }

    } else {
        alert("Chưa có địa điểm nào trên bản đồ!!!");
    }
    
}

/*==============================================================================================*/

//Hàm lọc khoảng cách
function locMarkerkhoangcach(defaultLocation,ArrayContainMark,myMap){

    var distanceDiadiem = document.getElementById('findDistance').value;
    
        if(distanceDiadiem != ""){
            
            for(var i = 1; i< ArrayContainMark.length; i++){
                var getDis = distanceCal(defaultLocation,ArrayContainMark[i].position);
                if( getDis > distanceDiadiem){
                    ArrayContainMark[i].setMap(null);
                } else {
                    ArrayContainMark[i].setMap(myMap);
                }
            }
    
        }

}

/*==============================================================================================*/

//GỌI HÀM SỰ KIỆN KHI LOAD TRANG
window.onload = event;
