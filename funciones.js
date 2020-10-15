const fs = require('fs');

const path = require('path');

exports.leerDirectorio = (ruta) => {//leemos un directorio
    // probaremos si hay un archivo MD dentro de un directorio
    files = fs.readdirSync(ruta); 
    const arrayFile = [];//array vacio donde agregaremos
    console.log("\Estos archivos MD encontre en este directorio"); 
    files.forEach(file => { //iteramos el directorio para buscar archivos MD
      if (path.extname(file) == ".md")//extension del archivo
         arrayFile.push(path.join(ruta, file))//si encuentra al array le agregamos la ruta absoluta
         
    }) 
    return arrayFile 
    }


