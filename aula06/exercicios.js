//Exercícios
db.cliente.insertMany([{
    "_id": 153,
    "nome": "Alice",
    "email": "alice@example.com",
    "regiao": "Norte"
},
{
    "_id": 160,
    "nome": "Raissa",
    "email": "raissa@example.com",
    "regiao": "Sudeste"
},
{
    "_id": 150,
    "nome": "João",
    "email": "joão@example.com",
    "regiao": "Sudeste"
}]);

db.venda.insertMany([{
    "_id": 57,
    "cliente_id": 153,
    "data_venda": ISODate("2023-01-15T08:00:00Z"),
    "mes": 1,
    "ano": 2023
},
{
    "_id": 1,
    "cliente_id": 160,
    "data_venda": ISODate("2024-01-15T08:00:00Z"),
    "mes": 1,
    "ano": 2024
},
{
    "_id": 21,
    "cliente_id": 150,
    "data_venda": ISODate("2024-09-15T08:00:00Z"),
    "mes": 9,
    "ano": 2024
},
{
    "_id": 31,
    "cliente_id": 160,
    "data_venda": ISODate("2024-05-15T08:00:00Z"),
    "mes": 5,
    "ano": 2024
}]);

db.item.insertMany([{
    "_id": 10,
    "venda_id": 57,
    "produto": "Laptop",
    "quantidade": 2,
    "preco_unitario": 1200
},
{
    "_id": 3,
    "venda_id": 1,
    "produto": "Computador",
    "quantidade": 5,
    "preco_unitario": 2000
},
{
    "_id": 1,
    "venda_id": 21,
    "produto": "Mouse",
    "quantidade": 7,
    "preco_unitario": 500
},
{
    "_id": 5,
    "venda_id": 31,
    "produto": "Mousepad",
    "quantidade": 10,
    "preco_unitario": 100
},
{
    "_id": 9,
    "venda_id": 31,
    "produto": "Fone",
    "quantidade": 8,
    "preco_unitario": 50
}]);

//1) Contagem de Vendas por Cliente:
//Objetivo: Calcular quantas vendas cada cliente realizou.
//Dica: Use $group com cliente_id.

db.venda.aggregate([
    {
        $group: {
            _id: "$cliente_id",
            total_vendas: { $sum: 1 },
        }
    }
])

//2) Média de Vendas por Produto:
//Objetivo: Determinar a média de vendas para cada tipo de produto.
//Dica: Agrupe por produto e utilize $avg.
db.item.aggregate([
    { $group: { _id: "$produto", media_vendas: { $avg: "$quantidade" } } }
])

//3) Listar Clientes que Compraram Mais de 5 Produtos:
//Objetivo: Identificar clientes que realizaram grandes pedidos.
//Dica: Use $match após $group.

db.item.aggregate([
    {
        $group: {
            _id: "$venda_id",
            total: { $sum: "$quantidade" }
        }
    },
    {
        $match: {
            total: { $gte: 5 }
        }
    },
    {
        $sort: { total: -1 }
    }
])

//4) Top 3 Produtos Mais Vendidos:
//Objetivo: Encontrar os produtos com maior número de vendas.
//Dica: Agrupe por produto, some quantidade e use $sort seguido de $limit.
db.item.aggregate([
    {
        $group: {
            _id: "$produto",
            total: { $sum: "$quantidade" }
        }
    },
    {
        $sort: { total: -1 }
    },
    {
        $limit: 3
    }
])

//5) Total de Vendas por Região:
//Objetivo: Se houver um campo regiao em clientes, calcular o total de vendas por região.
//Dica: Utilize $lookup para unir pedidos e clientes, depois agrupe por regiao.

db.cliente.aggregate([
    {
        $lookup: {
            from: "venda",
            localField: "_id",
            foreignField: "cliente_id",
            as: "user_venda"
        }
    },
    {
        $unwind: "$user_venda"
    },
    {
        $group: {
            _id: "$regiao",
            total_vendas: { $sum: 1 }
        }
    }
])