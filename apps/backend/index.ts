import { use } from './../../node_modules/.bun/effect@3.20.0/node_modules/effect/src/Scope';

import dotenv from "dotenv";
import express  from "express";


import { prisma } from "db";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/users", async (req, res) => {
  console.log("Received request to fetch users");
    try {
      console.log("Fetching users from database...");
        const users = await prisma.user.findMany(); 
        res.json(users);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
    
});
app.get("/health", async (req, res) => {
  console.log("Received request to fetch health status");
    try {
      console.log("Fetching health status from database...");
      
        res.json({ status: "ok" });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch health status" });
    }
    //eror solved
});


app.post("/users", async (req, res) => {
  console.log("DB URL:", process.env.DATABASE_URL);
 
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required",
      });
    }
    console.log("Creating new user with email:", email);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    console.log("User created successfully:", newUser);

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