import Api from '@/services/Api';

export default {
  createPoll: function(poll) {
    return Api().post('/poll/create', poll);
  },
  list: function() {
    return Api().get('/poll/list');
  },
  pollDetail: function(pollid) {
    return Api().get('/poll/detail', { params: { pollid: pollid } });
  },
  vote: function(pollid, choiceId) {
    return Api().put('/poll/vote', {
      pollId: pollid,
      choiceId: choiceId,
    });
  },
};
