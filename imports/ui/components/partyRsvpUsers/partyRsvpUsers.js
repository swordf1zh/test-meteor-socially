import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './partyRsvpUsers.html';
import { name as DisplayNameFilter } from '/imports/ui/filters/displayNameFilter';

class PartyRsvpUsers {
  getUserById(userId) {
    return Meteor.users.findOne(userId);
  }
}

const name = 'partyRsvpUsers';

export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  template,
  controller: PartyRsvpUsers,
  controllerAs: name,
  bindings: {
    rsvps: '<',
    type: '@'
  }
});