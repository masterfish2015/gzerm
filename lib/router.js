Router.configure({
  layoutTemplate: 'layoutTmp',
  waitOn: function() {
    return [
      Meteor.subscribe('companyType'),
      Meteor.subscribe('permissions'),
      Meteor.subscribe('companies'),
      Meteor.subscribe('departments'),
      Meteor.subscribe('regions'),
      Meteor.subscribe('jobs'),
      Meteor.subscribe('employees'),
      Meteor.subscribe('groups')
    ]; }
});

Router.route('/', {name: 'homeTmp'});
Router.route('/register',{name: 'registerTemplate'});
Router.route('/login',{name: 'loginTemplate'});
Router.route('/usermanager',{name: 'userManagerTemplate'});
Router.route('/companytypemanager',{name:'companyTypeMangagerTemplate'});
Router.route('/companymanager',{name:'companyManagerTemplate'});
Router.route('/regionmanager',{name:'regionManagerTemplate'});
Router.route('/departmentmanager',{name:'departmentManagerTemplate'});

Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('loginTemplate');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
}, {except: ['loginTemplate', 'registerTemplate','homeTmp']});

