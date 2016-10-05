"use strict";

window.onload = function(){
   $(".button-collapse").sideNav();
  initialize();
  function initialize() {
  var lat = 37.79;
  var lng =  -122.4;
  var pyrmont = new google.maps.LatLng(lat, lng);

  var map = new google.maps.Map(document.getElementById('map'), {
  center: pyrmont,
  zoom: 15,
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
  google.maps.event.addListener(map,'click',function(e){
    console.log('clicked @'+e.latLng);
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    var button = document.getElementById("buttonAnchor");
    var tag = document.getElementById("tagInfo").value;
    console.log(tag);
    button.setAttribute("href",`mirinoPhotos.html?lat=${lat}&lng=${lng}&tag=${tag}`);
    // button.addEventListener("click", function(e){
    //   getImages(lat, lng);
    // })
    console.log(lat);
    console.log(lng);

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

  }
};

//google.maps.event.addDomListener(window, 'load', initialize);
