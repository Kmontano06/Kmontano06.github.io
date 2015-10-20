var lista= function(){
	var listArray=[];
 var array_size=0;

	this.agregarItem=function(nombre){
		listArray.push({
	    	nombre:nombre,
	    	status:false
	    });
		listaHecho.imprimirLista();
	}
	this.imprimirLista=function(){
			var listaItems= "";
			for(var i=0; i < listArray.length; i++){
			listaItems+= '<li id='+i+' class="list-note-item"><div class="content-list-item"><div class="item-check" onclick="positionCheck('+i+')"></div><h2 class="title-list">'+listArray[i].nombre+'</h2><button onclick="removeItems('+i+')" class="button button-list">Borrar</button></div></li>';
			listaHecho.totalItems();
		}
		document.getElementById("list").innerHTML='<ul class="list-note" id="main-list">'+listaItems+'</ul>';
		for(var i=0; i < listArray.length; i++){
			listaHecho.positionBackground(i);
		}
	}
	this.totalItems=function(){
		array_size=listArray.length;
		document.getElementById("total").innerHTML="<h2 class='title-item'>Total:</h2><p class='number-item'>"+array_size+"</p>";
		listaHecho.toDoItems();
	}
	this.toDoItems=function(){
		var status_true=0;
		var status_false=0;
		for(var i=0; i<listArray.length;i++){
			if(listArray[i].status == true){
				status_true++;
			}
		}
		status_false=array_size-status_true;
		document.getElementById("done").innerHTML="<h2 class='title-item'>Done:</h2><p class='number-item'>"+status_true+"</p>";
		document.getElementById("to-do").innerHTML="<h2 class='title-item'>To Do:</h2><p class='number-item'>"+status_false+"</p>";
	}
	this.removeItem=function(id){
		for(var i=0; i < listArray.length; i++){
			if(id === i){
				 listArray.splice(i,1);
			}
		}
		listaHecho.imprimirLista();
		listaHecho.totalItems();
	}
	this.backgroundCheck=function(id){
		for(var i=0; i < listArray.length; i++){
			if(id === i){
				if(listArray[i].status == false){
					listArray[i].status=true;
					listaHecho.positionBackground(id);
					listaHecho.totalItems();
				}else{
					listArray[i].status=false;
					listaHecho.positionBackground(id);
					listaHecho.totalItems();
				}
			}
		}
	}
	this.positionBackground=function(id){
		for(var i=0; i < listArray.length; i++){
			if(id === i){
				if(listArray[i].status == true){
					document.getElementsByClassName("item-check")[i].style.background="url(img/check.png)no-repeat";
					document.getElementsByClassName("item-check")[i].style.backgroundSize="100% ";
				}else{
					document.getElementsByClassName("item-check")[i].style.background="url(img/white-check.png)no-repeat";
					document.getElementsByClassName("item-check")[i].style.backgroundSize="100% ";
				}
			}
		}
	}
}
var listaHecho = new lista();
function listInline(){
	var lista_hacer = document.getElementById("noteItem").value;	
	listaHecho.agregarItem(lista_hacer);
}
function removeItems(id){
	listaHecho.removeItem(id);
}
function positionCheck(id){
	listaHecho.backgroundCheck(id);
}