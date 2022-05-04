import express from "express";
import cors from "cors";
import PersonajeRouter from "./controllers/personajeController.js";
import { Passport } from "passport/lib";
import JwtStrategy from "passport-jwt/lib/strategy";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
Passport.use(JwtStrategy);
app.use(Passport.initialize());
app.use("/personaje", PersonajeRouter)

app.listen(port, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", port);
});