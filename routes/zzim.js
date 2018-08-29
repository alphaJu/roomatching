var express = require('express');
var router = express.Router();
var db = require('../database');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
}

router.get('/', function(req, res, next) {
  res.render('zzim_list');
});

router.post('/insert', asyncMiddleware(async function(req, res, next) {
  var loving = req.body.loving;
  var loved = req.body.loved;
  var ret = await db.NewZzim(loving, loved);
  res.json(ret);
}));

router.post('/delete', asyncMiddleware(async function(req, res, next) {
  var zzim_id = req.body.zzim_id;
  var ret = await db.DeleteZzim(zzim_id);
  res.json(ret);
}));

router.post('/loved', asyncMiddleware(async function(req, res, next) {
  var loved = req.body.loved;
  var ret = await db.GetLoved(loved);
  res.json(ret);
}));

router.post('/loving', asyncMiddleware(async function(req, res, next) {
  var loving = req.body.loving;
  var ret = await db.GetLoving(loving);
  res.json(ret);
}));

module.exports = router;
