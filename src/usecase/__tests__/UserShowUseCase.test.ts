import { UserShowUseCase } from "../UserShowUseCase";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

describe("UserShowUseCase", () => {
  const now = new Date("2025-01-01T00:00:00Z");
  const mockRepository: jest.Mocked<UserRepository> = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("IDに一致するユーザーを返す", async () => {
    const user = new User(1, "田中太郎", "tanaka@example.com", now, now);
    mockRepository.findById.mockResolvedValue(user);

    const useCase = new UserShowUseCase(mockRepository);
    const result = await useCase.execute(1);

    expect(result).toEqual(user);
    expect(mockRepository.findById).toHaveBeenCalledWith(1);
  });

  it("存在しないIDの場合はnullを返す", async () => {
    mockRepository.findById.mockResolvedValue(null);

    const useCase = new UserShowUseCase(mockRepository);
    const result = await useCase.execute(999);

    expect(result).toBeNull();
  });
});
