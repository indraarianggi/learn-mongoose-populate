var mongoose = require('mongoose');

// create a database Schema
var Schema = mongoose.Schema;
var storySchema = new Schema({
    title: {
        type: String
    },
    date: {
        type: Date
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Person'    // referensi ke model person
    }
});

// export database model based on storySchema
module.exports = mongoose.model('Story', storySchema);
