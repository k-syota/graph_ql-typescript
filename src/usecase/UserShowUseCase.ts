import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class UserShowUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
