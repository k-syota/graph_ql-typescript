import { UserRepository } from "../domain/repositories/UserRepository";

export class UserDeleteUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
