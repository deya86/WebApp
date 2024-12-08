const mongoose = require('mongoose');

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('DB Connected successfully');
});

connection.on('error', (err) => {
  console.error('DB Connection error:', err.message);
});

connection.on('disconnected', () => {
  console.log('DB Disconnected');
});

module.exports = mongoose;
