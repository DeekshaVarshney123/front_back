const express=require("express");
const app=express();
app.listen(8080,()=>{
    console.log("connected successful");
});

let checkToken=(req,res,next)=>{
    let {token}=req.query;
    if(token==="giveaccess"){
        next();
    }else{
        res.send("ACCESS DENIED");
    }
}
app.get("/api",checkToken,(req,res)=>{
    res.send("data");
});
// app.use("/api",(req,res,next)=>{
//     req.time=new Date(Date.now());
//     console.log(req.method,req.hostname,req.path,req.time);
//     next();
// });
app.get("/",(req,res)=>{
    res.send("working route /");
});
app.get("/random",checkToken,(req,res)=>{
    res.send("working route /random");
})