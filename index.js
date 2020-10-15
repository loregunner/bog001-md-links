module.exports = () => {//exportamos la funcion que usa modulos
  leerDirectorio;

};
// llamando los modulos 
const fs = require('fs');
const fsPromises = require('fs').promises
let Promise = require("bluebird");
const path = require('path');
const marked = require('marked');
const jsdom = require("jsdom");
const { leerDirectorio } = require('./funciones');
const axios = require('axios');
const { JSDOM } = jsdom;
//esta funcion retorna un array de objetos con los datos que necesito
const objetoLinks = (data, rutaOriginal) => { 
  const html = marked(data)// convierte mi archivo en html 
  let dom = new JSDOM(html)//convierto en dom mi html
  let arrayLinks = [];//creando un array vacio donde le mandare mis datos
  const document = dom.window.document;
  let linksHTML = document.querySelectorAll("a");
  Object.values(linksHTML).forEach(archivo => {//un foreach que me itera en el archivo para devolverme los datos que necesito
    let parentesisKill = /[()"]+/g;//mate el parentesis
    let resultLink = archivo.href.replace(parentesisKill, '');
    arrayLinks.push({text: archivo.text, href: resultLink, file: rutaOriginal,});//le agrego aun array vacio los resultados [text,file,href]
  })
  return arrayLinks
  }

const mdLinks = (archivoPath,options) => {//funcion principal donde llamo todas mis chiquifunciones
const rutasArray = leerDirectorio('ArchivosMD');//variable que  me guarda la funcion de leer directorio
// traigo la data y la convierto en un archivo uft8
const arrayObjetosLinks = rutasArray.map((ruta) =>{//mapeo la ruta del archivo para que me retorne algo
rutaAbsolutaDeMisArchivos = path.resolve(ruta)//es la ruta absoluta de mis archivos md
  console.log(rutaAbsolutaDeMisArchivos);
return fsPromises.readFile(rutaAbsolutaDeMisArchivos, 'utf8',)//convierte mis rutas absolutas a un texto plano
.then(function(result) { 
 let linksObjeto = objetoLinks(result,rutaAbsolutaDeMisArchivos); 
 return linksObjeto//si la promesa se cumple me retorna mi funcion objetoLinks que pasa como parametro result
}) 
.catch(function(error) { 
  console.log(error.message); //si la promesa no se cumple me manda un error
})
})
return Promise.all(arrayObjetosLinks).then(results => {//llama las promesas dentro de la funcion
  return results.flat()//del array de objetos que me da mi funcion principal le paso flat para que se unan
})
};
//valido links con status crenado objetos y mapeando
const validatelink = (listaLinks) => {
let analiticsLinks = listaLinks.map((nuevoObjeto) =>{//mapeo la ruta del archivo para que me retorne algo
return axios.get(nuevoObjeto.href)//utilizo el modulo axios para validar si el link sirve
.then((res) =>{
if(res.status = 200){//si el href es valido con una solicitud http de 200 me crea un objeto
   let creandoObjeto = {};//creaciendo de objetos
   creandoObjeto.href = nuevoObjeto.href;
   creandoObjeto.text = nuevoObjeto.text; //
   creandoObjeto.file = nuevoObjeto.file;
   creandoObjeto.status = res.status;//me muestra el status http 200
   creandoObjeto.validate = 'ok';//con el link funcional me muestra un ok
   return creandoObjeto

}
}).catch((err) => {
  if(err.status = 404){//si el status es 404 'no encontrado' me crea un objeto con los datos fail
    let creandoObjeto = {};
    creandoObjeto.href = nuevoObjeto.href;
    creandoObjeto.text = nuevoObjeto.text;
    creandoObjeto.file = nuevoObjeto.file;
    creandoObjeto.status = err.status;//muestra el status 404
    creandoObjeto.validate = 'fail';//con el link roto muesta un fail
    return creandoObjeto
  }
})
})
return Promise.all(analiticsLinks).then(results => {//llama las promesas dentro de la funcion
  return results//del array de objetos que me da mi funcion principal le paso flat para que se unan
})
};
// estadisticas de mis links
const stats = (linksValidate, validateBroken) => {//funcion de estadisticas
  const filtroLinks = linksValidate.filter((element) => {//creo una variable la declaro con mi parametro y uso filter para filtrar
      return element.validate == "fail"//cuando filtra retorna los que validate estan fail para contar los rotos
  })
  const totalLinks = linksValidate.length//cuento el total de los links con mi parametro
  const linkRotos = filtroLinks.length//cuentos los links rotos de mi filter
  const linksUnicos = [...new Set(linksValidate.map((uno) => uno.href))].length;//new set me sirve para buscar elementos unicos de mis links y los cuento con un length
   const statsLinks = `
   Total: ${totalLinks}
   unique: ${linksUnicos}`;//creo una variable donde uso 
   const linkBroken = `${statsLinks}\n   broken: ${linkRotos}`;
   if (validateBroken) {//una condicional donde si hay validate me muestre broken
    return linkBroken
  }
  console.log(probando);
  return statsLinks
  }
mdLinks('ArchivosMD').then((result) =>{//aca llamo mis funciones algo que es muy importante para que se unan mis funciones me lea el mismo archivo que tengan todas :)
return validatelink(result);//a mdlinks le retorno mi funcion de validatelink
})                   //como son promesas tienen then ya que es un acierto 
.then((result) => {
  console.log(result)
  stats(result);//le mando mi funcion de stats
});
