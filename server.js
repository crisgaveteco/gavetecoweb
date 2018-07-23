/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var url = require("url");
var mysql = require("mysql");
var ejs = require("ejs");
var path = require("path");
var fs = require('fs');
var sequelize = require('sequelize');
var db = require("./models");
require('./lib/helper.js');
var publicPath = path.join(__dirname, 'public');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
//app.use(express.static("./public"));
//app.use('/public', express.static('public'));

mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};
//var con = mysql.createConnection({
//    host: "localhost",
//    user: "root",
//    password: "mysql",
//    database: "recuperoweb"
//});
var ComprobanteAVM = function (lineaDatos) {
    console.log(lineaDatos);
    var datos = lineaDatos.split(";");
    this.NroInterno = datos[0];
    this.FDC = datos[1];
    this.NroCompro = datos[2];
    this.Fecha = datos[3];
    this.Proveedor = datos[4];
    this.LetraABC = datos[5];
    this.Bruto21 = datos[6];
    this.IVA21 = datos[7];
    this.Bruto1050 = datos[8];
    this.IVA1050 = datos[9];
    this.Bruto27 = datos[10];
    this.IVA27 = datos[11];
    this.RetIVA = datos[12];
    this.PercIVA = datos[13];
    this.RetIB = datos[14];
    this.PercIB = datos[15];
    this.RetGan = datos[16];
    this.PercGan = datos[17];
    this.NoGravado = datos[18];
    this.Monotributo = datos[19];
    this.Exento = datos[20];
    this.IInternos = datos[21];
    this.IMunicipales = datos[22];
    this.INacionales = datos[23];
    this.FRegCont = datos[24];
    this.contado = datos[25];
    this.ctaacred = datos[26];
    this.ctap2 = datos[27];
    this.ctap3 = datos[28];
    this.ctap4 = datos[29];
    this.imp1 = datos[30];
    this.imp2 = datos[31];
    this.imp3 = datos[32];
    this.imp4 = datos[33];
    this.Observ = datos[34];
    this.Obs2 = datos[35];
    this.cotiza = datos[36];
    this.tico = datos[37];
    this.cai = datos[38];
    this.vtocai = datos[39];
    this.contr = datos[40];
    this.Aduana = datos[41];
    this.Destino = datos[42];
    this.Despacho = datos[43];
    this.LetraDesp = datos[44];
    this.cc = datos[45];
    this.CuentaBco = datos[46];
    this.Total = datos[47];
    this.FechaAMD = datos[48];
};
var ProveedorAVM = function (lineaDatos) {
    var datos = lineaDatos.split(";");
    this.codigo = datos[0];
    this.nombre = datos[1];
    this.direccion = datos[2];
    this.cpostal = datos[3];
    this.localidad = datos[4];
    this.provincia = datos[5];
    this.telefono = datos[6];
    this.fax = datos[7];
    this.email = datos[8];
    this.ctaprov = datos[9];
    this.cuit = datos[10];
    this.condfis = datos[11];
    this.retivasn = datos[12];
    this.porretiva = datos[13];
    this.retgansn = datos[14];
    this.concepto = datos[15];
    this.inscgansn = datos[16];
    this.observaciones = datos[17];
    this.cta2 = datos[18];
    this.cta3 = datos[19];
    this.cta4 = datos[20];
    this.porc1 = datos[21];
    this.porc2 = datos[22];
    this.porc3 = datos[23];
    this.porc4 = datos[24];
    this.vtoco = datos[25];
    this.NroInscIB = datos[26];
    this.VencRetIVA = datos[27];
    this.VencRetGan = datos[28];
    this.RetIBBASN = datos[29];
    this.PorRetIBBA = datos[30];
    this.RetPrevSN = datos[31];
    this.PorRetPrev = datos[32];
    this.VencRetPrev = datos[33];
    this.RetPescaSN = datos[34];
    this.InscPescaSN = datos[35];
}

var Factura = function (ptoVenta, nroFactura, fecha, netog, iva, sellado, fechaDDJJ) {
    this.ptoVenta = ptoVenta;
    this.nroFactura = nroFactura;
    this.fecha = fecha;
    this.netog = netog;
    this.iva = iva;
    this.computables = [];
    this.sellado = sellado;
    this.fechaDDJJ = fechaDDJJ;
    this.addComputable = function (computable) {
        this.computables.push(computable);
    };
};
function getPrimerFcSinSellar(req, res, next) {
    var consulta = "";
    consulta = "SELECT ptoVta,nroFc,fechaFac,netog,iva,sellado,periodo,fechaDDJJ FROM f404 where sellado=false AND periodo>'201711.CSV' order by fechaDDJJ,fechaFac LIMIT 1";
    console.log(consulta);
    var facturaResultado = {};
    con.query(consulta, function (err, registros, campos) {
        if (err) {
            console.log("Error en linea 39: " + err);
            throw err;
        }
        if (registros.length > 0) {
            facturaResultado = new Factura(registros[0].ptoVta, registros[0].nroFc, registros[0].fechaFac, registros[0].netog, registros[0].iva, registros[0].sellado, registros[0].fechaDDJJ);
        }
        console.log("En linea 83  " + JSON.stringify(facturaResultado));
        req.facturaOLD = facturaResultado;
        return next();
    });
}

//con.connect(function (err) {
//    if (err) {
//        console.log("Error en linea 52: " + err);
//        throw err;
//    }
//    console.log("Connected!");
//});
app.listen(89);
//app.get("/", function (req, res) {
//    getPrimerFcSinSellar(true, function (primerFC) {
//        console.log("En linea 43 " + JSON.stringify(primerFC));
//        res.render('index', {factura: new Factura(), facturaOLD: primerFC, vaciar: false});
//    });
//
//});


//app.get("/transa", function (req, res) {
//    var consulta = "SELECT ptoVta,nroFc,fechaFac,netog,iva,sum(computable) as computable,periodo FROM f404 where nrointerno='" + req.query.transa + "' group by periodo";
//    console.log(consulta);
//    con.query(consulta, function (err, registros, campos) {
//        if (err){
//            console.log("Error en linea 72: "+err);
//            throw err;
//        }
//        if (registros.length > 0) {
//            var facturaResultado = new Factura(registros[0].ptoVta, registros[0].nroFc, registros[0].fechaFac, registros[0].netog, registros[0].iva);
//            registros.forEach(function (registro) {
//                facturaResultado.addComputable({computable: registro.computable, periodo: registro.periodo});
//            });
//            console.log(facturaResultado);
//            getPrimerFcSinSellar(false,async function (primerFC) {
//                res.render('index', {factura: facturaResultado, facturaOLD: primerFC});
//                var querySellado = "UPDATE f404 SET sellado=1 WHERE nrointerno='" + req.query.transa + "'";
//                console.log(querySellado);
//                con.query(querySellado, function (err) {
//                    console.log("Error en linea 84: "+err);
//                    throw err;
//                });
//            });
//
//        } else {
//            getPrimerFcSinSellar(false,async function (primerFC) {
//            res.render('index', {factura: null, facturaOLD: primerFC});
//        });
//        }
//    });
//
//});

//function setSellada(req, res, next) {
//    var querySellado = "UPDATE f404 SET sellado=true WHERE nrointerno='" + req.query.transa + "'";
//    console.log(querySellado);
//    con.query(querySellado, function (err, result) {
//        if (err) {
//            console.log("Error en linea 84: " + err);
//            throw err;
//        }
//        return next();
//    }
//    );
//}

function renderPageRecupSellado(req, res) {
    res.render('recupero/index', {factura: req.factura, facturaOLD: req.facturaOLD});
}
//function getFacturaPedida(req, res, next) {
//    var consulta = "SELECT ptoVta,nroFc,fechaFac,netog,iva,sum(computable) as computable,periodo FROM f404 where nrointerno='" + req.query.transa + "' group by periodo";
//    console.log(consulta);
//    con.query(consulta, function (err, registros, campos) {
//        if (err) {
//            console.log("Error en linea 72: " + err);
//            throw err;
//        }
//        if (registros.length > 0) {
//            var facturaResultado = new Factura(registros[0].ptoVta, registros[0].nroFc, registros[0].fechaFac, registros[0].netog, registros[0].iva);
//            registros.forEach(function (registro) {
//                facturaResultado.addComputable({computable: registro.computable, periodo: registro.periodo});
//            });
//            req.factura = facturaResultado;
//            console.log(facturaResultado);
//            return next();
//        }
//    });
//}
function renderPageEmitirRetenciones(req, res) {
    res.render('index', {factura: req.factura, facturaOLD: req.facturaOLD});
}
//app.get("/recupero/sellado", getPrimerFcSinSellar, renderPageRecupSellado);
//app.get("/recupero/sellado/transa", getFacturaPedida, setSellada, getPrimerFcSinSellar, renderPageRecupSellado);
app.get("/retenciones/emitir", function (req, res) {
    res.render('retenciones/emitirRetenciones');
});
var getCriterios = function (req, res, next) {
    req.criterios = new Array();
    req.retenciones = new Array();
    if (req.query.fechaDesde && req.query.fechaHasta) {
        console.log("Aplicando fecha: Desde: " + req.query.fechaDesde + " Hasta: " + req.query.fechaHasta);
        req.criterios.push({ret_fecha: {$and: [{$gte: new Date(req.query.fechaDesde), $lte: new Date(req.query.fechaHasta)}]}});
    }
    if (req.query.prov) {
        req.criterios.push({prov: req.query.prov});
    }
    if (req.query.quincena) {
        var fechaDesde = req.query.año + "-" + req.query.mes + "-";
        var fechaHasta = req.query.año + "-" + req.query.mes + "-";
        if (req.query.quincena === "1") {
            fechaDesde += "01";
            fechaHasta += "15";
        } else {
            fechaDesde += "16";
            switch (req.query.mes) {
                case "1":
                case "3":
                case "5":
                case "7":
                case "8":
                case "10":
                case "12":
                    fechaHasta += "31";
                    break;
                case "2":
                    if (parseInt(req.query.año) / 4 - parseInt(req.query.año) / 4 * 100 > 0) {
                        fechaHasta += "29";
                    } else {
                        fechaHasta += "28";
                    }
                    break;
                case "4":
                case "6":
                case "9":
                case "11":
                    console.log("Fecha hasta antes de agregar el 30: "+ fechaHasta);
                    fechaHasta += "30";
                    break;
            }
        }
        console.log("Aplicando quincena: " + req.query.quincena);
        req.criterios.push({ret_fecha: {$and: [{$gte: new Date(fechaDesde).toUTCString(), $lte: new Date(fechaHasta).toUTCString()}]}});
        console.log("Criterios " + JSON.stringify(req.criterios));
    }
    return next();
};
var getRetencionesIVA = function (req, res, next) {
    console.log("llegué a getRetencionesIVA");
    if (req.query.iva) {
        var retIva = db.retenciones_iva;
        console.log("Entré a if IVA");
        retIva.findAll({where:
                    {$and: req.criterios},
            order: [['id', 'ASC']]
        }).then(function (retIVa) {
            console.log("Retenciones FILTRADAS IVA: " + retIVa);
            retIVa.forEach(function (ret, i) {
                ret.impuesto = "IVA";
            });
//            if (retIva) {
//                res.render("retenciones/consulta", {retenciones: retIVa, impuesto: "iva", req: req});
//            } else {
//                res.render("retenciones/consulta", {retenciones: "nada"});
//
//            }
            req.retenciones.push(retIVa);
            console.log("retIva: " + req.retenciones);
            return next();
        });
    } else {
        console.log("getRetIVA return por else");
        return next();
    }
};
var getRetencionesGCIAS = function (req, res, next) {
    console.log("llegue getRetencionesGCIAS");
    var retGcias = db.retenciones_gcias;
    if (req.query.gcias) {
        console.log("Entré a if GCIAS");
        retGcias.findAll({where:
                    {$and: req.criterios},
            order: [['id', 'ASC']]
        }).then(function (retGcias) {
            console.log("Retenciones FILTRADAS GCIAS: " + retGcias);
            retGcias.forEach(function (ret, i) {
                ret.impuesto = "GCIAS";
            });
//            if (retGcias) {
//                res.render("retenciones/consulta", {retenciones: retGcias, impuesto: "gcias", req: req});
//            } else {
//                res.render("retenciones/consulta", {retenciones: "nada"});
//            }
            req.retenciones.push(retGcias);
            console.log("retGcias: " + req.retenciones);
            return next();
        });
    } else {
        return next();
    }
};
var renderConsulta = function (req, res) {
    if (!req.query.iva && !req.query.gcias) {
        console.log("entre al IF sin impuesto");
        res.render("retenciones/consulta", {req: {query: {}}, retenciones: "nada"});
    } else {
        console.log("entre al if con impuestos : IVA " + req.query.iva + " GCIAS " + req.query.gcias);
        console.log("las retenciones son: " + req.retenciones[0]);
        res.render("retenciones/consulta", {retenciones: req.retenciones, req: req});
    }
};
var getCuitProv = function (codProv, next) {
    var fs2 = require('fs');
    var cp2 = require("child_process").execFile;
    var prov = "";
    console.log("preguntando por el proveedor a AVM");
    console.log("K:\\Wgestion1\\avm p " + codProv);
    cp2("K:\\Wgestion1\\avm", ["p", codProv], function (err, data) {
        fs2.readFile("C:\\AVM\\EXPO\\AVM.TXT", "latin1", function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(data);
            prov = new ProveedorAVM(data);
            console.log("Prov 399: " + prov);
            next(prov.cuit);
        });
    });
};
//var getCuitProv = function (retencion) {
//    var fs = require('fs');
//    var cp = require("child_process").execFile;
//    var prov = "";
//    console.log("preguntando por el proveedor a AVM");
//    console.log("K:\\Wgestion1\\avm p " + retencion.prov);
//    cp("K:\\Wgestion1\\avm", ["p", retencion.prov], function (err, data) {
//        fs.readFile("C:\\AVM\\EXPO\\AVM.TXT", "latin1", function (err, data) {
//            if (err) {
//                console.log(err);
//            }
//            console.log(data);
//            prov = new ProveedorAVM(data);
//            return prov.cuit;
//        });
//    });
//    console.log("Prov 399: " + prov);
//};

var getLineaExpoSICORE = function (retencion) {
    console.log(JSON.stringify(retencion));
    var tipoFc = "01";
    console.log("FechaFac " + retencion.fechaFac);
    var fechaFc = "";
    var fc = "";
    var codImp = "";
    var codReg = retencion.regimen;
    var codOp = "1";
    var codCond = "00";
    var retSuspend = "0";
    var impRetencion = "";
    var netoFc = "";
    var ivaFc = "";
    var baseCalculo = "";
    switch (retencion.impuesto) {
        case "IVA":
            fechaFc = retencion.fechaFac;
            var ult_ubic_guion = retencion.nroFactura.lastIndexOf("-");
            var ptoVta = retencion.nroFactura.substr(0, ult_ubic_guion);
            var nroFc = retencion.nroFactura.substr(ult_ubic_guion + 1);
            fc += "0".repeat(4 - ptoVta.length) + ptoVta + "0".repeat(8 - nroFc.length) + nroFc + " ".repeat(4);
            codImp = "767";
            if (retencion.regimen === "499") {
                codCond = "01";
            }
            impRetencion = parseFloat(retencion.ret_importe).toFixed(2);
            netoFc = parseFloat(retencion.netoFc);
            ivaFc = parseFloat(retencion.ivaFc);
            baseCalculo = ivaFc;
            break;
        case "GCIAS":
            var ult_ubic_guion = retencion.facs.lastIndexOf("-");
            var ult_ubic_barra = retencion.facs.substr(0, retencion.facs.lastIndexOf("-")).lastIndexOf("/");
            var ptoVta = "";
            var nroFc = "";
            var fechaFcISO = retencion.ret_fecha.toISOString();
            fechaFc = fechaFcISO.substr(8, 2) + "/" + fechaFcISO.substr(5, 2) + "/" + fechaFcISO.substr(0, 4);
            if (ult_ubic_barra == -1) {
                ptoVta = retencion.facs.substr(0, ult_ubic_guion);
            } else {
                ptoVta = retencion.facs.substr(ult_ubic_barra + 1, ult_ubic_guion - ult_ubic_barra - 1);
            }
            if (retencion.facs.substr(ult_ubic_guion + 1).indexOf("/") > 0) {
                nrosFc = retencion.facs.substr(ult_ubic_guion + 1).split("/");
                nroFc = nrosFc[0];
                nrosFc.forEach(function (porcion) {
                    console.log("NroFC " + nroFc + "porcion: " + porcion);
//                    nroFc=nroFc.replace(nroFc.substr(nroFc.length - porcion.length, porcion.length), porcion);
                    nroFc = nroFc.substr(0, nroFc.length - porcion.length) + porcion;
                });
            } else {
                nroFc = retencion.facs.substr(ult_ubic_guion + 1);
            }
            console.log("PV: " + ptoVta + " NRO: " + nroFc);
            fc += "0".repeat(4 - ptoVta.length) + ptoVta + "0".repeat(8 - nroFc.length) + nroFc + " ".repeat(4);
            codImp = "217";
            codCond = "01";
            netoFc = parseFloat(retencion.neto);
            ivaFc = parseFloat(retencion.deduc);
            console.log("Retencion "+retencion.id+" campo ret:ant:"+retencion.ret_ant);
            impRetencion = parseFloat(retencion.retencion);
            if (retencion.ret_ant) 
                impRetencion -=  parseFloat(retencion.ret_ant);
            
            if (retencion.importeFijo) {
                impRetencion += parseFloat(retencion.importeFijo);
            }
            baseCalculo = netoFc;
            break;
    }
    console.log("Neto: " + netoFc + " IvaFc: " + ivaFc);
    var totalFc = parseFloat(netoFc + ivaFc).toFixed(2).replace(".", ",");
    totalFc = " ".repeat(16 - totalFc.length) + totalFc;
//    netoFc = netoFc.toFixed(2).replace(".", ",");
//    netoFc = " ".repeat(16 - netoFc.length) + netoFc;
    var fechaRetISO = retencion.ret_fecha.toISOString();
    var fechaRet = fechaRetISO.substr(8, 2) + "/" + fechaRetISO.substr(5, 2) + "/" + fechaRetISO.substr(0, 4);
    codReg = "0".repeat(3 - codReg.length) + codReg;
//    ivaFc = ivaFc.toFixed(2).replace(".", ",");
//    ivaFc = " ".repeat(14 - ivaFc.length) + ivaFc;
    baseCalculo = baseCalculo.toFixed(2);
    baseCalculo = baseCalculo.replace(".", ",");
    baseCalculo = " ".repeat(14 - baseCalculo.length) + baseCalculo;
    impRetencion = impRetencion.toFixed(2).replace(".", ",");
    impRetencion = " ".repeat(14 - impRetencion.length) + impRetencion;
    var porcExcl = "  0,00";
    var fechaEmisBol = " ".repeat(10);
    var tipoDocRet = "80";
    var cuit = "";
    var nroCert = "0".repeat(14);
    var denomOrd = " ".repeat(30);
    var acrec = "0";
    var cuitPais = " ".repeat(11);
    var cuitOrd = " ".repeat(11);
//    getCuitProv(retencion.prov, function (cuitProve) {
//        console.log("CuitProve: " + cuitProve);
//        cuit = cuitProve;
//        cuit += " ".repeat(20 - cuit.length);
//        console.log("Cuit:" + cuit);
//        retencion.cuit=cuit;
//    });
    var campoCuit=  retencion.cuit.replace(/-/g,"");
    campoCuit += " ".repeat(20 - campoCuit.length);
    console.log("Retencion en funcion final: " + JSON.stringify(retencion.impuesto));
    return tipoFc + fechaFc + fc + totalFc + codImp +
            codReg + codOp + baseCalculo + fechaRet + codCond +
            retSuspend + impRetencion + porcExcl + fechaEmisBol +
            tipoDocRet + campoCuit + nroCert + denomOrd + acrec + cuitPais +
            cuitOrd;
};
var pedirIvayGCIAS = function (req, res, next) {
    req.query.iva = "on";
    req.query.gcias = "on";
    return next();
};
//var setCuitARet = function (req, res, next) {
//    console.log("entre a setCuit");
//    for (var i = 0; i < req.retenciones[0].length; i++) {
//        var retencion = req.retenciones[0][i];
//        console.log("Retencion en foreach: " + JSON.stringify(retencion));
//        var cuit = "hola";
//       getCuitProv(retencion.prov, function (cuitProve) {
//            console.log("CuitProve: " + cuitProve);
//            cuit = cuitProve;
//            cuit += " ".repeat(20 - cuit.length);
//            console.log("Cuit:" + cuit);
//       }    
//        );
//    }
//    return next();
////    req.retenciones[0].forEach(function (retencion,i) {
////        console.log("Retencion en foreach: " + JSON.stringify(retencion));
////        var cuit="hola";
////        getCuitProv(retencion.prov, function (cuitProve) {
////            console.log("CuitProve: " + cuitProve);
////            cuit = cuitProve;
////            cuit += " ".repeat(20 - cuit.length);
////            console.log("Cuit:" + cuit);
////        });
////        this[i].cuit=cuit;
////    },req.retenciones[0]);
////    console.log("retenciones en salida de setCuit: " + JSON.stringify(req.retenciones));
////    console.log("Hago el return en setCuit");
////    return next();
//};
app.get("/retenciones/busqueda", getCriterios, getRetencionesIVA, getRetencionesGCIAS, renderConsulta);
app.get("/retenciones/expoSicore", pedirIvayGCIAS, getCriterios, getRetencionesIVA, getRetencionesGCIAS, function (req, res) {
    console.log("armando archivo para SICORE");
    var fs = require("fs");
    var data = "";
    console.log("Obtuve " + req.retenciones.length + " retenciones");
    req.retenciones[0].forEach(function (retencion) {
        retencion.datos = {};
        data += getLineaExpoSICORE(retencion) + "\r\n";
    });
    req.retenciones[1].forEach(function (retencion) {
        retencion.datos = {};
        data += getLineaExpoSICORE(retencion) + "\r\n";
    });
    console.log(JSON.stringify(data));
    fs.writeFile("public/files/expoSicore" + req.query.año + req.query.mes + req.query.quincena + "q.txt", data, function (err) {
        if (err)
            throw err;
        res.download("public/files/expoSicore" + req.query.año + req.query.mes + req.query.quincena + "q.txt", function (err) {
            if (err)
                throw err;
        });
    });
});
app.post("/retenciones/IvaQuincena", function (req, res) {
    var retIva = db.retenciones_iva;
    var retenciones = "";
    retIva.findAll({where:
                {ret_fecha: {$and: [{$gte: new Date("2018-07-01"), $lte: new Date("2018-07-31")}]}},
        order: [['id', 'DESC']]
    }).then(function (retIVa) {
        console.log("Retenciones encontradas: " + retIVa);
        res.send(JSON.stringify(retIVa));
    });
});
app.post("/retenciones/GciasQuincena", function (req, res) {
    var retGCIAS = db.retenciones_gcias;
    var retenciones = "";
    retGCIAS.findAll({where:
                {ret_fecha: {$and: [{$gte: new Date("2018-07-01"), $lte: new Date("2018-07-31")}]}},
        order: [['id', 'DESC']]
    }).then(function (ret) {
        console.log("Retenciones GCIAS encontradas: " + ret);
        res.send(JSON.stringify(ret));
    });
});
//app.post("/retenciones/emitir/prov", function (req, res) {
//    console.log(JSON.stringify(req.body.codProv));
//    var mysql = require('mysql');
//    var connection = mysql.createConnection({
//        host: 'localhost',
//        user: 'root',
//        password: 'mysql',
//        database: 'gaveteco',
//        port: 3306
//    });
//    connection.connect(function (error) {
//        if (error) {
//            throw error;
//        } else {
//            console.log('Conexion correcta.');
//        }
//    });
//    var query = connection.query("SELECT * FROM proveedor WHERE codigo = '" + req.body.codProv + "';", function (error, result) {
//        if (error) {
//            throw error;
//        } else {
//            var resultado = result;
//            if (resultado.length > 0) {
//                res.send(JSON.stringify(resultado[0]));
//            } else {
//                console.log('Registro no encontrado');
//                res.send(JSON.stringify({nombre: "No se encontró el proveedor"}));
//            }
//        }
//    }
//    );
//    connection.end();
//});
app.post("/avm/comprobante", function (req, res) {
    var fs = require('fs');
    var cp = require("child_process").execFile;
    var valorABuscar = "";
    if (req.body.nroInterno) {
        valorABuscar = req.body.nroInterno;
    } else {
        valorABuscar = "0".repeat(4 - req.body.ptoVenta.length) + req.body.ptoVenta + "-" + "0".repeat(8 - req.body.nroFc.length) + req.body.nroFc;
    }
    console.log("preguntando por el comprobante a AVM");
    console.log("K:\\Wgestion1\\avm c " + req.body.codProv + " " + req.body.nroInterno);
    cp("K:\\Wgestion1\\avm", ["c", req.body.codProv, valorABuscar], function (err, data) {
        fs.readFile("C:\\AVM\\EXPO\\AVM.TXT", "latin1", function (err, data) {
            if (err) {
                console.log("Error: " + err);
            }
            var comp = new ComprobanteAVM(data);
            console.log("Data: " + data);
            console.log("JSON: " + JSON.stringify(comp));
            res.send(JSON.stringify(comp));
        });
    });
});
app.post("/avm/proveedor", function (req, res) {
    var fs = require('fs');
    var cp = require("child_process").execFile;
    console.log("preguntando por el proveedor a AVM");
    console.log("K:\\Wgestion1\\avm p " + req.body.codProv);
    cp("K:\\Wgestion1\\avm", ["p", req.body.codProv], function (err, data) {
        fs.readFile("C:\\AVM\\EXPO\\AVM.TXT", "latin1", function (err, data) {
            if (err) {
                console.log(err);
            }
            var provDB = db.proveedor;
            console.log(data);
            var prov = new ProveedorAVM(data);
            console.log(JSON.stringify(prov));
            res.send(JSON.stringify(prov));
        });
    });
});
app.post("/retenciones/emitir/iva", function (req, res) {
    console.log(JSON.stringify(req.body));
    res.set("encoding", "latin1");
    var RetencionIva = db.retenciones_iva;
    db.sequelize.sync();
    req.body.retencion.id = 0;
    var nroDeRetencion = "";
    RetencionIva.create(
            {prov: req.body.proveedor.codigo,
                cuit: req.body.proveedor.cuit,
                fac: 0,
                nroFactura: req.body.factura.ptoVta + "-" + req.body.factura.nroFc,
                fechaFac: req.body.factura.fechaFc,
                concepto: req.body.retencion.concepto,
                netoFc: req.body.factura.netoG,
                ivaFc: req.body.factura.ivaFc,
                porc_ret: req.body.retencion.porcRet,
                ret_importe: req.body.retencion.importe,
                regimen: req.body.retencion.regimen,
                ret_fecha: req.body.retencion.fechaRet,
                emitida: false,
                anulada: false,
                pago: 0
            }).then(function (registro) {
        console.log(registro.id + " el el then");
        nroDeRetencion = registro.id;
        console.log(nroDeRetencion + " variable");
        res.render("./retenciones/retIva", {req: req.body, nroRet: nroDeRetencion});
        res.end();
    });
});
app.post("/retenciones/emitir/gcias", function (req, res) {
    console.log(JSON.stringify(req.body));
    var RetencionGCIAS = db.retenciones_gcias;
    db.sequelize.sync();
    var nroDeRetencion = "";
    console.log(req.body.factura.fechaFc);
    RetencionGCIAS.create(
            {prov: req.body.proveedor.codigo,
                cuit: req.body.proveedor.cuit,
                facs: req.body.factura.nrosFc,
                fechaFac: req.body.factura.fechaFc,
                concepto: req.body.retencion.concepto,
                bruto_ant: req.body.retencion.cuadro.anteriores.bruto,
                deduc_ant: req.body.retencion.cuadro.anteriores.deduc,
                neto_ant: req.body.retencion.cuadro.anteriores.neto,
                bruto: req.body.retencion.cuadro.actual.bruto,
                deduc: req.body.retencion.cuadro.actual.deduc,
                neto: req.body.retencion.cuadro.actual.neto,
                minimo: req.body.retencion.minimo,
                fijo: req.body.retencion.importeFijo,
                retencion: req.body.retencion.importe,
                ret_ant: req.body.retencion.importeAnt,
                regimen: req.body.retencion.regimen,
                ret_fecha: req.body.retencion.fechaRet,
                emitida: false,
                anulada: false,
                pago: 0
            }).then(function (registro) {
        console.log(registro.id + " el el then");
        nroDeRetencion = registro.id;
        console.log(nroDeRetencion + " variable");
        res.set("encoding", "latin1");
        res.render("./retenciones/retGcias", {req: req.body, nroRet: nroDeRetencion});
        res.end();
    });
});
app.get("/proveedores/actualizarExclusiones", function (req, res) {
    var https = require("https");
    var fs = require("fs");
    var unzip = require("unzip");
    var file = fs.createWriteStream("archivorg17.zip");
    var readerFile = fs.createReadStream("archivorg17.zip");
    https.get("https://www.afip.gob.ar/genericos/rg17/archivos/rg17.zip", (resp) => {
        resp.pipe(file);
        console.log("archivo descargado");
        readerFile.pipe(unzip.Extract("./rg17"));
    });
});
//app.get('/*.*', function (req, res) {
//    var options = url.parse(req.url, true);
//    var mime = Helper.getMime(options);
//    serveFile(res, options.pathname, mime);
//
//});

//function serveFile(res, pathName, mime) {
//    mime = mime || 'text / html';
//    fs.readFile(__dirname + '/public' + pathName, function (err, data) {
//        if (err) {
//            res.writeHead(500, {"Content-Type": "text / plain"});
//            return res.end('Error al cargar' + pathName + "con Error:" + err);
//        }
//        res.writeHead(200, {"Content-Type": mime});
//        res.end(data);
//    });
//}