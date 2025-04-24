
const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');
const express=require('express');
const path=require("path");
const app=express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const methodOverride=require("method-override");
const { Console } = require('console');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
let createRandomUser=()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
}
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydatabase',
    password:'munmun',
  });
  

let port=3000;
app.listen(port,()=>{
  console.log("sever stating...");
});

app.get("/",(req,res)=>{
  let q="select count(*) as count  from user";
  try{
      connection.query(q,(err, results)=>{
        if(err){throw err;}
          let cnt=results[0].count; 
          res.render("home.ejs",{cnt});
        }
      );
    }
    catch(err){
      console.log(err);
    }
});

app.get("/user",(req,res)=>{
  let q="select id,username,email from user";
  try{
    connection.query(q,(err, results)=>{
      if(err){throw err;}
      let solution=results;
        res.render("user.ejs",{solution});
      }
    );
  }
  catch(err){
    console.log(err);
  }
});

app.patch("/user/:id",(req,res)=>{
  let {id}=req.params;
  let {username:newUserName,password:formPass}=req.body;
  let q=`select * from user where id="${id}"`;
  try{
      connection.query(q,(err, results)=>{
          if(err){throw err;}
          let user=results[0];
          if(formPass!=user.password){
               res.send("wrong password");
          }else{
               let q2=`update user set username="${newUserName}"  where id="${id}"`;
               connection.query(q2,(err, results)=>{
                   if(err){throw err;}
                   res.redirect("/user");
               });
          }
    });
  }
  catch(err){
    console.log(err);
  }
});

app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`select * from user where id="${id}"`;
  try{
    connection.query(q,(err, results)=>{
      if(err){throw err;}
      let user=results[0];
    res.render("edit.ejs",{user});
      }
    );
  }
  catch(err){
    console.log(err);
  }
});


