"use strict";
var placesLocation = [];
var photoInfo = {
    picId: [],
    farmId: [],
    serverId: [],
    secretId: [],
    tag: [],
    country: [],
    county: [],
    imgURL: []
};
var photoURL = [];

function getImages(lat, lng, tag, imageSort, imagesLoaded, radius) {
    if (imageSort === undefined) {
        console.log("imageSort " + undefined);
        imageSort = "relevance";
    }
    if (imagesLoaded === undefined) {
        imagesLoaded = 20;
    }
    if (radius === undefined) {
        radius = 1;
    }
    radius = Number(radius);
    console.log("imageSort " + imageSort + " imagesLoaded " + imagesLoaded + " radius " + radius);
    $.ajax({
        url: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0bf0839ee1fe6ee109720782d7ec8a63&safe_search=1&has_geo=true&lat=${lat}&lon=${lng}&radius=${radius}&accuracy=11&tags=${tag}&sort=${imageSort}&per_page=${imagesLoaded}&radius_units=mi&format=json&nojsoncallback=1`,
        method: "GET",
        success: function(data) {
            console.log(data)
            let removeImages = document.getElementById("image-container");
            removeImages.innerHTML = "";
            photoInfo = {
                picId: [],
                farmId: [],
                serverId: [],
                secretId: [],
                tag: [],
                country: [],
                county: [],
                imgURL: []
            };
            photoURL = [];
            let mapElements = document.getElementById("image-container");
            // for loop to create columns
            var currentRow;
            console.log("data " + data.photos.photo.length);
            for (let i = 0; i < data.photos.photo.length; i++) {
                if (i % 4 === 0) {
                    currentRow = document.createElement("div");
                    mapElements.appendChild(currentRow);
                    currentRow.className = "row col m12";
                }
                let path = data.photos.photo[i];
                if (photoInfo.picId.indexOf(data.photos.photo[i].id) === -1 && path.id !== undefined && path.farm !== undefined && path.server !== undefined && path.secret !== undefined) {
                    photoInfo.picId[i] = path.id;
                    photoInfo.farmId[i] = path.farm;
                    photoInfo.serverId[i] = path.server;
                    photoInfo.secretId[i] = path.secret;
                    photoURL.push(`http://farm${photoInfo.farmId[i]}.staticflickr.com/${photoInfo.serverId[i]}/${photoInfo.picId[i]}_${photoInfo.secretId[i]}.jpg`);

                    $.ajax({
                        url: `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=0bf0839ee1fe6ee109720782d7ec8a63&photo_id=${photoInfo.picId[i]}&format=json&nojsoncallback=1`,
                        method: "GET",
                        success: generateCurrentRowCB(currentRow, i)
                    });
                }
            }
        }
    });
}

function generateCurrentRowCB(currentRow, i) {
    return function(data) {
        photoInfo.country[i] =
            data.photo.location.country._content;
        var tagNames = [];
        photoInfo.tag[i] = tagNames;
        photoInfo.county[i] = data.photo.location.county._content;
        photoInfo.imgURL[i] = data.photo.urls.url[0]._content;
        currentRow.appendChild(createDom(i));
    };
}

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

    var appendToCard =
        (row).appendChild(col);

    appendToCard.appendChild(anchor).appendChild(img);

    return row;
}

function changeDom() {
    let map = document.getElementById("map");
    let imageContainer = document.getElementById("image-container");
    let white = document.getElementById("white-container");
    let mapButtonDiv = document.getElementById("map-button");
    $(imageContainer).css("z-index", "9");
    $(map).css("z-index", "1");
    $(white).css("z-index", "2");
    $(white).css("background-color", "white");
    $(imageContainer).css("background-color", "white");
    let mapButton = document.createElement("button");
    imageContainer.style.opacity = "1";
    mapButtonDiv.innerHTML = "";
    mapButton.className = "btn-floating btn-large waves-effect waves-light indigo lighten-1 right-align";
    mapButton.setAttribute("style", "margin-left:50%");
    mapButton.innerText = "Map";
    mapButton.id = "mapButton";
    mapButtonDiv.appendChild(mapButton);

}

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
