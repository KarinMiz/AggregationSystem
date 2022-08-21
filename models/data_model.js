const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    timestamp:{
        type: Number,
        required: true
    },
    robotId:{
        type: String,
        required: true
    },
    alertsNumber:{
        type: Number,
        required: true
    }

})


module.exports = mongoose.model('Data', dataSchema)


