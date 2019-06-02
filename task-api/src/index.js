import express from "express";
import path from "path";
import mangoose from "mongoose";
import bodyParser from "body-parser";
import Promise from "bluebird";
import auth from "./routes/auth";
import users from "./routes/users";
import editOperations from "./routes/editOperations";





const app = express();

app.use(bodyParser.json());
mangoose.Promise = Promise;
mangoose.connect(
    "mongodb://localhost/task"
);


app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/editOperations", editOperations);


app.post("/api/auth", (req, res) => {
    res.status(400).json({ errors: { global: "Invalid Credentials" } });
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8000, () => console.log("running on localhost:8000"));
