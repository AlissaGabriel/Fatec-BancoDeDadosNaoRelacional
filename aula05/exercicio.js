//exercicios
//crie uma coleção de 100 mil documentos e registre o tempo de consulta sem índices e depois com índices:

for (let i = 0; i < 100000; i++) {
    db.usuarios.insertOne({
        nome: `Usuario${i}`,
        email: `usuario${i}@email.com`,
        idade: Math.floor(Math.random() * 80) + 18
    });
}

//sem indíce
db.usuarios.find({ email: "usuario5000@email.com" }).explain("executionStats");

//com indíce
db.usuarios.createIndex({ email: 1 });
db.usuarios.find({ email: "usuario5000@email.com" }).hint({ email: 1 }).explain("executionStats");