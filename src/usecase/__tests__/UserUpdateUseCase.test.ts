import { UserUpdateUseCase } from "../UserUpdateUseCase";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

describe("UserUpdateUseCase", () => {
  const now = new Date("2025-01-01T00:00:00Z");
  const mockRepository: jest.Mocked<UserRepository> = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("ユーザーを更新して返す", async () => {
    const updated = new User(1, "田中次郎", "tanaka@example.com", now, now);
    mockRepository.update.mockResolvedValue(updated);

    const useCase = new UserUpdateUseCase(mockRepository);
    const result = await useCase.execute(1, "田中次郎", undefined);

    expect(result).toEqual(updated);
    expect(mockRepository.update).toHaveBeenCalledWith(
      1,
      "田中次郎",
      undefined,
    );
  });

  it("name, email両方を更新できる", async () => {
    const updated = new User(1, "田中次郎", "jiro@example.com", now, now);
    mockRepository.update.mockResolvedValue(updated);

    const useCase = new UserUpdateUseCase(mockRepository);
    const result = await useCase.execute(1, "田中次郎", "jiro@example.com");

    expect(result).toEqual(updated);
    expect(mockRepository.update).toHaveBeenCalledWith(
      1,
      "田中次郎",
      "jiro@example.com",
    );
  });
});
