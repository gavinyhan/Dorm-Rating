'use strict';
const Info = require('../models/info');
console.log("loading the infoController")

exports.saveInfo=(req,res)=>{
  console.log("in saveInfo")
  console.dir(req)
  let newInfo=new Info({
    double: req.body.double,
    single: req.body.single,
    standardtriple: req.body.standardtriple,
    forcedtriple: req.body.forcedtriple,
    suite: req.body.suite,
    floors: req.body.floors,
    toilets: req.body.toilets,
    showers: req.body.showers,
    sinks: req.body.sinks,
    includetowels: req.body.includetowels,
    includesoaps: req.body.includesoaps,
    mixed: req.body.mixed,
    malefemaleonseparateside: req.body.malefemaleonseparateside,
    gym: req.body.gym,
    bigbathroom: req.body.bigbathroom,
    bigshoweringarea: req.body.bigshoweringarea,
    picturesqueview: req.body.picturesqueview,
    bugs: req.body.bugs,
    insights: req.body.insights,
  })

  console.log("info="+newInfo)

  newInfo.save()
    .then(()=>{
      res.redirect('/dorm')
    })
    .catch(error=>{
      res.send(error)
    })
}

exports.getAllInfo=(req,res)=>{
  console.log('in getAllInfo')
  Info.find({})
    .exec()
    .then((info)=>{
      console.log('info='+info)
      res.render('info',{info:info})
    })
    .catch((error)=>{
      console.log(error.message)
      return[]
    })
    .then(()=>{
      console.log('info promise complete')
    })
}


const mongo = require('mongodb')

exports.attachInfo=(req,res,next)=>{
  console.log('in attachInfo')
  const objId=new mongo.ObjectId(req.params.id)
  Info.findOne(objId)
    .exec()
    .then((user)=>{
      res.locals.info=info
      next()
    })
    .catch((error)=>{
      console.log(error.message)
      return[]
    })
    .then(()=>{
      console.log('attachInfo promise complete')
    })
}

exports.getInfo=(req,res)=>{
  const objId=new mongo.ObjectId(req.params.id)
  Info.findOne(objId)
    .exec()
    .then((info)=>{
      res.render('info',{info:info})
    })
    .catch((error)=>{
      console.log(error.message)
      return[]
    })
    .then(()=>{
      console.log('getInfo promise complete')
    })
}
