import Api from '@/services/Api';

export default {
  createPoll: function(poll) {
    return Api().post('/poll/create', poll);
  },
  list: function() {
    return Api().get('/poll/list');
  },
};
