var mongoose = require('mongoose');

// create a database Schema
var Schema = mongoose.Schema;
var personSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    address: {
        type: String
    },
    // stories: [  // dalam bentuk array objek
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Story'    // referensi ke model story
    //     }
    // ]
});

// export database model based on personSchema
module.exports = mongoose.model('Person', personSchema);
