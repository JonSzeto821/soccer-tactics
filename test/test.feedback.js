const should = require('chai').should();
const mongoose = require('mongoose');
const Feedback = require('../models/feedback.js');

describe('Feedback', () => {
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
    let feedback = new Feedback({
      feedback: 'Comment for formation',
      formationID: 'formation123',
      author: 'authorID',
      authorName: 'formCreator',
      date: '02-11-2018'
    });

    feedback.save((error) => {
      // if (error) console.log('error' + error.message);
      // else console.log('no error');
      done();
    });
  });

  afterEach((done) => {
    Feedback.remove({}, () => {
      done();
    });
  });

  it('find comment by formationID', (done) => {
    Feedback.findOne({formationID: 'formation123'}, (err, feedback) => {
      feedback.feedback.should.eql('Comment for formation');
      // console.log("feedback: ", feedback.feedback);
      done();
    });
  });

  it('feedback should be Object', (done) => {
    Feedback.findOne({formationID: 'formation123'}, (err, feedback) => {
      feedback.should.be.a('object');
      // console.log("feedback: ", typeof(feedback));
      done();
    });
  });

  it('feedback fields should be typeOf String', (done) => {
    Feedback.findOne({formationID: 'formation123'}, (err, feedback) => {
      // feedback.feedback.should.be.type('string');
      feedback.feedback.should.be.a('string');
      feedback.formationID.should.be.a('string');
      feedback.author.should.be.a('string');
      feedback.authorName.should.be.a('string');
      feedback.date.should.be.a('string');
      // console.log("fields: ", typeof(feedback.feedback, feedback.formationID, feedback.author, feedback.authorName, feedback.date));
      done();
    });
  });

  it('should save feedback without error', (done) => {
    let feedback = new Feedback({
      feedback: 'New Comment',
      formationID: 'formation456',
      author: '098765',
      authorName: 'Jon',
      date: '02-11-2018'
    });

    feedback.save(done);
  });
});
