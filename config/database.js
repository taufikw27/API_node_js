const mysql = require('mysql');


//konfigurasi mysql
const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'kemahasiswaan',
    multipleStatements:true
})

//log error

koneksi.connect((err)=> {
    if(err) throw err;
    console.log('Mysql connected ....');

})

module.exports = koneksi;