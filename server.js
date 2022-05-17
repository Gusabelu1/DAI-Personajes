import express from "express";
import cors from "cors";
import PersonajeRouter from "./controllers/personajeController.js";
import SeriesRouter from "./controllers/seriesController.js";
import TokenRouter from "./controllers/tokenController.js";
import passport from "passport";
import { jwtStrategy } from "./common/jwt.strategy.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
passport.use(jwtStrategy);
app.use(passport.initialize());
app.use("/characters", PersonajeRouter);
app.use("/series", SeriesRouter);
app.use("/auth", TokenRouter);

app.listen(port, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", port);
});