import express from "express";
import cors from "cors";
import PersonajeRouter from "./controllers/personajeController.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/personaje", PersonajeRouter)

app.listen(port, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", port);
});