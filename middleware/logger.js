'use strict';

const moment = require('moment'); //a module to handle time display
const PORT = process.env.PORT || 5000;

//define middleware
const logger = (req, res, next) => {
  console.log('received request on port ' + PORT);
  //returns on terminal console "received request on port "5000" at "certain moment"
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
  //returns on terminal console the requested url and the time it has been requested
  next();
  //next is required by sintax (for the moment)
};

module.exports = logger;
