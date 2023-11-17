const mongoose = require('mongoose');

// I have two databases 1. MeanUxTrenndz, 2. test

// for "MeanUxTrenndz" database
const uri = 'mongodb+srv://ankurswami17:ankur123@cluster0.ynqxf7e.mongodb.net/MeanUxTrenndz?retryWrites=true&w=majority'

// for "text" database
// const uri = 'mongodb+srv://ankurswami17:ankur123@cluster0.ynqxf7e.mongodb.net/test?retryWrites=true&w=majority'

// const uri = `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database Connection Successful');
  })
  .catch((err) => {
    console.log('Error in DB Connection: ', err);
  });

module.exports = mongoose
