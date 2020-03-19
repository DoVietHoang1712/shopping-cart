const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const app = express();

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLayout);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

//Router
app.use('/', require('./routes/index'));
app.listen(3000, () => {
    console.log('Running');
})