const express = require('express');
const app = express();
// const cookieParser = require('cookie-parser');
const path = require('path');
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
  res.send('Jai jagannath')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
     