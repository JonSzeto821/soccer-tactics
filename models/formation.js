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
    		{id: '1',x:47,y:450,team:'Barcelona',player:12},
    		{id: '2',x:321,y:500,team:'Real Madrid',player:7},
    		{id: '3',x:123,y:360,team:'Barcelona',player:4},
    		{id: '55', x:47,y:450,team:'Real Madrid',player:11},
    		{id: '4',x:321,y:540,team:'Barcelona',player:6}
    	]
    },
    team2 :{
    	type: Array,
    	default: [
    		{id: '123',x:47,y:450,team:'Liverpool',player:1},
    		{id: '234',x:321,y:500,team:'Liverpool',player:2},
    		{id: '345',x:123,y:360,team:'Liverpool',player:3},
    		{id: '456', x:47,y:450,team:'Liverpool',player:4},
    		{id: '567',x:321,y:540,team:'Liverpool',player:5}
    	]
    }
    //add additional formation info later
});



module.exports = mongoose.model('formations', Formation);
