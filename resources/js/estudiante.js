function activarUsu(){
    Swal.fire({
        text: 'Desea  Activar este registro?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si, Activar!'
        }).then((result) => {
        if (result.value) {

            var info = JSON.stringify($("#bloqueFormulario :input").serializeArray());
            $.ajax({
                
                type:"POST",
                dataType:"JSON",
                data: {info:info, key:"activar"},
                url:"../controllers/estudianteController.php" 

            }).done(function(data){

                console.log(data)
            if(data.estado){

                Swal.fire({
                    text: data.mensaje,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                    }).then((result) => {

                    linpiar();
                    location.reload();

                    });

            }
            }).fail(function(){
            });
            
        }
    });
};

function btnEdit(){
    $("#bloqueFormulario").show();
    $("#mostrarYOcultar").attr("hidden",true);
    $("#enviarData").attr("hidden",true);
    $("#cancel").attr("hidden",false);
    $("#drop").attr("hidden",false);
    $("#modi").attr("hidden",false);
    $("#desactivar").attr("hidden",false);
    $("#mostrarInactivos").attr("hidden",true);
    document.getElementById("est").disabled=true;

};

function linpiar(){
    $("#id").val("");
    $("#nom").val("");
    $("#ape").val("");
    $("#direc").val("");
    $("#tel").val("");
    $("#nie").val("");
    $("#est").val("");
};



$(document).ready(function(){

    $("#bloqueFormulario").hide();


    $(document).on("click", "#mostrarYOcultar", function(){
      $("#bloqueFormulario").toggle();
      $("#mostrarYOcultar").attr("hidden",true);
      $("#enviarData").attr("hidden",false);
      $("#cancel").attr("hidden",false);
      $("#mostrarInactivos").attr("hidden",true);
    });

    $(document).on("click", "#mostrarInactivos", function(){
        $("#mostrarYOcultar").attr("hidden",true);
        $("#ocultarTabla").attr("hidden",true);
        $("#tblInactivos").attr("hidden",false);
        $("#regresar").attr("hidden",false);
      $("#mostrarInactivos").attr("hidden",true);

      });

    $(document).on("click", "#regresar", function(){
        location.reload();
    });


    $(document).on("click","#cancel", function(){
        $("#bloqueFormulario").hide();
        $("#mostrarYOcultar").attr("hidden",false);
        $("#enviarData").attr("hidden",true);
        $("#cancel").attr("hidden",true);
        $("#drop").attr("hidden",true);
        $("#modi").attr("hidden",true);
        $("#desactivar").attr("hidden",true);
        $("#mostrarInactivos").attr("hidden",false);

        linpiar();
    });


    $("#tablaUsuarios").DataTable();



    //Envio de data

    $(document).on("click", "#enviarData", function(){
        var nom = $("#nom").val();
        var ape = $("#ape").val();
        var direc = $("#direc").val();
        var tel = $("#tel").val();
        var nie = $("#nie").val();
        var est =$("#est").val();
        if(nom.trim() != "" && ape.trim() != "" && direc.trim() != "" 
        && tel.trim() != ""&& nie.trim() != "" && est.trim() != "0" ){
            var info = JSON.stringify($("#bloqueFormulario :input").serializeArray());

            $.ajax({
                
                type:"POST",
                dataType:"JSON",
                data: {info:info, key:"agregar"},
                url:"../controllers/estudianteController.php" 

            }).done(function(data){

                console.log(data)
            if(data.estado){

                Swal.fire({
                    text: data.mensaje,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                  }).then((result) => {

                    linpiar();
                    location.reload();

                  });

            }
            }).fail(function(){
            });
        }
        else{
            Swal.fire("Error","Complete los campos","error");
        }
        
    });


    $(document).on("click", "#modi", function(){
        var nom = $("#nom").val();
        var ape = $("#ape").val();
        var direc = $("#direc").val();
        var tel = $("#tel").val();
        var nie = $("#nie").val();
        if(nom.trim() != "" && ape.trim() != "" && direc.trim() != "" 
        && tel.trim() != ""&& nie.trim() != ""){
            var info = JSON.stringify($("#bloqueFormulario :input").serializeArray());

            $.ajax({
                
                type:"POST",
                dataType:"JSON",
                data: {info:info, key:"modificar"},
                url:"../controllers/estudianteController.php" 

            }).done(function(data){

                console.log(data)
            if(data.estado){
                Swal.fire({
                    text: data.mensaje,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continuar'
                  }).then((result) => {

                    linpiar();
                    location.reload();

                  });
                

            }
            }).fail(function(){
            });
        }
        else{
            Swal.fire("Error","Complete los campos","error");
        }
    });


    $(document).on("click", "#drop", function(){        

            Swal.fire({
                title: 'Desea realmente eliminar este registro?',
                text: "Este registro no se podra recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'si, eliminar!'
              }).then((result) => {
                if (result.value) {

                    var info = JSON.stringify($("#bloqueFormulario :input").serializeArray());
                    $.ajax({
                        
                        type:"POST",
                        dataType:"JSON",
                        data: {info:info, key:"drop"},
                        url:"../controllers/estudianteController.php" 

                    }).done(function(data){

                        console.log(data)
                    if(data.estado){

                        Swal.fire({
                            text: data.mensaje,
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Continuar'
                          }).then((result) => {
        
                            linpiar();
                            location.reload();
        
                          });

                    }
                    }).fail(function(){
                    });
                  
                }
              });
    });

    $(document).on("click", "#desactivar", function(){
        
        

            Swal.fire({
                title: 'Desea realmente desactivar este registro?',
                text: "Podra activar nuevamente este usuario",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'si, desactivar!'
              }).then((result) => {
                if (result.value) {

                    var info = JSON.stringify($("#bloqueFormulario :input").serializeArray());
                    $.ajax({
                        
                        type:"POST",
                        dataType:"JSON",
                        data: {info:info, key:"desactivar"},
                        url:"../controllers/estudianteController.php" 

                    }).done(function(data){

                        console.log(data)
                        if(data.estado){

                            Swal.fire({
                                text: data.mensaje,
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Continuar'
                            }).then((result) => {
            
                                linpiar();
                                location.reload();
            
                            });

                        }
                    }).fail(function(){
                    });
                  
                }
              });
    });


    $(document).ready(function() {
        $('#est').select2();
    });

});