const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

// const User = require('./models/user');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   // User.findById('656af641aa51ed6bc064653c')
//   //   .then(user => {
//   //     req.user = new User(user.name, user.email, user.cart, user_id);
//   //     next();
//   //   })
//   //   .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb+srv://hemant:mongopassword@cluster0.f94zpeh.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    app.listen(3000);
    console.log('server started!');
  })
  .catch(err => {
    console.log(err);
  })