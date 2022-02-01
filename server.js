const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

// set up Handlebars.js start

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// ending of handlebars.js set up 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



// turn on connection to db and server
// changing force to true will connect database to sync with model definitions and associations
// forcing to true will make tables re-create if there are any association changes. 
// true only t test if user tables drop, switch back to false
sequelize.sync({ force: true}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});