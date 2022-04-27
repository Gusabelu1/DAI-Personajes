import { Router } from "express";
import { PersonajeService } from "../services/personajeService.js";

const router = Router();
const personajeService = new PersonajeService();

router.post("/create", async function (req, res) {
    const personaje = await personajeService.createPersonaje(req.body);

    return res.status(201).json(personaje);
});

router.post("/update", function (req, res) {


    res.send();
});

router.get("/getAll", async function (req, res) {
    console.log(`This is a get operation`);
    const personaje = await personajeService.getPersonaje();

    return res.status(200).json(personaje);
});

router.get("/getById/:id", async function (req, res) {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);

    const personaje = await personajeService.getPersonajeById(req.params.id);

    return res.status(200).json(personaje);
});

router.get("/delete", function (req, res) {
    
    res.send();
});

export default router;