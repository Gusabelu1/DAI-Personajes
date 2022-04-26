import { Router } from "express";
import { PersonajeService } from "../services/personajeService.js";

const router = Router();
const pizzaService = new PersonajeService();

app.post("/create", function (req, res) {
    const personaje = await pizzaService.createPersonaje(req.body);

    res.send();
});

app.post("/update", function (req, res) {


    res.send();
});

app.get("/read", function (req, res) {
    
    res.send();
});

app.get("/delete", function (req, res) {
    
    res.send();
});