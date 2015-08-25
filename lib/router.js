Router.configure({
  layoutTemplate: 'layoutTmp',
  waitOn: function() {
    return [
      Meteor.subscribe('companyType'),
      Meteor.subscribe('permissions'),
      Meteor.subscribe('companies'),
      Meteor.subscribe('departments'),
      Meteor.subscribe('regions'),
      Meteor.subscribe('jobs')
    ]; }
});

Router.route('/', {name: 'homeTmp'});
Router.route('/login',{name: 'loginTmp'});
Router.route('/usermanager',{name: 'userManagerTemplate'});

