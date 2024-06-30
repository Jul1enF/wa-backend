const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://jfuric:5lLjaIFU8hsuzaDh@cluster0.wuldbl0.mongodb.net/weatherapp';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
