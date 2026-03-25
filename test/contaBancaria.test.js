const ContaBancaria = require("../src/contaBancaria");

const criarContaMock = (overrides = {}) => ({
  id: 1,
  titular: "João",
  saldo: 1000,
  limite: 500,
  status: "ativa",
  atualizadaEm: new Date(),
  ...overrides,
});

test("Deve depositar valor e atualizar o saldo", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 1000}))
  conta.depositar(500);
  expect(conta.obterSaldo()).toStrictEqual(1500);
});

test("Deve obter saldo corretamente", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 2000 }));
  expect(conta.obterSaldo()).toStrictEqual(2000);
});

test("Deve obter limite corretamente", async () => {
  const conta = new ContaBancaria(criarContaMock({ limite: 5000 }));
  expect(conta.obterLimite()).toStrictEqual(5000);
});

test("Deve obter titular corretamente", async () => {
  const conta = new ContaBancaria(criarContaMock({ titular: "Maria" }));
  expect(conta.obterTitular()).toStrictEqual("Maria");
});

test("Deve obter status da conta bancária", async () => {
  const conta = new ContaBancaria(criarContaMock({ status: "ativa" }));
  expect(conta.obterStatus()).toStrictEqual("ativa");
});

test("Deve retornar 'true' caso a conta o status seja 'ativo'", async () => {
  const conta = new ContaBancaria(criarContaMock({ status: "ativa" }));
  expect(conta.estaAtiva()).toStrictEqual(true);
});
    
test("Não deve sacar valor inválido", async () => {
  const conta = new ContaBancaria(criarContaMock());
  expect(conta.sacar(0)).toStrictEqual(false);
});

test("Não deve sacar valor maior que saldo + limite", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 100, limite: 50 }));
  expect(conta.sacar(200)).toStrictEqual(false);
});

test("Deve sacar valor dentro do limite", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 100, limite: 100 }));
  conta.sacar(150);
  expect(conta.obterSaldo()).toStrictEqual(-50);
});

test("Deve alterar titular", async () => {
  const conta = new ContaBancaria(criarContaMock());
  conta.alterarTitular("Carlos");
  expect(conta.obterTitular()).toStrictEqual("Carlos");
});

test("Não deve alterar titular vazio", async () => {
  const conta = new ContaBancaria(criarContaMock());
  expect(conta.alterarTitular("")).toStrictEqual(false);
});

test("Deve bloquear conta", async () => {
  const conta = new ContaBancaria(criarContaMock());
  conta.bloquearConta();
  expect(conta.obterStatus()).toStrictEqual("bloqueada");
});

test("Não deve bloquear conta já bloqueada", async () => {
  const conta = new ContaBancaria(criarContaMock({ status: "bloqueada" }));
  expect(conta.bloquearConta()).toStrictEqual(false);
});

test("Deve ativar conta", async () => {
  const conta = new ContaBancaria(criarContaMock({ status: "bloqueada" }));
  conta.ativarConta();
  expect(conta.obterStatus()).toStrictEqual("ativa");
});

test("Não deve ativar conta já ativa", async () => {
  const conta = new ContaBancaria(criarContaMock({ status: "ativa" }));
  expect(conta.ativarConta()).toStrictEqual(false);
});

test("Não deve encerrar conta com saldo diferente de zero", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 100 }));
  expect(conta.encerrarConta()).toStrictEqual(false);
});

test("Deve encerrar conta com saldo zero", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 0 }));
  conta.encerrarConta();
  expect(conta.obterStatus()).toStrictEqual("encerrada");
});

test("Deve validar saque possível", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 100, limite: 50 }));
  expect(conta.podeSacar(120)).toStrictEqual(true);
});

test("Não deve validar saque impossível", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 100, limite: 50 }));
  expect(conta.podeSacar(200)).toStrictEqual(false);
});

test("Deve aplicar tarifa", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 100 }));
  conta.aplicarTarifa(20);
  expect(conta.obterSaldo()).toStrictEqual(80);
});

test("Não deve aplicar tarifa inválida", async () => {
  const conta = new ContaBancaria(criarContaMock());
  expect(conta.aplicarTarifa(0)).toStrictEqual(false);
});

test("Deve ajustar limite", async () => {
  const conta = new ContaBancaria(criarContaMock());
  conta.ajustarLimite(1000);
  expect(conta.obterLimite()).toStrictEqual(1000);
});

test("Não deve aceitar limite negativo", async () => {
  const conta = new ContaBancaria(criarContaMock());
  expect(conta.ajustarLimite(-1)).toStrictEqual(false);
});

test("Deve identificar saldo negativo", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: -10 }));
  expect(conta.saldoNegativo()).toStrictEqual(true);
});

test("Deve transferir entre contas", async () => {
  const origem = new ContaBancaria(criarContaMock({ saldo: 500 }));
  const destino = new ContaBancaria(criarContaMock({ saldo: 100 }));

  origem.transferir(200, destino);

  expect(origem.obterSaldo()).toStrictEqual(300);
  expect(destino.obterSaldo()).toStrictEqual(300);
});

test("Não deve transferir valor inválido", async () => {
  const origem = new ContaBancaria(criarContaMock({ saldo: 100 }));
  const destino = new ContaBancaria(criarContaMock({ saldo: 0 }));

  expect(origem.transferir(1000, destino)).toStrictEqual(false);
});

test("Deve calcular saldo disponível", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 100, limite: 50 }));
  expect(conta.calcularSaldoDisponivel()).toStrictEqual(150);
});

test("Deve gerar resumo corretamente", async () => {
  const conta = new ContaBancaria(criarContaMock());
  const resumo = conta.gerarResumo();

  expect(resumo).toMatchObject({
    titular: "João",
    saldo: 1000,
    limite: 500,
    disponivel: 1500,
    status: "ativa",
  });
});

test("Deve validar conta válida", async () => {
  const conta = new ContaBancaria(criarContaMock());
  expect(conta.validarConta()).toStrictEqual(true);
});

test("Não deve validar conta sem id", async () => {
  const conta = new ContaBancaria(criarContaMock({ id: null }));
  expect(conta.validarConta()).toStrictEqual(false);
});

test("Deve resetar conta", async () => {
  const conta = new ContaBancaria(criarContaMock({ saldo: 500, limite: 200, status: "bloqueada" }));
  conta.resetarConta();

  expect(conta.obterSaldo()).toStrictEqual(0);
  expect(conta.obterLimite()).toStrictEqual(0);
  expect(conta.obterStatus()).toStrictEqual("ativa");
});