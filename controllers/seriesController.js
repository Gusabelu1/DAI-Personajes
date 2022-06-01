import { Router } from "express";
import { SeriesService } from "../services/seriesService.js";
import { Authenticate } from "../common/jwt.strategy.js";

const router = Router();
const seriesService = new SeriesService();

router.get("/getById", Authenticate, async function (req, res) {    
    const series = await seriesService.getSerieById(req.query.id);
    
    return res.status(200).json(series);
});

router.get("", Authenticate, async function (req, res) {    
    const series = await seriesService.getSeries(req.query.name, req.query.order);
    
    return res.status(200).json(series);
});

router.post("/create", Authenticate, async function (req, res) {    
    const series = await seriesService.createSerie(req.body);
    
    return res.status(201).json(series);
});

router.post("/update", Authenticate, async function (req, res) {    
    const series = await seriesService.updateSerieById(req.query.id, req.body);
    
    return res.status(201).json(series);
});

router.delete("", Authenticate, async function (req, res) {    
    const series = await seriesService.deleteSerieById(req.query.id);
    
    return res.status(201).json(series);
});

export default router;