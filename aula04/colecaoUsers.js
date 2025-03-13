//mongo
use users;
db.users.insertMany([
    {
        _id: 1,
        username: "joao",
        age: 24,
        active: true,
        premium: false,
        hobbies: ["reading", "soccer"],
        tasks: [{ title: "Study MongoDB", status: "pending" }]
    },
    {
        _id: 2,
        username: "maria",
        age: 30,
        active: false,
        premium: true,
        hobbies: ["cooking", "yoga"],
        tasks: [{ title: "Complete project", status: "done" }]
    },
    {
        _id: 3,
        username: "carlos",
        age: 35,
        active: true,
        premium: false,
        hobbies: ["gaming", "music"],
        tasks: [{ title: "Write report", status: "pending" }]
    }
]);

db.users.updateOne(
    { username: "joao" },
    { $set: { age: 25 } }
);

db.users.updateMany(
    { active: true },
    { $set: { premium: true } }
);

db.users.replaceOne(
    { username: "maria" },
    { _id: 2, username: "maria", age: 31, active: true, premium: false, hobbies: [] }
);

db.users.updateOne(
    { username: "carlos" },
    { $unset: { premium: "" } }
);

db.users.updateOne(
    { username: "maria" },
    { $rename: { "age": "yearsOld" } }
);

db.users.updateOne(
    { username: "joao" },
    { $inc: { age: 1 } }
);

db.users.updateOne(
    { username: "carlos" },
    { $mul: { age: 2 } }
);

db.users.updateOne(
    { username: "joao" },
    { $min: { age: 23 } }
);

db.users.updateOne(
    { username: "maria" },
    { $max: { yearsOld: 35 } }
);

db.users.updateOne(
    { username: "joao" },
    { $push: { hobbies: "guitar" } }
);

db.users.updateOne(
    { username: "carlos" },
    { $pop: { hobbies: -1 } }
);

db.users.updateOne(
    { username: "carlos" },
    { $pull: { hobbies: "gaming" } }
);

db.users.updateOne(
    { username: "joao" },
    { $addToSet: { hobbies: "chess" } }
);


db.users.updateOne(
    { username: "joao" },
    { $push: { hobbies: { $each: ["coding", "music"] } } }
);