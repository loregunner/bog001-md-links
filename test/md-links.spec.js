const mdLinks = require('../index.js');
const estadisticas = require('../stats.js');
const path = require('path');
const prueba = require('../test/prueba.js');
const arrayVacioMdLinks = require('../test/pruebaMock.js');
const { get } = require('http');
const { promises } = require('fs');
let validateBroken = true;

const mock = {
  get: jest.fn(),
};

const pruebaValidate = `
   Total: 10
   unique: 10`;

const pruebaBroken = `
   Total: 10
   unique: 10
   broken: 2`;

describe('mdLinks', () => {
  it('deberia ser una funcion', () => {
    expect(typeof mdLinks).toBe('function')
  });

});

it('devuelve un array de objetos', () => {
  const route = path.resolve('./testREADME.md');
  return mdLinks(route, { validate: false }).then((arrayObjeto) => {
    expect(arrayObjeto).toEqual(prueba);
  });
});
describe('estadisticas', () => {
  it('deberia ser una funcion', () => {
    expect(typeof estadisticas).toBe('function')
  });

});
it('devuelve las estadisticas de los links validos', () => {
  const route = path.resolve('./testREADME.md');
  return mdLinks(route, { validate: true }).then((result) => {
    return estadisticas(result)
  }).then((result) => {
    expect(result).toEqual(pruebaValidate);
  });
});

it('devuelve las estadisticas de los links validos con broken', () => {
  const route = path.resolve('./testREADME.md');
   mock.get.mockImplementationOnce(() => Promise.resolve({ 
   Total: 10,
   unique: 10,
   broken: 2}, new Error('no se completo!')));
  return mdLinks(route, { validate: true }).then(() => {
    return arrayVacioMdLinks.pruebaMock
    })                   
    .then((result) => {
    expect(estadisticas(result,validateBroken)).toEqual(pruebaBroken);
  });
});

  it('Deberia validar, el array de objetos', () => {
    const route = path.resolve('./testREADME.md');
    mock.get.mockImplementation(() => Promise.resolve({ status: 200, ok: true },{ status: 404, ok: false }, new Error('no se completo!')));
    return mdLinks(route, { validate: true })
      .then((data) => {
        expect(data).toEqual(arrayVacioMdLinks.pruebaMock);
      }).catch((Error) => {
         return Error;
      })
  });


  