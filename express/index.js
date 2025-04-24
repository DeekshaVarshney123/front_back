const express=require("express");
const path =require("path");
const app=express();
let port=3000;
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
});
app.get("/search",(req,res)=>{
    let {q}=req.query;
     res.send(`<h1>your query is ${q}</h1>`);
 });

 app.get("/ig/:username",(req,res)=>{
    let {username}=req.params;
    const InstaData=require("./data.json");
    const data=InstaData[username];
     res.render("instagram.ejs",{data});
 })

app.get("/home",(req,res)=>{
    res.render("home.ejs");
});
