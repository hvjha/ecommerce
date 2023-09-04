import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
// configure env
dotenv.config();
// rest object

// database config
connectDB();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes

app.use("/api/v1/auth", authRoute);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes)
// rest api
app.get("/", (req, res) => {
  res.send("<h1>welcome to E-Commerce Project</h1>");
});

// port

const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(
    `server is Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});