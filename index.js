const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session");

const authRoutes = require("./routes/auth");

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);


// ===== Middlewares =====
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ IMPORTANT

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false
  })
);

// ===== Database =====
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ===== Routes =====
app.use("/api/auth", authRoutes);

// ===== Server =====
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
