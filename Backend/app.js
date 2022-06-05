import express from "express";
import mongoose from "mongoose"
import blogRouter from "./routes/blog-routes";
import routes from "./routes/usuario-routes";

const app = express();
app.use(express.json())

app.use("/api/usuarios",routes)
app.use("/api/blog",blogRouter);

mongoose.
connect('mongodb+srv://maria:maria123@cluster0.rgzx4.mongodb.net/?retryWrites=true&w=majority'
)
.then(()=>app.listen(5000))
.then(()=>
console.log("Conexion al puerto 5000 y a la base de datos correcta")
)
.catch((err)=>console.log(err));
