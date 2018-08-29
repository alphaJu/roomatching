var express = require('express');
var router = express.Router();
var db = require('../database');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/join', function(req, res, next) {
  res.render('join_form'); // 원래는 join_form
});

router.get('/join2', function(req, res, next) {
  res.render('join_form2'); // 원래는 join_form
});

router.get('/view', function(req, res, next) {
  res.render('customer_view');
});

router.get('/modify', function(req, res, next) {
  res.render('customer_form');
});

router.post('/insert', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var name = req.body.name;
  var phone = req.body.phone;
  var birth = req.body.birth;
  var sex = req.body.sex;
  var pwd = req.body.pwd;
  var admin = 0;
  var ret = await db.SignUp(customer_id, name, phone, birth, sex, pwd, admin);
  res.json(ret);
}));

router.post('/login', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var pwd = req.body.pwd;
  var ret = await db.SignIn(customer_id, pwd);
  var id = ret.customer_id;
  var name = ret.name;
  if (id != null) {
    var sess = req.session;
    sess.loginInfo = {
      _id: id,
      customer_id: customer_id,
      name: name
    }
    return res.json(ret);
  }
  else {
    return res.json(ret);
  }
}));

router.post('/modify', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var name = req.body.name;
  var phone = req.body.phone;
  var pwd = req.body.pwd;
  var ret = await db.Modify(customer_id, name, phone, pwd);
  res.json(ret);
}));

router.post('/delete', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var ret = await db.Delete(customer_id);
  res.json(ret);
  if(ret.message == 'Delete failed') {

  }
  else {
    req.session.destroy();
    res.redirect('/');
  }
}));

router.post('/view', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var ret = await db.ViewCustomer(customer_id);
  res.json(ret);
}));

router.post('/confirm', asyncMiddleware(async function(req, res, next) {
  var customer_id = req.body.customer_id;
  var pwd = req.body.pwd;
  var ret = await db.PwConfirm(customer_id, pwd);
  res.json(ret);
}));

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
