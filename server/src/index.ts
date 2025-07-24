import express from "express";
import cors from "cors";
import routes from "./routes";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Mood Tracker API running on http://localhost:${PORT}`);
});
