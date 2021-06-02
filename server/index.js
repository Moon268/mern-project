import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(router);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));

app.get("/home", (req, res) => {
  res.send("Welcome to my MERN project");
});
