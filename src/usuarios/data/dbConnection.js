import mysql from "mysql";

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projeto"
});

conexao.connect((err)=>{
    if(err){
        console.log("Error na conexao com o banco de dados", err);
    } else {
        console.log("Conexao estabelecida")
    }
})

export { conexao }