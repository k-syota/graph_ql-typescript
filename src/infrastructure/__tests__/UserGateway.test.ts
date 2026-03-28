import { UserGateway } from "../gateways/UserGateway";
import { AppDataSource } from "../database/data-source";
import { UserEntity } from "../entities/UserEntity";

jest.mock("../database/data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe("UserGateway", () => {
  const now = new Date("2025-01-01T00:00:00Z");
  const mockRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);
  });

  const createEntity = (
    overrides: Partial<UserEntity> = {},
  ): UserEntity => ({
    id: 1,
    name: "田中太郎",
    email: "tanaka@example.com",
    createdAt: now,
    updatedAt: now,
    ...overrides,
  });

  describe("findAll", () => {
    it("全ユーザーをドメインオブジェクトとして返す", async () => {
      const entities = [
        createEntity(),
        createEntity({ id: 2, name: "鈴木花子", email: "suzuki@example.com" }),
      ];
      mockRepo.find.mockResolvedValue(entities);

      const gateway = new UserGateway();
      const result = await gateway.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].name).toBe("鈴木花子");
      expect(mockRepo.find).toHaveBeenCalledWith({ order: { id: "ASC" } });
    });
  });

  describe("findById", () => {
    it("存在するIDの場合ドメインオブジェクトを返す", async () => {
      mockRepo.findOneBy.mockResolvedValue(createEntity());

      const gateway = new UserGateway();
      const result = await gateway.findById(1);

      expect(result).not.toBeNull();
      expect(result!.id).toBe(1);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it("存在しないIDの場合nullを返す", async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      const gateway = new UserGateway();
      const result = await gateway.findById(999);

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("ユーザーを作成して返す", async () => {
      const entity = createEntity();
      mockRepo.create.mockReturnValue(entity);
      mockRepo.save.mockResolvedValue(entity);

      const gateway = new UserGateway();
      const result = await gateway.create("田中太郎", "tanaka@example.com");

      expect(result.name).toBe("田中太郎");
      expect(mockRepo.create).toHaveBeenCalledWith({
        name: "田中太郎",
        email: "tanaka@example.com",
      });
    });
  });

  describe("update", () => {
    it("ユーザーを更新して返す", async () => {
      const entity = createEntity();
      const updated = createEntity({ name: "田中次郎" });
      mockRepo.findOneBy.mockResolvedValue(entity);
      mockRepo.save.mockResolvedValue(updated);

      const gateway = new UserGateway();
      const result = await gateway.update(1, "田中次郎");

      expect(result.name).toBe("田中次郎");
    });

    it("存在しないIDの場合エラーを投げる", async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      const gateway = new UserGateway();

      await expect(gateway.update(999, "test")).rejects.toThrow(
        "User with id 999 not found",
      );
    });
  });

  describe("delete", () => {
    it("削除成功時にtrueを返す", async () => {
      mockRepo.delete.mockResolvedValue({ affected: 1 });

      const gateway = new UserGateway();
      const result = await gateway.delete(1);

      expect(result).toBe(true);
    });

    it("対象が存在しない場合falseを返す", async () => {
      mockRepo.delete.mockResolvedValue({ affected: 0 });

      const gateway = new UserGateway();
      const result = await gateway.delete(999);

      expect(result).toBe(false);
    });
  });
});
