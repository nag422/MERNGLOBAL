require('dotenv').config();
require('express-async-errors');
const chalk = require('chalk');
var config = require('config');
var express = require('express');
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var path = require('path');
var {glob} = require('glob');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const connectDB = require('./config/dbConn');

connectDB();
var app = express()




// cors
app.use(cors(corsOptions));



// request body parsing into json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

// checking NODE_ENV
if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = 'dev'
}

// // get config variables
// const host = config.get('mongo.host')
// const database = config.get(mongo.database)
// const port = config.get('port')

// get config variables
const host = config.get('mongo.host')
const database = config.get('mongo.database')
var port = config.get('port')



  // // adding all routes into express(app)
  // glob(
  //   path.dirname(require.main.filename) + '/app/modules/**/routes/*.js',
  //   function (err, files) {
  //     if (files && files.length) {        
  //       files.forEach(function (file) {
  //         require(file)(app)
  //       })
  //     }
  //   }
  // )


  // Server listening
// Api for server status
app.get('/', function (req, resp) {
    let env = process.env.NODE_ENV
    if (env === 'dev' || env === 'test') {
      resp.status(200).json({
        status: 'Server is running on http://localhost:' + port,
        message: 'Welcome to GLOBAL-MERN-microservice API Server',
        env: env
      })
    } else {
      resp.status(200).json({
        status: config.get('API_URL') + ' is running.',
        message: 'Welcome to GLOBAL-MERN-microservice API Server',
        env: env
      })
    }
  });

  app.use('/auth', require('./app/modules/users/routes/user.route'));

  app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found');
    }
});

  app.listen(port, () => {
    console.log(chalk.green(`[+] Server is running on : ${port}`))
    console.log(chalk.green(`[+] NODE_ENV : ${process.env.NODE_ENV}`))
    console.log(chalk.green(`[+] MONGO_HOST : ${host}`))
    console.log(chalk.green(`[+] MONGO_DATABASE : ${database}`))
  })

  module.exports = app
