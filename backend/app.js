import express from "express";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import studentRoutes from "./routes/studentRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import cors from "cors";
const app = express();

dotenv.config();

connectDB();

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("APi is running...");
});

app.use("/api/student", studentRoutes);
app.use("/api/staff", staffRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server started...");
});
