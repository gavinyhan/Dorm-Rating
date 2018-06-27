'use strict';
const mongoose = require( 'mongoose' );

var universitySchema = mongoose.Schema( {
  university: String,
  dormbuilding: String,
  double: Boolean,
  single: Boolean,
  standardtriple: Boolean,
  forcedtriple: Boolean,
  suite: Boolean,
  floors: String,
  toilets: String,
  showers: String,
  sinks: String,
  includetowels: Boolean,
  includesoaps: Boolean,
  mixed: Boolean,
  malefemaleonseparateside: Boolean,
  gym: Boolean,
  bigbathroom: Boolean,
  bigshoweringarea: Boolean,
  picturesqueview: Boolean,
  bugs: Boolean,
  insights: String,
} );

module.exports = mongoose.model( 'University', universitySchema );
