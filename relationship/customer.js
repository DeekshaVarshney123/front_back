const mongoose=require("mongoose");

let MONGO_URL="mongodb+srv://varshneydeeksha71:munmun@cluster0.4qjgo.mongodb.net/relationDemo?retryWrites=true&w=majority&appName=Cluster0";
async function main(){
       await mongoose.connect(MONGO_URL)
       
}
main()
.then(() => console.log('Connected! to db'))
.catch((err)=>console.log(err));

const orderSchema=new  mongoose.Schema({
    item:String,
    price:Number,
});

const customerSchema=new  mongoose.Schema({
    name:String,
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order"
    }],
});

customerSchema.post("findOneAndDelete",async(customer)=>{
    if(customer.orders.length){
        let res=await order.deleteMany({_id:{$in:customer.orders}}); 
        console.log(res);
    }
});

const order=mongoose.model("order",orderSchema);
const customer=mongoose.model("customer",customerSchema);



const del=async()=>{
    let res=await customer.findByIdAndDelete("68064bcdde736b0d11210faa");
    console.log(res);
}
del();

// const findCustomer=async()=>{
//     let res=await customer.find({}).populate("orders");
//     console.log(res[0]);
// }
// findCustomer();
// const addOrder=async()=>{
//     let res=await order.insertMany([
//     {
//         item:"samosha",
//         price:12
//     },
//     {
//         item:"chips",
//         price:10
//     },
//     {
//         item:"chocolate",
//         price:40
//     },
// ]);
// console.log(res);
// };

// addOrder();