import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class UserCreateUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    return this.userRepository.create(name, email);
  }
}
