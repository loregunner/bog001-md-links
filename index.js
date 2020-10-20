
// llamando los modulos 
const fs = require('fs');
const fsPromises = require('fs').promises
let Promise = require("bluebird");
const path = require('path');
const marked = require('marked');
const jsdom = require("jsdom");
const { leerDirectorio } = require('./funciones');
const { JSDOM } = jsdom;


//esta funcion retorna un array de objetos con los datos que necesito
const objetoLinks = (data, rutaOriginal) => { 
  const html = marked(data)
  let dom = new JSDOM(html)
  let arrayLinks = [];
  const document = dom.window.document;
  let linksHTML = document.querySelectorAll("a");
  Object.values(linksHTML).forEach(archivo => {//necesito el object.values?
    let parentesisKill = /[()"]+/g;
    let resultLink = archivo.href.replace(parentesisKill, '');
    arrayLinks.push({text: archivo.text, href: resultLink, file: rutaOriginal,});
  })
  return arrayLinks
  }
  
  // mi funcion principal con mis rutas 
const mdLinks = (archivoPath) => {
//const pruebaRuta = path.resolve(archivoPath)
const rutasArray = leerDirectorio(archivoPath);
const arrayObjetosLinks = rutasArray.map((ruta) =>{
rutaAbsolutaDeMisArchivos = path.resolve(ruta)
  console.log(rutaAbsolutaDeMisArchivos);
 return fsPromises.readFile(rutaAbsolutaDeMisArchivos, 'utf8',)
.then(function(result) { 
 let linksObjeto = objetoLinks(result,rutaAbsolutaDeMisArchivos); 
 return linksObjeto
})
.catch(function(error) { 
  console.log(error.message); 
})
})
return Promise.all(arrayObjetosLinks).then(results => {
  return results.flat()
})
};












/*mdLinks('README.md').then((result) =>{
return validatelink(result);
})                   
.then((result) => {
  console.log(result)
  return stats(result);//le mando mi funcion de stats
})*/


module.exports = mdLinks


