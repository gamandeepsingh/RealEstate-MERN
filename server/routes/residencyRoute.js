import express from "express"
import { allFavouriteResidency, createResidency, favouriteResidency, getAllResidencies, getResidency } from "../controllers/residencyController.js";
const router = express.Router()

router.post("/create",createResidency)
router.get("/allresd",getAllResidencies)
router.get("/:id",getResidency)
router.post("/toFav/:id",favouriteResidency)
router.post("/allFav",allFavouriteResidency)

export {router as residencyRoute};