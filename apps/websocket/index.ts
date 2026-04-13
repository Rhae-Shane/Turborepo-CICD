import { prisma } from "db";

Bun.serve({
    port: 8081,
    fetch(req, server) {
      // upgrade the request to a WebSocket
      if (server.upgrade(req)) {
        return; // do not return a Response
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        message(ws, message) {
            prisma.user.create({
                data: {
                    user: Math.random().toString(),
                    email: Math.random().toString()+"@example.com",
                }
            })
            ws.send(message);
        },
    },
});