import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const users = [
    { id: "1", name: "John Doe", email: "john.doe@example.com" },
    { id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
]

export const root = {
    hello: () => "Hello World",
    users: async () => await prisma.user.findMany(),
    user: async ({ id }: { id: string }) => await prisma.user.findUnique({ where: { id: parseInt(id) } }),

    createUser: async ({ input }: { input: {name: string, email: string}}) => {
        const { name, email } = input;

        if (!name.trim() || !email.trim()) {
            throw new Error("Name and email are required");
        }

        const newUser = await prisma.user.create({ data: { name, email } });
        return newUser;
    }
}