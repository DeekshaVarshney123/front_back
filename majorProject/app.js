const express=require("express");
const mongoose=require("mongoose");

const listing=require("./models/listing.js");
const review=require("./models/review.js");
const methodOverride=require("method-override");
const path=require("path");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
const {reviewSchema}=require("./schema.js");
const app=express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
const ejsMate=require("ejs-mate");
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
let MONGO_URL="mongodb+srv://varshneydeeksha71:munmun@cluster0.4qjgo.mongodb.net/wondolust?retryWrites=true&w=majority&appName=Cluster0";
async function main(){
       await mongoose.connect(MONGO_URL)
       
}
main()
.then(() => console.log('Connected! to db'))
.catch((err)=>console.log(err));


const listingValidate=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
     next(new ExpressError(400,error));
  }else{
    next();
  }
};

const validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
     next(new ExpressError(400,error));
  }else{
    next();
  }
};



// index route 
app.get("/listing", wrapAsync(async (req, res, next) => {
  let alllisting = await listing.find({});
  if (alllisting.length === 0) {
    next(new ExpressError(404, "No listings found!"));
  }
  res.render("./listings/index.ejs", { alllisting });
}));


//create route
app.get("/listing/new",(req,res)=>{
  res.render("./listings/new.ejs");

});
// show route
app.get("/listing/:id",wrapAsync(async(req,res,next)=>{
  let {id}=req.params;
  const listingById=await listing.findById(id).populate("reviews");
  if (!listingById) {
    next(new ExpressError(404 ,"Listing not found!"));
  }
  res.render("./listings/show.ejs",{listingById});
}));


app.post("/listing",listingValidate,wrapAsync(async(req,res,next)=>{
  const  newListing=new listing(req.body.listing);
   await newListing.save();
   res.redirect("/listing");
}));


// //edit route
app.get("/listing/:id/edit",wrapAsync(async(req,res,next)=>{
  let {id}=req.params;
  const listingById=await listing.findById(id);
  if (!listingById) {
    next(new ExpressError(404 ,"Listing not found!"));
  }
  res.render("./listings/edit.ejs",{listingById});
}));


app.put("/listing/:id", listingValidate,wrapAsync(async (req, res, next) => {
  let { id } = req.params;
  const updatedListing = await listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (!updatedListing) {
    return next(new ExpressError(404, "Listing not found!"));
  }
  res.redirect(`/listing/${id}`);
}));


//delete route
app.delete("/listing/:id", wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedListing = await listing.findByIdAndDelete(id);
  if (!deletedListing) {
    return next(new ExpressError(404, "Listing not found!"));
  }
  res.redirect("/listing");
}));


app.post("/listing/:id/review",validateReview,wrapAsync(async(req,res)=>{
  let {id}=req.params;
  let listingById=await listing.findById(id);
  let newReview=new review(req.body.review);
  listingById.reviews.push(newReview);
  
  await newReview.save();
  await listingById.save();
  res.redirect(`/listing/${id}`);
}));

app.delete("/listing/:id/review/:reviewId",wrapAsync(async(req,res)=>{
  let {id,reviewId}=req.params;
   await review.findByIdAndDelete(reviewId);
   await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
   res.redirect(`/listing/${id}`);
}));

app.use((err,req,res,next)=>{
  let{status=500,message="something went wrong!"}=err;
  // let message="something went wrong!";
 res.render("./listings/error.ejs",{status,message});
});


app.listen(8080,()=>{
    console.log("working");
});
app.get("/",(req,res)=>{
    res.send("working");
});

