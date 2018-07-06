/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $("#codProv").blur(function (e) {
        e.preventDefault();
        $.post({
            url: '../avm/proveedor',
            contentType: 'application/json',
            data: JSON.stringify({codProv: $("#codProv").val()}),
            cache: false,
            async: true,
            success: function (data) {
                proveedor = JSON.parse(data);
                console.log("intentando grabar el nombre: " + proveedor.nombre);
                $("#razonSocial").val(proveedor.nombre);
            },
            error: function (response)
            {
                alert('error al guardar los datos');
            }
            //return false;
        });
    });
});



