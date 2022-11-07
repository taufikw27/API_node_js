const express = require('express');
const bodyparser = require('body-parser');
const koneksi = require('./config/database');
const app = express();
const PORT = process.env.PORT || 5000;


//body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended:false
}));


//create data
app.post('/api/mahasiswa', (req, res)=> {
    //nampung data
    const data = {...req.body};
    const querySql = 'INSERT INTO mahasiswa SET?';

    //running query
    koneksi.query(querySql, data, (err, rows, field)=>{
        //nampung error
        if(err){
            return res.status(500).json({message:'Failed Insert data!!', error:err});
        }
        res.status(200).json({success: true, message:'Success insert data'});
    })
})
// Read Data
app.get('/api/mahasiswa', (req, res)=>{
    const querySql = 'SELECT * FROM mahasiswa';
    
    //jalankan query
    koneksi.query(querySql, (err, rows, field)=>{
        //log error
        if(err){
            return res.status(500).json({message:'something wrong', error: err});
        }
        res.status(200).json({success: true, data:rows});
    })
})
//update data
app.put("/api/mahasiswa/:id", (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySearch = "SELECT * FROM mahasiswa WHERE id_mhs = ?";
    const queryUpdate = "UPDATE mahasiswa SET ? WHERE id_mhs = ?";
  
    // jalankan query untuk melakukan pencarian data
    koneksi.query(querySearch, req.params.id, (err, rows, field) => {
      // error handling
      if (err) {
        return res.status(500).json({ message: "Ada kesalahan", error: err });
      }
      // jika id yang dimasukkan sesuai dengan data yang ada di db
      if (rows.length) {
        // jalankan query update
        koneksi.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
          // error handling
          if (err) {
            return res.status(500).json({ message: "Ada kesalahan", error: err });
          }
  
          // jika update berhasil
          res.status(200).json({ success: true, message: "Berhasil update data!" });
        });
      } else {
        return res.status(404).json({ message: "Data tidak ditemukan!", success: false });
      }
    });
  });
// delete data
app.delete("/api/mahasiswa/:id", (req, res) => {
    // buat query sql untuk mencari data dan hapus
    const querySearch = "SELECT * FROM mahasiswa WHERE id_mhs = ?";
    const queryDelete = "DELETE FROM mahasiswa WHERE id_mhs = ?";
  
    // jalankan query untuk melakukan pencarian data
    koneksi.query(querySearch, req.params.id, (err, rows, field) => {
      // error handling
      if (err) {
        return res.status(500).json({ message: "Ada kesalahan", error: err });
      }
  
      // jika id yang dimasukkan sesuai dengan data yang ada di db
      if (rows.length) {
        // jalankan query delete
        koneksi.query(queryDelete, req.params.id, (err, rows, field) => {
          // error handling
          if (err) {
            return res.status(500).json({ message: "Ada kesalahan", error: err });
          }
  
          // jika delete berhasil
          res.status(200).json({ success: true, message: "Berhasil hapus data!" });
        });
      } else {
        return res.status(404).json({ message: "Data tidak ditemukan!", success: false });
      }
    });
});

//log server
app.listen(PORT, () => {
    console.log('server running at port: ',PORT);
})