import { UserIndexUseCase } from "../../src/usecase/UserIndexUseCase";
import { UserRepository } from "../../src/domain/repositories/UserRepository";
import { User } from "../../src/domain/entities/User";

describe("UserIndexUseCase", () => {
  const now = new Date("2025-01-01T00:00:00Z");
  const mockRepository: jest.Mocked<UserRepository> = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("全ユーザーを取得できる", async () => {
    const users = [
      new User(1, "田中太郎", "tanaka@example.com", now, now),
      new User(2, "鈴木花子", "suzuki@example.com", now, now),
    ];
    mockRepository.findAll.mockResolvedValue(users);

    const useCase = new UserIndexUseCase(mockRepository);
    const result = await useCase.execute();

    expect(result).toEqual(users);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("ユーザーが0件の場合は空配列を返す", async () => {
    mockRepository.findAll.mockResolvedValue([]);

    const useCase = new UserIndexUseCase(mockRepository);
    const result = await useCase.execute();

    expect(result).toEqual([]);
  });
});
