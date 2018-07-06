/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var retencion={fechaFac:"2018-05-02"};
var fechaFc=retencion.fechaFac.substr(8,2)+"/"+retencion.fechaFac.substr(5,2)+"/"+retencion.fechaFac.substr(0,4);
console.log(fechaFc);
var netoFc = "12345,50";
var netoFc = " ".repeat(16-netoFc.length)+netoFc;
console.log(netoFc);