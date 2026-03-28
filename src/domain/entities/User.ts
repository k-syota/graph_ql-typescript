export class User {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
