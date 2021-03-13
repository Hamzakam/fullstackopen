require("dotenv").config();
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then((result) => {
        console.log("Connected to Mongodb", result);
    })
    .catch((error) => {
        console.log("Unable to connect to Mongodb.Error:" + error);
    });

const personSchema = new mongoose.Schema({
    name: { type: String, minLength: 3, required: true, unique: true },
    phoneNumber: { type: String, minLength: 8, required: true },
});
personSchema.plugin(uniqueValidator);
personSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    },
});

module.exports = mongoose.model("Person", personSchema);
