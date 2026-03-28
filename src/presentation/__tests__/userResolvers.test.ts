import { createUserResolvers } from "../graphql/resolvers/userResolvers";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

describe("userResolvers", () => {
  const now = new Date("2025-01-01T00:00:00Z");
  const mockRepository: jest.Mocked<UserRepository> = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const resolvers = createUserResolvers(mockRepository);

  beforeEach(() => jest.clearAllMocks());

  describe("Query", () => {
    it("users: 全ユーザーを返す", async () => {
      const users = [
        new User(1, "田中太郎", "tanaka@example.com", now, now),
      ];
      mockRepository.findAll.mockResolvedValue(users);

      const result = await resolvers.Query.users();

      expect(result).toEqual(users);
    });

    it("user: IDで1件取得する", async () => {
      const user = new User(1, "田中太郎", "tanaka@example.com", now, now);
      mockRepository.findById.mockResolvedValue(user);

      const result = await resolvers.Query.user(undefined, { id: 1 });

      expect(result).toEqual(user);
    });
  });

  describe("Mutation", () => {
    it("createUser: ユーザーを作成する", async () => {
      const user = new User(1, "田中太郎", "tanaka@example.com", now, now);
      mockRepository.create.mockResolvedValue(user);

      const result = await resolvers.Mutation.createUser(undefined, {
        input: { name: "田中太郎", email: "tanaka@example.com" },
      });

      expect(result).toEqual(user);
    });

    it("updateUser: ユーザーを更新する", async () => {
      const user = new User(1, "田中次郎", "tanaka@example.com", now, now);
      mockRepository.update.mockResolvedValue(user);

      const result = await resolvers.Mutation.updateUser(undefined, {
        id: 1,
        input: { name: "田中次郎" },
      });

      expect(result).toEqual(user);
    });

    it("deleteUser: 削除結果を返す", async () => {
      mockRepository.delete.mockResolvedValue(true);

      const result = await resolvers.Mutation.deleteUser(undefined, {
        id: 1,
      });

      expect(result).toEqual({ success: true });
    });
  });
});
