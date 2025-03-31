//índices simples - usando apenas um campo

//criar um índice em único campo
db.usuarios.createIndex({ email: 1 })

//buscas pelo campo email serão muito mais rápidas:
db.usuarios.find({ email: "joao@email.com" })

//índices compostos - usando mais de um campo

//ciar um índice composto para nome e idade:
db.usuarios.createIndex({ nome: 1, idade: -1 })
//este índice ajuda buscas ordenadas pelo nome em ordem crescente e idade em ordem decrescente

//essa consulta usará o índice:
db.usuarios.find({ nome: "Carlos" }).sort({ idade: -1 })

//índice para busca rápida em array
//se um campo for um array e quisermos pesquisar dentro dele, podemos criar um índice multi-key

//criar um índice para um array:
db.pedidos.createIndex({ itens: 1 })
//isso melhora buscas em coleções onde itens é um array

//índices em campos textuais
//criar um índice para campos textuais
db.produtos.createIndex({ descricao: "text" })

//agora podemos buscas palavras dentro desse campo:
db.produtos.find({ $text: { $search: "notebook" } })
//retorna todos os produtos cuja descricao contém "notebook"

//índices geoespaciais
//se armazenarmos coordenadas geográficas podemos criar índices geoespaciais (2dsphere)

//criar um índice geoespacial
db.locais.createIndex({ localizacao: "2dsphere" })
//agora podemos buscar locais próximos de um ponto específico

//se quisermos ver o espaço total ocupado pelos índices de um coleção
db.usuarios.totalIndexSize() //saída em bytes

//detalhando o espaço por índices
db.usuarios.stats().indexSizes

    //como saber se um índice está sendo usado

    //podemos analisar como uma consulta está sendo processada com
    .explain("executionStats")

//exemplo sem índice
db.usuarios.find({ email: "joao@email.com" }).explain("executionStats")
//se totalKeysExamined for 0 e totalDocsExamined for o total de documentos da coleção, significa que a consulta não está usando um índice

//exemplo com índice
db.usuarios.find({ email: "joao@email.com" }).hint({ email: 1 }).explain("executionStats")
//se totalKeysExamined for baixo e totalDocsExamined também, significa que o índice foi utilizado com sucesso

//o MongoDB escolhe o melhor índice para executar uma consulta. No entanto, em alguns casos, ele pode fazer um escolha subótima, e o .hint() permite forçar o uso de um índice que sabemos ser melhor.
//caso de uso:
//testar qual índice performa melhor.
//evitar que o MongoDB use um índice "menos bom"

//exemplo de uso do hint()
//crie os índices:
db.pedidos.createIndex({ email: 1 })
db.pedidos.createIndex({ cliente: 1, status: 1 })

//consulta
db.pedidos.find({ email: "joao@email.com" }).explain("executionStats")

//forçando o uso do índice cliente_1_status, podemos usar .hint():
db.pedidos.find({ email: "joao@email.com" }).hint({ cliente: 1, status: 1 }).explain("executionStats")

//removendo índices
//se um índex não estiver sendo usado, podemos removê-los para economizar espaço:
db.usuarios.dropIndex("email_1")

//para listar os índices existentes de uma coleção:
db.usuarios.getIndexes()