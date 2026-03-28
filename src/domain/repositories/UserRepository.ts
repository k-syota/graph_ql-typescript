import { User } from "../entities/User";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(name: string, email: string): Promise<User>;
  update(id: number, name?: string, email?: string): Promise<User>;
  delete(id: number): Promise<boolean>;
}
