var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('in get for submit')
  res.render('submit', { title: 'Dorm Rating', floors:0 });
});

router.post('/', function(req, res, next) {
  let data =
  {
    nameofuniversity:req.body.university,
    nameofdormbuilding:req.body.nameofdormbuilding,
    double:req.body.double,
    single:req.body.single,
    standardtriple:req.body.standardtriple,
    forcedtriple:req.body.forcedtriple,
    suite:req.body.suite,
    floors:req.body.floors,
    toilets:req.body.toilets,
    showers:req.body.showers,
    sinks:req.body.sinks,
    includetowels:req.body.includetowels,
    includesoaps:req.body.includesoaps,
    mixed:req.body.mixed,
    malefemaleonseparateside:req.body.malefemaleonseparateside,
    gym:req.body.gym,
    bigbathroom:req.body.bigbathroom,
    bigshoweringarea:req.body.bigshoweringarea,
    picturesqueview:req.body.picturesqueview,
    bugs:req.body.bugs,
    insights: req.body.insights
  }
  console.log(data)
  res.render('submit', { title: 'Dorm Rating' , data});
});

module.exports = router;
