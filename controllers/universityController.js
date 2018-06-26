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
    dormbuilding: req.body.dormbuilding
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
