var AppInventario={};
// Creacion del Modulo
AppInventario.inventarioProductos = function(){
    // Creacion de los Productos con un Constructor
    var productos=[
        new productoNuevo("Computadoras",10, 250,1231, "img/computadora.png","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis molestie nisi. Integer in libero eget lectus interdum sodales. Integer nec erat erat. Fusce id elit cursus, fringilla lectus varius, blandit justo."),
        new productoNuevo("Televisores",12, 350,1232,"img/televisor.png","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis molestie nisi. Integer in libero eget lectus interdum sodales. Integer nec erat erat. Fusce id elit cursus, fringilla lectus varius, blandit justo. "),
        new productoNuevo("Teclados",9, 75,1233,"img/teclado.png", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis molestie nisi. Integer in libero eget lectus interdum sodales. Integer nec erat erat. Fusce id elit cursus, fringilla lectus varius, blandit justo. "),
        new productoNuevo("Telefonos",12,150,1234,"img/telefono.png", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis molestie nisi. Integer in libero eget lectus interdum sodales. Integer nec erat erat. Fusce id elit cursus, fringilla lectus varius, blandit justo. "),
        new productoNuevo("Radios",7, 125,1235,"img/radio.png", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis molestie nisi. Integer in libero eget lectus interdum sodales. Integer nec erat erat. Fusce id elit cursus, fringilla lectus varius, blandit justo. "),
        new productoNuevo("Mouse",25,50,1236,"img/mouse.png", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis molestie nisi. Integer in libero eget lectus interdum sodales. Integer nec erat erat. Fusce id elit cursus, fringilla lectus varius, blandit justo. "),
        new productoNuevo("Camaras",30, 200,1237,"img/camara.png", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis molestie nisi. Integer in libero eget lectus interdum sodales. Integer nec erat erat. Fusce id elit cursus, fringilla lectus varius, blandit justo. ")
    ]; 
        return{
            mostrarProductos:function(next){
                var list_products="";
                for(var i=0; i < productos.length; i++){
                    list_products+='<li class="list-products-item" onclick="AppInventario.inventarioProductos.activeProduct('+i+');"><h1 class="title-item">'+productos[i].nombre+'</h1></li>';
                }
                document.getElementById('products-name').innerHTML='<ul class="list-products">'+list_products+'</ul>'; 
                if(next === undefined || next > (productos.length-1)){
                    AppInventario.inventarioProductos.activeProduct(0);
                }else{
                    AppInventario.inventarioProductos.activeProduct(next);
                }    
                   
            },
            activeProduct:function(indice){
                var product='<img class="image-product" src="'+productos[indice].image+'"><div class="content-info-product"><h1 class="title-product">'+productos[indice].nombre+'</h1><h2 class="feature-product"><span class="subtitle-product">Precio:</span>$'+productos[indice].precio+'</h2><h2 class="feature-product"><span class="subtitle-product">Cantidad:</span>'+productos[indice].cantidad+'uds.</h2></div><p class="description-product"><span class="subtitle-product">Detalle:</span>'+productos[indice].detalle+'<p><div class="button-delete" onclick="AppInventario.inventarioProductos.borrarProducto('+productos[indice].codigo+');"></div>';
                var list_items=document.getElementsByClassName('list-products-item');
                for(var i = 0; i < list_items.length;i++){
                    if(indice == i){
                        document.getElementsByClassName('list-products-item')[i].className="list-products-item product-choose";
                    }else{
                        document.getElementsByClassName('list-products-item')[i].className="list-products-item";
                    }
                }
                document.getElementById('product').innerHTML=product;
            },
            borrarProducto:function(p){
                for(i=0; i < productos.length; i++){
                    if(p == productos[i].codigo){
                        productos.splice(i,1);
                        AppInventario.inventarioProductos.mostrarProductos(i);
                    }
                }
            },
            agregarProducto:function(){
                var nombre = document.getElementById("nombre").value;
                var precio = document.getElementById("precio").value;
                var cantidad = document.getElementById("cantidad").value;
                var codigo = document.getElementById("codigo").value;
                var detalle = document.getElementById("detalle").value;
                var img = document.getElementById("image").value;
                var image= "img/"+img;
                productos.push(new productoNuevo(nombre,cantidad,precio,codigo,image,detalle));
                AppInventario.inventarioProductos.mostrarProductos((productos.length-1));
            }
        }
    //Funcion Constructor
    function productoNuevo(nombre,cantidad,precio,codigo,image,detalle){
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.codigo = codigo;
        this.image=image;
        this.detalle = detalle;
    };
}();
AppInventario.inventarioProductos.mostrarProductos();