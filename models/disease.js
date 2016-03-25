var mongoose = require('mongoose');
var diseaseSchema = mongoose.Schema({ 
        name: {type:String,required: true},
        shortDescription: {type:String,required: true},
        longDescription: {type:String,required: true},
        winingText: {type:String,required: true}
});
diseaseSchema.methods.getGrito = function () {
    console.log('viva peron');
};
var Disease = mongoose.model('Disease', diseaseSchema);
module.exports = Disease;