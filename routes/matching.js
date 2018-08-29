var express = require('express');
var router = express.Router();
var db = require('../database');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
}

router.get('/', function(req, res, next) {
  res.render('matching_list');
});

router.post('/insert', asyncMiddleware(async function(req, res, next) {
  var mate_a = req.body.mate_a;
  var mate_b = req.body.mate_b;
  var progress_id = req.body.progress_id;
  var ret = await db.NewMatching(mate_a, mate_b, progress_id);
  res.json(ret);
}));

router.post('/received', asyncMiddleware(async function(req, res, next) {
  var mate_b = req.body.mate_b;
  var ret = await db.GetReceivedMatching(mate_b);
  res.json(ret);
}));

router.post('/sent', asyncMiddleware(async function(req, res, next) {
  var mate_a = req.body.mate_a;
  var ret = await db.GetSentMatching(mate_a);
  res.json(ret);
}));

router.post('/answer', asyncMiddleware(async function(req, res, next) {
  var matching_id = req.body.matching_id;
  var progress_id = req.body.progress_id;
  var ret = await db.AnswerMatching(matching_id, progress_id);
  res.json(ret);
}));

router.post('/list', asyncMiddleware(async function(req, res, next) {
  var mate_a = req.body.mate_a;
  var ret = await db.GetAllMatching(mate_a);
  res.json(ret);
}));

router.post('/cancel', asyncMiddleware(async function(req, res, next) {
  var matching_id = req.body.matching_id;
  var ret = await db.DeleteMatching(matching_id);
  res.json(ret);
}));

module.exports = router;
