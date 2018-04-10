const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Formation = new Schema({
    name: String,
    author: String,
    authorName: String,
    date: String,
    dots: {
    	type: Array,
    	default: [
    		{id: '1',x:47,y:450,team:'Barcelona',player:12,name:'Messi'},
    		{id: '2',x:321,y:500,team:'Real Madrid',player:7,name:'Ronaldo'},
    		{id: '3',x:123,y:360,team:'Real Madrid',player:4,name:'Rakitic'},
    		{id: '55', x:47,y:450,team:'Real Madrid',player:11,name:'Casemiro'},
    		{id: '4',x:321,y:540,team:'Barcelona',player:6,name:'Busquets'}
    	]
    }
});



module.exports = mongoose.model('formations', Formation);
