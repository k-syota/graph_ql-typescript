import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { AppDataSource } from "./infrastructure/database/data-source";
import { UserGateway } from "./infrastructure/gateways/UserGateway";
import { typeDefs } from "./presentation/graphql/schema/typeDefs";
import { createUserResolvers } from "./presentation/graphql/resolvers/userResolvers";

async function main() {
  await AppDataSource.initialize();
  console.log("Database connected");

  const userRepository = new UserGateway();
  const resolvers = createUserResolvers(userRepository);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const port = Number(process.env.PORT) || 4000;
  const { url } = await server.listen({ port });
  console.log(`GraphQL server ready at ${url}`);
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
