var app={};
app.ajaxRequest=function(){
  var mygetrequest =new XMLHttpRequest();
  mygetrequest.onreadystatechange = function(){
    if (mygetrequest.readyState === 4 &&  mygetrequest.status == 200){
      var jsonObj = JSON.parse(mygetrequest.responseText);
        app.proyectos.imprimirProyectos(jsonObj.proyectos);   
    }
  }
  mygetrequest.open("GET", "js/proyectos.json", true);
  mygetrequest.send();
}();
app.proyectos = function(){
  return{
    imprimirProyectos:function(proyectos){
      var list_proyectos ="";
      for(i=0; i < proyectos.length; i++){
         list_proyectos += '<li class="list-project-item"><div class="container-left"><h2 class="container-left-title">'+proyectos[i].nombre+'</h2><img class="container-left-image" src="'+proyectos[i].imagen+'"/></div><div class="container-right"><p class="container-right-description">'+proyectos[i].descripcion+'</p><a class="container-right-link" href="'+proyectos[i].url+'">Ir al Sitio</a></div></li>'
      }
      document.getElementById("proyectos").innerHTML= "<ul class='list-project'>"+list_proyectos+"</ul>";
    }
  }; 
}();
function validacionForm() {
 var email_correcto=false;
 var name_correcto=false;
 var textarea_correcto=false;
 var name = document.getElementById("name-value").value;
 if(name.length === 0 || name.length <= 10){
  document.getElementById("message-name").className="content-title-input incorrecto";
   document.getElementById("message-name").innerHTML="Nombre: Nombre Incorrecto! Ingreselo Nuevamente";

 }
 else{
  document.getElementById("message-name").className="content-title-input correcto";
  document.getElementById("message-name").innerHTML="Nombre:";
  name_correcto=true;
 }
var email = document.getElementById("email").value;
    var email_patron = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    var resultado_email = email_patron.test(email);
    if(resultado_email === true){
      document.getElementById("message-email").className="content-title-input correcto";
      document.getElementById("message-email").innerHTML="Correo:";
      email_correcto=true;
    }else{
      document.getElementById("message-email").className="content-title-input incorrecto";
        document.getElementById("message-email").innerHTML="Correo: Correo Incorrecto! Ingreselo Nuevamente";
    }
    var textarea = document.getElementById("textarea-value").value;
    if(textarea.length === 0 || textarea.length <= 10){
      document.getElementById("message-textarea").className="content-title-input incorrecto";
      document.getElementById("message-textarea").innerHTML="Mensaje: Mensaje Incorrecto! Ingreselo Nuevamente";

    }else{
      document.getElementById("message-textarea").className="content-title-input correcto";
      document.getElementById("message-textarea").innerHTML="Mensaje:";
      textarea_correcto=true;
    }

    if(name_correcto === true && email_correcto === true && textarea_correcto === true){
      alert("El mensaje ha sido enviado");
      // Este codigo hace que la pagina se refresque
      window.location.reload();  
    }
};