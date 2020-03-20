const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const app = express();

require('./config/passport');
//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLayout);
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(validator());
app.use(passport.initialize());
app.use(passport.session());
//Router
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));
app.listen(3000, () => {
    console.log('Running');
})