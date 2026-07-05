import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// connect DB
import { connectDB } from "./config/mongodbConnect.js";
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API ENDPOINTS
import userRouter from "./routers/userRouters.js";

app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.json({
    message: "It's Live",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running at http://localhost:${PORT}`);
});
