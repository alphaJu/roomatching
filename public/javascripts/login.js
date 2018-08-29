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
