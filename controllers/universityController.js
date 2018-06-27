'use strict';
const University = require( '../models/university' );
console.log("loading the university Controller")


// this displays all of the university
exports.getAllUniversity = ( req, res ) => {
  console.log('in getAllUniversity')
  University.find( {} )
    .exec()
    .then( ( dorm ) => {
      console.log(`dorm = ${dorm}`)
      res.render( 'submit', {
        dorm: dorm
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'university promise complete' );
    } );
};




exports.saveUniversity = ( req, res ) => {
  console.log("in saveUniversity!")
  console.dir(req)
  let newUniversity = new University( {
    university: req.body.university,
    dormbuilding: req.body.dormbuilding,
    double: req.body.double=='on',
    single: req.body.single=='on',
    standardtriple: req.body.standardtriple=='on',
    forcedtriple: req.body.forcedtriple=='on',
    suite: req.body.suite=='on',
    floors: req.body.floors,
    toilets: req.body.toilets,
    showers: req.body.showers,
    sinks: req.body.sinks,
    includetowels: req.body.includetowels=='on',
    includesoaps: req.body.includesoaps=='on',
    mixed: req.body.mixed=='on',
    malefemaleonseparateside: req.body.malefemaleonseparateside=='on',
    gym: req.body.gym=='on',
    bigbathroom: req.body.bigbathroom=='on',
    bigshoweringarea: req.body.bigshoweringarea=='on',
    picturesqueview: req.body.picturesqueview=='on',
    bugs: req.body.bugs=='on',
    insights: req.body.insights,
  } )

  console.log("university = "+newUniversity)

  newUniversity.save()
    .then( () => {
      res.redirect( '/dorm' );
    } )
    .catch( error => {
      res.send( error );
    } );
};


const mongo = require('mongodb');

exports.attachUniversity=(req,res,next)=>{
  console.log('in attachUniversity')
  const objId = new mongo.ObjectId(req.params.id)
  University.findOne(objId)
    .exec()
    .then((university)=> {
      res.locals.university = university
      next()
    })
    .catch((error)=>{
      console.log(error.message)
      return []
    })
    .then(()=>{
      console.log('attachUniversity promise complete')
    })
}
