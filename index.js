require('dotenv').config();
// console.log(process.env.SESSION_SECRET) TO DO DEBUG
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/login/auth.middleware');
const sessionsMiddleware = require('./middleware/session/sessions.middleware');

const userRoute = require('./Routes/user.route');
const authRoute = require('./Routes/auth.route');
const productsRoute = require('./Routes/products.route');
const homeRoute = require('./Routes/home.route');
const cartRoute = require('./Routes/cart.route');

//Midlleware bodyparser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//cookies parser
app.use(cookieParser(process.env.SESSION_SECRET));
//Use template enegines Pug
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(sessionsMiddleware.sessionMiddleware);
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })
// app.get('/', function (req, res) {
//     res.render('index', { title: 'Hey', message: 'Hello there!' })
// }
// var users = [
//   {name: 'user1'},
//   {name: 'user2'},
//   {name: 'user3'},
//   {name: 'user4'},
//   {name: 'user5'},
// ];

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/', homeRoute);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})