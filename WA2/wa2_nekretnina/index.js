
import express from "express";
import nekretnineRouter from "./routes/nekretnine.js";
import ponudeRouter from "./routes/ponude.js";

const app = express();

app.use(express.json());

app.use("/nekretnine", nekretnineRouter);
app.use("/ponude", ponudeRouter);

app.listen(3000, () => {
    console.log("Posluzitelj radi na portu 3000");
});
