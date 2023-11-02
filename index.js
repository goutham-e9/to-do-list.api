import express from "express";
import router from "./routes/index.js";
const app = express();
app.use(express.json());
app.use("/v1", router());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  if (err.stack) {
    delete err.stack;
    res.status(500).json("An error occured");
  } else {
    res.status(statusCode).json(err.message ? err.message : "An error occured");
  }
});

app.listen(3000, () => {
  console.log("Server Connected");
});
