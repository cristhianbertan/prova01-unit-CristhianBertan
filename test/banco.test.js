const Banco = require("../src/banco");

test("Deve depositar valor e atualizar o saldo", async () => {
  const conta = new Banco("João", 1000);
  conta.depositar(500);
  expect(conta.obterSaldo()).toStrictEqual(1500);
});

test("Deve lançar erro ao sacar valor maior que o saldo", async () => {
  const conta = new Banco("João", 100);
  expect(() => conta.sacar(200)).toThrow("Saldo insuficiente");
});

test("Deve transferir valor entre contas corretamente", async () => {
  const contaOrigem = new Banco("Origem", 1000);
  const contaDestino = new Banco("Destino", 0);
  
  contaOrigem.transferir(300, contaDestino);
  
  expect(contaOrigem.obterSaldo()).toStrictEqual(700);
  expect(contaDestino.obterSaldo()).toStrictEqual(300);
});

test("Deve aplicar juros ao saldo", async () => {
  const conta = new Banco("Investimento", 1000);
  conta.aplicarJuros(10);
  expect(conta.obterSaldo()).toStrictEqual(1100);
});

test("Deve verificar limite de saque e lançar erro se exceder", async () => {
  const conta = new Banco("Conta Corrente", 5000);
  conta.definirLimiteDeSaque(1000);
  expect(() => conta.verificarLimiteDeSaque(1500)).toThrow("Saque acima do limite permitido");
});

test("Deve calcular o total depositado corretamente", async () => {
  const conta = new Banco("Poupanca", 0);
  conta.depositar(200);
  conta.depositar(300);
  conta.sacar(100);
  expect(conta.obterTotalDepositado()).toStrictEqual(500);
});

test("Deve pagar uma conta e registrar no histórico", async () => {
  const conta = new Banco("João", 500);
  conta.pagarConta(100, "Luz");
  expect(conta.obterSaldo()).toStrictEqual(400);
  expect(conta.obterHistorico()).toContainEqual(expect.objectContaining({ tipo: 'Pagamento', descricao: 'Luz' }));
});

test("Deve retornar true quando o saque estiver dentro do limite", async () => {
  const conta = new Banco("João", 5000);
  conta.definirLimiteDeSaque(1000);
  expect(conta.verificarLimiteDeSaque(500)).toStrictEqual(true);
});

test("Deve retornar saldo zero se o array estiver vazio no mediaArray (utilitarios)", async () => {
});

test("Deve iniciar com saldo zero quando nenhum saldo inicial for fornecido", async () => {
  const conta = new Banco("João");
  expect(conta.obterSaldo()).toStrictEqual(0);
});