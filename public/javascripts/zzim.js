function insert_zzim(){
  var dataJSON = {"loving" : login_id, "loved" : customer_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/zzim/insert", true);
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
      }
    }
  }
}

function delete_zzim(){
  var dataJSON = {"zzim_id" : zzim_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/zzim/delete", true);
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

function zzim_loved_list(){ //로그인한 회원을 찜한 사람들 목록
  var dataJSON = {"loved" : costomer_id}; //로그인한 사람
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/zzim/list", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      for (var i in result){
        var z_id = result[i].zzim_id;
        var loving = result[i].loving;
        var loved = result[i].loved;
      }
    }
  }
}

function zzim_loving_list(){ //로그인한 회원이 찜한 사람들 목록
  var dataJSON = {"loving" : costomer_id}; //로그인한 사람
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/zzim/list", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      for (var i in result){
        var z_id = result[i].zzim_id;
        var loving = result[i].loving;
        var loved = result[i].loved;
      }
    }
  }
}
