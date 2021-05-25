var mymap
function map(params, lng, lat) {
    let longitude = -0.09
    let latitude = 51.505
    
    if ( params > 0 ) {
        mymap.off();
        mymap.remove();
        
    }
    longitude = +lng
    latitude = +lat
    


    mymap = L.map('mapid').setView([latitude, longitude], 13);
    let myicon = L.icon({iconUrl: '../images/icon-location.svg',
    iconAnchor: [23, 56],})
    var marker = L.marker([latitude, longitude], {icon: myicon}).addTo(mymap);
    

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiaG9obm4iLCJhIjoiY2twNDk2cDN1MDl3NzJ3czFvY2Joa2tsZiJ9.vEfQn-QQVpBmnM3sZCBnHw'
    }).addTo(mymap);    
}


let firstClick = 0
/* map(firstClick) */

btn.addEventListener('click', ()=> {
    getLocation()
    firstClick++
})
getLocation()
function getLocation() {
    let inputIp = document.getElementById('inputIp').value 
    var ip = "";
    if (inputIp.length > 0) {
        ip = inputIp
    }
    var api_key = "at_Iwjbp3NMxZaJs3X2kDGmtT1ZDaauo";
    let city = ''
    let region = ''
    let code = ''
    $(function () {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key, ipAddress: ip},
           success: function(data) {
                city = data.location.city
                region = data.location.region
                code = data.location.postalCode
                let lat = data.location.lat
                let lng = data.location.lng
                let time = data.location.timezone
                let isp = data.isp
                ip = data.ip
                console.log(lng);
                console.log(lat);
                locationHtml(city, region, code)
                ipHtml(ip)
                map(firstClick, lng, lat)
                timeZone(time)
                ispHtml(isp)
           }
       });
    });
    
        
}

function ipHtml(params) {
    const ipNumber = document.getElementById('ipNumber')
    ipNumber.innerHTML = params
}
function locationHtml(city, region, code) {
    const location = document.getElementById('location')
    location.innerHTML = `${city}, ${region}, ${code}`
}
function timeZone(params) {
    const time = document.getElementById('time')
    time.innerHTML =`UTC ${params}`
}
function ispHtml(params) {
    const isp = document.getElementById('isp')
    isp.innerHTML = params
}
