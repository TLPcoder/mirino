Mirino: A photo based application where the user can position a drop pin using
google maps and specify search criteria anywhere in the world and by using
flickers API the app is able to render image’s taken in said location.

LIVE: https://mirino.herokuapp.com/

This was my first project for Galvanize Web Immersive Program. I am a big fan
of instagram and wanted to create something similar. Mirino is Italian for find
makes sense why an application that allows you to search images based on
location would be named that.

I used google maps to allow the user to find their location anywhere in the
world. When the user selects a location on the map two google map API objects
are created. A marker and a circle radius around the marker based on the users
search criteria

 ```javascript
    marker = new google.maps.Marker({
           draggable: true,
           position: {lat:latitude, lng:longitude},
           map: map,
           title: "Your location",
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
        center: {
            lat: latitude,
            lng: longitude
        },
        radius: miles,
    });
 ```

After the user click run two functions are fired from the event listener. The
first being changeDom(), this change the layout of the page and prepares for it
for the images that are about to be loaded. The second is getImages which takes
several parameters (latitude, longitude, tag, imageSort, imagesLoaded, radius)
and based on the values outcomes different images.
```javascript
    $.ajax({
        url: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0bf0839ee1fe6ee109720782d7ec8a63&safe_search=1&has_geo=true&lat=${lat}&lon=${lng}&radius=${radius}&accuracy=11&tags=${tag}&sort=${imageSort}&per_page=${imagesLoaded}&radius_units=mi&format=json&nojsoncallback=1`,
        method: "GET",
        success: function(data) {
            callbacks()
        }
    })
```


Foreach image returned from the API call to flicker a callback is made to
createDom(i) which take an index that represents the image in the photoInfo
array.

```javascript
    function createDom(i) {
        let row = document.createElement("div");
        row.className = "row col l3";
        let col = document.createElement("div");
        col.className = "col l12 l7";
        let img = document.createElement("img");
        img.className = "images";
        img.setAttribute('src', photoURL[i]);
        let anchor = document.createElement("a");
        anchor.setAttribute("href", photoInfo.imgURL[i]);
        anchor.setAttribute("target", "_blank");

        var appendToCard =(row).appendChild(col);

        appendToCard.appendChild(anchor).appendChild(img);

        return row;
    }
```

Once all images are loaded on the page the user can run further searches and
update the search criteria using both the side menu and search bar. They can
also chose a new position on the map by clicking the map button which will run
a function that changes the DOM once again.

This function is ran every time the user press the map function and it will either hide the map or show the map depending on the z-index.

```javascript
    function renderMap() {
        let map = document.getElementById("map");
        let imageContainer = document.getElementById("image-container");
        if ($(map).css("z-index") == 10) {
            console.log($(map).css("z-index"));
            $(map).css("z-index", "1");
            imageContainer.style.opacity = "1";
        } else {
            $(map).css("z-index", "10");
            imageContainer.style.opacity = "0.2";
        }
    }
```

Looking back on this code I can see how far I have come. I have improved in every way as a programmer and look forward to creating Mirino 2.0 in React-Redux or Angular 4 in the future.
