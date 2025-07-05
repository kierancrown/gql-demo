import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
];

const schema = buildSchema(`
    type User {
        id: ID!
        name: String!
        email: String!
    }
    
    type Query {
        hello: String
        users: [User!]!
        user(id: ID!): User
    }
`);

const root = {
  hello: () => "Hello, GraphQL!",
  users: () => users,
  user: ({ id }: { id: string }) => users.find((u) => u.id === id),
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
