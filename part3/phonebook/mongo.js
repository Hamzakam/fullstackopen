const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log(
        "Please provide the password as an argument: node mongo.js <password>"
    );
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.hbzfk.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
const personSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 5) {
    const name = process.argv[3];
    const phoneNumber = process.argv[4];

    const person = new Person({ name, phoneNumber });

    person.save().then((res) => {
        console.log(`added ${name} number ${phoneNumber} to phonebook`);
        mongoose.connection.close();
    });
} else {
    Person.find({}).then((result) => {
        console.log("Phonebook:");
        result.forEach((person) => {
            console.log(`${person.name} ${person.phoneNumber}`);
        });
        mongoose.connection.close();
    });
}
