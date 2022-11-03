import "reflect-metadata";
import "dotenv/config";

import "@lib/adapters";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { errors } from "celebrate";
import { appRoutes } from "./http/api/routes";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(appRoutes);

app.use(
  errors({
    statusCode: 422,
  })
);

app.listen(PORT, () => {
  console.info(`API running on port: ${PORT}`);
});
