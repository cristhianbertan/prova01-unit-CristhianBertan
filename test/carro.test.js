const Carro = require("../src/carro");

test("Deve iniciar a quilometragem em zero", async () => {
  const carro = new Carro("Toyota", "Corolla", 2024);
  expect(carro.kilometragem).toStrictEqual(0);
});

test("Deve aumentar a quilometragem ao dirigir", async () => {
  const carro = new Carro("Honda", "Civic", 2023);
  carro.dirigir(100);
  expect(carro.kilometragem).toStrictEqual(100);
});

test("Obter informações formatadas do carro", async () => {
  const carro = new Carro("Ford", "Mustang", 1969);
  carro.dirigir(50);
  const info = "Ford Mustang, Ano: 1969, Quilometragem: 50 km";
  expect(carro.obterInfo()).toStrictEqual(info);
});

test("Não deve alterar a quilometragem se a distância for negativa ou zero", async () => {
  const carro = new Carro("Fiat", "Uno", 2010);
  carro.dirigir(-50);
  expect(carro.kilometragem).toStrictEqual(0);
  
  carro.dirigir(0);
  expect(carro.kilometragem).toStrictEqual(0);
});