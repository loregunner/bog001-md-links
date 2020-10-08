const fs = require('fs');

const path = require('path');

exports.leerDirectorio = (ruta) => {
    // probaremos si hay un archivo MD dentro de un directorio
    files = fs.readdirSync(ruta); 
    const arrayFile = [];
    console.log("\Estos archivos MD encontre en este directorio"); 
    files.forEach(file => { 
      if (path.extname(file) == ".md")
         arrayFile.push(path.join(ruta, file))
    
    }) 
    //console.log(arrayFile);
    return arrayFile 
    }


