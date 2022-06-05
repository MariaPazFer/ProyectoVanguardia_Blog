import express from "express";
import { actualizar, eliminarBlog, obtenerBlog, obtenerBlogs, obtenerBlogsUsuario, publicar } from "../controllers/blog-controller";

const blogRouter= express.Router();


blogRouter.get("/",obtenerBlogs);
blogRouter.post("/publicar",publicar);
blogRouter.put("/actualizar/:id",actualizar);
blogRouter.get("/:id",obtenerBlog);
blogRouter.delete("/:id",eliminarBlog);
blogRouter.get("/usuario/:id",obtenerBlogsUsuario);

export default blogRouter;