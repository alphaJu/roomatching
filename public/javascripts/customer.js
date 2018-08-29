var user_id = ""; //현재 login한 회원

window.addEventListener('DOMContentLoaded', function () {
  console.log("open!");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", '/index/getInfo', true);
  xhr.send(null);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var result_obj = JSON.parse(xhr.responseText);
      user_id = result_obj.customer_id;
      cal();
      button_1();
      button_2();
      view_customer();
      zzim_loved_list();
      zzim_loving_list();
      list_matching_ed();
      list_matching_ing();
      list_matching_all();
      list_message();

    }
  }
});
//////////////////////////
function button_1(){

  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/index/button_1", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(null);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
    var result = JSON.parse(xmlHttp1.responseText);
    var bool1=false;
    for(i in result){
      if(user_id==result[i].customer_id){
        bool1=true;
      }

    }

    if(bool1){
  $('#info').hide();
     $('#info_view').attr("onclick","page_move(\""+user_id+"\")");
   }
   else{
     $('#info_view').hide();
   }

      // console.log(resultJSON);

    }
  }

}
function button_2(){
  console.log('d');;
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/index/button_2", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(null);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
    var result = JSON.parse(xmlHttp1.responseText);
    var bool2=false;
    for(i in result){
      if(user_id==result[i].customer_id){
        bool2=true;
      }

    }
   if(bool2){
     $('#reco').hide();
   }
   else{
     $('#reco_view').hide();
   }
    // if(bool1){
    //  document.getElementById('buttons').innerHTML="<button type="button" name="reco"  id="info_view" onclick="location.href='/information/view'">내성향</button>";
    // }
    //   // console.log(resultJSON);

    }
  }

}
//login
function login(){
  var dataJSON = {"customer_id" : document.login_form.customer_id.value, "pwd" : document.login_form.pwd.value};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/customer/login", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success!");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      if(result.message == "Your login info is not found"){
        alert("아이디를 확인해주세요!");
      }
      else if (result.message == "Your password is incorrect"){
        alert("비밀번호를 확인해주세요!");
      }
      else{
        alert("로그인!");
        location.href = ("/index");
      }
    }
  }
}

//customer
function insert_customer(){
  var dataJSON = {"customer_id" : document.join_form.customer_id.value, "pwd" : document.join_form.pwd.value, "name" : document.join_form.name.value, "birth" : document.join_form.birth.value, "sex" : document.join_form.sex.value, "phone" : document.join_form.phone.value};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/customer/insert", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      if(result_obj.success){
        location.href = ("/index");
      }
      else{
        location.href = ("/customer/join");
      }
    }
  }
}

function delete_customer(){
  var dataJSON = {"customer_id" : user_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/customer/delete", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      // console.log(resultJSON);
      if(result_obj.message == 'Delete failed'){
        alert("Failed To Delete!");
      }
      else{
        location.href = ("/index");
      }
    }
  }
}

function modify_customer(){
  var dataJSON = {"customer_id" : user_id, "pwd" : document.modify_form.pwd.value, "name" : document.modify_form.name.value, "birth" : document.modify_form.birth.value, "phone" : document.modify_form.phone.value};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/customer/modify", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      if(result_obj.message == "Modification failed"){
        location.href = ("/customer/modify");
      }
      else{
        location.href = ("/customer/view");
      }
    }
  }
}

function view_customer(){

  var dataJSON = {"customer_id" : user_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/customer/view", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      var detail_time = result.birth;
      var a = detail_time.split("T");
      var split_date = a[0].split("-");
      var splited_string = split_date[0]+"년 "+split_date[1]+"월 "+split_date[2]+"일";
      document.getElementById('customer_id').value = result.customer_id;
      document.getElementById('name').value = result.name;
      document.getElementById('birth').value = splited_string;
      document.getElementById('phone').value = result.phone;
      if(result.sex == 0){
        document.getElementById('sex').value = '여자';
      }
      else{
        document.getElementById('sex').value = '남자';
      }
    }
  }
}
//recommend
// function insert_recommend(){
//   console.log(user_id);//응응 ..? 이거 다시 없애라고? ㅇㅇ
//   var dataJSON = {"customer_id":user_id,"clean" : document.recommend_form.clean.value, "life" : document.recommend_form.life.value, "smoke" : document.recommend_form.smoke.value, "house" : document.recommend_form.house.value, "alcohol" : document.recommend_form.alcohol.value};
//   var data = JSON.stringify(dataJSON);
//   var xmlHttp1 = new XMLHttpRequest();
//   xmlHttp1.open("POST", "/recommend/insert", true);
//   xmlHttp1.setRequestHeader("Content-Type", "application/json");
//   xmlHttp1.send(data);
//   xmlHttp1.onreadystatechange = function(){
//     if(xmlHttp1.readyState == XMLHttpRequest.DONE){
//       var resultJSON = xmlHttp1.response;
//       var result_obj = JSON.parse(resultJSON);
//       console.log(resultJSON);
//       if(result_obj.message == "Insert failed"){
//         location.href = ("/recommend");
//         //page_move("map");
//       }
//       else{
//         location.href = ("/index");
//         //alert("Failed To Insert!");
//       }
//     }
//   }
// }

//information

//message
function who_receiver(){
    document.getElementById('receiver').value = get_matching();
}

function insert_message(){
  var current_time = new Date().toLocaleString();
  var dataJSON = {"sender" : user_id, "receiver" : document.message_form.receiver.value, "content" : document.message_form.content.value, "s_time": current_time, "reading" : 0};
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
      if(result_obj.message == "Sending Message failed"){
        location.href = ("/message");
      }
      else{
        alert("메세지를 성공적으로 보냈습니다!");
        history.go(-1);
      }
    }
  }
}

function list_message(){ //받은 쪽지함
  console.log("list_message" + user_id);
  var dataJSON = {"receiver" : user_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/message/list", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    // console.log("success - list");
    // console.log(result);
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      if(result.message == "There are no messages"){
      document.getElementById('mmssgg').innerHTML="받은 쪽지가 없습니다.";
        //document.href = "/index";
        // var obj = document.getElementById("alert");
        // obj.innerHTML = "받은 쪽지가 없습니다. ㅠㅠ";
        // obj.appendChild();
      }
      else{
        for (var i in result){
          console.log(result[i]);
          var msg_id = result[i].message_id;
          var sender = result[i].sender;
          var receiver = result[i].receiver;
          var content = result[i].content;
          var time = result[i].s_time;
          var reading = result[i].reading;
          var obj = document.getElementById("received_msg");
          var divAppend = document.createElement("tr");
          divAppend.setAttribute('onclick', 'page_move_msg('+ msg_id + ',\'' + sender + '\',\'' + receiver + '\')');
          divAppend.innerHTML = "<td>"+sender+"</td><td>"+content+"</td><td>"+time+"</td>";
          obj.appendChild(divAppend);
        }
      }
    }
  }
}

function page_move_msg(id, s_id, r_id){
  location.href = '/message/view?message_id='+id+'&sender='+s_id+'&receiver='+r_id;
}

function get(){
  var url = unescape(location.href);
  var get = url.split("?");
  var val = get[1].split("&");
  var m_id = val[0].split("=");
  var sender = val[1].split("=");
  var receiver = val[2].split("=");
  var m_id_int = m_id[1]*1; //string to int

  var result = [m_id_int, sender[1], receiver[1]];

  return result;
}

function send_msg_customer(r_id){
  location.href = '/message?receiver='+r_id;
}

function view_message(arr){ //특정 회원과 주고받은 쪽지 기록
  document.getElementById('reply').setAttribute('onclick', 'send_msg_customer(\''+ arr[1]+ '\')');
  console.log(arr);
  var dataJSON = {"msg_id" : arr[0], "sender" : arr[1], "receiver" : arr[2]};
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
        var msg_id = result[i].message_id;
        var sender = result[i].sender;
        var receiver = result[i].receiver;
        var content = result[i].content;
        var time = result[i].s_time;
        var reading = result[i].reading;
        var obj = document.getElementById("view_msg");
        var divAppend = document.createElement("tr");
        // divAppend.innerHTML = "<td>"+sender+"</td><td>"+content+"</td><td>"+time+"</td>";
        divAppend.innerHTML = "<td><input type='checkbox' name='del' value=" + msg_id + "></input><td>"+sender+"</td><td>"+content+"</td><td>"+time+"</td>";
        obj.appendChild(divAppend);
      }
    }
  }
}

function check_count(){
  var del = document.getElementsByName("del");
  var cnt = document.getElementsByName("del").length;
  var cnt2 = 0;
  var check = 1;
  var result = "(";
  for(var i = 0; i < cnt; i++){
    if(del[i].checked == true){
      cnt2 = cnt2 + 1;
    }
  }
  for(var j = 0; j < cnt; j++){
    if(del[j].checked == true){
      if(check == cnt2){
        result = result + del[j].value + ")";
      }
      else{
        result = result + del[j].value + ",";
      }
      check = check + 1;
    }
  }
  delete_message(result);
}

function delete_message(arr){
  console.log(arr);
  var dataJSON = {"message_id" : arr};
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
      if(result_obj.message == "Delete failed"){
        alert("Failed To Delete!");
      }
      else{
        location.href = ("/message/list");
      }
    }
  }
}

//matching
function insert_matching(id){
  var current_time = new Date().toLocaleString();
  var dataJSON = {"mate_a" : user_id, "mate_b" : id, "progress_id" : 1, "match_date" : current_time};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/matching/insert", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.message == "Match failed"){
        location.href = ("/index");
      }
      else{
        alert("매칭을 요청하였습니다!");
        location.href = ("/matching");
      }
    }
  }
}

function get_matching(){
  var url = unescape(location.href);
  var get = url.split("?");
  var c_id = get[1].split("=");

  var result = c_id[1];

  return result;
}

function list_matching_ed(){ //요청을 받은 목록
  //alert(user_id);
  var dataJSON = {"mate_b" : user_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/matching/received", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    //alert("hey!");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      for (var i in result){
        var m_id = result[i].matching_id;
        var mate_a = result[i].mate_a;
        var progress_id = result[i].progress_id;
        var date = result[i].match_date;
        var a = date.split("T");
        var split_date = a[0].split("-");
        var splited_string = split_date[0]+"년 "+split_date[1]+"월 "+split_date[2]+"일";
        var obj = document.getElementById("received_matching");
        var divAppend = document.createElement("tr");
        if(progress_id == 1){
          divAppend.innerHTML = "<td>"+mate_a+"</td><td>"+splited_string+"</td><td><button type='button' onclick='yes_matching("+m_id+")'>수락</button></td><td><button type='button' onclick='no_matching("+m_id+")'>거절</button></td>";
          obj.appendChild(divAppend);
        }
      }
    }
  }
}

function yes_matching(id){ //progress_id update 필요
  var dataJSON = {"matching_id" : id, "progress_id" : 2};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/matching/answer", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.message == "Answer failed"){
        location.href = ("/index");
      }
      else{
        alert("매칭을 수락하였습니다!");
        location.href = ("/matching");
      }
    }
  }
}

function no_matching(id){ //progress_id update 필요
  var dataJSON = {"matching_id" : id, "progress_id" : 3};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/matching/answer", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.message == "Answer failed"){
        location.href = ("/index");
      }
      else{
        alert("매칭을 거절하였습니다!");
        location.href = ("/matching");
      }
    }
  }
}

function list_matching_ing(){ //보낸 매칭
  var dataJSON = {"mate_a" : user_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/matching/sent", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    //alert("hey!");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      for (var i in result){
        var m_id = result[i].matching_id;
        var mate_b = result[i].mate_b;
        var progress_id = result[i].progress_id;
        var date = result[i].match_date;
        var a = date.split("T");
        var split_date = a[0].split("-");
        var splited_string = split_date[0]+"년 "+split_date[1]+"월 "+split_date[2]+"일";
        var obj = document.getElementById("sending_matching");
        var divAppend = document.createElement("tr");
        if(progress_id == 1){
          divAppend.innerHTML = "<td>"+mate_b+"</td><td>"+splited_string+"</td><td><button type='button' onclick='cancel_matching("+m_id+")'>취소</button></td>";
          obj.appendChild(divAppend);
        }
      }
    }
  }
}

function list_matching_all(){ //모든 목록
  var dataJSON = {"mate_a" : user_id, "mate_b" : user_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/matching/list", true); //수정필요
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      for (var i in result){
        var m_id = result[i].matching_id;
        var mate_a = result[i].mate_a;
        var mate_b = result[i].mate_b;
        var p_id = result[i].progress_id;
        var p_name = ""; //조건문 만들어야함!
        if(p_id == 1){
          p_name = "매칭 요청";
        }
        else if(p_id == 2){
          p_name = "매칭 성공";
        }
        else if(p_id == 3){
          p_name = "매칭 실패";
        }
        else if(p_id == 4){
          p_name = "매칭 완료";
        }
        else if(p_id == 5){
          p_name = "매칭/평가 완료";
        }
        else{

        }
        //날짜 분리
        var date = result[i].match_date;
        var a = date.split("T");
        var split_date = a[0].split("-");
        var splited_string = split_date[0]+"년 "+split_date[1]+"월 "+split_date[2]+"일";
        var obj = document.getElementById("all_matching");
        var divAppend = document.createElement("tr");
        if(mate_a == user_id){
          if(p_id == 2){
              divAppend.innerHTML = "<td>"+mate_b+"</td><td>"+splited_string+"</td><td>"+p_name+"</td><td><button type='button' onclick='finish_matching("+m_id+")'>완료</button></td>";
          }
          else if(p_id == 4){
              divAppend.innerHTML = "<td>"+mate_b+"</td><td>"+splited_string+"</td><td>"+p_name+"</td><td><button type='button' onclick='move_eval(\""+mate_b+"\","+m_id+")'>평가</button></td>";
          }
          else{
              divAppend.innerHTML = "<td>"+mate_b+"</td><td>"+splited_string+"</td><td>"+p_name+"</td>";
          }
        }
        else{
          if(p_id == 2){
              divAppend.innerHTML = "<td>"+mate_a+"</td><td>"+splited_string+"</td><td>"+p_name+"</td><td><button type='button' onclick='finish_matching("+m_id+")'>완료</button></td>";
          }
          else if(p_id == 4){
              divAppend.innerHTML = "<td>"+mate_a+"</td><td>"+splited_string+"</td><td>"+p_name+"</td><td><button type='button' onclick='move_eval(\""+mate_a+"\","+m_id+")'>평가</button></td>";
          }
          else{
              divAppend.innerHTML = "<td>"+mate_a+"</td><td>"+splited_string+"</td><td>"+p_name+"</td>";
          }
        }
        obj.appendChild(divAppend);
      }
    }
  }
}

function move_eval(id, m_id){
  location.href = "/eval?ed_custom="+id+"&matching_id="+m_id;
}

function finish_matching(id){
  var dataJSON = {"matching_id" : id, "progress_id" : 4};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/matching/answer", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.message == "Answer failed"){
        location.href = ("/index");
      }
      else{
        alert("매칭을 완료하였습니다!");
        location.href = ("/matching");
      }
    }
  }
}

function finish_evaluation(id){
  var dataJSON = {"matching_id" : id, "progress_id" : 5};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/matching/answer", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.message == "Answer failed"){
        location.href = ("/index");
      }
      else{
        move_eval(c_id);
      }
    }
  }
}

function matching(){
  list_matching_ed();
  list_matching_ing();
  list_matching_all();
}

function cancel_matching(id){
  var dataJSON = {"matching_id" : id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/matching/cancel", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.message == "Delete failed"){
        location.href = ("/index");
      }
      else{
        alert("매칭을 취소하였습니다!");
        location.href = ("/matching");
      }
    }
  }
}

//zzim
function insert_zzim(id){
  var dataJSON = {"loving" : user_id, "loved" : id};
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
      if(result_obj.message == "Zzim failed"){
        location.href = ("/information/view?customer_id="+id);
      }
      else{
        alert(id+"님을 찜하였습니다!");
        location.href = ("/zzim");
      }
    }
  }
}

function delete_zzim(id){
  var dataJSON = {"zzim_id" : id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/zzim/delete", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.message == "Delete failed"){
        location.href = ("/index");
      }
      else{
        alert("취소하였습니다!");
        location.href = ("/zzim");
      }
    }
  }
}

function zzim_loved_list(){ //로그인한 회원을 찜한 사람들 목록
  var dataJSON = {"loved" : user_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/zzim/loved", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      if(result.message == "There is no Loved"){

      }
      else{
        for (var i in result){
          var z_id = result[i].zzim_id;
          var loving = result[i].loving;
          var obj = document.getElementById("loved");
          var divAppend = document.createElement("tr");
          divAppend.innerHTML = "<td width='33%'>"+loving+"</td><td width='33%'><button type='button' onclick='insert_matching(\'"+loving+"\')'>매칭요청</button></td><td width='33%'></td>";
          obj.appendChild(divAppend);
        }
      }
    }
  }
}

function zzim_loving_list(){ //로그인한 회원이 찜한 사람들 목록
  var dataJSON = {"loving" : user_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/zzim/loving", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      if(result.message == "There is no Loving"){

      }
      else{
        for (var i in result){
          var z_id = result[i].zzim_id;
          var loved = result[i].loved;
          var obj = document.getElementById("loving");
          var divAppend = document.createElement("tr");
          divAppend.innerHTML = "<td width='33%'>"+loved+"</td><td width='33%'><button type='button' onclick='insert_matching("+loved+")'>매칭요청</button></td><td width='33%'><button type='button' onclick='delete_zzim("+z_id+")'>삭제</button></td>";
          obj.appendChild(divAppend);
        }
      }
    }
  }
}

function zzim(){
  zzim_loving_list();
  zzim_loved_list();
}

//recommend
function insert_recommend(){
  // console.log(user_id);
  var dataJSON = {"customer_id" : user_id, "clean" : document.recommend_form.clean.value, "life" : document.recommend_form.life.value, "smoke" : document.recommend_form.smoke.value, "house" : document.recommend_form.house.value, "alcohol" : document.recommend_form.alcohol.value};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/recommend/insert", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.message == "Insert failed"){
        location.href = ("/recommend");
        //page_move("map");
      }
      else{
        location.href = ("/index");
        //alert("Failed To Insert!");
      }
    }
  }
}
function view_recommend(){
  var dataJSON = {"customer_id" : user_id}; //customer_id == 현재 로그인 중인 회원 ID
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  console.log(user_id);
  xmlHttp1.open("POST", "/recommend/view", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      console.log(result);
      //var clean,life,smoke,house,alcohol;
        console.log(result[0].customer_id);
      console.log(result[0].clean);
      switch (result[0].clean) {
        case 1: $("input:radio[name='clean']:radio[value=1]").prop('checked', true); break;;
        case 2:$("input:radio[name='clean']:radio[value=2]").prop('checked', true); break;
        case 3:$('input:radio[name="clean"][value="3"]').attr('checked', 'checked');break;//$("input:radio[name='clean']:radio[value=3]").prop('checked', true); break;////$("#soso").attrs("checked", 'checked'); break;
        case 4:$("input:radio[name='clean']:radio[value=4]").prop('checked', true); break;
        case 5:$("input:radio[name='clean']:radio[value=5]").prop('checked', true); break;

      }
      switch (result[0].life) {
        case 1:$('input:radio[name=life]:input[value=1]').attr("checked", true); break;
        case 3:$('input:radio[name=life]:input[value=3]').attr("checked", true); break;
        case 5:$('input:radio[name=life]:input[value=5]').attr("checked", true); break;
      }
      switch (result[0].smoke) {
        case 1:$('input:radio[name=smoke]:input[value=1]').attr("checked", true); break;
        case 3:$('input:radio[name=smoke]:input[value=3]').attr("checked", true); break;
        case 5:$('input:radio[name=smoke]:input[value=5]').attr("checked", true); break;
      }
      switch (result[0].house) {
        case 1:$('input:radio[name=house]:input[value=1]').attr("checked", true); break;
        case 3:$('input:radio[name=house]:input[value=3]').attr("checked", true); break;
        case 5:$('input:radio[name=house]:input[value=5]').attr("checked", true); break;
      }
      switch(result[0].alcohol){
        case 1:$('input:radio[name=alcohol]:input[value=1]').attr("checked", true); break;
        case 3:$('input:radio[name=alcohol]:input[value=3]').attr("checked", true); break;
        case 5:$('input:radio[name=alcohol]:input[value=5]').attr("checked", true); break;
      }

      //console.log(document.getElementById('awake').value);

    }
  }
}
function modify_recommend(){
  var dataJSON = {"customer_id" : user_id, "clean" : document.recommend_form.clean.value, "life" : document.recommend_form.life.value, "smoke" : document.recommend_form.smoke.value, "house" : document.recommend_form.house.value, "alcohol" : document.recommend_form.alcohol.value};

  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/recommend/modify", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      // console.log(resultJSON);
      if(result_obj.message == 'Modification failed'){
        location.href = ("/recommend/modify");
      }
      else{
          location.href = ("/recommend/view");
      }
    }
  }

 //document.getElementById("mod").innerHTML="<button type="submit" class=btn btn-default onclick='modify_list()'>수정</button>";
}
function cal() {
  console.log('dd');
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/recommend/calculate", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(null);
  console.log(user_id);
  xmlHttp1.onreadystatechange = function() {
    console.log("success");
    if (xmlHttp1.readyState == XMLHttpRequest.DONE) {
      var result = JSON.parse(xmlHttp1.responseText);
      var id,c,l,s,h,a;
      var exist=false;
      var dif={}//};
      for (var i in result) {
       if(user_id==result[i].customer_id){
         console.log(user_id);
         id=result[i].customer_id;
         c=result[i].clean;
         l=result[i].life;
         s=result[i].smoke;
         h=result[i].house;
         a=result[i].alcohol;
         exist=true;
console.log(a+'AAA');
       }}
       if(exist){
       for (var i in result) {
        if(user_id!=result[i].customer_id){
          var tmp,tmp2,tmp3,tmp4,tmp5;
          console.log(result[i].customer_id+"다른아이디");
          tmp=Math.abs(result[i].clean-c);
          tmp2=Math.abs(result[i].life-l);
          tmp3=Math.abs(result[i].smoke-s);
          tmp4=Math.abs(result[i].house-h);
          tmp5=Math.abs(result[i].alcohol-a);
          dif[result[i].customer_id]=tmp+tmp2+tmp3+tmp4+tmp5;
              }}

        console.log(dif);
        var items = Object.keys(dif).map(function(key) {
          return [key, dif[key]];
              });
          console.log(items);
        items.sort(function(first, second) {
          return first[1] - second[1];
        });
        console.log(items);
     if(dif.length<7){
       console.log(items);
       var ret=items.map(function(array){
         return array[0];
       });
       list_recommend(ret);
       return ret;
     }
     else{
       var ret=items.slice(0,6);
       ret=ret.map(function(array){
         return array[0];
       });
      list_recommend(ret);
       return ret;
     }
   }}
    }


//list_recommend(ret);
  }

function list_recommend(reco) {
  console.log('실행');
  console.log(reco);
  if(reco.length)
  var dataJSON = {"p1" : reco[0],"p2":reco[1],"p3":reco[2],"p4":reco[3],"p5":reco[4],"p6":reco[5]}; //현재 로그인 중인 회원 ID
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/recommend/top", true); //..?
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      for (var i in result){
        var name=result[i].name;
        var sex;
        switch (result[i].sex) {
          case 1:sex='남자';break;
          case 0:sex='여자';break;
              }

         var obj = document.getElementById(i+"a");

        obj.innerHTML = "<p id="+result[i].customer_id+" onclick='page_move(\""+result[i].customer_id+"\");'>" + result[i].customer_id + "</p></br><p>" + result[i].name + "</p></br><p>" + sex + "</p></br>";

      }

     }
     }
   }

//evaluation
function insert_eval(){
  var arr = get_eval2();
  console.log(arr);
  var dataJSON = {"ed_custom":arr[0],"er_custom":user_id,"q1" : $(".answer_1").val(), "q2" : $(".answer_2").val(), "q3" : $(".answer_3").val(), "q4": $(".answer_4").val(), "sub":$("#sub").val()};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/eval/insert", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      console.log(result_obj.message);
      if(result_obj.message!="Insert failed"){
        location.href=("/index");
        finish_evaluation(arr[1]);
        //page_move("map");
      }
      else{
        alert("Failed To Insert!");
      }
    }
  }
}

function get_eval2(){
  var url = unescape(location.href);
  var get = url.split("?");
  var ret = get[1].split("&");
  var c_id = ret[0].split("=");
  var id = ret[1].split("=");

  var result = [c_id[1], id[1]];

  return result;
}
