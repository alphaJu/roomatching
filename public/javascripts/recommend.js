// document.write("<script type='text/javascript' src='/javascripts/customer.js'><"+"/script>");
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
      console.log(user_id);
      view_recommend();
    }
  }
});

function insert_recommend(){
  console.log(user_id);
  var dataJSON = {"customer_id":user_id,"clean" : document.recommend_form.clean.value, "life" : document.recommend_form.life.value, "smoke" : document.recommend_form.smoke.value, "house" : document.recommend_form.house.value, "alcohol" : document.recommend_form.alcohol.value};
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
        alert("Success To Insert!");
      }
    }
  }
}

function modify_recommend(){
  console.log('modify');
  var dataJSON = {"customer_id":user_id,"clean" : document.recommend_form.clean.value, "life" : document.recommend_form.life.value, "smoke" : document.recommend_form.smoke.value, "house" : document.recommend_form.house.value, "alcohol" : document.recommend_form.alcohol.value};
  var data = JSON.stringify(dataJSON);
  var xmlHttp1 = new XMLHttpRequest();
  xmlHttp1.open("POST", "/recommend/modify", true);
  xmlHttp1.setRequestHeader("Content-Type", "application/json");
  xmlHttp1.send(data);
  xmlHttp1.onreadystatechange = function(){
    if(xmlHttp1.readyState == XMLHttpRequest.DONE){
      var resultJSON = xmlHttp1.response;
      var result_obj = JSON.parse(resultJSON);
      console.log(resultJSON);
      if(result_obj.message !== 'Editing failed'){
        location.href=("/index");
      }
      else{
        alert("Failed To Edit!");
        location.href=("/recommend/view")
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

function calculate_recommend(){ //잠시 보류

}
