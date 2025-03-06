import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/v1/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server started at http://localhost:3000");
});
