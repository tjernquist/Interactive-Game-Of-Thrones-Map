//Function that loads the map-tiles and produces a zoomable map
function CustomMapType() {
}
CustomMapType.prototype.tileSize = new google.maps.Size(256, 256);
CustomMapType.prototype.maxZoom = 7;
CustomMapType.prototype.getTile = function (coord, zoom, ownerDocument) {
    var div = ownerDocument.createElement('DIV');
    var baseURL = 'http://localhost:8383/HTML5Application1/map/';
    baseURL += zoom + '_' + coord.x + '_' + coord.y + '.png';
    div.style.width = this.tileSize.width + 'px';
    div.style.height = this.tileSize.height + 'px';
    div.style.backgroundColor = '#1B2D33';
    div.style.backgroundImage = 'url(' + baseURL + ')';
    return div;
};

CustomMapType.prototype.name = "Custom";
CustomMapType.prototype.alt = "Tile Coordinate Map Type";
var map;
var CustomMapType = new CustomMapType();

//Array containing character/episode-specific information that is used when placing Markers on the map
var locations = [
    episode1 = [
        ['San Francisco: Power Outage', 81.95, -160.1, "img/Dany.png", "<p><b>Daenerys Targaryen</b>, known as <b>Daenerys Stormborn</b> and <b>Dany</b>, is one of the last confirmed members of House Targaryen, along with her older brother Viserys, and she is one of the major POV characters in A Song of Ice and Fire. In the television adaptation Game of Thrones, Daenerys is played by Emilia Clarke.<p>  \n\
         This article uses material from the ASOIF-wiki article <a href=http://awoiaf.westeros.org/index.php/Daenerys_Targaryen>Daenerys Targaryen</a>, which is released under the <a href=http://creativecommons.org/licenses/by-sa/3.0/>Creative Commons Attribution-Share-Alike License 3.0</a>."],
        ['Davos', 82.16, -163.81, 'img/davos.png'],
        ['Tyrion Lannister', 83.45, -169.15, 'img/Tyrion.png'],
        ['Ned Stark', 83.49, -169.18, 'img/Ned.png'],
        ['Khal Drogo', 81.94, -159.85, 'img/Drogo.png'],
        ['Jamie Lannister', 83.45, -169.05, 'img/Jamie.png'],
        ['Petyr Baelish (Littlefinger)', 81.92, -166.65, 'img/Petyr.png'],
        ['Tywin Lannister', 82.02, -173.14, 'img/Tywin.png'],
        ['Samwell Tarly', 81.24, -171.24, 'img/Samwell.png'],
        ['Renly Baratheon', 81.91, -166.85, 'img/Renly.png'],
        ['Lysa Arryn', 82.54, -166.30, 'img/Lysa.png'],
        ['Robin Arryn', 82.54, -166.06, 'img/RobinArryn.png'],
        ['Brienne', 83.50, -168.92, 'img/Jon.png'],
        ['Brienne', 83.44, -169.55, 'img/Hound.png']
    ],
    episode2 = [
        ['San Francisco: Power Outage', 82.95, -160.1, "img/Dany.png", "Now shes more liky yurr"],
        ['Sausalito', 81.94, -166.7, 'img/Tyrion.png', "burr"]
    ],
    episode3 = [
    ],
    episode4 = [
    ],
    episode5 = [
    ],
    episode6 = [
    ],
    episode7 = [
    ],
    episode8 = [
    ],
    episode9 = [
    ],
    episode10 = [
    ],
    episode11 = [
        ['Brienne', 81.63, -163.54, 'img/Bronn.png']

    ],
];

var episode = 0;
//Variable zoomLevel that is used to keep map zoomed in one place between episode-toggles.
var zoomLevel = 5;

//Initialize the map and create all markers specificied in the locations-array.
function initialize() {

    var mapOptions = {
        minZoom: 5,
        maxZoom: 7,
        isPng: true,
        backgroundColor: '#003366',
        mapTypeControl: false,
        streetViewControl: false,
        center: new google.maps.LatLng(81.95, -155),
        zoom: zoomLevel,
        mapTypeControlOptions: {
            mapTypeIds: ['custom', google.maps.MapTypeId.ROADMAP],
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.mapTypes.set('custom', CustomMapType);
    map.setMapTypeId('custom');
    google.maps.event.addListener(map, "rightclick", function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        // populate yor box/field with lat, lng
        $("#coords").text("Lat=" + lat + "; Lng=" + lng);
    });

    for (i = 0; i < locations[episode].length; i++) {
        createMarker(i);
    }
}

//Array of markers
var marker = [];

//Creates a marker for the selected character in the locations-array. URL for the icon and text for the title is provided in the locations-array.
function createMarker(i) {
    marker[i] = new google.maps.Marker({
        position: new google.maps.LatLng(locations[episode][i][1], locations[episode][i][2]),
        map: map,
        icon: locations[episode][i][3],
        title: locations[episode][i][0]
    });


    //Creates a infoWindow containing text from the locations-array describing the character
    var infowindow = new google.maps.InfoWindow({
        content: locations[episode][i][4]
    });

    //Make the marker open the InfoWindow on click
    google.maps.event.addListener(marker[i], 'click', function () {
        infowindow.open(map, marker[i]);
    });

    google.maps.event.addListener(marker[i], 'rightclick', function () {
                    marker[i].setVisible(false);
                    

    });

    //Function to keep the markers hidden between episode-changes.
    if ($('#toggleMarkers').is(':checked')) {
        for (i = 0; i < locations[episode].length; i++) {
            marker[i].setVisible(false);
        }
    }

}


//Create a array of areas (Polygons)
var area = [];

//Array marking out coordinates of the polygon areas. Draws diffrent polygons with different colors to mark out the different constituencies of Westeros 
var zones = [
    Dorne = [[{lat: 81.09, lng: -162.75}, {lat: 81.10, lng: -167.71}, {lat: 81.30, lng: -167.28}, {lat: 81.22, lng: -168.98},
            {lat: 81.12, lng: -171.03}, {lat: 80.66, lng: -171.61}, {lat: 80.73, lng: -164.14}, {lat: 81.09, lng: -162.75}], "#FF8C00"],
    Reach = [[{lat: 80.64, lng: -174.25}, {lat: 80.66, lng: -171.66}, {lat: 81.11, lng: -171.05}, {lat: 81.32, lng: -170.13}, {lat: 81.50, lng: -167.55},
            {lat: 81.68, lng: -167.37}, {lat: 81.77, lng: -166.58}, {lat: 81.93, lng: -167.55}, {lat: 82.01, lng: -169.49}, {lat: 81.81, lng: -170.22},
            {lat: 81.727, lng: -173.83}, {lat: 81.12, lng: -174.24}, {lat: 80.64, lng: -174.25}], "#00CC66"],
    Westerlands = [[{lat: 81.73, lng: -173.81}, {lat: 82.02, lng: -173.29}, {lat: 81.99, lng: -174.34}, {lat: 82.42, lng: -172.69}, {lat: 82.45, lng: -170.69},
            {lat: 82.21, lng: -170.85}, {lat: 82.12, lng: -170.82}, {lat: 82.01, lng: -169.50}, {lat: 81.81, lng: -170.24}, {lat: 81.73, lng: -173.81}], "#480000"],
    Stormlands = [[{lat: 81.26, lng: -163.41}, {lat: 81.52, lng: -162.67}, {lat: 81.86, lng: -163.66}, {lat: 81.77, lng: -166.57}, {lat: 81.77, lng: -166.57}, {lat: 81.67, lng: -167.42},
            {lat: 81.50, lng: -167.53}, {lat: 81.31, lng: -170.12}, {lat: 81.13, lng: -170.91}, {lat: 81.30, lng: -167.29}, {lat: 81.26, lng: -163.41}], "#FFFF33"],
    Riverlands = [[{lat: 82.45, lng: -170.68}, {lat: 82.74, lng: -171.69}, {lat: 82.83, lng: -168.53}, {lat: 82.65, lng: -168.69}, {lat: 82.25, lng: -165.89}, {lat: 82.16, lng: -167.10},
            {lat: 81.93, lng: -167.54}, {lat: 82.01, lng: -169.47}, {lat: 82.13, lng: -170.80}, {lat: 82.27, lng: -170.79}, {lat: 82.45, lng: -170.68}], "#D80000"],
    Crownlands = [[{lat: 82.16, lng: -167.08}, {lat: 82.25, lng: -165.88}, {lat: 82.39, lng: -163.37}, {lat: 82.28, lng: -162.98}, {lat: 81.86, lng: -163.65}, {lat: 81.77, lng: -166.58},
            {lat: 81.937, lng: -167.51}, {lat: 82.16, lng: -167.08}], "#336600"],
    TheVale = [[{lat: 82.83, lng: -168.53}, {lat: 82.98, lng: -166.97}, {lat: 82.95, lng: -163.36}, {lat: 82.52, lng: -162.58}, {lat: 82.39, lng: -163.38}, {lat: 82.25, lng: -165.90},
            {lat: 82.649, lng: -168.67}, {lat: 82.83, lng: -168.53}], "#0066FF"],
    IronIslands = [[{lat: 82.43, lng: -172.94}, {lat: 82.50, lng: -171.83}, {lat: 82.63, lng: -172.37}, {lat: 82.62, lng: -173.41}, {lat: 82.58, lng: -174.17}, {lat: 82.47, lng: -174.34},
            {lat: 82.41, lng: -173.89}, {lat: 82.43, lng: -172.94}], "#303030"],
    TheNorth = [[{lat: 82.744, lng: -171.63}, {lat: 82.82, lng: -174.37}, {lat: 83.33, lng: -174.58}, {lat: 83.72, lng: -173.41}, {lat: 83.86, lng: -171.52}, {lat: 83.88, lng: -169.43},
            {lat: 83.87, lng: -165.41}, {lat: 84.09, lng: -164.63}, {lat: 84.15, lng: -164.17}, {lat: 84.07, lng: -163.12}, {lat: 83.55, lng: -163.42}, {lat: 83.55, lng: -163.42}
            , {lat: 83.18, lng: -163.72}, {lat: 83.01, lng: -167.18}, {lat: 82.82, lng: -168.72}, {lat: 82.744, lng: -171.63}], "#F8F8F8"],
    TheWatch = [[{lat: 83.88, lng: -169.59}, {lat: 84.01, lng: -168.24}, {lat: 83.99, lng: -165.75}, {lat: 83.87, lng: -165.43}, {lat: 83.88, lng: -169.59}], "#000000"],
];

//Draws the respektive polygons on the map from the provided coordinates in zones-array.
function drawArea(i) {

    area[i] = new google.maps.Polygon({
        path: zones[i][0],
        strokeColor: zones[i][1],
        strokeOpacity: 0.1,
        strokeWeight: 2,
        fillColor: zones[i][1],
        fillOpacity: 0.3,
        title: "Hello"
    });
    area[i].setMap(map);
}

//Toggles the visibility of the polygons on the map.
function toggleLayer()
{
    if ($('#toggleAreas').is(':checked')) {
        for (i = 0; i < zones.length; i++) {
            drawArea(i);
        }
        $('#familyDescription').css('display', 'inherit');
    }
    else
    {
        for (i = 0; i < zones.length; i++) {
            area[i].setMap(null);
        }
          $('#familyDescription').css('display', 'none');
    }
}



function toggleMarkers()
{
    if ($('#toggleMarkers').is(':checked')) {
        for (i = 0; i < locations[episode].length; i++) {
            marker[i].setVisible(false);
        }
    }
    else
    {
        for (i = 0; i < locations[episode].length; i++) {
            marker[i].setVisible(true);
        }
    }
}



var playing = false;

//A play button that moves the episode-slider forward one step every 3 seconds.
function play() {

    if (playing) { //if-else check to prevent multiple play() instances from running at the same time

    } else {
        playing = true;
        $("#playButton").toggleClass("active");

        timer = setInterval(function () {
            episode++;
            $("#amount").text(episode);
            $("#slider-range-max").slider('value', episode);
            zoomLevel = map.getZoom();
            initialize();
        }, 3000);
    }
}

//Pauses the episode-slider
function pause() {
    clearInterval(timer);
    $("#playButton").toggleClass("active");
    playing = false;
}

//Function that defines the slides and its values and functionality
$(document).ready(function () {
    $("#slider-range-max").slider({
        range: "max",
        min: 0,
        max: 10,
        value: 0,
        slide: function (event, ui) {
            $("#amount").text(ui.value);
            episode = ui.value;
            zoomLevel = map.getZoom();
            initialize();
        }
    });
    $("#amount").text($("#slider-range-max").slider("value"));
}
);

//$(document).ready(function () {   KOD FÖR ATT HÄMTA DATA FRÅN ASOIF-WIKI API
//    var url = "http://awoiaf.westeros.org/api.php?action=mobileview&page=Rhaegar_Targaryen&sections=0&format=json";
//    $("#settings").click(function () {
//
//        $.ajax({
//            type: "GET",
//            dataType: "json",
//            url: url,
//            error: function (request, status, error) {
//                alert("error");
//            },
//            success: function (data) {
//                var parsedText = JSON.stringify(data); 
//                alert(parsedText);
//
//            }
//
//        });
//    });
//});
//
//
//
//TODO
//JSON
//http://awoiaf.westeros.org/api.php?action=mobileview&page=Rhaegar_Targaryen&sections=1&format=json
//str.replace(/<\/?[^>]+>/gi, '') för att ta bort HTML
//Rita resterande 



