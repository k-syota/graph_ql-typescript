import { UserIndexUseCase } from "../../../usecase/UserIndexUseCase";
import { UserShowUseCase } from "../../../usecase/UserShowUseCase";
import { UserCreateUseCase } from "../../../usecase/UserCreateUseCase";
import { UserUpdateUseCase } from "../../../usecase/UserUpdateUseCase";
import { UserDeleteUseCase } from "../../../usecase/UserDeleteUseCase";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export function createUserResolvers(userRepository: UserRepository) {
  const userIndexUseCase = new UserIndexUseCase(userRepository);
  const userShowUseCase = new UserShowUseCase(userRepository);
  const userCreateUseCase = new UserCreateUseCase(userRepository);
  const userUpdateUseCase = new UserUpdateUseCase(userRepository);
  const userDeleteUseCase = new UserDeleteUseCase(userRepository);

  return {
    Query: {
      users: () => userIndexUseCase.execute(),
      user: (_: unknown, args: { id: number }) =>
        userShowUseCase.execute(args.id),
    },
    Mutation: {
      createUser: (
        _: unknown,
        args: { input: { name: string; email: string } },
      ) => userCreateUseCase.execute(args.input.name, args.input.email),

      updateUser: (
        _: unknown,
        args: { id: number; input: { name?: string; email?: string } },
      ) => userUpdateUseCase.execute(args.id, args.input.name, args.input.email),

      deleteUser: async (_: unknown, args: { id: number }) => {
        const success = await userDeleteUseCase.execute(args.id);
        return { success };
      },
    },
  };
}
