// contains all dependencies and main server
const express = require("express");
const expressLayouts = require('express-ejs-layouts'); // to create layouts for different scenarios through bootstrap
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express(); 
const port = process.env.PORT || 3000; // port number

//store database details
require('dotenv').config();


// middleware
app.use(express.urlencoded({ extended: true}));// pass url encoded bodies
app.use(express.static('public')); // everytime we require scripts the path will be created automatically
app.use(expressLayouts);

app.use(cookieParser('BookBlogSecure'));
app.use(session({
    secret: 'BookBlogSession',
    saveUninitialized: true,
    resave: true,
}));
app.use(flash());
app.use(fileUpload());

app.set('layout','./layouts/main');//set layout folder
app.set('view engine','ejs');//set the view engine

//routes
const bookRoutes = require('./server/routes/bookRoutes.js'); //create routes
app.use('/',bookRoutes);


app.listen(port, () => console.log(`Listening to port ${port}`));