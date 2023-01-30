import "reflect-metadata";
import "express-async-errors";

import { authenticationRouter, enrollmentsRouter, eventsRouter, ticketsRouter, usersRouter } from "@/routers";
import { connectDb, disconnectDB, loadEnv } from "@/config";
import express, { Express } from "express";

import cors from "cors";
import { handleApplicationErrors } from "@/middlewares";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/users", usersRouter)
  .use("/auth", authenticationRouter)
  .use("/event", eventsRouter)
  .use("/enrollments", enrollmentsRouter)
  .use(handleApplicationErrors)
  .use(ticketsRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
