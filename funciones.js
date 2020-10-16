const fs = require('fs');

const path = require('path');

exports.leerDirectorio = (ruta) => {//leemos un directorio
    files = fs.readdirSync(ruta); 
    const arrayFile = [];
    console.log("\Estos archivos MD encontre en este directorio"); 
    files.forEach(file => {
      if (path.extname(file) == ".md")
         arrayFile.push(path.join(ruta, file))
         
    }) 
    return arrayFile 
    }


