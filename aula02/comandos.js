//mongo
use meuBanco;
show dbs;
show collections;
use meuBanco; db.dropDatabase();
db.nome_da_colecao.drop(); //dropar uma coleção completa
db.nome_da_colecao.deleteMany({}); //excluir os documentos dentro de uma coleção
db.nome_da_colecao.deleteMany({ status: "inativo" }); ////excluir documentos especificos dentro de uma coleção

db.createCollection("usuarios")
db.usuarios.insertOne({ nome: "Alice", idade: 25, cidade: "São Paulo" });
db.usuarios.insertMany([ { nome: "Bob", idade: 30, cidade: "Rio de Janeiro" }, { nome: "Carlos", idade: 22, cidade: "Belo Horizonte" }]);

db.usuarios.find({ idade: 25 }).pretty();
db.usuarios.find({ cidade: "São Paulo"}, { nome : 1, _id:0 });        //0 false(não mostra), 1 true(mostra)
db.usuarios.find().pretty();

db.usuarios.updateOne({ nome: "Alice" }, { $set: { idade: 26 }});
db.usuarios.updateMany({ cidade: "São Paulo" }, { $set: { estado: "SP" }});
db.usuarios.updateOne({ nome: "Alice" }, { $push: { hobbies: "leitura" }});

db.usuarios.deleteOne({ nome: "Carlos" });
db.usuarios.deleteMany({ idade: { $lt: 25 }});

