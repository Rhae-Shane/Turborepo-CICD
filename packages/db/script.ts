import { prisma } from "./index";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: "rhae-shane",
      email: "rhae@prisma.io",
      todos: {
        create: {
          title: "Hello World",
          completed: false,
        },
      },
    },
    include: {
      todos: true,
    },
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      todos: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });