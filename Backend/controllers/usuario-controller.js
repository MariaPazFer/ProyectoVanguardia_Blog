import Usuario from "../models/Usuario";
import bcrypt from "bcryptjs/dist/bcrypt";

export const obtenerUsuarios= async(req,res,next)=>{
    let usuarios;
    try {
        usuarios= await Usuario.find();
    } catch (error) {
     console.log(error);
    }
    if(!usuarios){
        return res.status(404).json({message: "Usuarios no encontrados"});
    }
    return res.status(200).json({usuarios});
}

export const registro = async(req,res,next)=>{
 const {nombre,correo,contrasena} =req.body;

 let existeUsuario;
 try {
    existeUsuario = await Usuario.findOne({correo});
 } catch (error) {
    console.log(error);
 }
 if(existeUsuario){
     return res.status(400).json({message:"Usuario ya existe"})
 }
 const hashedPassword = bcrypt.hashSync(contrasena);
 const usuario = new Usuario({
     nombre,
     correo,
     contrasena: hashedPassword,
     blogs: [],
 });

 try {
     usuario.save();
 } catch (error) {
    console.log(error);
 }
 return res.status(201).json({usuario})
}

export const iniciarsesion = async(req,res,next)=>{
    const {correo,contrasena} =req.body;
    let existeUsuario;
 try {
    existeUsuario = await Usuario.findOne({correo});
 } catch (error) {
    console.log(error);
 }
 if(!existeUsuario){
    return res.status(404).json({message:"No se encontro este correo"})
}
const ContrasenaCorrecta = bcrypt.compareSync(contrasena,existeUsuario.contrasena);
if(!ContrasenaCorrecta){
    return res.status(400).json({message:"Contraseña incorrecta"})
}
return res.status(200).json({message:"Inicio de sesion completado"})
   }