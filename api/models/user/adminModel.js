import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {Schema} = mongoose;

const adminSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    language:{
        type:String,
        require:true,
        enum:["TR","EN"],
    },
    isStatus:{
        type:Boolean,
        default:true
    },
    tokens:[{type: Object}]
}, {
    timestamps: true
})
adminSchema.pre("save",function(next){
    const user =this;
    bcrypt.hash(user.password,10,(err,hash)=>{
        user.password=hash;
        next();
    })
})

const Admin = mongoose.model("Admin",adminSchema)

export default Admin