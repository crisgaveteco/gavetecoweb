/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var proveedor = {};

//var cuadroHonorariosGCIAS = [{min: 0, max: 2000, fijo: 0, porc: 10, exced: 0},
//    {min: 2000, max: 4000, fijo: 200, porc: 14, exced: 2000},
//    {min: 4000, max: 8000, fijo: 480, porc: 18, exced: 4000},
//    {min: 8000, max: 14000, fijo: 1200, porc: 22, exced: 8000},
//    {min: 14000, max: 24000, fijo: 2520, porc: 26, exced: 14000},
//    {min: 24000, max: 40000, fijo: 5120, porc: 28, exced: 24000},
//    {min: 40000, max: 99999999, fijo: 9600, porc: 30, exced: 40000}];

var cuadroHonorariosGCIAS = [{min: 0, max: 5000, fijo: 0, porc: 5, exced: 0},
    {min: 5000, max: 10000, fijo: 250, porc: 9, exced: 5000},
    {min: 10000, max: 15000, fijo: 700, porc: 12, exced: 10000},
    {min: 15000, max: 20000, fijo: 1300, porc: 15, exced: 15000},
    {min: 20000, max: 30000, fijo: 2050, porc: 19, exced: 20000},
    {min: 30000, max: 40000, fijo: 3950, porc: 23, exced: 30000},
    {min: 40000, max: 60000, fijo: 6250, porc: 27, exced: 40000},
    {min: 60000, max: 99999999, fijo: 11650, porc: 31, exced: 60000}];

var cuadroGcias = [{concepto: "Bienes", importe: 142400, porc: 2},
    {concepto: "Servicios", importe: 42700, porc: 2},
    {concepto: "Alquileres", importe: 7120, porc: 6},
    {concepto: "Honorarios", importe: 10700, porc: 2, tabla: cuadroHonorariosGCIAS},
    {concepto: "Fletes", importe: 42700, porc: 2}];

var minimaRetGCIAS=150;

function sumarImportes(selector) {
    var n = 1;
    var inputsIva = $(selector);
    var totalIva = 0;
    inputsIva.each(function (i, input) {
        totalIva += parseFloat($(input).val());
    });
    console.log(totalIva);
}

function sumarIvas() {
    sumarImportes(".ivaFactura");
}
function sumarNetos() {
    sumarImportes(".netoFactura");
}

function agregarFactura() {
    var facturaModelo = $("#factura1").clone(true, true).attr("id", "factura" + ($(".factura").length + 1));
    facturaModelo.find("input").each(function (i, campo) {
        if ($(campo).attr("type") === "checkbox") {
            $(campo).prop("checked", false);
            //$(campo).click(setClickBloquearFc);
        } else {
            $(campo).val("");
            $(campo).attr("disabled", false);
        }
    });
    facturaModelo.find("select").each(function (i, campo) {
        $(campo).attr("disabled", false);
    });
//    facturaModelo.find(".quitarFactura").each(function (i, boton) {
//        $(boton).click(function () {
//            if ($(".factura").length > 1) {
//                $(boton).parent().remove();
//            }
//        });
//    });
    facturaModelo.appendTo($("#facturas"));
}

function calcularAcumGCIAS(evt) {
    var valido = false;
    $(".acumGCIAS").each(function (i, input) {
        if ($(input).is(":valid"))
            valido = true;
    });
    if (valido) {
        $("#brutoTotalGCIAS").val((parseFloat($("#brutoAntGCIAS").val()) + parseFloat($("#brutoGCIAS").val())).toFixed(2));
        $("#netoTotalGCIAS").val((parseFloat($("#netoAntGCIAS").val()) + parseFloat($("#netoGCIAS").val())).toFixed(2));
        $("#deduccionesTotalGCIAS").val((parseFloat($("#deduccionesAntGCIAS").val()) + parseFloat($("#deduccionesGCIAS").val())).toFixed(2));
    } else {
        $("#brutoTotalGCIAS").val("");
        $("#netoTotalGCIAS").val("");
        $("#deduccionesTotalGCIAS").val("");
    }
}

function validarEnteros(input) {
    if (!$(input).is(":valid")) {
        input.setCustomValidity("Punto de venta inválido");
        $(input).focus();

    }

}

function datosCompletosFC(idFc) {

}
function crearRetencion(serieFc, ptoVta, nroFc, retencion, porc) {
    return '<div class="retencionIva" id="retencionIva' +
            serieFc +
            '"><label>Factura: </label><input type="number" value="' + ptoVta +
            '" min=0 max=9999 step=1 pattern="[0-9]{1,4}" disabled>-<input type="number" value="' + nroFc +
            '" min=0 max=99999999 step=1 pattern="[0-9]{1,8}" disabled></span>' +
            '<label for="importeRetIva' + serieFc + '">Importe Retencion</label><input type="number" class="importeRetIva" id="importeRetIva' + serieFc + '" value="' + retencion + '" min=0 step=0.01 pattern="^\d+(\.|\,)\d{2}$" disabled>' +
            '<input type="number" name="porcRetIva' + serieFc + '" class="porcRetIva" id="porcRetIva' + serieFc + '" value="' + porc + '" min=0 max=100 step=10 pattern="^\d+(\.|\,)\d{2}$" disabled>' +
            '<label for="porcRetIva' + serieFc + '">% Retenido del IVA</label><input class="desbloqueaPorcRet" id="desbloqueaPorcRet' + serieFc + '"type="checkbox">' +
            '<input class="impRetIva" id="impRetIva' + serieFc + '" type="button" value="P"></input>' + '</div>';
}



function agregarRetIva(idFc){
    var netoG = $(idFc).find(".netoFc").val();
    var iva = $(idFc).find(".ivaFc").val();
    var ptoVta = $(idFc).find(".ptoVtaFc").val();
    var nroFc = $(idFc).find(".nroFc").val();
    var porc = 0;
    var retencion = 0;
    var es51 = $(idFc).find(".fcM").prop("checked");
    var concepto = $(idFc).find(".conceptoFc option:selected").val();
    var serieFc = $(idFc).attr("id").replace("factura", "");
    if (($("#exclusiones .exclusion:checked").length === 0 && iva >= 400)||(($("#reproweb option:selected").val() === "2" || $("#reproweb option:selected").val() === "5" || es51) && iva < 400)) {
        if ($("#reproweb option:selected").val() === "2" || $("#reproweb option:selected").val() === "5" || es51) {
            porc = 100;
        } else {
            if ($("#reproweb option:selected").val() === "4") {
                porc = 0;
            } else {
                if (parseFloat(netoG) + parseFloat(iva) < 24000) {
                    porc = 100;
                } else {
                    if (concepto === "3" || concepto === "1" || concepto === "2") {
                        porc = 80;
                    } else {
                        porc = 50;
                    }
                }
            }
        }
        retencion = Math.round(iva * porc) / 100;
        $("#retencionesIva").append(crearRetencion(serieFc, ptoVta, nroFc, retencion, porc));
        $("#porcRetIva" + serieFc).change(function (e) {
            $($(e.target).parent()).find(".importeRetIva").val((parseFloat($("#factura" + $(e.target).attr("id").replace("porcRetIva", "") + " .ivaFc").val()) * parseFloat($(e.target).val()) / 100).toFixed(2));
        });
        $("#porcRetIva" + serieFc).blur(function (e) {
            $("#porcRetIva" + serieFc).change();
        });
        $("#porcRetIva" + serieFc).click(function (e) {
            $("#porcRetIva" + serieFc).change();
        });
        $("#desbloqueaPorcRet" + serieFc).click(function (evt) {
            if ($(evt.target).prop("checked")) {
                $("#porcRetIva" + $(evt.target).attr("id").replace("desbloqueaPorcRet", "")).attr("disabled", false);
            } else {
                $("#porcRetIva" + $(evt.target).attr("id").replace("desbloqueaPorcRet", "")).attr("disabled", true);
            }

        });

        $("#impRetIva" + serieFc).click(function (evt) {
            var id = $(evt.target).parent().attr("id").replace("retencionIva", "");
            console.log("fecha fc en emitir.js  :   " + $("#factura" + id + " .fechaFc").val());
            var fechaFcISO = $("#factura" + id + " .fechaFc").val();
            var fechaFcARG = fechaFcISO.substr(8, 2) + "/" + fechaFcISO.substr(5, 2) + "/" + fechaFcISO.substr(0, 4);
            var regimen = "";
            if ($("#factura" + id + " .fcM").attr("checked")) {
                regimen = "499";
            } else {
                regimen = "214";
            }
            var datosFactura = {proveedor: proveedor,
                factura: {ptoVta: $("#factura" + id + " .ptoVtaFc").val(),
                    nroFc: $("#factura" + id + " .nroFc").val(),
                    netoG: $("#factura" + id + " .netoFc").val(),
                    ivaFc: $("#factura" + id + " .ivaFc").val(),
                    fechaFc: fechaFcARG},
                retencion: {importe: $("#importeRetIva" + id).val(),
                    porcRet: $("#porcRetIva" + id).val(),
                    concepto: $("#conceptoFc option:selected").text(),
                    regimen: regimen,
                    fechaRet: $("#fechaRetenciones").val()
                }
            };
            console.log("nro de factura  :   " + datosFactura.factura.nroFc);
            console.log("domicilio prov  :   " + datosFactura.proveedor.domicilio);
            $.post({
                url: 'emitir/iva',
                contentType: 'application/json',
                data: JSON.stringify(datosFactura),
                cache: false,
                async: false,
                success: function (data) {
                    var w = window.open('about:blank');
                    w.document.open();
                    w.document.write(data);
                    w.document.close();
                },
                error: function (response)
                {
                    alert('error al guardar los datos');
                }
                //return false;
            });

        });
    }
    //$("#retencionIva" + serieFc + " input:checkbox").click(desbloquearPorcRet);
}
function desbloquearPorcRet(evt) {
    var inputPorc = $(evt.target).parent().find(".porcRetIva");
    inputPorc.attr("disabled", !$(evt.target).prop("checked"));

}

function eliminarRetIva(idFc) {
    var nroRet = $(idFc).attr("id").replace("factura", "");
    $("#retencionIva" + nroRet).remove();
}

function acumularEnGcias(idFc) {
    var netoT = 0, ivaT = 0;
    var nrosFc = "";
    var acumFcs = "";
    $(".factura .netoFc").each(function (i, input) {
        netoT += parseFloat($(input).val());
    });
    $(".factura .ivaFc").each(function (i, input) {
        ivaT += parseFloat($(input).val());
    });
    var nrosFc = new Array();
    $(".factura").each(function (i, factura) {
        var ptoVta = $(factura).children(".ptoVtaFc").val();
        var nro = $(factura).children(".nroFc").val();
        var parPtoVtaNroFc = {ptoVta, nro};
        nrosFc.push(parPtoVtaNroFc);
    });
    nrosFc.sort(function (a, b) {
        if (a[0] < b[0]) {
            return-1;
        } else {
            if (a[0] > b[0]) {
                return 1;
            } else {
                if (a[1] < b[1]) {
                    return -1;
                } else {
                    return 1;
                }
            }
        }
    });
    var ptoVtaAnt = "";
    nrosFc.forEach(function (i, par) {
        if (i === 0) {
            ptoVtaAnt = par[0];
            acumFcs += par[0] + "-" + par[1];
        } else {
            if (ptoVtaAnt === par[0]) {
                acumFcs += "/" + par[1];
            } else {
                ptoVtaAnt = par[0];
                acumFcs += par[0] + "-" + par[1];
            }

        }
    });
    $("#retencionGCIAS #netoGCIAS").val(netoT.toFixed(2));
    $("#retencionGCIAS #deduccionesGCIAS").val(ivaT.toFixed(2));
    $("#retencionGCIAS #brutoGCIAS").val((netoT + ivaT).toFixed(2));
    $("#retencionGCIAS").val(0);
    calcularAcumGCIAS();
}

function setPorcYMinimoGCIAS() {
    $("#minimoGCIAS").val(cuadroGcias[$("#factura1 .conceptoFc option:selected").val()].importe);
    $("#porcRetGCIAS").val(cuadroGcias[$("#factura1 .conceptoFc option:selected").val()].porc);
    $("#subtotalGCIAS").val(parseFloat(($("#netoTotalGCIAS").val()) - parseFloat($("#minimoGCIAS").val())).toFixed(2));
    if ($("#factura1 .conceptoFc option:selected").val() !== "3") {
        $("#importeFijoRetGcias").val("0");
        $("#filaImporteFijoGCIAS").hide();
        $("#importeRetGCIAS").val((parseFloat($("#subtotalGCIAS").val()) * parseFloat($("#porcRetGCIAS").val()) / 100).toFixed(2));
    } else {
        $("#filaImporteFijoGCIAS").show();
        cuadroGcias[3].tabla.forEach(function (fila) {
            if (fila.min <= $("#subtotalGCIAS").val() && fila.max > $("#subtotalGCIAS").val()) {
                $("#importeFijoRetGcias").val(fila.fijo);
                $("#porcRetGCIAS").val(fila.porc);
                //$("#subtotalGCIAS").val(parseFloat($("#netoTotalGCIAS").val())-parseFloat($("#minimoGCIAS").val()));
                var importeRetExced = (parseFloat($("#subtotalGCIAS").val()) - parseFloat(fila.exced)) * parseFloat($("#porcRetGCIAS").val()) / 100;
                if (importeRetExced < 0) {
                    $("#importeRetGCIAS").val(parseFloat("0"));
                } else {
                    $("#importeRetGCIAS").val(importeRetExced);
                }
            }
        });
    }
}

function calcularRetGCIAS() {
    acumularEnGcias();
    setPorcYMinimoGCIAS();
    $("#importeARetGcias").val((parseFloat($("#importeRetGCIAS").val()) + parseFloat($("#importeFijoRetGcias").val()) - parseFloat($("#importeRetAntGcias").val())).toFixed(2));
    if ($("#importeARetGcias").val() === "" || parseFloat($("#importeARetGcias").val()) <= 0) {
        $("#emitirRetGcias").prop("disabled", true);
    } else {
        if(parseFloat($("#importeARetGcias").val()) <= minimaRetGCIAS)
        $("#emitirRetGcias").prop("disabled", false);
    }

}

function setClickBloquearFc(evt) {
    var check = evt.target;
    var bloqueado = $(check).is(":checked");
    var valido = true;

    $(check).parent().find(".datosFc").each(function (i, dato) {
        if ($(dato).is(":invalid")) {
            valido = false;
        }
    });
    if (valido) {
        $(check).parent().find(".datosFc").each(function (i, dato) {
            if (bloqueado) {
                $(dato).attr("disabled", true);
            } else {
                $(dato).attr("disabled", false);
            }
        });
        if (bloqueado) {
            agregarRetIva($(check).parent());
            acumularEnGcias();
            setPorcYMinimoGCIAS();
            calcularRetGCIAS();
        } else {
            eliminarRetIva($(check).parent());
            acumularEnGcias();
        }
    } else {
        $(check).prop("checked", false);
    }
}
function formatDate(date) {
    var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

$(document).ready(function () {
    $("#fechaRetenciones").val(formatDate(new Date()));
    $("#factura1 .quitarFactura").click(function (evt) {
        if ($(".factura").length > 1 && !$(evt.target).parent().find(".bloqueaFc").prop("checked")) {
            $(evt.target).parent().remove();
        }
    });
    $("#factura1 .bloqueaFc").click(setClickBloquearFc);
    $(".acumGCIAS").blur(function () {
        calcularAcumGCIAS();
        calcularRetGCIAS();
    });
    $("#importeRetAntGcias,#importeRetAntGcias").change(function (e) {
        calcularAcumGCIAS();
        calcularRetGCIAS();

    });
//    $(".netoFc").blur(function (e) {
//        if ($(e.target).val() != "") {
//            $(e.target).parent().find(".ivaFc").val(((parseFloat(($(e.target).val())).toFixed(2) * .21).toFixed(2)));
//        }
//
//    });
    $(".fcNroInterno").blur(function (e) {
        $.post({
            url: '../avm/comprobante',
            contentType: 'application/json',
            data: JSON.stringify({codProv: $("#codProv").val(), nroInterno: $(e.target).val()}),
            cache: false,
            async: true,
            success: function (data) {
                comprobante = JSON.parse(data);
                console.log("intentando grabar el nombre: " + comprobante.NroInterno);
                $(e.target).parent().find(".ptoVtaFc").val(parseInt(comprobante.NroCompro.substring(0, comprobante.NroCompro.indexOf("-"))), 10);
                $(e.target).parent().find(".nroFc").val(parseInt(comprobante.NroCompro.substring(comprobante.NroCompro.indexOf("-") + 1, comprobante.NroCompro.length)), 10);
                console.log("21:" + comprobante.IVA21 + " 10.5: " + comprobante.IVA1050 + " 27:" + comprobante.IVA27);
                var negativador=1;
                    if(comprobante.FDC=="C"){
                        negativador=-1;
                    }
                $(e.target).parent().find(".netoFc").val(((parseFloat(comprobante.Bruto21) + parseFloat(comprobante.Bruto1050) + parseFloat(comprobante.Bruto27))*negativador).toFixed(2));
                $(e.target).parent().find(".ivaFc").val(((parseFloat(comprobante.IVA21) + parseFloat(comprobante.IVA1050) + parseFloat(comprobante.IVA27))*negativador).toFixed(2));
                var vecFecha = comprobante.Fecha.split("/");
                $(e.target).parent().find(".fechaFc").val(vecFecha[2] + "-" + vecFecha[1] + "-" + vecFecha[0]);
//                $("#razonSocial").html((proveedor.nombre));
//                $("#direccion").html((proveedor.direccion));
//                $("#cuit").html((proveedor.cuit));
                if(comprobante.tico=="051"){
                    $(e.target).parent().find(".fcM").prop("checked",true);
                }else{
                    $(e.target).parent().find(".fcM").prop("checked",false);
                }
            },
            error: function (response)
            {
                alert('error al guardar los datos');
            }
            //return false;
        });

    });
    $(".ptoVtaFc,.nroFc").blur(function (e) {
        var proveedor = $("#codProv").val();
        var ptoVenta = $(e.target).parent().find(".ptoVtaFc").val();
        var numeroFC = $(e.target).parent().find(".nroFc").val();
        if (proveedor && ptoVenta && numeroFC) {
            $.post({
                url: '../avm/comprobante',
                contentType: 'application/json',
                data: JSON.stringify({codProv: $("#codProv").val(), ptoVenta: ptoVenta,nroFc:numeroFC}),
                cache: false,
                async: true,
                success: function (data) {
                    comprobante = JSON.parse(data);
                    console.log("intentando grabar el nombre: " + comprobante.NroInterno);
                    $(e.target).parent().find(".fcNroInterno").val(parseInt(comprobante.NroInterno));
                    var negativador=1;
                    if(comprobante.FDC=="C"){
                        negativador=-1;
                    }
                    $(e.target).parent().find(".netoFc").val(((parseFloat(comprobante.Bruto21) + parseFloat(comprobante.Bruto1050) + parseFloat(comprobante.Bruto27))*negativador).toFixed(2));
                    $(e.target).parent().find(".ivaFc").val(((parseFloat(comprobante.IVA21) + parseFloat(comprobante.IVA1050) + parseFloat(comprobante.IVA27))*negativador).toFixed(2));
                    var vecFecha = comprobante.Fecha.split("/");
                    $(e.target).parent().find(".fechaFc").val(vecFecha[2] + "-" + vecFecha[1] + "-" + vecFecha[0]);
                    if(comprobante.tico=="051"){
                    $(e.target).parent().find(".fcM").prop("checked",true);
                }else{
                    $(e.target).parent().find(".fcM").prop("checked",false);
                }
                    
//                $("#razonSocial").html((proveedor.nombre));
//                $("#direccion").html((proveedor.direccion));
//                $("#cuit").html((proveedor.cuit));
                },
                error: function (response)
                {
                    alert('error al guardar los datos');
                }
                //return false;
            });
        }
    });
    $("#codProv").blur(function (e) {
        //Code: Action (like ajax...)
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
                $("#razonSocial").html((proveedor.nombre));
                $("#direccion").html((proveedor.direccion));
                $("#cuit").html((proveedor.cuit));
            },
            error: function (response)
            {
                alert('error al guardar los datos');
            }
            //return false;
        });

    });
    $("#emitirRetGcias").click(function (evt) {
        var fechaUltFc = new Date();
        var nrosFC = new Array();
        $(".factura").each(function (i, elem) {
            if (i === 0) {
                fechaUltFc.setTime(Date.parse($(elem).find(".fechaFc").val()));
            } else {
                if (fechaUltFc < Date.parse($(elem).find(".fechaFc").val())) {
                    fechaUltFc.setTime(Date.parse($(elem).find(".fechaFc").val()));
                }
            }
            nrosFC.push({ptoVta: $(elem).find(".ptoVtaFc").val(), nroFc: $(elem).find(".nroFc").val()});
        });
        nrosFC.sort(function (a, b) {
            if (parseInt(a.ptoVta) < parseInt(b.ptoVta)) {
                return -1;
            } else {
                if (a.ptoVta === b.ptoVta) {
                    if (parseInt(a.nroFc) < parseInt(b.nroFc)) {
                        return -1;
                    } else {
                        if (parseInt(a.nroFc) > parseInt(b.nroFc)) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                } else {
                    return 1;
                }
            }
        });
        var cadenaFCs = "";
        var ptoVtaAc = 0;
        nrosFC.forEach(function (el, i) {
            if (i > 0) {
                cadenaFCs += "/";
            }
            if (ptoVtaAc === el.ptoVta) {
                cadenaFCs += el.nroFc;
            } else {
                ptoVtaAc = el.ptoVta;
                cadenaFCs += el.ptoVta + "-" + el.nroFc;
            }
        });
        console.log(cadenaFCs);
        //var fechaFcISO = $("#factura" + id + " .fechaFc").val();
        //var fechaFcARG = fechaFcISO.substr(8, 2) + "/" + fechaFcISO.substr(5, 2) + "/" + fechaFcISO.substr(0, 4);
        var regimen = "";
        if ($(".factura .fcM").prop("checked")) {
            regimen = "99";
        } else {
            regimen = "78";
        }

        var datosFactura = {proveedor: proveedor,
            factura: {nrosFc: cadenaFCs,
                fechaFc: fechaUltFc},
            retencion: {cuadro:
                        {anteriores: {bruto: $("#brutoAntGCIAS").val(),
                                deduc: $("#deduccionesAntGCIAS").val(),
                                neto: $("#netoAntGCIAS").val()},
                            actual: {bruto: $("#brutoGCIAS").val(),
                                deduc: $("#deduccionesGCIAS").val(),
                                neto: $("#netoGCIAS").val()},
                            acum: {bruto: $("#brutoTotalGCIAS").val(),
                                deduc: $("#deduccionesTotalGCIAS").val(),
                                neto: $("#netoTotalGCIAS").val()}},
                minimo: $("#minimoGCIAS").val(),
                subtotal: $("#subtotalGCIAS").val(),
                porcRet: $("#porcRetGCIAS").val(),
                importe: $("#importeRetGCIAS").val(),
                importeAnt: $("#importeRetAntGcias").val(),
                importeFijo: $("#importeFijoRetGcias").val(),
                aRetener: $("#importeARetGcias").val(),
                concepto: $("#conceptoFc option:selected").text(),
                regimen: regimen,
                emitida: false,
                anulada: false,
                pago: 0,
                fechaRet: $("#fechaRetenciones").val()
            }};

        //console.log("nro de factura  :   " + datosFactura.factura.nroFc);
        //console.log("domicilio prov  :   " + datosFactura.proveedor.domicilio);
        $.post({
            url: 'emitir/gcias',
            contentType: 'application/json',
            data: JSON.stringify(datosFactura),
            cache: false,
            async: false,
            success: function (data) {
                var w = window.open('about:blank');
                w.document.open();
                w.document.write(data);
                w.document.close();
            },
            error: function (response)
            {
                alert('error al guardar los datos');
            }
            //return false;
        });

    });

}
);

