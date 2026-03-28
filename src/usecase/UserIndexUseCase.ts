import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class UserIndexUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
