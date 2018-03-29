const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Formation = new Schema({
    name: String,
    author: String,
    authorName: String,
    date: String,
    dots: {
    	type: Array,
    	default: [{id: '1',x:47,y:450,team:'Barcelona',player:1},{id: '2',x:321,y:500,team:'Real Madrid',player:7},{id: '3',x:123,y:360,team:'C',player:4},{id: '55', x:47,y:450,team:'A',player:1},{id: '4',x:321,y:540,team:'B',player:6}]
    }
    //add additional formation info later
});



module.exports = mongoose.model('formations', Formation);
