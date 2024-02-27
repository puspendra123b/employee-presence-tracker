const zod = require('zod');

const signIn = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

const userSignUp = zod.object({
    firstName : zod.string(),
    lastName : zod.string(),
    username : zod.string().email(),
    password : zod.string(),
});

const adminSignUp = zod.object({
    firstName : zod.string(),
    lastName : zod.string(),
    username : zod.string().email(),
    password : zod.string(),
});

const logout = zod.object({
    id : zod.string(),
})

module.exports = {
    signIn,
    userSignUp,
    adminSignUp,
    logout
}