import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes/index.mjs";

// initialize Express.js server
const app = express();

const isDevMode = process.env.NODE_ENV?.trim() == "development";

dotenv.config({ path: isDevMode ? ".env.development" : ".env.production" });

app.use(bodyParser.json());

const connectionString = process.env.MONGODB_URI || "";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

routes(app);

const ErrorHandler = (err, _req, res, _next) => {
  console.log(err);
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

app.use(ErrorHandler);

// run the server on port 5001
// for example the app can run locally at this URL: http://localhost:5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
