import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
import { root } from './resolvers';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('🚀 Server is running on http://localhost:4000/graphql');
});