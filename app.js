const express = require('express')
const bodyParser = require('body-parser')
const koneksi = require('./config/database.js')

const app = express()

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extende:false}))


// buat data
app.route('/user/')
    .get((requ, resp) => {
        const querysql = 'select * from pengguna'
        koneksi.query(querysql, (err, rows, field) => {
            // log error
            if(err) {
                return resp.status(500).json({message:'Ada yang salah pada database'})
            }
            resp.status(200).json({success:true, data:rows})

        })
    })

    .post((requ, resp)=> {
        // tampung data
        const data = requ.body
        const query = 'INSERT INTO pengguna set ?'
        // resp.send('ini halaman home')

        // jalankan query
        koneksi.query(query, data, (err, rows, field) => {
            // kalau error
            if(err) {
                return resp.status(500).json({message:'Data gagal diinput', error:err})
            }
            resp.status(200).json({success:true, message: 'Data berhasil disimpan'})
        })
        
    })

    
    
    
app.put('/user/:id', (requ, resp) => {
    // ambil data
    const data = requ.body
    const getId = 'select * from pengguna where id = ?'
    const query = 'update pengguna set ? where id = ?'

    // jalankan query
    koneksi.query(getId, requ.params.id, (err, rows, field) => {
        if(err){
            return resp.status(500).json({error:err, message:'kemungkinan id yang anda minta tidak ada'})
        }
        // resp.status(200).json({success:true, message: 'kemungkinan id yang anda minta tidak ada'})
        if(rows.length){
            koneksi.query(query, [data, requ.params.id], (err, rows, field) => {
                return resp.status(500).json({error:err, message:'Gagal update'})
            })
            resp.status(200).json({success:true, massage:'Berhasil update data'})
        } else {
            return resp.status(404).json({success:false, message:'data tidak ditemukan'})
        }
    })
    
})

app.delete('/user/:id', (requ, resp) => {
    const queryGetID = 'select * from pengguna where id = ?'
    const queryhapus = 'delete from pengguna where id = ?'

    koneksi.query(queryGetID, requ.params.id, (err, rows, field)=> {
        if(err) {
            return resp.status(500).json({error:err, message:'gagal bro dapat id nya'})
        }
        
        if (rows.length) {
            koneksi.query(queryhapus, requ.params.id, (err, rows, field)=> {
                return resp.status(500).json({error:err, message:'gagal hapus bro'})
            } 
            )
            resp.status(200).json({message:'data berhasil dihapus', success:true})
        } else {
            return resp.status(404).json({message:'data tidak ditemukan'})
        }
    })
})

    // log server
app.listen(3000, console.log('ini server berjalan di port 3000'))


