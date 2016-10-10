"use strict";

window.onload = function(){
   $(".button-collapse").sideNav();
  initialize();
  function initialize() {
  var lat = 37.79;
  var lng =  -122.4;
  var pyrmont = new google.maps.LatLng(lat, lng);

  var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat:37.79, lng:-122.4},
  zoom: 13,
  scrollwheel: false
  });


  // Specify location, radius and place types for your Places API search.
  var request = {
  location: pyrmont,
  radius: '500',
  types: ['store']
  };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  // var service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, function(results, status) {
  // if (status == google.maps.places.PlacesServiceStatus.OK) {
  //   for (var i = 0; i < results.length; i++) {
  //     var place = results[i];
  //     // If the request succeeds, draw the place location on
  //     // the map as a marker, and register an event to handle a
  //     // click on the marker.
  //     var marker = new google.maps.Marker({
  //       map: map,
  //       position: place.geometry.location
  //     });
  //   }
  // }
  // });

  //listens for clicks on the map div;
    var marker;
    var circle;
    var imageSort;
    var imagesLoaded;
    var radius;
    $(".image-sort").click(function(event){
      let buttonId = event.currentTarget.id;
      let button = document.getElementById(buttonId);
      imageSort = button.value;
    });
    $(".imagesLoaded").click(function(event){
      let buttonId = event.currentTarget.id;
      let button = document.getElementById(buttonId);
      imagesLoaded = button.value;
    });
    $(".radius").click(function(event){
      let buttonId = event.currentTarget.id;
      let button = document.getElementById(buttonId);
      radius = button.value;
    });
    console.log(imageSort);
  google.maps.event.addListener(map,'click',function(e){
    if(marker){
      marker.setMap(null);
    }
    if(circle){
      circle.setMap(null);
    }
    console.log('clicked @'+e.latLng);
    var latitude = e.latLng.lat();
    var longitude = e.latLng.lng();
    var button = document.getElementById("buttonAnchor");
    let appName = "Mirino";
    let clickMe = document.getElementById("click-me");
    let rel = document.getElementById("rel");
    console.log(rel.value);

    $(clickMe).css("z-index",0);

    marker = new google.maps.Marker({
              draggable: true,
              position: {lat:latitude, lng:longitude},
              map: map,
              title: "Your location",
              label: appName[0]
          });
    circle = new google.maps.Circle({
            strokeColor: 'white',
            strokeOpacity: 0.9,
            strokeWeight: 2,
            fillColor: '#03a9f4',
            fillOpacity: 0.35,
            map: map,
            center: {lat:latitude, lng:longitude},
            radius: 500,
              });

    button.addEventListener("click", function(e){
        let tag = document.getElementById("tagInfo").value;
        let menuButton = document.getElementsByClassName("menu")[0];
        // let pageNumber = document.getElementById("number-of-images").value;
        // let radius = document.getElementById("radius").value;
        menuButton.style.color = "#5c6bc0";
        changeDom();
        getImages(latitude, longitude, tag, imageSort, imagesLoaded, radius);
    });
    console.log(latitude);
    console.log(longitude);
    // var loc = location.latLag;
    // var request = {
    //   location: e.latLng,
    //   radius: '500',
    //   types: ['store']
    // };
    //
    // // Create the PlaceService and send the request.
    // // Handle the callback with an anonymous function.
    // var service = new google.maps.places.PlacesService(map);
    // service.nearbySearch(request, function(results, status) {
    //   var placeHolder = [];
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     for (var i = 0; i < results.length; i++) {
    //       var place = results[i];
    //       // If the request succeeds, draw the place location on
    //       // the map as a marker, and register an event to handle a
    //       // click on the marker.
    //       placeHolder.push(place);
    //
    //       var marker = new google.maps.Marker({
    //         map: map,
    //         position: place.geometry.location
    //       });
    //     }
    //     console.log(placeHolder);
    //   }
    // });
  });

  document.getElementById("map-button").addEventListener("click", function(e){
      renderMap();
  });

  }
};

//google.maps.event.addDomListener(window, 'load', initialize);
