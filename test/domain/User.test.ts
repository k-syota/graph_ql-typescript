import { User } from "../../src/domain/entities/User";

describe("User", () => {
  const now = new Date("2025-01-01T00:00:00Z");

  it("プロパティが正しく設定される", () => {
    const user = new User(1, "田中太郎", "tanaka@example.com", now, now);

    expect(user.id).toBe(1);
    expect(user.name).toBe("田中太郎");
    expect(user.email).toBe("tanaka@example.com");
    expect(user.createdAt).toBe(now);
    expect(user.updatedAt).toBe(now);
  });

  it("name, emailは変更可能", () => {
    const user = new User(1, "田中太郎", "tanaka@example.com", now, now);

    user.name = "田中次郎";
    user.email = "jiro@example.com";

    expect(user.name).toBe("田中次郎");
    expect(user.email).toBe("jiro@example.com");
  });
});
