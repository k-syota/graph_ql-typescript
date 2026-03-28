import { UserCreateUseCase } from "../../src/usecase/UserCreateUseCase";
import { UserRepository } from "../../src/domain/repositories/UserRepository";
import { User } from "../../src/domain/entities/User";

describe("UserCreateUseCase", () => {
  const now = new Date("2025-01-01T00:00:00Z");
  const mockRepository: jest.Mocked<UserRepository> = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("ユーザーを作成して返す", async () => {
    const created = new User(1, "田中太郎", "tanaka@example.com", now, now);
    mockRepository.create.mockResolvedValue(created);

    const useCase = new UserCreateUseCase(mockRepository);
    const result = await useCase.execute("田中太郎", "tanaka@example.com");

    expect(result).toEqual(created);
    expect(mockRepository.create).toHaveBeenCalledWith(
      "田中太郎",
      "tanaka@example.com",
    );
  });
});
