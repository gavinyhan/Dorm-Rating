'use strict';
const University = require( '../models/university' );
console.log("loading the new dormController")


// this displays all of the university
exports.getAllDorm = (req, res ) => {
  console.log('in dorm controller')
  University.find( {} )
   .exec()
   .then( ( dorm ) => {
     console.log(`dorm = ${dorm}`)
     res.render( 'dorm', {
       dorm: dorm
     } );
   } )
   .catch( ( error ) => {
     console.log( error.message );
     return [];
   } )
   .then( () => {
     console.log( 'university promise complete' );
   } )
}


const mongo = require('mongodb');

exports.attachDorm=(req,res,next)=>{
  console.log('in attachDorm')
  const objId = new mongo.ObjectId(req.params.id)
  University.findOne(objId)
    .exec()
    .then((dorm)=> {
      res.locals.dorm = dorm
      next()
    })
    .catch((error)=>{
      console.log(error.message)
      return []
    })
    .then(()=>{
      console.log('attachDorm promise complete')
    })

}
