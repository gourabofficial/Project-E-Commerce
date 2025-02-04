const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const port = 3000;
const db = require('./config/mongoose-connection');
const expressSession = require("express-session");
const flash = require("connect-flash");
const ownerRouter = require("./route/ownerRouter"); 
const usersRouter = require("./route/usersRouter"); 
const productsRouter = require("./route/productsRouter"); 
const indexRouter = require("./route/indexRouter")
const shopRoutes = require('./route/shopRouter');
const addtoCart = require('./route/addToCart');
const profileRouter = require('./route/profileRouter');


require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser());


app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index',{error: req.flash("error")});
})

app.get('/login', (req, res) => {
  res.render('index', { error: req.flash("error") });
});



app.use('/',shopRoutes)
app.use('/', indexRouter);
app.use("/users", usersRouter);
app.use("/product", productsRouter);
app.use('/', addtoCart);
app.use('/', profileRouter);
app.use("/", ownerRouter);



app.listen(port, () => {
  console.log(`Server started ,port: ${port}`)
})
     
