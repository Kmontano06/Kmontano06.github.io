var jsonObj_countries;
function ajaxRequestCountry(){
  var select = document.getElementById("select");
  var option_select="";
  var mygetrequest =new XMLHttpRequest();
  var url_countries="https://restcountries.eu/rest/v1/all"
  mygetrequest.onreadystatechange = function(){
    if (mygetrequest.readyState === 4 &&  mygetrequest.status == 200){
      jsonObj_countries = JSON.parse(mygetrequest.responseText);
      for(var i = 0; i<jsonObj_countries.length; i++){
         option_select+='<option value="'+jsonObj_countries[i].altSpellings[0]+'">'+jsonObj_countries[i].name+'</option>';
      }
      select.innerHTML=option_select;
    }
  }
  mygetrequest.open("GET", url_countries, true);
  mygetrequest.send();
}
ajaxRequestCountry();
function ajaxRequest(){
	var city=document.getElementById("name-city").value;
	var select = document.getElementById("select").selectedIndex;
    var country = document.getElementsByTagName("option")[select].value;
    var country_name = document.getElementsByTagName("option")[select].innerHTML;
	var url= "http://api.openweathermap.org/data/2.5/weather?q="+city+","+country;
  var mygetrequest =new XMLHttpRequest();
  mygetrequest.onreadystatechange = function(){
    if (mygetrequest.readyState === 4 &&  mygetrequest.status == 200){
      var jsonObj = JSON.parse(mygetrequest.responseText);
      factory(jsonObj, country_name);
    }
  }
  mygetrequest.open("GET", url, true);
  mygetrequest.send();
};
var module = ( function( window, undefined ) {
  var objectCountry={};
  function myMethod(jsonObj, country_name){ 
    objectCountry.name=jsonObj.name;
    objectCountry.country=country_name;
    objectCountry.weather=jsonObj.weather[0].description;
    objectCountry.image=jsonObj.weather[0].icon; 
    return objectCountry;
  }
  return{
    transf : myMethod
  };
} )( window );
var paisesBuscados=[];
var objCountry;
var paises = "";
function factory(jsonObj, country_name){
  objCountry= module.transf(jsonObj, country_name);
  paisesBuscados.push(objCountry);
  for(var i= 0; i<paisesBuscados.length;i++){
   paises='<div class="countries-content zoomInDown animated"><h2 class="title title-name-city">'+paisesBuscados[i].name+'</h2><h3 class="title title-name-country">'+paisesBuscados[i].country+'</h3><img  class="image-weather" src="http://openweathermap.org/img/w/'+paisesBuscados[i].image+'.png"/><p class="paragraph-description">'+paisesBuscados[i].weather+'</p></div>'; 
  }
  document.getElementById('description').innerHTML=paises;
}

