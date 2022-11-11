let map;

let selector = document.querySelector('.county-selector')

let newData = JSON.parse(localStorage.getItem('newData'))

function initMap() {
    data = JSON.parse(localStorage.getItem('data'))

    var map = new google.maps.Map(document.getElementById("map"));
    map.setCenter({ lat :Number(data[0].LATITUDE) , lng: Number(data[0].LONGITUDE) })
    map.setZoom(8)

    var infowindow = new google.maps.InfoWindow();

    var markers
    for(let i = 0; i < data.length;i++){
        markers = new google.maps.Marker({
            position: new google.maps.LatLng(data[i].LATITUDE, data[i].LONGITUDE),
            map:map,
            
        })

        google.maps.event.addListener(markers, 'click', ((markers, i) => {
            return () => {
                infowindow.setContent(data[i].NAME);
                infowindow.open(map, markers)
            }
        })(markers, i));
    }
    let tbody = document.querySelector('tbody')
    tbody.addEventListener('click',(e) => {
        if(e.target.nodeName == 'BUTTON'){
            buttonLat = Number(e.target.dataset.lat)
            buttonLng = Number(e.target.dataset.lon)
            
            map.panTo({lat:buttonLat,lng:buttonLng})
            map.setZoom(15)
            
            let content = e.target.parentNode.parentNode.firstElementChild.textContent
            buttonIndex = Number(e.target.id)
            infowindow.setContent(content)
            infowindow.open(map, markers[buttonIndex])
            infowindow.setPosition({lat:buttonLat,lng:buttonLng})
            
        }
    })
    

}

window.initMap = initMap;

initMap();