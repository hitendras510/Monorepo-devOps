import "dotenv/config";
import express from "express";
import { prisma } from "db/client";

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/user", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required"
    });
  }

  const user = await prisma.user.create({
    data: {
      username,
      password
    }
  });

  res.status(201).json(user);
});