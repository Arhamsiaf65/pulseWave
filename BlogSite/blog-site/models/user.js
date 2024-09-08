 import mongoose from "mongoose";

 const UserScehma = mongoose.Schema({
   name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String}
 })

 export default mongoose.models.User || mongoose.model("User", UserScehma);