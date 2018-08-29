var mysql_dbc = require('./db/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

let SignUp = (customer_id, name, phone, birth, sex, pwd, admin) => {
  return new Promise((resolve, reject) => {
    var q = 'INSERT INTO customer values (\"' + customer_id + '\", \"' + pwd + '\", \"' + name + '\", \"' + phone + '\", \"' + birth + '\", ' + sex + ', ' + admin  + ');'
    connection.query(q, function(err, result) {
      if(err) {
        console.error(err);
        resolve({success: false});
      }
      else {
        resolve({success: true});
      }
    })
  })
}

exports.SignUp = async function Signup_(customer_id, name, phone, birth, sex, pwd, admin) {
  var result;
  await SignUp(customer_id, name, phone, birth, sex, pwd, admin).then(function(data) {
    result = data;
  })
  return result;
}

let Modify = (customer_id, name, phone, pwd) => {
  return new Promise((resolve, reject) => {
    var q = 'UPDATE customer set name = \"' + name + '\", phone = \"' + phone + '\", pwd = \"' + pwd + '\" WHERE customer_id = \"' + customer_id + '\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Modification failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.Modify = async function Modify_(customer_id, name, phone, pwd) {
  var result;
  await Modify(customer_id, name, phone, pwd).then(function(data) {
    result = data;
  })
  return result;
}

let Delete = (customer_id) => {
  return new Promise((resolve, reject) => {
    var q = 'DELETE from customer WHERE customer_id = \"' + customer_id + '\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Delete failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.Delete = async function Delete_(customer_id) {
  var result;
  await Delete(customer_id).then(function(data) {
    result = data;
  })
  return result;
}

let ViewCustomer = (customer_id) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * from customer WHERE customer_id =\"' + customer_id + '\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve(result[0]);
        }
        else {
          resolve({'message' : 'There is no customer'});
        }
      }
    })
  })
}

exports.ViewCustomer = async function ViewCustomer_(customer_id) {
  var result;
  await ViewCustomer(customer_id).then(function(data) {
    result = data;
  })
  return result;
}

let PwConfirm = (customer_id, pwd) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM customer WHERE customer_id=' + customer_id + ' AND pwd=\"' + pwd + '\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve(result[0]);
        }
        else {
          resolve({'message' : 'Wrong password'});
        }
      }
    })
  })
}

exports.PwConfirm = async function PwConfirm_(customer_id, pwd) {
  var result;
  await PwConfirm(customer_id, pwd).then(function(data) {
    result = data;
  })
  return result;
}

let SignIn = (customer_id, pwd) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM customer WHERE customer_id=\"' + customer_id + '\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          if (pwd == result[0].pwd) {
            resolve({'customer_id' : result[0].customer_id, "name" : result[0].name});
          }
          else {
            resolve({'message'  : 'Your password is incorrect'});
          }
        }
        else {
          resolve({'message' : 'Your login info is not found'});
        }
      }
    })
  })
}

exports.SignIn = async function SignIn_(customer_id, pwd) {
  var result;
  await SignIn(customer_id, pwd).then(function(data) {
    result = data;
  })
  return result;
}

let NewInfo = (customer_id, awake_id, sleep_id, habit_id, status_id, apw_id, smoking, etc, house_exist, house_img, house_loc) => {
  return new Promise((resolve, reject) => {
    var q = 'INSERT INTO information values (\"' + customer_id + '\", ' + awake_id + ', ' + sleep_id + ', ' + habit_id + ', ' + status_id + ', ' + apw_id + ', ' + smoking + ', \"' + etc + '\", ' + house_exist + ', \"' + house_img + '\", \"'+ house_loc + '\");'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Insert failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.NewInfo = async function NewInfo_(customer_id, awake_id, sleep_id, habit_id, status_id, apw_id, smoking, etc, house_exist, house_img, house_loc) {
  var result;
  await NewInfo(customer_id, awake_id, sleep_id, habit_id, status_id, apw_id, smoking, etc, house_exist, house_img, house_loc).then(function(data) {
    result = data;
  })
  return result;
}

let ModifyInfo = (customer_id, awake_id, sleep_id, habit_id, status_id, apw_id, smoking, etc, house_exist, house_img, house_loc) => {
  return new Promise((resolve, reject) => {
    var q = 'UPDATE information SET awake_id='+ awake_id +', sleep_id='+ sleep_id +', habit_id='+ habit_id +', status_id='+ status_id +', apw_id='+ apw_id +', smoking='+ smoking +', etc=\"'+ etc +'\", house_exist='+ house_exist +', house_img=\"'+ house_img +'\", house_loc=\"'+ house_loc +'\" WHERE customer_id=\"'+ customer_id +'\";'
    console.log(q);
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Editing failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.ModifyInfo = async function ModifyInfo_(customer_id, awake_id, sleep_id, habit_id, status_id, apw_id, smoking, etc, house_exist, house_img, house_loc) {
  var result;
  await ModifyInfo(customer_id, awake_id, sleep_id, habit_id, status_id, apw_id, smoking, etc, house_exist, house_img, house_loc).then(function(data) {
    result = data;
  })
  return result;
}

let GetOneInfo = (customer_id) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM information NATURAL JOIN customer WHERE customer_id=\"' + customer_id + '\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve(result[0]);
        }
        else {
          resolve({'message' : 'There is no information'});
        }
      }
    })
  })
}

exports.GetOneInfo = async function GetOneInfo_(customer_id) {
  var result;
  await GetOneInfo(customer_id).then(function(data) {
    result = data;
  })
  return result;
}

let NewMessage = (sender, receiver, content, s_time, reading) => {
  return new Promise((resolve, reject) => {
    var q = 'INSERT INTO message (sender, receiver, content, s_time, reading) values (\"'+ sender +'\", \"'+ receiver +'\", \"'+ content +'\", \"'+ s_time +'\", '+ reading +');'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Sending Message failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.NewMessage = async function NewMessage_(message_id, sender, receiver, content, s_time, reading) {
  var result;
  await NewMessage(message_id, sender, receiver, content, s_time, reading).then(function(data) {
    result = data;
  })
  return result;
}

let DeleteMessage = (message_id) => {
  return new Promise((resolve, reject) => {
    var q = 'DELETE FROM message WHERE message_id IN ' + message_id + ';'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Delete failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.DeleteMessage = async function DeleteMessage_(message_id) {
  var result;
  await DeleteMessage(message_id).then(function(data) {
    result = data;
  })
  return result;
}

let GetList = () => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM (SELECT * FROM matching WHERE progress_id <> 2) as T, (customer NATURAL JOIN information);'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There is no information'});
        }
      }
    })
  })
}

exports.GetList = async function GetList_() {
  var result;
  await GetList().then(function(data) {
    result = data;
  })
  return result;
}

let GetFilter = (query) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM (SELECT DISTINCT(customer_id) FROM matching, customer WHERE progress_id <> 2 AND (mate_a = customer_id OR mate_b = customer_id)) AS T NATURAL RIGHT JOIN (customer NATURAL JOIN information) ' + query + ';'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'Filter failed'});
        }
      }
    })
  })
}

exports.GetFilter = async function GetFilter_(query) {
  var result;
  await GetFilter(query).then(function(data) {
    result = data;
  })
  return result;
}

let GetMessages = (receiver) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM message WHERE receiver=\"'+ receiver +'\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There are no messages'});
        }
      }
    })
  })
}

exports.GetMessages = async function GetMessages_(receiver) {
  var result;
  await GetMessages(receiver).then(function(data) {
    result = data;
  })
  return result;
}

let GetMessageDetail = (msg_id, sender, receiver) => {
  return new Promise((resolve, reject) => {
    var q1 = 'UPDATE message SET reading='+ 1 +' WHERE message_id=' + msg_id + ';'
    connection.query(q1 , function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        console.log('update success');
      }
    })
    var q2 = 'SELECT * FROM message WHERE (sender=\"'+ sender +'\" AND receiver=\"'+ receiver +'\") OR (sender=\"'+ receiver +'\" AND receiver=\"'+ sender +'\");'
    connection.query(q2, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There are no messages'});
        }
      }
    })
  })
}

exports.GetMessageDetail = async function GetMessageDetail_(msg_id, sender, receiver) {
  var result;
  await GetMessageDetail(msg_id, sender, receiver).then(function(data) {
    result = data;
  })
  return result;
}

let InsertEval = (ed_custom, er_custom, q1, q2, q3, q4, sub) => {
  return new Promise((resolve, reject) => {
    var q = 'INSERT INTO eval (ed_custom, er_custom, q1, q2, q3, q4, sub) VALUES (\"'+ ed_custom +'\", \"'+ er_custom +'\", '+ q1 +', '+ q2 +', '+ q3 +', '+ q4 +', \"'+ sub +'\");'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Insert failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.InsertEval = async function InsertEval_(ed_custom, er_custom, q1, q2, q3, q4, sub) {
  var result;
  await InsertEval(ed_custom, er_custom, q1, q2, q3, q4, sub).then(function(data) {
    result = data;
  })
  return result;
}

let EvalList = (ed_custom) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM eval WHERE ed_custom=\"'+ ed_custom +'\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There are no evaluations'});
        }
      }
    })
  })
}

exports.EvalList = async function EvalList_(ed_custom) {
  var result;
  await EvalList(ed_custom).then(function(data) {
    result = data;
  })
  return result;
}

let EvalAuth = (customer_id) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT progress_id FROM matching WHERE mate_a=\"'+ customer_id +'\" OR mate_b=\"'+ customer_id +'\" ORDER BY matching_id DESC LIMIT 1;'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve(result[0]);
        }
        else {
          resolve({'message':'Select failed'});
        }
      }
    })
  })
}

exports.EvalAuth = async function EvalAuth_(customer_id) {
  var result;
  await EvalAuth(customer_id).then(function(data) {
    result = data;
  })
  return result;
}

let NewMatching = (mate_a, mate_b, progress_id) => {
  return new Promise((resolve, reject) => {
    var q = 'INSERT INTO matching (mate_a, mate_b, progress_id, match_date) VALUES (\"'+ mate_a +'\", \"'+ mate_b +'\", '+ progress_id +', NOW());'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Match failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.NewMatching = async function NewMatching_(mate_a, mate_b, progress_id) {
  var result;
  await NewMatching(mate_a, mate_b, progress_id).then(function(data) {
    result = data;
  })
  return result;
}


let GetReceivedMatching = (mate_b) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM matching WHERE mate_b=\"'+ mate_b +'\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There are no received matchings'});
        }
      }
    })
  })
}

exports.GetReceivedMatching = async function GetReceivedMatching_(mate_b) {
  var result;
  await GetReceivedMatching(mate_b).then(function(data) {
    result = data;
  })
  return result;
}

let GetSentMatching = (mate_a) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM matching WHERE mate_a=\"'+ mate_a +'\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There are no sent matchings'});
        }
      }
    })
  })
}

exports.GetSentMatching = async function GetSentMatching_(mate_b) {
  var result;
  await GetSentMatching(mate_b).then(function(data) {
    result = data;
  })
  return result;
}

let GetAllMatching = (mate_a) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM matching WHERE mate_a=\"'+ mate_a +'\" OR mate_b=\"'+ mate_a +'\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There are no matchings'});
        }
      }
    })
  })
}

exports.GetAllMatching = async function GetAllMatching_(mate_a) {
  var result;
  await GetAllMatching(mate_a).then(function(data) {
    result = data;
  })
  return result;
}

let AnswerMatching = (matching_id, progress_id) => {
  return new Promise((resolve, reject) => {
    var q = 'UPDATE matching SET progress_id='+ progress_id +' WHERE matching_id='+ matching_id +';'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Answer failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.AnswerMatching = async function AnswerMatching_(matching_id, progress_id) {
  var result;
  await AnswerMatching(matching_id, progress_id).then(function(data) {
    result = data;
  })
  return result;
}

let DeleteMatching = (matching_id) => {
  return new Promise((resolve, reject) => {
    var q = 'DELETE FROM matching WHERE matching_id=' + matching_id + ';'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Delete failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.DeleteMatching = async function DeleteMatching_(matching_id) {
  var result;
  await DeleteMatching(matching_id).then(function(data) {
    result = data;
  })
  return result;
}

let NewRecommend = (customer_id, clean, life, smoke, house, alcohol) => {
  return new Promise((resolve, reject) => {
    var q = 'INSERT INTO recommend VALUES (\"'+ customer_id +'\", '+ clean +', '+ life +', '+ smoke +', '+ house +', '+ alcohol +');'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Zzim failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.NewRecommend = async function NewRecommend_(customer_id, clean, life, smoke, house, alcohol) {
  var result;
  await NewRecommend(customer_id, clean, life, smoke, house, alcohol).then(function(data) {
    result = data;
  })
  return result;
}

let ModifyRecommend = (customer_id, clean, life, smoke, house, alcohol) => {
  return new Promise((resolve, reject) => {
    var q = 'UPDATE recommend SET clean='+ clean + ', life=' + life + ', smoke=' + smoke + ', house=' + house + ', alcohol=' + alcohol + ' WHERE customer_id=\"'+ customer_id +'\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Modify failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.ModifyRecommend = async function ModifyRecommend_(customer_id, clean, life, smoke, house, alcohol) {
  var result;
  await ModifyRecommend(customer_id, clean, life, smoke, house, alcohol).then(function(data) {
    result = data;
  })
  return result;
}

let GetRecommend = (customer_id) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM recommend WHERE customer_id=\"'+ customer_id +'\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There is no recommend'});
        }
      }
    })
  })
}

exports.GetRecommend = async function GetRecommend_(customer_id) {
  var result;
  await GetRecommend(customer_id).then(function(data) {
    result = data;
  })
  return result;
}

let CalculateRecommend = () => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM recommend NATURAL JOIN information;'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There are no recommends'});
        }
      }
    })
  })
}

exports.CalculateRecommend = async function CalculateRecommend_() {
  var result;
  await CalculateRecommend().then(function(data) {
    result = data;
  })
  return result;
}

let GetTop = (p1, p2, p3, p4, p5, p6) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM customer WHERE customer_id=\"'+ p1 +'\" OR customer_id=\"'+ p2 +'\" OR customer_id=\"'+ p3 +'\" OR customer_id=\"'+ p4 +'\" OR customer_id=\"'+ p5 +'\" OR customer_id=\"'+ p6 +'\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There are no people'});
        }
      }
    })
  })
}

exports.GetTop  = async function GetTop_(p1, p2, p3, p4, p5, p6) {
  var result;
  await GetTop(p1, p2, p3, p4, p5, p6).then(function(data) {
    result = data;
  })
  return result;
}

let NewZzim = (loving, loved) => {
  return new Promise((resolve, reject) => {
    var q = 'INSERT INTO zzim (loving, loved) VALUES (\"'+ loving +'\", \"'+ loved +'\");'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Zzim failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.NewZzim = async function NewZzim_(loving, loved) {
  var result;
  await NewZzim(loving, loved).then(function(data) {
    result = data;
  })
  return result;
}

let DeleteZzim = (zzim_id) => {
  return new Promise((resolve, reject) => {
    var q = 'DELETE FROM zzim WHERE zzim_id=' + zzim_id + ';'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.affectedRows < 1) {
          resolve({'message' : 'Zzim failed'});
        }
        else {
          resolve(result);
        }
      }
    })
  })
}

exports.DeleteZzim = async function DeleteZzim_(zzim_id) {
  var result;
  await DeleteZzim(zzim_id).then(function(data) {
    result = data;
  })
  return result;
}



let GetLoved = (loved) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM zzim WHERE loved=\"'+ loved +'\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There is no Loved'});
        }
      }
    })
  })
}

exports.GetLoved = async function GetLoved_(loved) {
  var result;
  await GetLoved(loved).then(function(data) {
    result = data;
  })
  return result;
}

let GetLoving = (loving) => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM zzim WHERE loving=\"'+ loving +'\";'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There is no Loving'});
        }
      }
    })
  })
}

exports.GetLoving = async function GetLoving_(loving) {
  var result;
  await GetLoving(loving).then(function(data) {
    result = data;
  })
  return result;
}

let Test = () => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM information WHERE house_exist=' + 3 + ';'
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'Test failed'});
        }
      }
    })
  })
}

exports.Test = async function Test_(query) {
  var result;
  await Test(query).then(function(data) {
    result = data;
  })
  return result;
}

let GetRec = () => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM recommend';
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There is no recommend'});
        }
      }
    })
  })
}

exports.GetRec = async function GetRec_() {
  var result;
  await GetRec().then(function(data) {
    result = data;
  })
  return result;
}

let GetInfo = () => {
  return new Promise((resolve, reject) => {
    var q = 'SELECT * FROM information';
    connection.query(q, function(err, result) {
      if (err) {
        console.error(err);
      }
      else {
        if (result.length) {
          resolve (result);
        }
        else {
          resolve ({'message' : 'There is no information'});
        }
      }
    })
  })
}

exports.GetInfo = async function GetInfo_() {
  var result;
  await GetInfo().then(function(data) {
    result = data;
  })
  return result;
}
