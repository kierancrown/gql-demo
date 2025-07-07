import { buildSchema } from "graphql";

const tasks = [
  { id: "1", title: "Buy groceries", completed: false, dueDate: "2024-07-03" },
  { id: "2", title: "Clean house", completed: true, dueDate: null },
];

const schema = buildSchema(`

    input TaskInput {
        title: String!
        completed: Boolean
        dueDate: String
    }

    type Task {
        id: ID!
        title: String!
        completed: Boolean!
        dueDate: String
    }

    type Query {
        tasks: [Task!]!
        task(id: ID!): Task
    }

    type Mutation {
        createTask(input: TaskInput!): Task!
    }
`);

const root = {
  Query: {
    tasks: () => tasks,
    task: ({ id }: { id: string }) => tasks.find((t) => t.id === id),
  },
  Mutation: {
    createTask: ({
      input,
    }: {
      input: {
        title: string;
        completed: boolean;
        dueDate: string;
      };
    }) => {
      const newTask = {
        id: `${tasks.length + 1}`,
        title: input.title,
        completed: input.completed ?? false,
        dueDate: input.dueDate ?? null,
      };
      tasks.push(newTask);
      return newTask;
    },
  },
};
