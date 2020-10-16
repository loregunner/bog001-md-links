const fs = require('fs');
const path = require('path');

// estadisticas de mis links
const estadisticas = (linksValidate, validateBroken) => {
  const filtroLinks = linksValidate.filter((element) => {
      return element.validate == "fail"
  })
  const totalLinks = linksValidate.length
  const linkRotos = filtroLinks.length
  const linksUnicos = [...new Set(linksValidate.map((uno) => uno.href))].length;
   const statsLinks = `
   Total: ${totalLinks}
   unique: ${linksUnicos}`;
   const linkBroken = `${statsLinks}\n   broken: ${linkRotos}`;
   if (validateBroken) {
     console.log(linkBroken);
    return linkBroken
  }
  return statsLinks
  }

  module.exports = estadisticas