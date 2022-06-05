import mongoose from "mongoose";


const Schema = mongoose.Schema;

const blogSchema = new Schema({
    titulo:{
        type: String,
        required:true
    },
    descripcion:{
        type: String,
        required:true
    },
    imagen:{
        type: String,
        required:true
    },
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: "Usuario",
        required:true
    }
});

export default mongoose.model("Blog",blogSchema);