var express = require('express');
var router = express.Router();
var db = require('../database');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
}

router.get('/', function(req, res, next) {
  res.render('info_form');
});

router.get('/list', function(req, res, next) {
  res.render('list');
});

router.get('/view', function(req, res, next) {
  res.render('info_view');
});

router.get('/modify', function(req, res, next) {
  res.render('info_modify');
});

router.get('/filter', function(req, res, next) {
  res.render('filter_result');
});

router.post('/insert', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var awake_id = req.body.awake_id;
  var sleep_id = req.body.sleep_id;
  var habit_id = req.body.habit_id;
  var status_id = req.body.status_id;
  var apw_id = req.body.apw_id;
  var smoking = req.body.smoking;
  var etc = req.body.etc;
  var house_exist = req.body.house_exist;
  var house_img = req.body.house_img;
  var house_loc = req.body.house_loc;
  var ret = await db.NewInfo(customer_id, awake_id, sleep_id, habit_id, status_id, apw_id, smoking, etc, house_exist, house_img, house_loc);
  res.json(ret);
}));

router.post('/modify', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var awake_id = req.body.awake_id;
  var sleep_id = req.body.sleep_id;
  var habit_id = req.body.habit_id;
  var status_id = req.body.status_id;
  var apw_id = req.body.apw_id;
  var smoking = req.body.smoking;
  var etc = req.body.etc;
  var house_exist = req.body.house_exist;
  var house_img = req.body.house_img;
  var house_loc = req.body.house_loc;
  var ret = await db.ModifyInfo(customer_id, awake_id, sleep_id, habit_id, status_id, apw_id, smoking, etc, house_exist, house_img, house_loc);
  res.json(ret);
}));

router.post('/view', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var ret = await db.GetOneInfo(customer_id);
  res.json(ret);
}));

router.post('/list', asyncMiddleware(async function(req, res, next) {
  var ret = await db.GetList();
  res.json(ret);
}));

router.post('/select', asyncMiddleware(async function(req, res, next) {
  var query = req.body.query;
  var ret = await db.GetFilter(query);
  res.json(ret);
}));

module.exports = router;
