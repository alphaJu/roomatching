document.write("<script type='text/javascript' src='/javascripts/customer.js'><"+"/script>");
window.addEventListener('DOMContentLoaded', function () {
  console.log("open!");
  var xhr = new XMLHttpRequest();
  xhr.open("GET", '/index/getInfo', true);
  xhr.send(null);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var result_obj = JSON.parse(xhr.responseText);
      user_id = result_obj.customer_id;
      eval_done(get_eval());

    }
  }
});
function get_eval(){
  var url = unescape(location.href);
  var get = url.split("?");
  var val = get[1].split("=");
  var id=val[1].split("#");

  return id[0];
}

function eval_done(ed){
  console.log(user_id);
  var dataJSON = {"customer_id" : user_id};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/eval/auth", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var result = JSON.parse(xmlHttp1.responseText);
      if(result.message == "Select failed"){
        console.log("eval_done");
        return false;
      }
      else{
        var p_id = result.progress_id;
        console.log("p_id = " + p_id);
        if(p_id == 4){
          alert("완료된 매칭에 대해서 평가를 하세요!");
          return false;
        }
        else{
          console.log("ed = " + ed);
          list_eval(ed);
          return true;
        }
      }
    }
  }
}

function list_eval(ed){
  var dataJSON = {"ed_custom" : ed};
  console.log('////////////////////');
  console.log(ed+'ed');
  console.log(user_id+'user');
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/eval/list", true); //..?
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    console.log("success1");
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){

      var result = JSON.parse(xmlHttp1.responseText);
      var sum1=0,sum2=0,sum3=0,sum4=0,num=0;
      console.log(result.message);
      if(result.message=="There are no evaluations"){
        console.log('wow');
        document.getElementById("menu2").innerHTML='</br>등록된 평가가 없습니다.';}
      else{
        for (var i in result){
          sum1+=result[i].q1;
          sum2+=result[i].q2;
          sum3+=result[i].q3;
          sum4+=result[i].q4;
          num+=1;
          if(ed!=user_id){
            console.log('다름');
              var sub = result[i].sub;
              var er = result[i].er_custom;

              var obj = document.getElementById("sub_tbody");
              var divAppend = document.createElement("tr");
              divAppend.setAttribute('id', "list_"+result[i].er_custom);
              divAppend.innerHTML = "<td id="+er+">" + er+ "</td><td>" + sub + "</td>";
              obj.appendChild(divAppend);
            }
          else{
            $('#list_div').hide();
          }
      $("#score_1").val(sum1/num);
      $("#score_2").val(sum2/num);
      $("#score_3").val(sum3/num);
      $("#score_4").val(sum4/num);
      $("#all").val((sum1+sum2+sum3+sum4)/4);
      // //  var divAppend = document.createElement("tr");
      //   divAppend.setAttribute('id', "list_"+customer_id);
      // //  divAppend.setAttribute('ondblclick','view_list('+customer_id+');');
      //   divAppend.className = 'content-item';
      //     console.log(customer_id);
      //   divAppend.innerHTML = "<td id="+customer_id+" onclick='page_move(\""+customer_id+"\");'>" + name + "</td><td>" + age + "</td><td>" + sex + "</td><td>" + house_exist +  "</td><td>" + progress_name + "</td>";
      //   obj.appendChild(divAppend);
    }}

      }
    }
  }
