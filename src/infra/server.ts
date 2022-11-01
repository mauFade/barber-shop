import "reflect-metadata";
import "dotenv/config";

import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { errors } from "celebrate";

const PORT = process.env.PORT || 8000;
const app = express() as Application;

app.use(express.json());
app.use(cors);
app.use(morgan("dev"));
app.use(errors());

app.listen(PORT, () => {
  console.info(`API running on port: ${PORT}`);
});
