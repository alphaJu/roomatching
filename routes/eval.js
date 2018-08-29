var express = require('express');
var router = express.Router();
var db = require('../database');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
}

router.get('/', function(req, res, next) {
  res.render('eval_form');
});

router.get('/list', function(req, res, next) {
  res.render('eval_list');
});

router.post('/insert', asyncMiddleware(async function(req, res, next) {
  var ed_custom = req.body.ed_custom;
  var er_custom = req.body.er_custom;
  var q1 = req.body.q1;
  var q2 = req.body.q2;
  var q3 = req.body.q3;
  var q4 = req.body.q4;
  var sub = req.body.sub;
  var ret = await db.InsertEval(ed_custom, er_custom, q1, q2, q3, q4, sub);
  res.json(ret);
}));

router.post('/list', asyncMiddleware(async function(req, res, next) {
  var ed_custom = req.body.ed_custom;
  var ret = await db.EvalList(ed_custom);
  res.json(ret);
}));

router.post('/auth', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var ret = await db.EvalAuth(customer_id);
  res.json(ret);
}));

module.exports = router;
