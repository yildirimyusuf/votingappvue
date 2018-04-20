const Poll = require('../models/Poll');

// JSON API for list of polls
exports.list = function (req, res) {
  Poll.find({}, 'question', function (error, polls) {
    res.send({
      polls: polls,
    });
  });
};
// JSON API for getting a single poll
exports.poll = function (req, res) {
  var pollId = req.params.id;
  Poll.findById(pollId, '', {
    lean: true
  }, function (err, poll) {
    if (poll) {
      var userVoted = false,
        userChoice,
        totalVotes = 0;
      for (c in poll.choices) {
        var choice = poll.choices[c];
        for (v in choice.votes) {
          var vote = choice.votes[v];
          totalVotes++;
          if (vote.ip === (req.header('x-forwarded-for') || req.ip)) {
            userVoted = true;
            userChoice = {
              _id: choice._id,
              text: choice.text
            };
          }
        }
      }
      poll.userVoted = userVoted;
      poll.userChoice = userChoice;
      poll.totalVotes = totalVotes;
      res.json(poll);
    } else {
      res.json({
        error: true
      });
    }
  });
};
// JSON API for creating a new poll
exports.create = function (req, res) {
  var userid = req.user.userid;

  console.log("create polls req body", req.body);
  var reqBody = req.body;
  var choices = reqBody.choices.filter(function (v) {
    return v.text != '';
  });
  choices = choices.map(choice => {
    var choiceObj = {
      text: choice,
      votes: []
    };
    return choiceObj;
  });
  var question = reqBody.question;
  console.log("create polls req question", question);
  console.log("create polls req typeof choice ", (typeof choices));
  var pollObj = {
    ownerId: userid,
    question: question,
    choices: choices,
  };
  var poll = new Poll(pollObj);
  poll.save(function (err, doc) {
    if (err || !doc) {
      console.log('err', err);
      console.log('doc', doc);
      throw 'Error';
    } else {
      res.json(doc);
    }
  });
};