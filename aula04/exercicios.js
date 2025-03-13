//mongo

//1
use heroes

db.heroes.insertMany([
    { _id: 1, name: "Spider-Man", city: "New York", power: ["Agility", "Web-Shooting"], defeatedVillains: 50 },
    { _id: 2, name: "Batman", city: "Gotham", power: ["Martial Arts", "Detective Skills"], defeatedVillains: 200 },
    { _id: 3, name: "Wonder Woman", city: "Themyscira", power: ["Super Strenght", "Lasso"], defeatedVillains: 120 },
]);

//a-) O Homem-Aranha desenvolveu um novo poder: Sentido Aranha Aprimorado. Adicione esse poder ao array power de "Spider-Man".
db.heroes.updateOne(
    { name: "Spider-Man" },
    { $push: { power: "Enhanced Spider Sense" } }
);

//b-) O Batman prendeu mais 10 vilões. Atualize o campo defeatedVillains para refletir essa mudança.
db.heroes.updateOne(
    { name: "Batman" },
    { $inc: { defeatedVillains: 10 } }
);

//c-) O nome da cidade da Mulher-Maravilha foi alterado para "Amazonia". Atualize essa informação.
db.heroes.updateOne(
    { name: "Wonder Woman" },
    { $set: { city: "Amazonia" } }
);

//d-) O Batman perdeu suas "Detective Skills" (ele não se lembra mais de como investigar). Remova essa habilidade da lista power.
db.heroes.updateOne(
    { name: "Batman" },
    { $pull: { power: "Detective Skills" } }
);

//2
use menu

db.menu.insertMany([
    { _id: 1, dish: "Pizza", ingredients: ["Dough", "Tomato Sauce", "Cheese"], price: 30 },
    { _id: 2, dish: "Sushi", ingredients: ["Rice", "Fish", "Seaweed"], price: 40 },
    { _id: 3, dish: "Taco", ingredients: ["Tortilla", "Beef", "Cheese"], price: 15 },
]);

//a-) O restaurante decidiu aumentar o preço de todos os pratos em 10%. Atualize os preços.
db.menu.updateMany(
    {},
    { $mul: { price: 1.1 } }
);

//b-) O Taco agora vem com "Guacamole". Adicione esse ingrediente à lista ingredients.
db.menu.updateOne(
    { dish: "Taco" },
    { $push: { ingredients: "Guacamole" } }
);

//c-) O Sushi teve um reajuste e agora custa 35. Atualize esse valor.
db.menu.updateOne(
    { dish: "Sushi" },
    { $min: { price: 35 } }
);

//d-) O restaurante removeu "Beef" dos Tacos e substituiu por "Chicken". Atualize a lista de ingredientes do Taco.
db.menu.updateOne(
    { dish: "Taco" },
    { $pull: { ingredients: "Beef" } }
);

db.menu.updateOne(
    { dish: "Taco" },
    { $push: { ingredients: "Chicken" } }
);