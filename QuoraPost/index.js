const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log("app is listening");
});

let posts=[
    {
        id:uuidv4(),
        username:"Deeksha",
        content:"hii I am deeksha",

    },{
        id:uuidv4(),
        username:"gargi",
        content:"hii I am gargi",

    },{
        id:uuidv4(),
        username:"khushi",
        content:"hii I am khushi",

    },{
        id:uuidv4(),
        username:"bhavya",
        content:"hii I am bhavya",

    }
];

app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/post/new",(req,res)=>{
     res.render("form.ejs");
});

app.post("/post",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    
    res.redirect("/post");
});


app.get("/post/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    console.log(id);    
    let post=posts.find((p)=>id===p.id);
    console.log(post);
    res.render("edit.ejs",{post});
});

app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    
    res.redirect("/post");
});

app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!=p.id);
     
    res.redirect("/post");
})