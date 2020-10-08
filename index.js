module.exports = () => {
  leerDirectorio;

};
const fs = require('fs');

const path = require('path');

const md = require('markdown-it')();

const marked = require('marked');
const jsdom = require("jsdom");
const { leerDirectorio } = require('./funciones');
const { JSDOM } = jsdom;


// voy a buscar con una funcion los links
const funLink = (data) => { 
  const html = marked(data)
  let dom = new JSDOM(html)
  let arrayLinks = [];
  const document = dom.window.document;
  let links = document.querySelectorAll("a");
  Object.values(links).forEach(archivo => {
    let parentesisKill = /[()"]+/g;
    let result = archivo.href.replace(parentesisKill, '');
    arrayLinks.push({text: archivo.text, href: result, file: markAbsoluta });
  })
  console.log(arrayLinks);
  return arrayLinks
  }
//const mdLinks = require('md-links')
const rutasArray = leerDirectorio('ArchivosMD');
const mdLinks = () => {
// traigo la data y la convierto en un archivo uft8
return new Promise ((resolve, reject) => {
const archivo = './ArchivosMD/testREADME.md'
const markAbsoluta = path.resolve(archivo)
rutasArray.forEach(ruta =>{
  let rutaRe = path.resolve(ruta)
  console.log(rutaRe);
  fs.readFile(rutaRe, 'utf8', (err,data) => {
    //console.log(data);
    if(err){
     reject('No valida')
    }
    else{
      resolve(data);
    }
 })
})

});
};
mdLinks().then(r =>{
      console.log(r);
})
.catch(() => {
  console.log('Algo salió mal');
});
/*let promises = [
  mdLinks(),
mdLinks()
];

Promise.all(promises).then(results => {
  console.log(results)
})*/



 
