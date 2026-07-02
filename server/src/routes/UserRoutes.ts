import { Router } from "express";

import { getUsers } from "../controllers/UserController.js";

const router = Router();

router.get("/", getUsers);

export default router;
