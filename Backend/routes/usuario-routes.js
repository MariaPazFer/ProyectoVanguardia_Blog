import express from "express";
import { iniciarsesion, obtenerUsuarios, registro } from "../controllers/usuario-controller";

const router= express.Router();


router.get("/",obtenerUsuarios);
router.post("/registro",registro);
router.post("/iniciarsesion",iniciarsesion);






export default router;