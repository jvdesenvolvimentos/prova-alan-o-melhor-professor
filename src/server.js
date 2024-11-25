import express from "express"
import { criacao } from "./usuarios/create_user.js";

const app = express();

app.use(express.json())
app.use(criacao)


app.listen(3333, () => console.log("Servidor online ...."));