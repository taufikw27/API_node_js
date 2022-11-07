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

//log server
app.listen(PORT, () => {
    console.log('server running at port:',PORT);
})