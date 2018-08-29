document.write("<script type='text/javascript' src='/javascripts/customer.js'><"+"/script>");

var user_id = "";
function show_list(){
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/information/list", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(null);
  xmlHttp1.onreadystatechange = function() {
    console.log("success");
    if (xmlHttp1.readyState == XMLHttpRequest.DONE) {
      var result = JSON.parse(xmlHttp1.responseText);
      for (var i in result) {
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
          switch (progress_id) {
            case 0 :
                progress_name = '낫 옛';
                break;
            case 1 :
                progress_name = '거래 중';
                break;
            case 2 :
                progress_name = '거래 취소';
                break;
            case 3 :
                progress_name = '거래 완료';
                break;
          }
          var obj = document.getElementById("info_tbody");
          var divAppend = document.createElement("tr");
          divAppend.setAttribute('id', "list_"+customer_id);
          divAppend.className = 'content-item';
          console.log(customer_id);
          divAppend.innerHTML = "<td id="+customer_id+" onclick='page_move(\""+customer_id+"\");'>" + name + "</td><td>" + age + "</td><td>" + sex + "</td><td>" + house_exist +  "</td><td>" + progress_name + "</td>";
          obj.appendChild(divAppend);
        }
      }
    }
  }
}

function page_move(select){
  console.log(select);
  location.href = '/information/view?customer_id='+select;
}

function get_info(){
  var url = unescape(location.href);
  var get = url.split("?");
  var val = get[1].split("=");
  return val[1];
}

function view_list(select){
 console.log(select);
  var dataJSON = {"customer_id" : select};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/information/view", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
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
      console.log(user_id);
      console.log(result.customer_id);
      if(user_id==result.customer_id){
       document.getElementById("modify").innerHTML="<button>수정</button>";
      }
      else{
       document.getElementById("modify").innerHTML="<button>평가보기</button>";
      }
    }
  }
}
function modify_list(){
  var dataJSON = {"customer_id" : user_id, "pwd" : document.modify_form.pwd.value, "name" : document.modify_form.name.value, "birth" : document.modify_form.birth.value, "phone" : document.modify_form.phone.value};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/customer/insert", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      // console.log(resultJSON);
      if(result_obj.message !== 'Editing failed'){
        location.href = ("/customer/view");
      }
      else{
        alert("Failed To Edit!");
      }
    }
  }
}
