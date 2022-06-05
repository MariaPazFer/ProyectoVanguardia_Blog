import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema({
    nombre:{
        type: String,
        required:true
    },
    correo:{
        type: String,
        required:true,
        unique:true
    },
    contrasena:{
        type: String,
        required:true,
        minlength:6
    },
    blogs:[{type: mongoose.Types.ObjectId,ref:"Blog",required:true}],
});

export default mongoose.model("Usuario",userSchema);