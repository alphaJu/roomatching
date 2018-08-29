function insert_message(){
  var current_time = new Date().toLocaleString();
  var dataJSON = {"sender" : document.message_form.sender.value, "receiver" : document.message_form.receiver.value, "content" : document.message_form.content.value, "s_time": current_time, "reading" : 0};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/message/insert", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.success){
        return true;
      }
      else{
        return false;
        alert("Failed To Insert!");
      }
    }
  }
}

function delete_message(){
  var dataJSON = {"message_id" : message_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/message/delete", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.success){

      }
      else{
        alert("Failed To Delete!");
      }
    }
  }
}

function view_message(specific_id){ //특정 회원과 주고받은 쪽지 기록
  var dataJSON = {"receiver" : user_id, "sender" : specific_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/message/view", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){

      var result = JSON.parse(xmlHttp1.responseText);
      for (var i in result){

      }
    }
  }
}

function list_message(){ //받은 쪽지함
  var dataJSON = {"receiver" : costomer_id}; //현재 로그인 중인 회원 ID
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/message/list", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      for (var i in result){

      }
    }
  }
}
