const UserService = require("../src/userService");

describe("UserService", () => {
  let userRepositoryMock;
  let userService;

  beforeEach(() => {
    userRepositoryMock = {
      findById: jest.fn(),
    };
    userService = new UserService(userRepositoryMock);
  });

  test("Deve retornar o nome do usuário quando ele for encontrado", async () => {
    const userFake = { id: 1, name: "João" };
    
    userRepositoryMock.findById.mockResolvedValue(userFake);

    const name = await userService.getUserName(1);

    expect(name).toStrictEqual("João");
    expect(userRepositoryMock.findById).toHaveBeenCalledWith(1);
  });

  test("Deve lançar erro quando o usuário não for encontrado", async () => {
    userRepositoryMock.findById.mockResolvedValue(null);

    await expect(userService.getUserName(999)).rejects.toThrow("Usuário não encontrado");
  });
});