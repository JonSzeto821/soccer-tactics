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
    		// {id: '3',x:123,y:360,team:'Team 1',player:4,name:'RW'},
    		// {id: '4', x:47,y:450,team:'Team 1',player:10,name:'CM'},
    		// {id: '5',x:321,y:540,team:'Team 1',player:8,name:'CM'},
      //       {id: '6',x:321,y:540,team:'Team 1',player:6,name:'CDM'},
      //       {id: '7',x:321,y:540,team:'Team 1',player:3,name:'LB'},
      //       {id: '8',x:321,y:540,team:'Team 1',player:4,name:'CB'},
      //       {id: '9',x:321,y:540,team:'Team 1',player:5,name:'CB'},
      //       {id: '10',x:321,y:540,team:'Team 1',player:2,name:'RB'},
      //       {id: '11',x:321,y:540,team:'Team 1',player:1,name:'GK'},
            // Team 2
            {id: '12',x:50,y:450,team:'Team 2',player:9,name:'CB'},
            {id: '13',x:321,y:500,team:'Team 2',player:19,name:'LB'},
            // {id: '14',x:123,y:360,team:'Team 2',player:11,name:'RM'},
            // {id: '15', x:47,y:450,team:'Team 2',player:14,name:'CAM'},
            // {id: '16',x:321,y:540,team:'Team 2',player:23,name:'CDM'},
            // {id: '17',x:321,y:540,team:'Team 2',player:5,name:'CDM'},
            // {id: '18',x:321,y:540,team:'Team 2',player:18,name:'LB'},
            // {id: '19',x:321,y:540,team:'Team 2',player:4,name:'CB'},
            // {id: '20',x:321,y:540,team:'Team 2',player:6,name:'CB'},
            // {id: '21',x:321,y:540,team:'Team 2',player:66,name:'RB'},
            // {id: '22',x:321,y:540,team:'Team 2',player:1,name:'GK'}



    	]
    }
});



module.exports = mongoose.model('formations', Formation);
