import mysql from 'mysql2';
// const connection = mysql.createConnection({
//   host: '192.168.2.103',
//   user: 'root',
//   password: 'password',
//   authPlugins: ['caching_sha2_password']
// });
const con = mysql.createConnection('mysql://root:password@192.168.178.49/projectms?authPlugins=caching_sha2_password');
let ts1 = Date.now();
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
    con.query(`CREATE TABLE project (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255),
    FirstName varchar(255),
    Age int,
    PRIMARY KEY (ID)
  )`, function (err, result) {
        if (err)
            throw err;
        console.log("Database created");
    });
});
