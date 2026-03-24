const Pessoa = require("../src/pessoa");

test("Apresentar pessoa com nome e idade", async () => {
  const pessoa = new Pessoa("João", 25);
  expect(pessoa.apresentar()).toStrictEqual("Olá, meu nome é João e eu tenho 25 anos.");
});

test("Atualizar a idade da pessoa corretamente", async () => {
  const pessoa = new Pessoa("João", 25);
  pessoa.atualizarIdade(26);
  expect(pessoa.idade).toStrictEqual(26);
});