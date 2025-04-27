import mongoose from 'mongoose'
const schema = mongoose.Schema

const userSchema = new schema({
    userName: String,
    googleID: String
})

const user = mongoose.model('user', userSchema)

export{
    user
}