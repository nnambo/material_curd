const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "material_ncm"

});

app.post("/create",(req,res) =>{
  const parte = req.body.parte;
  const serial = req.body.serial;
  const defecto = req.body.defecto;
  const celda = req.body.celda;
  const usuario = req.body.usuario;

  db.query('INSERT INTO material(parte,serial,defecto,celda,usuario) VALUES(?,?,?,?,?)',
  [parte,serial,defecto,celda,usuario],(err,result)=>{
    if (err) {
      console.log(err);
    }else{
    res.send(result);}
  }
);
});

app.get("/materiales",(req,res) =>{
 
  db.query('SELECT * FROM material',
  (err,result)=>{
    if (err) {
      console.log(err);
    }else{
    res.send(result);}
  }
);
});

app.put("/update",(req,res) =>{
  const id = req.body.id;
  const parte = req.body.parte;
  const serial = req.body.serial;
  const defecto = req.body.defecto;
  const celda = req.body.celda;
  const usuario = req.body.usuario;

  db.query('UPDATE material SET parte=?,serial=?,defecto=?,celda=?,usuario=? WHERE id=?',
  [parte,serial,defecto,celda,usuario,id],(err,result)=>{
    if (err) {
      console.log(err);
    }else{
    res.send(result);}
  }
);
});

app.delete("/delete/:id",(req,res) =>{
  const id = req.params.id;

  db.query('DELETE FROM material WHERE id=?',id,
  (err,result)=>{
    if (err) {
      console.log(err);
    }else{
    res.send(result);}
  }
);
});

app.listen(3001,()=>{
  console.log("running en el puerto 3001")
})