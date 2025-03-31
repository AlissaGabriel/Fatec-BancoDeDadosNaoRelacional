//$lookup : operador que junta duas coleções
//aggregate : recebe um array com vários objetos. Ela permite agrupar dados de vários documentos e executar operações para obter um resultado combinado. 
//embbed : incorporação é ideal para dados que não mudam frequentemente e que são acessados juntos, o que melhora o desempenho de leitura.
//reference : referências são úteis quando voc~e tem uma estrutura de dados mais complexa e deseja normalizar os dados para evitar duplicações.

db.orders.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user_info"
        }
    }
])

//usando operador $group
db.orders.aggregate([
    {
        $group: {
            _id: "$product_id", //agrupa pelos IDs de produtos
            total_orders: { $sum: 1 }, //conta o número de pedidos
            total_quantity: { $sum: "$quantity" } //soma a quantidade de cada pedido
        }
    }
])

//pipeline de agregação
//a pipeline de agregação é a sequência de estágios que os documentos percorrem durante o processo de agregação. Cada estágio aplica uma operação específica aos documentos e 
//passa o resultado para o próximo estágio
db.collection.aggregate([
    { estagio1 },
    { estagio2 },
    { estagio3 }
    // ...
])

//exemplo de fluxo de dados na pipeline
db.vendas.aggregate([
    { $match: { ano: 2023 } }, //filtra os documentos
    { $group: { _id: "$mes", total: { $sum: "$valor" } } }, //agrupa e soma
    { $sort: { total: -1 } } //ordena os resultados
])

//$project: o estágio $project permite selecionar, incluir ou excluir campos específicos nos documentos resultantes. Também pode ser usado para criar novos campos ou transformar dados
db.vendas.aggregate([
    { $project: { nome: 1, valor: 1, _id: 0 } }
])

//$limit: restringe o número de documentos que passam para os estágio seguintes.
//$skip: ignora um número especificado de documentos
db.vendas.aggregate([
    { $sort: { valor: -1 } },
    { $limit: 5 }
])

//o estágio $unwind desestrutura um array, criando um documento para cada elemento do array.
db.pedidos.aggregate([
    { $unwind: "$itens" }
])

//o estágio $facet permite executar múltiplas pipelines de agregação em paralelo e combinar os resultados.
db.vendas.aggregate([
    {
        $facet: {
            total_vendas: [{ $count: "count" }],
            soma_total: [{ $group: { _id: null, total: { $sum: "$valor" } } }]
        }
    }
])

//$bucket: agrupa documentos em intervalos predefinidos
//$bucketAuto: agrupa documentos em um número especificado de buckets automaticamente.
db.vendas.aggregate([
    {
        $bucket: {
            groupBy: "$valor",
            boundaries: [0, 100, 200, 300],
            default: "Mais de 300",
            output: { total_vendas: { $sum: 1 }, soma_valores: { sum: "$valor" } }
        }
    }
])

//$addFields: adiciona novos campos aos documentos, somente na consulta
//$set: similar ao $addFields, mas também pode modificar campos existentes.
db.vendas.aggregate([
    {
        $addFields: {
            total: { $multiply: ["$quantidade", "preco_unitario"] }
        }
    }
])

//o estágio $count adiciona um campo com o número total de documentos que passaram pelo estágio anterior.
db.vendas.aggregate([
    { $count: "total_vendas" }
])

//como testar
db.vendas.aggregate([
    { $match: { ano: 2023 } },
    { $group: { _id: "$mes", total_vendas: { $sum: "$valor" } } },
    { $sort: { total_vendas: -1 } }
]).explain("executionStats")

//operadores de agregação
//$sum: soma os soma valores
//$avg: calcula a média
//$min: encontra o valor mínimo
//$max: encontra o valor máximo
//$first: retorna o primeiro valor
//$last: retorna o último valor

//média de vendas do mês
db.vendas.aggregate([
    { $group: { _id: "$mes", media_vendas: { $avg: "valor" } } }
])

//operadores condicionais
//$cond: estrutura condicional.
//$ifNull: retorna um valor se o campo for nulo ou indefinido.
//$switch: implementa uma série de condições.

db.vendas.aggregate([
    {
        $addFields: {
            acima_da_media: {
                $cond: { if: { $gt: ["$valor, 1000"] }, then: true, else: false }
            }
        }
    }
])

//operadores de array
//$push: Adiciona elementos a um array.
//$addToSet: Adiciona elementos únicos a um array.
//$filter: Filtra elementos de um array.
//$map: Aplica uma expressão a cada elemento de um array.
//$reduce: Reduz um array a um único valor.

db.pedidos.aggregate([
    {
        $project: {
            itens_filtrados: {
                $filter: {
                    input: "$itens",
                    as: "item",
                    cond: { $gt: ["$item.quantidade", 2] }
                }
            }
        }
    }
])

