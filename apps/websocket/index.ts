import { prisma } from "db";

Bun.serve({
  port: 8081,

  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response("Upgrade failed", { status: 500 });
  },

  websocket: {
    async message(ws, message) {
      try {
        console.log("Received message:", message.toString());

        const user = await prisma.user.create({
          data: {
            name: Math.random().toString(), // ✅ correct field
            email: `user${Date.now()}@example.com`, // ✅ unique
          },
        });

        console.log("User created:", user);

        ws.send(
          JSON.stringify({
            status: "success",
            user,
          })
        );

      } catch (error) {
        console.error("Error creating user:", error);

        ws.send(
          JSON.stringify({
            error: "Failed to create user",
          })
        );
      }
    },
  },
});