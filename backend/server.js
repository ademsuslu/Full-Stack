const express = require("express");
const path = require("path");

const cors = require("cors");
const colors = require("colors");
const connectDb = require("./config/db.js");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // what is extended whta do this do
app.use("/api/goals", require("./routes/goalRoutes.js"));
app.use("/api/users", require("./routes/userRoutes.js"));
// Serve frontend

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);
app.listen(process.env.PORT || 4000, () => {
  console.log(`server runnng on ${process.env.PORT}`);
});
