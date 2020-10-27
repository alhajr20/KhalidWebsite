const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "khalid_website",
    password: ""
});

connection.connect(err => {
    if (err) {
        console.log(err);
        return err;
    } else {
        console.log("Database ok");
    }
});

let query = "SELECT * FROM messages";

connection.query(query, (err, result) => {
    console.log(err);
    console.log(result[0].name);
    // console.log(field);
});

connection.end(err => {
    if (err) {
        console.log(err);
        return err;
    } else {
        console.log("Database ok");
    }
});