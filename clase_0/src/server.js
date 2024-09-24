import express from "express";
import { connect } from "mongoose";
import { router } from "./routes/index.routes.js";

const app = express();
const PORT = 5000;
const MONGODB_URI = "mongodb://localhost:27017/clase-zero";

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongoose connection
connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
