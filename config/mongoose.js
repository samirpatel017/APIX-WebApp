const mongoose = require('mongoose');
const env = require('./environment');
//connect to database using connect
mongoose.connect(`mongodb://localhost/${env.db}`,{ useUnifiedTopology: true ,useNewUrlParser: true ,useCreateIndex: true});

//get data of database in db ussing connection
const db = mongoose.connection;

//on error occur show error in console
db.on('error', console.error.bind(console, 'connection error:'));

//run function when connection successfull
db.once('open', function() {
  // we're connected!
  console.log('Our Database Connection Is Successfully Esatablished')
});
module.exports = db;