if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express();
const mongoose = require('mongoose')
const path = require('path')
var methodOverride = require('method-override')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const flash = require('connect-flash');
const User = require('./models/user')
const seedDB = require('./seed')

// console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("OH NO ERROR!!!");
        console.log(err)
    });
//seed the database with defaults products

// seedDB();

//routes

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes =  require('./routes/cartRoutes')
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/myorder');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

const sessionConfig={
    secret:"keyboard",
    resave: false,
    saveUninitialized:true,
}

app.use(session(sessionConfig));
app.use(flash());
//intilize passport


app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})


app.get('/', (req, res) => {
    res.render("home");
});



app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(paymentRoutes);


app.get('/',(req,res)=>{
    res.send("Server Connected")
})

app.get('/error', (req, res) => {
    res.render('error');
})



app.listen(process.env.PORT || 3000,()=>{
    console.log('Server Started at port 3000')
})