import { UserDeleteUseCase } from "../UserDeleteUseCase";
import { UserRepository } from "../../domain/repositories/UserRepository";

describe("UserDeleteUseCase", () => {
  const mockRepository: jest.Mocked<UserRepository> = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("削除成功時にtrueを返す", async () => {
    mockRepository.delete.mockResolvedValue(true);

    const useCase = new UserDeleteUseCase(mockRepository);
    const result = await useCase.execute(1);

    expect(result).toBe(true);
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  it("存在しないIDの場合はfalseを返す", async () => {
    mockRepository.delete.mockResolvedValue(false);

    const useCase = new UserDeleteUseCase(mockRepository);
    const result = await useCase.execute(999);

    expect(result).toBe(false);
  });
});
