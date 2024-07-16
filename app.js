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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", function (request, response) {
  
        response.render("index")
    
});
app.post('/verifyAge', function (request, response){
        request.session.verifyAge = true;
    
})
app.get("/products", function (request, response) {
   
        response.render("products");
});
app.get("/contact", function (request, response) {
   
        response.render("contact");
   
   
});
app.get("/products-seed", function (request, response) {
        response.render("products_1");
   
});
app.get("/products-flower", function (request, response) {
        response.render("products_2");
    
});
app.get("/products-leaf", function (request, response) {
        response.render("products_3");
   
});
app.get("/certificate", function (request, response) {
        response.render("certificate");
    
});
app.get('*', function(req, res){
    res.redirect('/')
  });

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Listening at Port " + port);
});