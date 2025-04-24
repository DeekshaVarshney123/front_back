const mongoose=require("mongoose");

let MONGO_URL="mongodb+srv://varshneydeeksha71:munmun@cluster0.4qjgo.mongodb.net/relationDemo?retryWrites=true&w=majority&appName=Cluster0";
async function main(){
       await mongoose.connect(MONGO_URL)
       
}
main()
.then(() => console.log('Connected! to db'))
.catch((err)=>console.log(err));

const userSchema=new  mongoose.Schema({
    username:String,
    address:[
        {
            _id:false,
            location:String,
            city:String,
        }
    ],
});
const user=mongoose.model("user",userSchema);
// const deleteUsers = async () => {
//     let result = await user.deleteMany({});
//     console.log("Deleted users:", result);
//   };
  
//   deleteUsers();
  
const addUsers=async()=>{
    let user1=new user({
        username:"sherlockholmes",
        address:[
            {
                location:"221B Baker Street",
                city:"london",
            }
        ]
    });
    user1.address.push({
        location:"P32 WallStreet",
        city:"london",
    });
    let result=await user1.save();
    console.log(result);
};

addUsers();