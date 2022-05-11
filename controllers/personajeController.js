import { Router } from "express";
import { PersonajeService } from "../services/personajeService.js";
import { Authenticate } from "../common/jwt.strategy.js";

const router = Router();
const personajeService = new PersonajeService();

router.get("/getById", Authenticate, async function (req, res) {
    console.log(`This is a get operation`);
    const personaje = await personajeService.getPersonajeById(req.query.id);
    
    return res.status(200).json(personaje);
});

router.get("", Authenticate, async function (req, res) {
    console.log(`Request URL Param: ${req.query.edad}, ${req.query.nombre}`);
    console.log(`This is a get operation`);
    
    const personaje = await personajeService.getPersonaje(req.query.name, req.query.age, req.query.weight, req.query.serie);
    
    return res.status(200).json(personaje);
});

router.post("/create", Authenticate, async function (req, res) {
    const personaje = await personajeService.createPersonaje(req.body);

    return res.status(201).json(personaje);
});

router.post("/update", Authenticate, async function (req, res) {
    const personaje = await personajeService.updatePersonajeById(req.query.id, req.body);
    
    return res.send(201).json(personaje);
});

router.delete("", Authenticate, async function (req, res) {
    const personaje = await personajeService.deletePersonajeById(req.query.id);
    
    return res.send(202);
});

export default router;