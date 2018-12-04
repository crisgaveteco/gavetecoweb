/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    var hoy = new Date();
    $("#añoListado").val(hoy.getFullYear());
    $("#mesListado").val(hoy.getMonth()+1);
    if(hoy.getDay()<16){
        $("#quincListado").val(1);
    }else{
        $("#quincListado").val(2);
    }
    refrescarTablas();
    setInterval(refrescarTablas, 20000);
});


function refrescarTablas(){
    refrescarTablaIva();
    refrescarTablaGCIAS();
    refrescarTablaARBA();
}
function agregarFilaRetencion(retencion,impuesto){
    var importeRetencion="";
    var facturas;
    var proveedor;
    switch(impuesto){
        case "Gcias":
        importeRetencion=retencion.retencion-retencion.ret_ant;
        if(retencion.fijo){
            importeRetencion+=retencion.fijo;
        }
        proveedor=retencion.proveedor.nombre;
        facturas=retencion.facs;
        break;
    case "Iva":
        console.log(retencion);
        importeRetencion=retencion.ret_importe;
        facturas=retencion.nroFactura;
        proveedor=retencion.proveedor.nombre;
        break;
    case "ARBA":
        importeRetencion= retencion.importe;
        facturas=retencion.nrosFc;
        proveedor=retencion.proveedor.nombre;
    }
    $("#resumen"+impuesto+" table tbody").append('<tr class="filaTablaRet">'+
            '<td class="colId celdaTabla">'+retencion.id+
            '</td><td class="colProv celdaTabla">'+proveedor+
            '</td><td class="colImporte celdaTabla">'+parseFloat(importeRetencion.toFixed(2)).toLocaleString("en-US",{minimumFractionDigits: 2})+
            '</td><td class="colNroFactura celdaTabla text-truncate"  data-toggle="tooltip" data-placement="top" title="'+facturas+'"><span>'+facturas+'</span>'+
            '</td><td class="colRetFecha celdaTabla">'+retencion.ret_fecha.toString().substr(0,10)+
            '</td><td class="colAcciones celdaTabla"><a><i class="fas fa-print"></i></a><a><i class="fas fa-eye"></i></a><a><i class="fas fa-times-circle"></i></a></td></tr>');
}
function getNextRet(){
      $.post({
            url: 'IVA/getNextRet',
            contentType: 'application/json',
            cache: false,
            async: true,
            success: function (data) {
                console.log("Datos recibidos en index.js linea 65: "+JSON.parse(data));
                $("#nextRet").val(JSON.parse(data));
            },
            error: function (response)
            {
                alert('error al guardar los datos');
            }
            //return false;
        });
}
function setNextRet(){
    $.post({
            url: 'IVA/setNextRet',
            contentType: 'application/json',
            cache: false,
            data: JSON.stringify({nextId:$("#nextRet").val()}),
            async: true,
            success: function (data) {
                
            },
            error: function (response)
            {
                alert('error al guardar los datos');
            }
            //return false;
        });
}
function refrescarTablaIva() {
    console.log("Actualizando tabla");
    var totalQuincena=0;
  $.post({
            url: 'IvaQuincena',
            contentType: 'application/json',
            data: JSON.stringify({año: $("#añoListado").val() ,mes:$("#mesListado").val(),quinc:$("#quincListado").val()}),
            cache: false,
            async: true,
            success: function (data) {
                $("#resumenIva tbody").html("");
                var rets=JSON.parse(data);
                rets.forEach(function(retencion){
                    totalQuincena+=retencion.ret_importe;
                    agregarFilaRetencion(retencion,"Iva");
                });
                $("#totalQuincenaIva").html(parseFloat(totalQuincena.toFixed(2)).toLocaleString("en-US",{minimumFractionDigits: 2}));
            },
            error: function (response)
            {
                alert('error al guardar los datos');
            }
            //return false;
        });
}
function refrescarTablaGCIAS() {
    console.log("Actualizando tabla");
    var totalQuincena=0;
  $.post({
            url: 'GciasQuincena',
            contentType: 'application/json',
            data: JSON.stringify({año: $("#añoListado").val() ,mes:$("#mesListado").val(),quinc:$("#quincListado").val()}),
            cache: false,
            async: true,
            success: function (data) {
                $("#resumenGcias tbody").html("");
                var rets=JSON.parse(data);
                rets.forEach(function(retencion){
                    console.log("Linea 88 "+JSON.stringify(retencion));
                    totalQuincena+=(retencion.retencion-retencion.ret_ant);
                    if(retencion.fijo){
                        totalQuincena+=retencion.fijo;
                    }
                    agregarFilaRetencion(retencion,"Gcias");
                });
                $("#totalQuincenaGCIAS").html(parseFloat(totalQuincena.toFixed(2)).toLocaleString("en-US",{minimumFractionDigits: 2}));
            },
            error: function (response)
            {
                alert('error al guardar los datos');
            }
            //return false;
        });
}
function refrescarTablaARBA() {
    console.log("Actualizando tabla");
    var totalQuincena=0;
  $.post({
            url: 'ARBAQuincena',
            contentType: 'application/json',
            data: JSON.stringify({año: $("#añoListado").val() ,mes:$("#mesListado").val(),quinc:$("#quincListado").val()}),
            cache: false,
            async: true,
            success: function (data) {
                $("#resumenARBA tbody").html("");
                var rets=JSON.parse(data);
                rets.forEach(function(retencion){
                    totalQuincena+=retencion.importe;
                    agregarFilaRetencion(retencion,"ARBA");
                });
                $("#totalQuincenaARBA").html(parseFloat(totalQuincena.toFixed(2)).toLocaleString("en-US",{minimumFractionDigits: 2}));
            },
            error: function (response)
            {
                alert('error al guardar los datos');
            }
            //return false;
        });
}