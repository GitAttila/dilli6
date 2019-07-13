var map;
function initMap() {
    let dilliSixLatLng = {lat: 50.121003, lng: 14.457790};
    map = new google.maps.Map(document.getElementById('contact-map'), {
    center: dilliSixLatLng,
    zoom: 14,
    styles: 
    [
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#82807e"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c6c4c2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#57D998"
                },
                {
                    "saturation": -1.0989010989011234
                },
                {
                    "lightness": 11.200000000000017
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#E5CF67"
                },
                {
                    "saturation": -61.8
                },
                {
                    "lightness": 45.599999999999994
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "hue": "#E5CF67"
                },
                {
                    "lightness": "43"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#E5CF67"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 51.19999999999999
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#E5CF67"
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": 52
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#45DAC3"
                },
                {
                    "saturation": -13.200000000000003
                },
                {
                    "lightness": 2.4000000000000057
                },
                {
                    "gamma": 1
                }
            ]
        }
    ]
    });
    
    var icon = {
        url: "./assets/images/d6_pointer.png",
        scaledSize: new google.maps.Size(140,164),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(70, 164)
    };

    var marker = new google.maps.Marker({
        position: dilliSixLatLng,
        map: map,
        title: 'Dilli6 indian bistro & bar',
        icon: icon
    });

}

window.initMap = initMap;