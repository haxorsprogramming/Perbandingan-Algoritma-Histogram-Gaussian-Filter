// route 
var rToLogin = server + 'login/proses';
var rToDashboard = server + 'dashboard/';

// vue object 
var loginApp = new Vue({
  el : '#login-app',
  data : {

  },
  methods : {
    loginAtc : function()
    {
      let username = document.querySelector('#txtUsername').value;
      let password = document.querySelector('#txtPassword').value;
      let ds = {'username':username, 'password':password}
      $.post(rToLogin, ds, function(data){
        let status = data.status;
        if(status === 'sukses'){
          window.location.assign(rToDashboard);
        }else{
          pesanUmumApp('warning', 'Gagal', 'Login gagal, periksa username / password !!!');
        }
      });
    }
  }
});

// function 
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

$.ajaxSetup({
  headers: {
      'X-CSRF-TOKEN': csrftoken
  }
});

document.querySelector('#txtUsername').focus();

function pesanUmumApp(icon, title, text)
{
  Swal.fire({
    icon : icon,
    title : title,
    text : text
  });
}