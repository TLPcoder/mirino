"use strict"
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

  readQueryParams();

  function readQueryParams() {

      if(document.location.search) {
          var queryString = document.location.search.replace('?', '');

          queryString.split('&').forEach(function (pair) {
              var pairArray = pair.split('=');

              placesLocation.push(pairArray[1]);
          });
      }
      console.log(placesLocation);
  }

$.ajax({
  url:`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0bf0839ee1fe6ee109720782d7ec8a63&safe_search=1&has_geo=true&lat=${placesLocation[0]}&lon=${placesLocation[1]}&radius=1&accuracy=11&tags=food,giants&per_page=10&format=json&nojsoncallback=1`,
  method: "GET",
  success: function(data){
    // for loop to create rows
    let main = document.getElementById("container");
      // for loop to create columns

    for(let i = 0; i < data.photos.photo.length; i++){
      if(i % 3 === 0){
        var rows = document.createElement("div");
        rows.className = "row col m12";
        console.log("hello");
      }
      let path = data.photos.photo[i];
        if(photoInfo.picId.indexOf(data.photos.photo[i].id) === -1 &&   path.id !== undefined && path.farm !== undefined && path.server !== undefined && path.secret !== undefined){
            photoInfo.picId[i] = path.id;
            photoInfo.farmId[i] = path.farm;
            photoInfo.serverId[i] = path.server;
            photoInfo.secretId[i] = path.secret;
            photoURL.push(`http://farm${photoInfo.farmId[i]}.staticflickr.com/${photoInfo.serverId[i]}/${photoInfo.picId[i]}_${photoInfo.secretId[i]}_n.jpg`);
           $.ajax({
             url:`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=0bf0839ee1fe6ee109720782d7ec8a63&photo_id=${photoInfo.picId[i]}&format=json&nojsoncallback=1`,
             method: "GET",
             success: function(data){
              photoInfo.country[i] =
              data.photo.location.country._content;
              photoInfo.county[i] = data.photo.location.county._content;
              photoInfo.imgURL[i] = data.photo.urls.url[0]._content;
              //let main = document.getElementById("container");
              //let rows = document.createElement("div");
                  //rows.className = "row col m12";
                  // rows.className = "rows row col m12";
                  // main.appendChild(rows);
                  main.appendChild(rows).appendChild(createDom());

              function createDom(){
                //for(let i = 0; i < photoURL.length; i++){
                  let row = document.createElement("div");
                    row.className = "row";
                  let col = document.createElement("div");
                    col.className = "col s12 m7";
                  let card = document.createElement("div");
                    card.className = "card";
                  let cardImg = document.createElement("div");
                    cardImg.className = "card-image";
                  let img = document.createElement("img");
                      img.setAttribute('src', photoURL[i]);
                  let content = document.createElement("div");
                      content.className = "card-content";
                  let paragraph = document.createElement("p");
                      paragraph.innerText = photoInfo.county[i];
                  let action = document.createElement("div");
                      action.className = "card-action";
                  let anchor = document.createElement("a");
                      anchor.setAttribute("href", photoInfo.imgURL[i]);
                      anchor.innerText = "link to image";

                  var appendToCard =
                  (row).appendChild(col).appendChild(card);

                  appendToCard.appendChild(cardImg).appendChild(img);
                  appendToCard.appendChild(content).appendChild(paragraph);
                  appendToCard.appendChild(action).appendChild(anchor);

                  return row;
                //}
              }
             }
          });
        }
      }

      //   var main = document.getElementById("container");
      //   for(var i = 0; i < photoURL.length; i++){
      //     let row = $("<div class = 'row'>");
      //     let col = $("<div class = 'col s12 m7'>");
      //     let card = $("<div class = 'card'>");
      //     let cardImg = $("<div class = 'card-image'>");
      //     let img = $(`<img src = ${photoURL[i]}>`);
      //     let content =  $("<div class='card-content'>");
      //     let para = $("<p>");
      //      $(para).text("Hello");
      //     //let currentImg = img.setAttribute('src', photoURL[i]);
      //     $(main).append(row).append(col).append(card).append(cardImg).append(img).append(content).append(para);
      // }
    //   <div class="row">
    //    <div class="col s12 m7">
    //      <div class="card">
    //        <div class="card-image">
    //          <img src="http://farm8.staticflickr.com/7526/29809612290_d516f241d5.jpg">
    //          <span class="card-title">Card Title</span>
    //        </div>
    //        <div class="card-content">
    //          <p>I am a very simple card. I am good at containing small bits of information.
    //          I am convenient because I require little markup to use effectively.</p>
    //        </div>
    //        <div class="card-action">
    //          <a href="#">This is a link</a>
    //        </div>
    //      </div>
    //    </div>
    //  </div>
      console.log(photoInfo);
      console.log(photoURL);
    }
  });
