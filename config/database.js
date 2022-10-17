const mysql = require('mysql')

// konfigurasi mysql

const koneksi = 
mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'pengguna',
    multipleStatements: true
})

// log error koneksi
koneksi.connect((err) => {
    if(err) throw err
    console.log('Mysql lagi tersambung....')
})

module.exports = koneksi