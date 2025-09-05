import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//Basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Cors Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

//import the routes

import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
// Example central error handler
// app.use((err, req, res, next) => {
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Something went wrong",
//     errors: err.errors || [],
//   });
// });

export default app;
