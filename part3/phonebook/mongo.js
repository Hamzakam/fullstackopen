require("dotenv").config();

const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

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

if (process.argv.length == 4) {
    const name = process.argv[2];
    const phoneNumber = process.argv[3];

    const person = new Person({ name, phoneNumber });

    person.save().then((res) => {
        console.log(`added ${name} number ${phoneNumber} to phonebook`);
        console.log(res);
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
