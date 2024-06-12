const express = require("express"); //basic server

const mongoose = require("mongoose");// mongoose package to connect to db

const app = express(); // initilize the app using express module

// connect to mongodb
mongoose.connect("mongodb://localhost/ToDo",{
    useNewUrlParser: true, // to not get warning
    useUnifiedTopology: true,
});

//middlewares
app.use(express.urlencoded({extended:true})); //to recive data
app.use(express.static("public")); // public folder is static
app.set("view engine","ejs");//set the engine

//routes
app.use(require("./routes/index"));
app.use(require("./routes/todo"));

// server configurations
const port = 3000; // create the port number
app.listen(port,() => {
    console.log(`Server started listening on port : ${port}`)
}); 
