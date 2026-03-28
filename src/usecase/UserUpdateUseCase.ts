import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class UserUpdateUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number, name?: string, email?: string): Promise<User> {
    return this.userRepository.update(id, name, email);
  }
}
