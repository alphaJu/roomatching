var express = require('express');
var router = express.Router();
var db = require('../database');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
}

router.get('/', function(req, res, next) {
  res.render('recommend_form');
});

router.get('/view', function(req, res, next) {
  res.render('recommend_view');
});

router.post('/insert', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var clean = req.body.clean;
  var life = req.body.life;
  var smoke = req.body.smoke;
  var house = req.body.house;
  var alcohol = req.body.alcohol;
  var ret = await db.NewRecommend(customer_id, clean, life, smoke, house, alcohol);
  res.json(ret);
}));

router.post('/modify', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var clean = req.body.clean;
  var life = req.body.life;
  var smoke = req.body.smoke;
  var house = req.body.house;
  var alcohol = req.body.alcohol;
  var ret = await db.ModifyRecommend(customer_id, clean, life, smoke, house, alcohol);
  res.json(ret);
}));

router.post('/view', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var ret = await db.GetRecommend(customer_id);
  res.json(ret);
}));

router.post('/calculate', asyncMiddleware(async function(req, res, next) {
  var ret = await db.CalculateRecommend();
  res.json(ret);
}));

router.post('/top', asyncMiddleware(async function(req, res, next) {
  var p1 = req.body.p1;
  var p2 = req.body.p2;
  var p3 = req.body.p3;
  var p4 = req.body.p4;
  var p5 = req.body.p5;
  var p6 = req.body.p6;
  var ret = await db.GetTop(p1, p2, p3, p4, p5, p6);
  res.json(ret);
}));

module.exports = router;
