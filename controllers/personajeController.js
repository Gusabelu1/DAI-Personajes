import { Router } from "express";
import { PersonajeService } from "../services/personajeService.js";

const router = Router();
const personajeService = new PersonajeService();

router.post("/create", async function (req, res) {
    const personaje = await personajeService.createPersonaje(req.body);

    return res.status(201).json(personaje);
});

router.post("/update", async function (req, res) {
    const personaje = await personajeService.updatePersonajeById(req.query.id, req.body);

    return res.send(201).json(personaje);
});

router.get("/getById", async function (req, res) {
    console.log(`This is a get operation`);
    const personaje = await personajeService.getPersonajeById(req.query.id);

    return res.status(200).json(personaje);
});

router.get("/getAll", async function (req, res) {
    console.log(`Request URL Param: ${req.query.edad}, ${req.query.nombre}`);
    console.log(`This is a get operation`);
    let personaje;

    if (req.query.nombre || req.query.edad) {
        personaje = await personajeService.getPersonajeByEdadNombre(req.query.edad, req.query.nombre);
    } else {
        personaje = await personajeService.getPersonaje();
    }

    return res.status(200).json(personaje);
});

router.delete("/delete", async function (req, res) {
    const personaje = await personajeService.deletePersonajeById(req.query.id);

    return res.send(202);
});

export default router;