const mongoose = require('mongoose')
const mongoUri = process.env.MONGO_URI

mongoose.connect(
    mongoUri,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
    function(err) {
        if (err) console.log('failed to connect database')
        else console.log('Success to connect database')
    }
)

module.exports = mongoose
