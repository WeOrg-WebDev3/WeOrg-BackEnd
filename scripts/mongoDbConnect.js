const mongoose = require("mongoose");
const dbPath = "mongodb://<dbuser>:<dbpassword>@ds250607.mlab.com:38485/test-db";
mongoose.connect(dbPath, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => {
    console.log("Cannot connect to dbs.");
});
db.once("open", () => {
    console.log("Successfully Connected to Dbs!");
});
module.exports = mongooseDBConnect;