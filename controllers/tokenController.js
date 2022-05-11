import { Router } from "express";
import { TokenService } from "../services/tokenService.js";

const router = Router();
const tokenService = new TokenService();

router.get("/login", async function (req, res) {
    const token = await tokenService.getSignedToken();

    return res.status(200).json({Token: token});
})

export default router;