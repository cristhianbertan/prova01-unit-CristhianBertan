const ListaDeCompras = require("../src/lista");

test("Adicionar item na lista de compras", async () => {
  const lista = new ListaDeCompras();
  lista.adicionarItem("Arroz");
  expect(lista.obterItens()).toStrictEqual(["Arroz"]);
});

test("Remover item existente da lista", async () => {
  const lista = new ListaDeCompras();
  lista.adicionarItem("Café");
  lista.removerItem("Café");
  expect(lista.obterItens()).toStrictEqual([]);
});

test("Lançar erro ao remover item inexistente", async () => {
  const lista = new ListaDeCompras();
  expect(() => lista.removerItem("Suco")).toThrow("Item não encontrado na lista");
});