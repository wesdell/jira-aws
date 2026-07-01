import { Router } from "express";

import { search } from "../controllers/SearchController.js";

const router = Router();

router.get("/", search);

export default router;
