const mongoose =require('mongoose');
// const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(process.env.DATABASE_URL)

const UserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    username : String,
    password : String,
    log : [{
        loginTime : String,
        logoutTime : String,
        isActive : Boolean
    }]
})

const AdminSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    username : String,
    password : String
})

const User = mongoose.model("User" , UserSchema)
const Admin = mongoose.model("Admin" , AdminSchema)

module.exports = { 
    User ,
    Admin
} 
