const fs = require("fs");
const mongoose = require("mongoose");


const User = require("../models/user.js");
const Thought = require("../models/thought.js");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/user-seeds.json`, "utf-8")
);
const thoughts = JSON.parse(
  fs.readFileSync(`${__dirname}/thought-seeds.json`, "utf-8")
);

const importData = async () => {
  try {
    await User.create(users);
    console.log("Data Imported");
    await Thought.create(thoughts);
    console.log("Data Imported");
  } catch (err) {
    console.error(err);
  }
  process.exit();

};

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data Destroyed");
    await Thought.deleteMany();
    console.log("Data Destroyed");
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
