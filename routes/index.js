var express = require('express');
var router = express.Router();
var db = require('../database');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loginInfo){
    return res.render('body');
  }
  res.redirect('/customer')
});

router.get('/body', function(req, res, next) {
  res.render('body', {content: res.render('header')});
});

router.get('/map', function(req, res, next) {
  res.render('map_test');
});

router.get('/getInfo', function(req, res){
  res.json({'customer_id': req.session.loginInfo.customer_id, 'id': req.session.loginInfo._id, 'name' : req.session.loginInfo.name})
});

router.post('/test', asyncMiddleware(async function(req, res, next) {
  var ret = await db.Test();
  res.json(ret);
}));

router.post('/button_1', asyncMiddleware(async function(req, res, next) {
  var ret = await db.GetInfo();
  res.json(ret);
}));

router.post('/button_2', asyncMiddleware(async function(req, res, next) {
  var ret = await db.GetRec();
  res.json(ret);
}));

module.exports = router;
