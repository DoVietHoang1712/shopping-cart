const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const {mongoose} = require('./database/database');
const MongoStore = require('connect-mongo')(session);
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
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180*60*1000}
}));
app.use(validator());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
})
//Router
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));
app.listen(3000, () => {
    console.log('Running');
})