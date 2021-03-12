require("dotenv").config();
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((result) => {
        console.log("Connected to Mongodb");
    })
    .catch((error) => {
        console.log("Unable to connect to Mongodb.Error:" + error);
    });

const personSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
});
personSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    },
});

module.exports = mongoose.model("Person", personSchema);
