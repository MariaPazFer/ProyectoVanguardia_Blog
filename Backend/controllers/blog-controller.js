import mongoose from "mongoose";
import Blog from "../models/Blog";
import Usuario from "../models/Usuario";


export const obtenerBlogs= async(req,res,next)=>{
    let blogs;
    try {
        blogs= await Blog.find();
    } catch (error) {
     console.log(error);
    }
    if(!blogs){
        return res.status(404).json({message: "Blogs no encontrados"});
    }
    return res.status(200).json({blogs});
}

export const publicar= async(req,res,next)=>{
    const {titulo,descripcion,imagen,usuario} =req.body; 
    let existeUsuario;

    try {
        existeUsuario = await Usuario.findById(usuario);
    } catch (error) {
        return console.log(error);
    }

    if(!existeUsuario){
        return res.status(400).json({message:"No se encontro usuario para este ID"})
    }

    const blog = new Blog({
        titulo,
        descripcion,
        imagen,
        usuario
    });
    
 try {
    const sesion = await mongoose.startSession();
    sesion.startTransaction();
    await blog.save({sesion});
    existeUsuario.blogs.push(blog);
    await existeUsuario.save({sesion});
    await sesion.commitTransaction();
} catch (error) {
   console.log(error);
  return res.status(500).json({message:error})
}
return res.status(201).json({blog})
}

export const actualizar= async(req,res,next)=>{
    const {titulo,descripcion} =req.body; 
    const blogId = req.params.id;
    let blog;
   try {
     blog = await Blog.findByIdAndUpdate(blogId,{
        titulo,
        descripcion
    })
   } catch (error) {
    return console.log(error);
   }
   if(!blog){
       return res.status(500).json({message: "No se puede actualizar"})
   }
   return res.status(200).json({blog})
}

export const obtenerBlog= async(req,res,next)=>{
    const blogId = req.params.id;
    let blog;
   try {
     blog = await Blog.findById(blogId)
   } catch (error) {
    return console.log(error);
   }
   if(!blog){
       return res.status(500).json({message: "No se encontro blog"})
   }
   return res.status(200).json({blog})
}

export const eliminarBlog= async(req,res,next)=>{
    const blogId = req.params.id;
    let blog;
   try {
     blog = await Blog.findByIdAndRemove(blogId).populate('usuario');
     await blog.usuario.blogs.pull(blog);
     await blog.usuario.save();
   } catch (error) {
    return console.log(error);
   }
   if(!blog){
       return res.status(400).json({message: "No se encontro blog"})
   }
   return res.status(200).json({message: "Se elimino correctamente"})
}

export const obtenerBlogsUsuario= async(req,res,next)=>{
    const usuarioId = req.params.id;
    let usuarioBlogs;
   try {
    usuarioBlogs = await Usuario.findById(usuarioId).populate("blogs");
   } catch (error) {
    return console.log(error);
   }
   if(!usuarioBlogs){
       return res.status(404).json({message: "No se encontraron los blogs"})
   }
   return res.status(200).json({blogs:usuarioBlogs})
}