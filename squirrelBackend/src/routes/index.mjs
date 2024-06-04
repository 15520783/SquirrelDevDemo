import todos from "./todos.mjs";
import cors from "cors";

const base = "/api";

export default function (app) {
  console.log(process.env.ALLOW_ORIGINS);
  const allowedOrigins = process.env.ALLOW_ORIGINS.split(",") ?? [];
  var corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  app.use(`${base}/todos`, cors(corsOptions), todos);
}
