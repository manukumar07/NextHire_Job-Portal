import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
const app = express();
import dotenv from "dotenv";
dotenv.config();

//configure cors
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);

//define port
const PORT = process.env.PORT || 8000;

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Api routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

connectDB();
//listen port
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
