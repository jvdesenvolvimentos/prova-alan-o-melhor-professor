import { Router  } from "express";
import { conexao } from "./data/dbConnection.js";

const criacao = Router();

criacao.post("/api/cadastro", (req, res) => {
    const {nome, email, senha, rsenha, cpf, nascimento} = req.body;

    if(!nome || !email || !senha || !cpf){
        return res.json(
            {
                Erro: "Preenchar todos os dados" 
            }
        )
    }

    conexao.query(`INSERT INTO usuarios (nome, email, senha, cpf, data_nascimento) VALUES ('${nome}', '${email}', '${senha}', '${cpf}', '${nascimento}')`, (err, result)=>{
        if(err){
            return res.json(
                {
                    Erro: "Error na inserção de dados, "+ err.message 
                }
            )
        }
        res.json({
            Sucesso: "Usuario cadastrando com sucesso"
        })
    })

})

criacao.put("/api/editar-nome", (req, res) => {
    const {id, nome} = req.body;

    if(!nome || !id){
        return res.json(
            {
                Erro: "Preenchar todos os dados" 
            }
        )
    }

    conexao.query(`UPDATE usuarios SET nome = '${nome}' WHERE id = ${id};`, (err, result)=>{
        if(err){
            return res.json(
                {
                    Erro: "Error na atualização de dados, "+ err.message 
                }
            )
        }
        res.json({
            Sucesso: `atualizado com sucesso nome ${nome}`
        })
    })

})

criacao.put("/api/novo_saldo", (req, res) => {
    const {id, novo_saldo, tipo_cons} = req.body;

    if(!novo_saldo || !id){
        return res.json(
            {
                Erro: "Preenchar todos os dados" 
            }
        )
    }
    let tipo = "-"
    if(tipo_cons == "mais"){
        tipo = "+"
    }

    conexao.query(`UPDATE usuarios SET saldo = saldo ${tipo}  '${novo_saldo}' WHERE id = ${id};`, (err, result)=>{
        if(err){
            return res.json(
                {
                    Erro: "Error na atualização do saldo, "+ err.message 
                }
            )
        }
        res.json({
            Sucesso: `saldo atualizado com sucesso ${tipo} saldo ${novo_saldo}`
        })
    })

})


criacao.delete("/api/delete", (req, res) => {
    const id = req.body.id;

    if(!id){
        return res.json(
            {
                Erro: "Preenchar todos os dados" 
            }
        )
    }

    conexao.query(`DELETE FROM usuarios WHERE id = ${id};`, (err, result)=>{
        if(err){
            return res.json(
                {
                    Erro: "Error na excluçao da conta, "+ err.message 
                }
            )
        }
        res.json({
            Sucesso: `usuario deletado com id ${id}`
        })
    })

})

criacao.get("/api/meus-dados", (req, res) => {
    const id = req.query.id;

    if(!id){
        return res.json(
            {
                Erro: "Preenchar todos os dados" 
            }
        )
    }

    conexao.query(`SELECT * FROM usuarios WHERE id = ${id};`, (err, result)=>{
        if(err){
            return res.json(
                {
                    Erro: "Error ao encontrar a conta, "+ err.message 
                }
            )
        }
        res.json({
            Sucesso: `true`,
            nome: result[0].nome,
            email: result[0].email,
            cpf: result[0].cpf,
            data_nascimento: result[0].data_nascimento,
            saldo: result[0].saldo

        })
    })

})


export { criacao };