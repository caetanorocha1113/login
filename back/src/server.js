import express from "express";
import cors from "cors";
import {prisma} from "./lib/prisma.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/user", async (req, res) => {
    try{
        const { nome, idade } = req.body;
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                idade
            }
        });
        res.json(usuario);
        console.log(res.json(usuario))
    } catch (error){
        res.status(500).json("Não foi possivel")
    };
    
});

app.get("/user", async (req, res) => {
    try{
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json("Não foi possivel")
    }
});

app.get("/user/:id", async (req, res) => {
    
        const { id } = req.params;
        const usuario = await prisma.usuario.findUnique({
            where: {
                id
            }
        });
        if(!usuario){
            return res.status(404).json({error: "Usuário não encontrado"});
        }
        res.json(usuario);
    
});

app.put("/user/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const { nome, idade } = req.body;
        const usuario = await prisma.usuario.update({
            where: {
                id
            },
            data: {
                nome,
                idade
            }
        });
        res.json(usuario);
    } catch (error) {
        res.status(404).json("Usuário não encontrado")
    }
});

app.delete("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await prisma.usuario.delete({
            where: {
                id
            }
        });
        res.json(usuario);
    } catch (error) {
        res.status(404).json({ error: "Usuário não encontrado" });
    }
});



app.listen(3000, () => {
  console.log("Rodando em http://localhost:3000");
});