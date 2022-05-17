import { Router } from "express";
import { SeriesService } from "../services/seriesService.js";
import { Authenticate } from "../common/jwt.strategy.js";

const router = Router();
const seriesService = new SeriesService();

router.get("", Authenticate, async function (req, res) {    
    const series = await seriesService.getSeries();
    
    return res.status(200).json(series);
});

export default router;