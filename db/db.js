const mongoose = require('mongoose')



const connectdb = async ()=>{
    try {
        const connectioninstance = await mongoose.connect( `${process.env.DB}`)
        console.log(`\n MongoDB connected !! DB HOSt: ${connectioninstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error",error)
        process.exit(1)
    }
}

module.exports = connectdb
