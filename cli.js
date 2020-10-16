#!/usr/bin/env node
const mdLinks = require('./index.js');
const validateLink = require('./validate.js');
const estadisticas = require('./stats.js');
const process = require('process');

let options = process.argv
let archivoPath = process.argv[2];
const validateBroken = true;
let validate = false; 
let stats = false
//itero en options y las dos opciones les devulvo un valor boolean
options.forEach(e => {
    if (e == "--validate")
        validate = true
    if (e == "--stats")
        stats = true
});

//condicional para mi cli 

if(!validate && !stats){
  mdLinks(archivoPath).then(console.log)  
  }
else if(validate && !stats){
  mdLinks(archivoPath,{validate: true}).then((result) =>{
    return validateLink(result);
    })                   
    .then((result) => {
      console.log(result)
    })
}
else if(!validate && stats){
  mdLinks(archivoPath, {validate: false})                 
  .then((result) => {
    console.log(estadisticas(result))
  })
}
else if(validate && stats){
  mdLinks(archivoPath,{validate: true}).then((result) =>{
    return validateLink(result);
    })                   
    .then((result) => {
      console.log(result)
      estadisticas(result,validateBroken);
    })
}
else{
  console.log('no usaste options, puedes usar estos comandos --validate --stats o las dos juntas');}



 