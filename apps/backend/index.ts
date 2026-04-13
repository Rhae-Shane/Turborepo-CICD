import { use } from './../../node_modules/.bun/effect@3.20.0/node_modules/effect/src/Scope';
import express  from "express";

import { prisma } from "db";

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany(); 
    res.json(users);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
    
});


app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return res.status(201).json(newUser);

  } catch (error: any) {
    // Handle unique constraint (P2002)
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    console.error(error);
    return res.status(500).json({
      error: "Failed to create user",
    });
  }
});





app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});