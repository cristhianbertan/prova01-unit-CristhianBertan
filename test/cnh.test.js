const { obterCnh } = require("../src/cnh");

test("Deve retornar true para idade maior ou igual a 18", async () => {
  expect(obterCnh(20)).toStrictEqual(true);
});

test("Deve retornar false para idade menor que 18", async () => {
  expect(obterCnh(17)).toStrictEqual(false);
});