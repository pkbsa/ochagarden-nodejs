var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "ochagarden",
// });
  
// connection.connect((error) => {
//     if (error) console.log(error);
//     else console.log("MYSQL Connected...");
// });

var app = express();

app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );
  

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

const publicDirectory = path.join(__dirname + "/css");
app.use(express.static(publicDirectory));

app.set("view engine", "ejs");


app.get("/", function (request, response) {
    if(request.session.verifyAge === true){
        response.render("index")
    }else{
        response.render('ageverify')
    }
});
app.post('/verifyAge', function (request, response){
    if(request.body.birthYear < 2546){
        request.session.verifyAge = true;
    }
    response.redirect('/');
})
app.get("/products", function (request, response) {
   
    if(request.session.verifyAge === true){
        response.render("products");
    }else{
        response.render('ageverify')
    }
});
app.get("/contact", function (request, response) {
    if(request.session.verifyAge === true){
        response.render("contact");
    }else{
        response.render('ageverify')
    }
   
});

app.listen(3000, function(){
    console.log("Listening at Port 3000")
});