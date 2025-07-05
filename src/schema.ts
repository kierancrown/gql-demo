import { buildSchema } from "graphql";

export const schema = buildSchema(`
    input CreateUserInput {
        name: String!
        email: String!
    }

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

    type Mutation {
        createUser(input: CreateUserInput!): User
    }
`)