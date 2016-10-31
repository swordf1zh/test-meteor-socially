import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './userAuth.html';
import { name as DisplayNameFilter } from '/imports/ui/filters/displayNameFilter';
import { name as Login } from '../userLogin/userLogin';
import { name as Register } from '../userRegister/userRegister';
import { name as Password } from '../userPassword/userPassword';

class Auth {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
      }
    });
  }

  logout() {
    Accounts.logout();
  }
}

const name = 'auth';

export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter,
  Login,
  Register,
  Password
]).component(name, {
  template,
  controller: Auth,
  controllerAs: name
});