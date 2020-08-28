// jshint esversion:6

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const request = require("request");

const ejs = require("ejs");


let items = ["Wake Up", "Pray to God"];

let workItem = [];


app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static("public"));


app.get("/", function(req, res) {

    let today = new Date();

    let options = {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric"
    };


    let finalDay = today.toLocaleDateString("en-US", options);


    //let currentDay = today.getDay();
    //let day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    //finalDay = day[currentDay];

    res.render("list", { listTitle: finalDay, newItem: items });
});



app.get("/work", function(req, res) {
    res.render("list", {
        listTitle: "Work List",
        newItem: workItem
    });

});


app.get("/about", function(req, res) {
    res.render("about");
});

app.post("/", function(req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work List") {
        workItem.push(item);
        res.redirect("/work");
    } else {

        items.push(item);
        res.redirect("/");
    }
});




app.listen(3000, function() {
    console.log("Server started on port 3000");
});