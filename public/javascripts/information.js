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
    view_list(get_info());
    }
  }
});
//console.log(user_id);
//var user_id = "";
function get_filter(){
  //alert("hey");
  var query = "";
  var str = unescape(location.href);
  var res = str.split("select=select&");
  if(str == res){
    return query;
  }
  else{
    var string = "";
    for (i in res) {
    	string = string + res[i];
    }
    var res2 = string.split("&");
    var sex = res2[0].split("sex=")[1];
    var min_year = res2[1].split("min_year=")[1];
    var max_year = res2[2].split("max_year=")[1];
    var house_id = res2[3].split("house_id=")[1];
    var smoking = res2[4].split("smoking=")[1];

    var result = [sex, min_year, max_year, house_id, smoking];

    if(result[0] != ""){
      query = query + "WHERE sex=" + result[0];
    }

    if(query != ""){
      if(result[1].length == 4 && result[2].length == 4){
        query = query + " AND year(birth) >= " + result[1] + " AND year(birth) <= " + result[2];
      }
    }
    else {
      if(result[1].length == 4 && result[2].length == 4){
          query = query + "WHERE year(birth) >= " + result[1] + " AND year(birth) <= " + result[2];
      }
      // query = query + "WHERE year(birth) >= " + result[1] + " AND year(birth) <= " + result[2];
    }

    if(query != "") {
      // if(result[3] != -1){
      //   query = query + " AND house_id = " + result[3];
      // }
      // if(result[3] != 3){
      //   query = query + " AND house_id = " + result[3];
      // }
      if(result[3] != ""){
        if(result[3] != 2){
          query = query + " AND house_exist = " + result[3];
        }
      }
    }
    else{
      if(result[3] != ""){
        if(result[3] != 2){
          query = query + "WHERE house_exist = " + result[3];
        }
      }
    }

    if(query != ""){
      // if(result[4] != -1){
      //   query = query + " AND smoking = " + result[4];
      // }
      // if(result[4] != 3){
      //   query = query + " AND smoking = " + result[4];
      // }
      if(result[4] != ""){
        if(result[4] != 2){
          query = query + " AND smoking = " + result[4];
        }
      }
    }
    else{
      if(result[4] != ""){
        if(result[4] != 2){
          query = query + "WHERE smoking = " + result[4];
        }
      }

    }
    // console.log(query);
    return query;
  }
}

function show_list(){
    // alert("hey");
    //var result = get_info();
    // var dataJSON = {"query" : ""};
    // var data = JSON.stringify(dataJSON);
    var xmlHttp1 = new XMLHttpRequest();
    xmlHttp1.open("POST", "/information/list", true);
    xmlHttp1.setRequestHeader("Content-Type", "application/json");
    xmlHttp1.send(null);
    xmlHttp1.onreadystatechange = function() {
      console.log("success");
      if (xmlHttp1.readyState == XMLHttpRequest.DONE) {
        var result = JSON.parse(xmlHttp1.responseText);
        console.log(result);
        for (var i in result) {
        //  console.log("log"+result[i].customer_id);
          if(i==0||i>0&&result[i].customer_id!=result[i-1].customer_id){
          var customer_id = result[i].customer_id;
          //customer_id == user_id 일 때 추가안하도록 하기!!!
          var name = result[i].name;
          var strArray = result[i].birth.split('-');
          var year = strArray[0];
          var age = 2018-year+1;
          var sex = result[i].sex;
          var house_exist = result[i].house_exist;
          var progress_id = result[i].progress_id;
          var progress_name;
          switch (house_exist) {
            case 0:
              house_exist='X';
              break;
            case 1:
              house_exist='O';
          }
          switch (sex) {
            case 0:
              sex = '여자';
              break;
            case 1:
              sex = '남자';
          }
          console.log(sex);
          var obj = document.getElementById("info_tbody");
          var divAppend = document.createElement("tr");
          divAppend.setAttribute('id', "list_"+customer_id);
        //  divAppend.setAttribute('ondblclick','view_list('+customer_id+');');
          divAppend.className = 'content-item';
            console.log(customer_id);
          divAppend.innerHTML = "<td id="+customer_id+" onclick='page_move(\""+customer_id+"\");'>"+customer_id+"</td><td>" + age + "</td><td>" + sex + "</td><td>" + house_exist +  "</td>";
          obj.appendChild(divAppend);
        }}
      }
    }
}

function page_move(select){

  console.log(select);
  location.href = '/information/view?customer_id='+select;
}
function page_modi(select){

  console.log(select+"modi");
  location.href = '/information/modify?customer_id='+select;
}

function page_eval(select){
  console.log(select+"eval");
  location.href ='/eval/list?ed_id='+select;
}

function get_info(){
  var url = unescape(location.href);
  var get = url.split("?");
  var val = get[1].split("=");
  var id=val[1].split("#")

  return id[0];
}
function get_info2(){
  var url = unescape(location.href);
  var get = url.split("?");
  var val = get[1].split("=");


  return val[1];
}

function view_list(select){

 console.log(select);
  var dataJSON = {"customer_id" : select};
  //console.log(user_id + "minseon");
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/information/view", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success3333");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      document.getElementById("title").innerHTML=select+"'s Roommatching";
      var result = JSON.parse(xmlHttp1.responseText);
      console.log(result.customer_id);
      if(result.message=="There is no information"){
        console.log('wow');
        document.getElementById("menu1").innerHTML='</br>등록된 성향이 없습니다.';}
      else{
      var strArray = result.birth.split('-');
      var year = strArray[0];
      var age = 2018-year+1;
      var awake,sleep,habit,status,apw,house_exist,smoking;
      document.getElementById('name').value = result.name;

      document.getElementById('birth').value =age;
      if(result.sex == 0){
        document.getElementById('sex').value = '여자';
      }
      else{
        document.getElementById('sex').value = '남자';
      }
      switch (result.awake_id) {
        case 1:awake='5:00 이전';  break;
        case 2:awake='5:00~6:00';  break;
        case 3:awake='6:00~7:00';  break;
        case 4:awake='7:00~8:00';  break;
        case 5:awake='8:00~9:00';  break;
        case 6:awake='9:00~10:00';  break;
        case 7:awake='10:00~11:00';  break;
        case 8:awake='11:00~12:00';  break;
        case 9:awake='12:00 이후';  break;
      }
      switch (result.sleep_id) {
        case 1:sleep='21:00 이전';  break;
        case 2:sleep='21:00~22:00';  break;
        case 3:sleep='22:00~23:00';  break;
        case 4:sleep='23:00~24:00';  break;
        case 5:sleep='24:00 이후';  break;
      }
      switch (result.habit_id) {
        case 1:habit='몸부림';  break;
        case 2:habit='코골이';  break;
        case 3:habit='이갈이';  break;
        case 4:habit='잠꼬대';  break;
        case 5:habit='몽유병';  break;
        case 6:habit='기타';  break;
        case 7:habit='없음';  break;
      }
      switch (result.status_id) {
        case 1:status='휴학생';  break;
        case 2:status='재학생';  break;
        case 3:status='졸업생';  break;
      }
      switch(result.apw_id){
        case 1:apw='한달에 한번';  break;
        case 2:apw='한달에 두번';  break;
        case 3:apw='일주일에 한번';  break;
        case 4:apw='일주일에 두세번';  break;
        case 5:apw='일주일에 네번 이상';  break;
      }
      switch (result.smoking) {
        case 1:smoking='흡연 함';  break;
        case 0:smoking='흡연 안함';  break;
      }
      switch (result.house_exist) {
        case 1:house_exist='집 있음';  break;
        case 0:house_exist='집 없음';  break;
      }
      //console.log(document.getElementById('awake').value);
      document.getElementById('select').value = result.customer_id;
      document.getElementById('awake').value = awake;
      document.getElementById('sleep').value = sleep;
      document.getElementById('habit').value = habit;
      document.getElementById('status').value = status;
      document.getElementById('apw').value =apw ;
      document.getElementById('smoking').value = smoking;
      document.getElementById('etc').value = result.etc;
      document.getElementById('house_exist').value = house_exist;
      document.getElementById('house_loc').value = result.house_loc;
    //  document.getElementById('house_img').value = result.house_img;



      if(!result.house_exist){
         $("#hide").hide();


      }
      console.log(user_id+'user!!!!!!!');
      console.log(result.customer_id+'customer!!!!!');}
   if(user_id==result.customer_id){
     document.getElementById("modify").innerHTML="<button class='btnsmall' onclick='page_modi(\""+select+"\");'>수정</button>";
     document.getElementById("zzim").innerHTML="<button class='btnsmall' onclick=\"location.href='/zzim'\">찜목록</button>";
   }
   else{
   //console.log("yo");
    //document.getElementById("eval").innerHTML="<button onclick='page_eval(\""+select+"\");'>평가보기</button>";
    document.getElementById("msg").innerHTML="<button class='btnsmall' onclick='send_msg(\""+select+"\");'>쪽지보내기</button>";
     document.getElementById("zzim").innerHTML="<button class='btnsmall' type='button' class='btnsmall' name='button' onclick='insert_zzim(get_matching())'>찜하기</button>";
     document.getElementById("match").innerHTML="<button class='btnsmall' type='button' name='button' onclick='insert_matching(get_matching())'>매칭요청</button>"//"<button class='btnsmall' type='button' class='btnsmall' name='button' onclick='insert_zzim(get_matching())'>찜하기</button><button class='btnsmall' type='button' name='button' onclick='insert_matching(get_matching())'>매칭요청</button>";

}
   $("#img").attr("src",result.house_img);

    }
  }
}
function send_msg(r_id){
  location.href = '/message?receiver='+r_id;
}

function modify_info(select){
  console.log('djkfdjkf'+$('#select').val());
  var dataJSON = {"customer_id" :  select, "awake_id" : $("#awake_time").val(),
  "sleep_id" : $("#sleep_time").val(), "habit_id" : $("#habit").val(), "status_id" : $("#status").val(),
  "apw_id" : $("#apw").val(),"smoking":document.info_form.smoking.value,"etc":$("#etc").val(),
  "house_exist":document.info_form.house_exist.value,"house_img":$("#house_img").val(),"house_loc":$("#house_loc").val()
};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/information/modify", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      // console.log(resultJSON);
      if(result_obj.message == 'Modification failed'){
        location.href = ("/information/modify");
      }
      else{
        page_move(select);
      }
    }
  }

 //document.getElementById("mod").innerHTML="<button type="submit" class=btn btn-default onclick='modify_list()'>수정</button>";
}

//} //window함수끝....
function insert_info(){
  var dataJSON = {"customer_id" : user_id, "awake_id" : $("#awake_time").val(),
  "sleep_id" : $("#sleep_time").val(), "habit_id" : $("#habit").val(), "status_id" : $("#status").val(),
  "apw_id" : $("#apw").val(),"smoking":document.info_form.smoking.value,"etc":$("#etc").val(),
  "house_exist":document.info_form.house_exist.value,"house_img":$("#house_img").val(),"house_loc":$("#house_loc").val()
};
//window.alert($("#house_img").val());
// var dataJSON = {"customer_id" : "youn", "awake_id" :document.info_form.awake_time.value,
// "sleep_id" : document.info_form.sleep_time.value, "habit_id" : document.info_form.habit.value, "status_id" :document.info_form.status.value,
// "apw_id" : document.info_form.apw.value,"smoking":document.info_form.smoking.value,"etc":document.info_form.etc.value,
// "house_exist":document.info_form.house_exist.value,"house_img":document.info_form.house_img.value,"house_loc":document.info_form.house_loc.value
// };
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/information/insert", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      alert('성공적으로 등록되었습니다.');
      if(result_obj.message == "Insert failed"){
        location.href = ("/information");
        //page_move("map");
      }
      else{
        location.href = ("/index");
        //alert("Failed To Insert!");
      }
    }
  }
}

// function filter(){
//   var result = "";
//   var dataJSON = {"query" : result};
//   var data = JSON.stringify(dataJSON);
//   var xmlHttp1 = new XMLHttpRequest();
//   xmlHttp1.open("POST", "/information/filter", true);
//   xmlHttp1.setRequestHeader("Content-Type", "application/json");
//   xmlHttp1.send(data);
// }

function filter_show_list(){
    var q = "" + get_filter();
    console.log(q);
    var dataJSON = {"query" : q};
    var data = JSON.stringify(dataJSON);
    var xmlHttp1 = new XMLHttpRequest();
    xmlHttp1.open("POST", "/information/select", true);
    xmlHttp1.setRequestHeader("Content-Type", "application/json");
    xmlHttp1.send(data);
    xmlHttp1.onreadystatechange = function() {
      console.log("success");
      if (xmlHttp1.readyState == XMLHttpRequest.DONE) {
        var result = JSON.parse(xmlHttp1.responseText);
        for (var i in result) {
        //  console.log("log"+result[i].customer_id);
          if(i==0||i>0&&result[i].customer_id!=result[i-1].customer_id){
          var customer_id = result[i].customer_id;
          //customer_id == user_id 일 때 추가안하도록 하기!!!
          var name = result[i].name;
          var strArray = result[i].birth.split('-');
          var year = strArray[0];
          var age = 2018-year+1;
          var sex = result[i].sex;
          var house_exist = result[i].house_exist;
          var progress_id = result[i].progress_id;
          var progress_name;
          switch (house_exist) {
            case 0:
              house_exist='X';
              break;
            case 1:
              house_exist='O';

          }
          switch (sex) {
            case 0:
              sex='여자';
              break;
            case 1:
              sex='남자';

          }
          var obj = document.getElementById("info_tbody");
          var divAppend = document.createElement("tr");
          divAppend.setAttribute('id', "list_"+customer_id);
        //  divAppend.setAttribute('ondblclick','view_list('+customer_id+');');
          divAppend.className = 'content-item';
            console.log(customer_id);
          divAppend.innerHTML = "<td id="+customer_id+" onclick='page_move(\""+customer_id+"\");'>" + customer_id + "</td><td>" + age + "</td><td>" + sex + "</td><td>" + house_exist +  "</td>";
          obj.appendChild(divAppend);
        }
      }
    }
  }
}
