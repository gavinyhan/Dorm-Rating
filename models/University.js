'use strict';
const mongoose = require( 'mongoose' );

var universitySchema = mongoose.Schema( {
  university: String,
  dormbuilding: String,
} );

module.exports = mongoose.model( 'University', universitySchema );
