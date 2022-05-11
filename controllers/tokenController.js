import { Router } from "express";
import { Authenticate } from "../common/jwt.strategy.js";
import { TokenService } from "../services/tokenService.js";

const router = Router();
const tokenService = new TokenService();

router.get("/login", async function (req, res) {
    const token = await tokenService.getSignedToken();

    return res.send(200).json(token);
})

export default router;