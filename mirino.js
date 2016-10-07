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

    var marker;
    var circle;
    var imageSort;
    var imagesLoaded;
    var radius;
    var miles = 500;
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
      miles = button.value * 500;
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
              //  label: appName[0],
              animation: google.maps.Animation.DROP,
              icon: "http://orig05.deviantart.net/257e/f/2013/284/7/6/free_bouncy_bulbasaur_icon_by_kattling-d6q2fij.gif"
          });
    circle = new google.maps.Circle({
            strokeColor: 'white',
            strokeOpacity: 0.9,
            strokeWeight: 2,
            fillColor: '#03a9f4',
            fillOpacity: 0.35,
            map: map,
            center: {lat:latitude, lng:longitude},
            radius: miles,
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

  });

  document.getElementById("map-button").addEventListener("click", function(e){
      renderMap();
  });

  }
};

//google.maps.event.addDomListener(window, 'load', initialize);
