import { Repository } from "typeorm";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserEntity } from "../entities/UserEntity";
import { AppDataSource } from "../database/data-source";

export class UserGateway implements UserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  private toDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.email,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repository.find({
      order: { id: "ASC" },
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findById(id: number): Promise<User | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? this.toDomain(entity) : null;
  }

  async create(name: string, email: string): Promise<User> {
    const entity = this.repository.create({ name, email });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async update(id: number, name?: string, email?: string): Promise<User> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new Error(`User with id ${id} not found`);
    }

    if (name !== undefined) entity.name = name;
    if (email !== undefined) entity.email = email;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
