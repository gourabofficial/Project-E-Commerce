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
const indexRouter = require("./route/index")
const shopRoutes = require('./route/shopRouts');


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

app.get('/shop', (req, res) => {
  res.render('shop',{error: req.flash("error")});
})


app.use('/',shopRoutes)
app.use('/', indexRouter);
app.use("/owners", ownerRouter);
app.use("/users", usersRouter);
app.use("/product", productsRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
     
