$(function(){
  var l = new Login();
})


class Login {
  constructor() {
    this.submitEvent()
  }

  submitEvent(){
    $('form').submit((event)=>{
      event.preventDefault()
      this.sendForm()
    })
  }

  sendForm(){
    let form_data = new FormData();
    form_data.append('username', $('#user').val());
    form_data.append('passw', $('#password').val());

    $.ajax({
      url: '../server/check_login.php',
      dataType: "json",
      cache: false,
      data: form_data,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(php_response){
        if (php_response.msg == "OK") {
          window.location.href = 'main.php';
        }else {
          alert(php_response.msg);
        }
      },
      error: function(){
        alert("error en la comunicación con el servidor !!!");
      }
    });
  }
}
