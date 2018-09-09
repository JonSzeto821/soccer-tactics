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
        // add default values below to have 12 players on each team
            //Team 1
    		{id: '1',x:47,y:450,team:'Team 1',player:91,name:'ST'},
    		{id: '2',x:400,y:500,team:'Team 1',player:7,name:'LW'},

            // Team 2
            {id: '12',x:50,y:450,team:'Team 2',player:9,name:'CB'},
            {id: '13',x:321,y:500,team:'Team 2',player:19,name:'LB'},

            //Soccer Ball
            {id: '999',x:525,y:340,team:null,player:null,name:null}
    	]
    }
});

module.exports = mongoose.model('formations', Formation);