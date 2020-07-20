import express from "express";
import setupMiddware from "./middleware.js";
import router from "./api/router.js";

// Declare an app from express
const app = express();

setupMiddware(app);

// setup basic routing for index route
app.use("/api", router);

// catch all
app.all("*", (req, res) => {
  res.json({ ok: true });
});

export default app;
