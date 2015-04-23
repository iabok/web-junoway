var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/imports");

module.exports = mongoose.connection;