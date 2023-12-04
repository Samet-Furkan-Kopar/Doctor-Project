import mongoose from "mongoose";

const {Schema} = mongoose;
const userRoleSchema = new Schema({
    role:{
        type:String,
        require:true
    }
}, {
    timestamps: true
})

const UserRole = mongoose.model("user_role",userRoleSchema)

export default UserRole