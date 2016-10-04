"use strict"
window.onload = function(){
  initialize();
  function initialize() {
  var placesLocation = [];
  var lat = 37.79;
  var lag =  -122.4;
  var photoInfo = {
    picId: [],
    farmId: [],
    serverId: [],
    secretId: [],
    tag: []
  };
  var photoURL = [];
  var pyrmont = new google.maps.LatLng(lat, lag);

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
    button.setAttribute("href",`mirinoPhotos.html?lat=${lat}&lng=${lng}`);
    console.log(lat);
    console.log(lng);
    // $.ajax({
    //   url:`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0bf0839ee1fe6ee109720782d7ec8a63&safe_search=1&has_geo=true&lat=${lat}&lon=${lng}&radius=1&accuracy=11&tags=giants&per_page=10&format=json&nojsoncallback=1`,
    //   method: "GET",
    //   success: function(data){
    //     for(let i = 0; i < data.photos.photo.length; i++){
    //       let path = data.photos.photo[i];
    //         if(photoInfo.picId.indexOf(data.photos.photo[i].id) === -1 &&   path.id !== undefined && path.farm !== undefined && path.server !== undefined && path.secret !== undefined){
    //             photoInfo.picId[i] = path.id;
    //             photoInfo.farmId[i] = path.farm;
    //             photoInfo.serverId[i] = path.server;
    //             photoInfo.secretId[i] = path.secret;
    //             photoURL.push(`http://farm${photoInfo.farmId[i]}.staticflickr.com/${photoInfo.serverId[i]}/${photoInfo.picId[i]}_${photoInfo.secretId[i]}.jpg`);
    //         // for(let i = 0; i <= photoInfo.picId.length;i++){
    //           //http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    //
    //           //  $.ajax({
    //           //    url:`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=0bf0839ee1fe6ee109720782d7ec8a63&photo_id=${photoInfo.picId[i]}&format=json&nojsoncallback=1`,
    //           //    method: "GET",
    //           //    success: function(data){
    //           //      if(photoURL.indexOf(data.photo.urls.url[0]._content) === -1){
    //           //        photoURL.push(data.photo.urls.url[0]._content);
    //           //      }
    //           //    }
    //           //  });
    //          //}
    //       }
    //     }
    //     console.log(photoInfo);
    //     console.log(photoURL);
    //   }
    // });
      //  for(let i = 0; i <= photoID.length;i++){
      //     $.ajax({
      //       url:`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=0bf0839ee1fe6ee109720782d7ec8a63&photo_id=${photoID[i]}&format=json&nojsoncallback=1`,
      //       method: "GET",
      //       success: function(data){
      //         if(photoURL.indexOf(data.photo.urls.url[0]._content) === -1){
      //           photoURL.push(data.photo.urls.url[0]._content);
      //         }
      //       }
      //     });
      //   }
      //   console.log(photoURL);

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
