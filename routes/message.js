var express = require('express');
var router = express.Router();
var db = require('../database');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
}

router.get('/', function(req, res, next) {
  res.render('message_form');
});

router.get('/list', function(req, res, next) {
  res.render('message_received_list');
});

router.get('/view', function(req, res, next) {
  res.render('message_view');
});

router.post('/insert', asyncMiddleware(async function(req, res, next) {
  var sender = req.body.sender;
  var receiver = req.body.receiver;
  var content = req.body.content;
  var s_time = req.body.s_time;
  var reading = req.body.reading;
  var ret = await db.NewMessage(sender, receiver, content, s_time, reading);
  res.json(ret);
}));

router.post('/delete', asyncMiddleware(async function(req, res, next) {
  var message_id = req.body.message_id;
  var ret = await db.DeleteMessage(message_id);
  res.json(ret);
}));

router.post('/view', asyncMiddleware(async function(req, res, next) {
  var msg_id = req.body.msg_id;
  var sender = req.body.sender;
  var receiver = req.body.receiver;
  var ret = await db.GetMessageDetail(msg_id, sender, receiver);
  res.json(ret);
}));

router.post('/list', asyncMiddleware(async function(req, res, next) {
  var receiver = req.body.receiver;
  var ret = await db.GetMessages(receiver);
  res.json(ret);
}));

module.exports = router;
