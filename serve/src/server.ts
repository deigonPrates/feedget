import { routes } from "./routes";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.port || 3333, () => {
  console.log("Server running");
});
