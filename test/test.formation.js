const should = require('chai').should();
const expect = require('chai').expect();
const mongoose = require('mongoose');
const Formation = require('../models/formation.js');

describe('Formation', () => {
  before((done) => {
    mongoose.Promise = global.Promise;
    const db = mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
    done();
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });

  beforeEach((done) => {
    let formation = new Formation({
      name: '433 Attacking',
      author: 'authorID',
      authorName: 'formCreator',
      date: '01-06-2019',
      dots: {
      	type: Array,
      	default: [
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

    formation.save(done);
  });

  afterEach((done) => {
    Formation.remove({}, () => {
      done();
    });
  });

  it('formation should be an object', (done) => {
    Formation.findOne({name: '433 Attacking'}, (err, formation) => {
      formation.should.be.a('object');
      done();
    });
  });

  it('verify formation field types', (done) => {
    Formation.findOne({name: '433 Attacking'}, (err, formation) => {
      formation.name.should.be.a('string');
      formation.author.should.be.a('string');
      formation.authorName.should.be.a('string');
      formation.date.should.be.a('string');
      Array.isArray(formation.dots);
      done();
    });
  });

  /*it('should save formation without error', (done) => {
    let formation = new Formation({
      name: '4231 Attacking',
      author: 'authorID',
      authorName: 'formCreator',
      date: '01-06-2019',
      dots: {
      	type: Array,
      	default: [
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

    formation.save(done);
  });*/

  /*it('should remove formation without error', (done) => {
    let name = {name: '433 Attacking'};
    // console.log(Formation);
    Formation.remove({name}, (err, formation) => {
      done();
    });

  });*/

  it('update formation field', (done) => {
    let b = {name: 'updated name' }
    Formation.findOneAndUpdate({name: '433 Attacking'}, {$set: b}, {new: true}, (err, formation) => {
      formation.name.should.eql('updated name');
      done();
    });
  });

});
