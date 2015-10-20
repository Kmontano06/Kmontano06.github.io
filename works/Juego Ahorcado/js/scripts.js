var Game=(function(){
    var content_letter=[];
    var palabraActual="";
    var arreglo_palabra="";
    var intentos=1;
    var level=0;
    var letter_word=0;
    var color_level="";
    var palabras_game=[
        new PalabraNueva("casa",1),
        new PalabraNueva("sapo",1),
        new PalabraNueva("cama",1),
        new PalabraNueva("lata",1),
        new PalabraNueva("papa",1),
        new PalabraNueva("salero",2),
        new PalabraNueva("perro",2),
        new PalabraNueva("muebles",2),
        new PalabraNueva("teclado",2),
        new PalabraNueva("zapato",2),
        new PalabraNueva("camisa",2),
        new PalabraNueva("murcielago",3),
        new PalabraNueva("busqueda",3),
        new PalabraNueva("extremadamente",3),
        new PalabraNueva("herencia",3),
        new PalabraNueva("sistema",3)
    ];
    function PalabraNueva(palabra, nivel){
        this.palabra = palabra;
        this.nivel = nivel;
    };
    function agregarNuevaPalabra(palabra, nivel){
        palabras_game.push(new palabranueva(palabra,nivel));
    }
    function reloadPage(){
        location.reload()
    }
    function palabraAleatoria(palabras_nivel){
        var num_random=Math.floor(Math.random()*(palabras_nivel.length));
        for(var j=0;j<palabras_nivel.length;j++){
            if(j == num_random){
                palabraActual=palabras_nivel[j];
            }
        }
        arreglo_palabra = palabraActual.split("");
    }
    function chooseLevel(num){
        var button=document.getElementsByClassName("button-level");
        level=num;
        chooseColor(num);
        for(var j=0; j < button.length;j++){
            button[j].className='button-level level-'+(j+1);
            button[num-1].className='button-level level-'+num+' select';
            document.getElementById("start").disabled=false;
        }
        var palabras_nivel=[];
        for(var i=0; i < palabras_game.length;i++){
            if(num == palabras_game[i].nivel){
                palabras_nivel.push(palabras_game[i].palabra);
            }
        }
        palabraAleatoria(palabras_nivel);
    }
    function chooseColor(num){
        if(num == 1){
            color="#1b99a7";
        }else if(num == 2){
            color="#f05a45";
        }else{
             color="#8db73b";
        }
    }
    function startGame(){
       createKeyboard();
    }
    function createContentGame(letters){
        document.getElementById("wrapper").innerHTML='<div class="content-game"><h3 class="title-wrapper">Adivina la Palabra!!!</h3><span class="subtitle-wrapper">Nivel '+level+'</span><div class="content-word" id="word"></div><div class="content-left"><ul class="list-letter">'+letters+'</ul><div id="letter"></div></div><div class="content-right" id="image"><img class="image-game" src="img/1.png"/></div></div>';
        document.getElementsByClassName("subtitle-wrapper")[0].style.color=color;
        createWord();
    }
    function createWord(){
        var word="";
        for(var i=0;i<arreglo_palabra.length;i++){
            word+='<li class="list-word-item"><h4 class="title-letter">'+i+'</h4></li>';
        }
        document.getElementById("word").innerHTML='<ul class="list-word">'+word+'</ul>';
        var list_word=document.getElementsByClassName("list-word-item");
        for(var j=0; j < list_word.length; j++){
            list_word[j].style.borderBottom="4px solid "+color;
        }
    }
    function createKeyboard(){
        var letters="";
        for(var i=0;i < 26;i++ ){
            letters+='<li class="list-letter-item" onclick="Game.recorrerPalabra('+i+')">'+String.fromCharCode(i+65)+'</li>';
        }
        createContentGame(letters);
        
    }
    function recorrerPalabra(letter){
        var list_item=document.getElementsByClassName("list-letter-item");
        var print_letter="";
        var cont=0;
        for(var i=0;i<list_item.length;i++){
            print_letter=list_item[letter].innerHTML;
        }
        for(var j=0;j<arreglo_palabra.length;j++){
            if(print_letter.toLowerCase() === arreglo_palabra[j]){
                document.getElementsByClassName("title-letter")[j].innerHTML=arreglo_palabra[j].toUpperCase();
                document.getElementsByClassName("title-letter")[j].style.visibility="visible";
                letter_word=letter_word+1;
            }else{
                cont=cont+1;
            }
        }
        if(cont === arreglo_palabra.length){
            document.getElementsByClassName("list-letter-item")[letter].style.background="#f7c911";
            document.getElementsByClassName("list-letter-item")[letter].style.disabled=true;
            intentos=intentos+1;
            document.getElementById("image").innerHTML='<img class="image-game" src="img/'+intentos+'.png"/>'
        }else{
            document.getElementsByClassName("list-letter-item")[letter].style.background=color;
            document.getElementsByClassName("list-letter-item")[letter].style.disabled=true;

        }
        endGame(intentos, letter_word);
    }
    function endGame(intentos, letter_word){
        var content_message="";
        if(letter_word === arreglo_palabra.length){
            content_message='Felicidades Ganaste!!!';
            document.getElementsByClassName("opacity-content")[0].style.opacity="0.1";
            document.getElementById("popup").style.display="block";
        }
        if(intentos === 9){
            content_message="Que Mal Perdiste!!!"
            document.getElementsByClassName("opacity-content")[0].style.opacity="0.1";
            document.getElementById("popup").style.display="block";
        }
        document.getElementById("popup").innerHTML='<div class="content-message"><img class="logo-image" src="img/logo.png" alt=""><h1 class="title">J<span class="font-little">UEGO</span> A<span class="font-little">HORCADO</span></h1><div class="content-info"><h1 class="title-message">'+content_message+'</h1><p class="subtitle-message">La Palabra era '+palabraActual.toUpperCase()+'</p><button class="button-message" onclick="Game.reloadPage()">Volver a Jugar</button></div></div>';;
        if(content_message != ""){
            document.getElementsByClassName("title-message")[0].style.color=color;
        }
    }
    return{
        recorrerPalabra:recorrerPalabra,
        chooseLevel:chooseLevel,
        startGame:startGame,
        reloadPage:reloadPage
    }
})();
