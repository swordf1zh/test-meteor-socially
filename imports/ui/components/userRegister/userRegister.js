import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Accounts } from 'meteor/accounts-base';

import template from './userRegister.html';

class Register {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.credentials = {
      email: '',
      password: ''
    };

    this.error = '';
  }

  register() {
    Accounts.createUser(
      this.credentials,
      this.$bindToContext((err) => {
        if (err) {
          this.error = err;
        } else {
          this.$state.go('parties');
        }
      })
    );
  }
}

const name = 'register';

export default angular.module(name, [
  angularMeteor,
  uiRouter
])
.component(name, {
  template,
  controller: Register,
  controllerAs: name
})
.config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('register', {
    url: '/register',
    template: '<register></register>'
  });
}