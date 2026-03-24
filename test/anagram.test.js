const { isAnagram } = require("../src/anagram");

test("Deve retornar true para um anagrama válido", async () => {
  expect(isAnagram("roma", "amor")).toStrictEqual(true);
});

test("Deve retornar true para anagramas com espaços e maiúsculas", async () => {
  expect(isAnagram("Dormir", "mordir")).toStrictEqual(true);
  expect(isAnagram("A r o m a", "amora")).toStrictEqual(true);
});

test("Deve retornar false para palavras que não são anagramas", async () => {
  expect(isAnagram("carro", "rato")).toStrictEqual(false);
});

test("Deve ignorar espaços e pontuação básica", async () => {
  expect(isAnagram("hello !!", "olleh")).toStrictEqual(true);
});

test("Deve retornar false para palavras com letras diferentes", async () => {
  expect(isAnagram("apple", "pale")).toStrictEqual(false);
});