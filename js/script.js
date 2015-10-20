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
      for(var i=0; i < proyectos.length; i++){
         list_proyectos += '<li class="list-project-item"><img class="list-project-image" src="'+proyectos[i].imagen+'"/><p class="list-project-description">'+proyectos[i].descripcion+'</p><a class="list-project-link" target="_blank" href="'+proyectos[i].url+'">Ir al Sitio</a></li>'
      }
      document.getElementById("proyectos").innerHTML= "<ul class='list-project'>"+list_proyectos+"</ul>";
      app.proyectos.colorProjects(proyectos);
    },
    colorProjects:function(proyectos){
      for(var j=0; j<proyectos.length;j++){
        document.getElementsByClassName("list-project-item")[j].style.background=proyectos[j].color;
      }
    }
  }; 
}();