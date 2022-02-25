const mongoose = require('mongoose')

const connectDatabase = ()=>{
    
    mongoose.connect( process.env.DB_URI
        , {
        // useUnifiedTopology:true,
    }
    ).then((data)=>{
        console.log(`Mongodb Connected with server  : ${data.connection.host}`)
}).catch((error)=>{
    console.log(error.message)
})
}

module.exports = connectDatabase;