"use strict";
var express = require("express");
var PORT = 8000;
var app = express();

app.use("/public",express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/mirino.html");
});

app.listen(PORT, function(){
  console.log(PORT);
});
