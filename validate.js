const axios = require('axios');

//valido mis links con su status
const validateLink = (listaLinks) => {
    let analiticsLinks = listaLinks.map((nuevoObjeto) =>{
    return axios.get(nuevoObjeto.href)
    .then((res) =>{
    if(res.status = 200){
       let creandoObjeto = {};
       creandoObjeto.href = nuevoObjeto.href;
       creandoObjeto.text = nuevoObjeto.text; 
       creandoObjeto.file = nuevoObjeto.file;
       creandoObjeto.status = res.status;
       creandoObjeto.validate = 'ok';
       return creandoObjeto
    
    }
    }).catch((err) => {
      if(err.status = 404){
        let creandoObjeto = {};
        creandoObjeto.href = nuevoObjeto.href;
        creandoObjeto.text = nuevoObjeto.text;
        creandoObjeto.file = nuevoObjeto.file;
        creandoObjeto.status = err.status;
        creandoObjeto.validate = 'fail';
        return creandoObjeto
      }
    })
    })
    return Promise.all(analiticsLinks).then(results => {
      return results
    })
    };

 module.exports = validateLink