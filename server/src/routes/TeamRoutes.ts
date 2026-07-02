import { Router } from "express";

import { getTeams } from "../controllers/TeamController.js";

const router = Router();

router.get("/", getTeams);

export default router;
